---
title: Game Objects
description:
    Как создавать и манипулировать игровыми объектами в KAPLAY, HTML5 Game Engine
    для JavaScript и TypeScript.
url: game_objects
image: "./assets/tree.png"
---

# Game Objects

Game objects это единица сущности KAPLAY. Они актеры вашей игры,
сущности, которые движутся, взаимодействуют и делают игру интересной.

## Создание игровых объектов

Игровые объекты создают с помощью функции `add()`. Она создает объект
и присоединяет его к сцене. Она принимает **components** и **tags**.

```js
const dinosaur = add([
    // если компоненты дают различное поведение игровым объектам
    rect(32, 32), // draw a rect
    pos(80, 80), // set a position
    // теги - tags классифицируют игровые объекты
    "dangerous",
    "big",
]);
```

Мы рассмотрим глубже компоненты и ​​теги в их соответствующих руководствах.

## Parents, childs и root

Игровые объекты могут иметь потомков - game objects. Это дает детям
возможность следовать за позицией родителя, вращением и масштабированием.

```js
const player = add([
    rect(32, 32),
    pos(80, 80),
]);

const head = player.add([
    circle(16),
    pos(0, -16), // относительно положения player
]);
```

**Every game object** это потомок **root game object**. Корневой root game
object это game object который содержит все game objects в сцене.

![Game Object tree](./assets/tree.png)

Вот почему функция `add()` это де-факто, метод `GameObjRaw.add()`.

## Операции с Game Objects

### Как создать game object

```js
const bag = add([
    sprite("bag"),
]);
```

### Как удалить game object

```js
// можно использовать метод .destroy() или функцию destroy()
bag.destroy();
destroy(bag);
```

### Как получить все game objects

```js
// получаем список всех game objects
get("*");
// получаем список всех игровых объектов friends
get("friends");
```

### Как добавить ребенка

```js
// добавляем потомка mini-bag к bag
const miniBag = bag.add([
    sprite("minibag"),
]);

const superMiniBag = bag.add([
    sprite("superminibag"),
    "favorite", // is the favorite
]);
```

### Как удалить потомка

```js
// Мы передаем ссылку на game object
bag.remove(miniBag); // 18, independency
```

### Как получить потомков

```js
bag.get("*"); // все потомки
bag.get("favorite"); // [superMiniBag] - все потомки с тегом фаворит
```

Вы можете увидеть полный список операций в документации [`GameObjRaw`](/doc/GameObjRaw).

## Функция `make()`

`make()` используется для создания game object без добавления его к сцене.

```js
// Такой же синтаксис как у add()
const bean = make([
    sprite("bean"),
    rotate(0),
]);

// bean не появляется, но вы можете его изменить
bean.angle = 270;

// Теперь сделаем так чтобы bean появился!
add(bean); // ohhi
```

## Динамическое создание game object

Одним из способов создания игрового объекта является создание функции,
которая возвращает список компонентов:

```js
function createBullet() {
    return [
        rect(6, 18),
        pos(80, 80),
        color(0.5, 0.5, 1),
    ];
}

const bullet1 = add(createBullet());
```

Другой вариант - вернуть объект функцией `make()`, и затем добавить его.

```js
function createBullet(spr) {
    const obj = make([
        pos(80, 80),
        color(0.5, 0.5, 1),
    ]);

    // мы используем спрайт, если он передан, и прямоугольник, если нет
    if (spr) {
        obj.use(sprite(spr));
    }
    else {
        obj.use(rect(6, 18));
    }

    return obj; // IMPORTANT: возвращайте ссылку на объект!
}

const bullet2 = add(createBullet("bullet")); // sprite
const bullet3 = add(createBullet()); // a rect
```
