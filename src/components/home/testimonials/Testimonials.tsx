// src/components/testimonials/Testimonials.tsx
import { createSignal, For } from 'solid-js';
import { TestimonialCard, type Testimonial } from './TestimonialCard';

// Демонстрационные данные
const testimonialsData: Testimonial[] = [
    {
        quote: "Definitely one of the best burgers in town!",
        author: "Jack Smith",
        rating: 5,
    },
    {
        quote: "The cleaning service was impeccable. My apartment has never been this clean.",
        author: "Sarah Johnson",
        rating: 5,
    },
    {
        quote: "Professional, punctual, and thorough. Highly recommended for any office space.",
        author: "Michael Chen",
        rating: 5,
    },
    {
        quote: "A fantastic experience from booking to the final result. Worth every penny.",
        author: "Emily Rodriguez",
        rating: 5,
    },
    {
        quote: "They managed to remove a stain I thought was permanent. True magic!",
        author: "David Lee",
        rating: 4,
    },
];


export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = createSignal(0);

    // Функция для перехода к определенному слайду (для навигационных точек)
    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section class="py-16 sm:py-24 bg-white font-sans">
            <div class="container mx-auto px-4">
                {/* Заголовок секции */}
                <div class="mb-12">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="w-3 h-3 bg-gray-200"></span>
                        <p class="text-sm font-bold uppercase tracking-wider text-gray-500">
                            REVIEWS
                        </p>
                    </div>
                    <h2 class="text-4xl sm:text-5xl font-bold text-gray-900">
                        Testimonials
                    </h2>
                </div>

                {/* Контейнер слайдера */}
                <div class="relative">
                    {/* Обертка для скрытия лишних карточек */}
                    <div class="overflow-hidden">
                        {/* "Трек" слайдера, который будет двигаться */}
                        <div
                            class="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex() * 100 / testimonialsData.length}%)` }}
                        >
                            <For each={testimonialsData}>
                                {(testimonial) => (
                                    <div class="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-3">
                                        <TestimonialCard {...testimonial} />
                                    </div>
                                )}
                            </For>
                        </div>
                    </div>
                </div>

                {/* Навигационные точки */}
                <div class="flex justify-center gap-2 mt-8">
                    <For each={testimonialsData}>
                        {(_, index) => (
                            <button
                                onClick={() => goToSlide(index())}
                                aria-label={`Go to slide ${index() + 1}`}
                                class={`w-3 h-3 rounded-full transition-colors ${
                                    currentIndex() === index() ? 'bg-black' : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            ></button>
                        )}
                    </For>
                </div>
            </div>
        </section>
    );
}