// src/components/testimonials/TestimonialCard.tsx
import type { Component } from 'solid-js';

// Компонент для отображения звезд
const StarRating: Component<{ rating: number }> = (props) => {
    return (
        <div class="flex items-center">
            {Array.from({ length: 5 }).map((_, index) => (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={index < props.rating ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-black"
                >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
            ))}
        </div>
    );
};

export interface Testimonial {
    quote: string;
    author: string;
    rating: number;
}

export const TestimonialCard: Component<Testimonial> = (props) => {
    return (
        <div class="border border-gray-300 rounded-2xl p-6 flex flex-col gap-4 bg-white h-full">
            <div class="flex items-center gap-4">
                {/* Аватар-плейсхолдер */}
                <div class="w-12 h-12 bg-black rounded-full flex-shrink-0"></div>
                <StarRating rating={props.rating} />
            </div>
            <blockquote class="text-gray-800 font-semibold">
                "{props.quote}"
            </blockquote>
            <p class="text-gray-500 mt-auto">{props.author}</p>
        </div>
    );
};