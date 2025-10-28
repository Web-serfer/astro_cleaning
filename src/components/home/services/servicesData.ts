interface Service {
    title: string;
    description: string;
    buttonText: string;
    href: string;
    iconType: 'arrow' | 'external';
    promoTag?: string;
    details?: string[];
}

// Данные для карточек услуг
export const servicesData: Service[] = [
    {
        title: 'Regular Cleaning',
        description: 'Keep life tidy week after week.',
        buttonText: 'VIEW SERVICE',
        href: '/services/regular',
        iconType: 'external',
        promoTag: 'Most Popular',
        details: [
            'WEEKLY',
            'BI-WEEKLY',
            'MONTHLY',
            'KITCHENS & BATHS',
        ],
    },
    {
        title: 'Deep Cleaning',
        description: 'A top-to-bottom refresh.',
        buttonText: 'VIEW SERVICE',
        href: '/services/deep-clean',
        iconType: 'external',
        promoTag: 'Best Value',
        details: [
            'DEEP SANITIZATION',
            'KITCHEN DEEP CLEAN',
            'BATHROOM DETAIL',
            'WINDOW CLEANING',
        ],
    },
    {
        title: 'Moving',
        description: 'Ready for your move.',
        buttonText: 'VIEW SERVICE',
        href: '/services/move-in-out',
        iconType: 'external',
        promoTag: 'For Tenants',
        details: [
            'INSPECTION READY',
            'DEPOSITS PROTECTION',
            'FRESH START',
            'CLEANING INSPECTION',
        ],
    },
    {
        title: 'Post-Construction',
        description: "Goodbye, builders' dust.",
        buttonText: 'VIEW SERVICE',
        href: '/services/post-construction',
        iconType: 'external',
        promoTag: 'New Service',
        details: [
            'DEBRIS REMOVAL',
            'DUST ELIMINATION',
            'SURFACE PROTECTION',
            'CLEANING RESIDUE',
        ],
    },
];