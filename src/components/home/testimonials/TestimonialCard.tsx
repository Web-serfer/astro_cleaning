import type { Component } from 'solid-js';

// Компонент для звезд рейтинга. Изменены цвета для соответствия дизайну.
const StarRating: Component<{ rating: number }> = (props) => {
    return (
        <div class="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={index < props.rating ? 'black' : 'none'}
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
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
        // Основной контейнер карточки: убраны тени, добавлена тонкая рамка.
        <div class="bg-white rounded-3xl border border-gray-300 p-6 flex flex-col gap-4 h-full">

            {/* Верхняя часть: аватар и звезды */}
            <div class="flex items-center gap-3">
                {/* Простой черный круг вместо сложного аватара */}
                <div class="w-10 h-10 bg-black rounded-full flex-shrink-0"></div>
                <StarRating rating={props.rating} />
            </div>

            {/* Основная часть: цитата и автор */}
            <div class="flex flex-col flex-grow justify-start mt-2">
                <blockquote class="text-gray-800 text-base leading-relaxed">
                    "{props.quote}"
                </blockquote>
                <p class="mt-4 text-sm text-gray-600">{props.author}</p>
            </div>
        </div>
    );
};