interface FaqData {
    id: number;
    question: string;
    answer: string;
}

const faqData: FaqData[] = [
    {
        id: 1,
        question: 'Lorem ipsum dolor sit amet consectetur. Ullamcorper eget?',
        answer: 'Massa diam tristique vulputate et at vivamus pulvinar. Elementum scelerisque justo elit tempor sapien pretium sit. Integer suspendisse adipiscing molestie ut purus suspendisse dui aliquam. Malesuada adipiscing tortor ipsum viverra consequat semper.',
    },
    {
        id: 2,
        question: 'Lorem ipsum dolor sit amet consectetur. Ullamcorper eget?',
        answer: 'Massa diam tristique vulputate et at vivamus pulvinar. Elementum scelerisque justo elit tempor sapien pretium sit. Integer suspendisse adipiscing molestie ut purus suspendisse dui aliquam. Malesuada adipiscing tortor ipsum viverra consequat semper.',
    },
    {
        id: 3,
        question: 'Lorem ipsum dolor sit amet consectetur. Ullamcorper eget?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
        id: 4,
        question: 'Lorem ipsum dolor sit amet consectetur. Ullamcorper eget?',
        answer: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
];

export type { FaqData };
export { faqData };