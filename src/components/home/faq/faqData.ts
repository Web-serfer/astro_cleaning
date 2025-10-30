export interface FaqItem {
    question: string;
    answer: string;
}

export const faqData: FaqItem[] = [
    {
        question: "What services do you provide?",
        answer: "We provide professional cleaning services for homes and offices, including deep cleaning, regular maintenance, window cleaning, post-renovation cleaning, and property cleaning before sale."
    },
    {
        question: "How long does a standard cleaning take?",
        answer: "Cleaning time depends on the size of the area and the scope of work. On average, standard cleaning of a one-bedroom apartment takes 2-3 hours, while a three-bedroom apartment takes 4-6 hours."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept cash, credit card, and popular electronic payment systems. You can also pay for the cleaning service in advance or after the work is completed."
    },
    {
        question: "Do you use safe cleaning products?",
        answer: "Yes, we use only certified and eco-friendly cleaning products that are harmless to people and pets. Upon request, we can use your own cleaning supplies."
    }
];