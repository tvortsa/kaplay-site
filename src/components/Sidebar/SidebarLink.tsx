import type { Locale } from "@/util/i18n";
import { getLangedRoute } from "@/util/path";
import {
    $,
    component$,
    Slot,
    useSignal,
    useVisibleTask$,
} from "@builder.io/qwik";

type SidebarLinkProps = {
    link: string;
    target?: string;
    lang?: Locale;
    noTranslate?: boolean;
    reloadAll?: boolean;
};

export const SidebarLink = component$((props: SidebarLinkProps) => {
    const lang = props.lang || "en";

    return (
        <li class="sidebar-link list-none">
            <a
                href={props.noTranslate
                    ? props.link
                    : getLangedRoute(lang, props.link)}
                class="sidebar-link-a btn btn-sm w-full justify-start text-left text-lg aria-[current=page]:btn-primary aria-[current=false]:btn-ghost"
                target={props.target}
                data-link={props.link}
                aria-current="false"
            >
                <Slot />
            </a>
        </li>
    );
});
