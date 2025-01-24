import { assets } from "@kaplayjs/crew";

export const booksInfo: Record<
    string,
    {
        title: string;
        description: string;
        potrait: string;
        url: string;
    }
> = {
    how_to_be_a_bean_wizard: {
        title: "как стать бобовым волшебником",
        description: "Руководство по становлению мастером бобов.",
        potrait: assets.how_to_be_a_bean_wizard.outlined!,
        url: "/books/how_to_be_a_bean_wizard/introduction",
    },
};
