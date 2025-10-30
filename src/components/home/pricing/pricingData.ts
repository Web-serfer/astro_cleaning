export interface PricingCardData {
    tag: string;
    price: string;
    description: string;
}

export interface PricingSectionData {
    title: string;
    category: string;
    description: string;
    allLink: string;
    allLinkText: string;
    pricingCards: PricingCardData[];
}

export const pricingSectionData: PricingSectionData = {
    title: "Pricing Teaser??",
    category: "Pricing",
    description: "Our transparent pricing ensures you know exactly what you're paying for. Choose from our range of cleaning services tailored to your needs, with no hidden fees.",
    allLink: "/pricing",
    allLinkText: "MORE ABOUT PRICING",
    pricingCards: [
        {
            tag: "Apartment",
            price: "~$159/h",
            description: "Studios & 1-2 BR",
        },
        {
            tag: "House",
            price: "~$159/h",
            description: "Townhomes & Single-Family",
        },
        {
            tag: "Move-Out",
            price: "~$199/h",
            description: "Empty units only",
        },
    ],
};