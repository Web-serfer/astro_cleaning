import type { Component } from 'solid-js';

const StarRating: Component<{ rating: number }> = (props) => {
    return (
        <div class="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill={index < props.rating ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class={index < props.rating ? 'text-yellow-400' : 'text-gray-300'}
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
        <div class="border border-gray-200 rounded-3xl p-8 flex flex-col gap-6 bg-white h-full shadow-sm hover:shadow-lg transition-all duration-500 group">
            {/* Заголовок с аватаром и рейтингом */}
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    {/* Аватар с градиентом */}
                    <div class="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex-shrink-0 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-500">
                        <span class="text-white font-bold text-lg">
                            {props.author.split(' ').map(n => n[0]).join('')}
                        </span>
                    </div>
                    <div>
                        <p class="font-semibold text-gray-900">{props.author}</p>
                        <StarRating rating={props.rating} />
                    </div>
                </div>

                {/* Иконка цитаты */}
                <div class="text-gray-200 group-hover:text-yellow-200 transition-colors duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                    </svg>
                </div>
            </div>

            {/* Текст отзыва */}
            <blockquote class="text-gray-700 text-lg leading-relaxed flex-grow">
                "{props.quote}"
            </blockquote>

            {/* Футер */}
            <div class="pt-4 border-t border-gray-100">
                <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-500">Verified Customer</span>
                    <div class="flex items-center gap-1 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>2 days ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
};