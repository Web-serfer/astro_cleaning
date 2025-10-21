import { createSignal, For, onMount, onCleanup } from 'solid-js';
import { TestimonialCard, type Testimonial } from './TestimonialCard';

const testimonialsData: Testimonial[] = [
    {
        quote: "Definitely one of the best burgers in town! The quality and taste are exceptional.",
        author: "Jack Smith",
        rating: 5,
    },
    {
        quote: "The cleaning service was impeccable. My apartment has never been this clean and fresh.",
        author: "Sarah Johnson",
        rating: 5,
    },
    {
        quote: "Professional, punctual, and thorough. Highly recommended for any office space cleaning.",
        author: "Michael Chen",
        rating: 5,
    },
    {
        quote: "A fantastic experience from booking to the final result. Worth every penny spent.",
        author: "Emily Rodriguez",
        rating: 5,
    },
    {
        quote: "They managed to remove a stain I thought was permanent. True cleaning magic!",
        author: "David Lee",
        rating: 4,
    },
    {
        quote: "The team was friendly and efficient. I'm very happy with the results.",
        author: "Jessica Williams",
        rating: 5,
    }
];

export default function Testimonials() {
    const [isPaused, setIsPaused] = createSignal(false);
    const [isVisible, setIsVisible] = createSignal(false);
    let sliderRef: HTMLDivElement | undefined;

    // Дублируем массив для создания бесшовного цикла анимации
    const scrollingTestimonials = () => [...testimonialsData, ...testimonialsData];

    // Рассчитываем продолжительность анимации в зависимости от количества карточек
    // Это делает скорость прокрутки постоянной, независимо от количества отзывов
    const animationDuration = () => `${testimonialsData.length * 5}s`;

    // Intersection Observer для запуска анимации только когда секция видна
    onMount(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Запускаем анимацию, когда 10% секции видно
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (sliderRef) {
            observer.observe(sliderRef);
        }

        onCleanup(() => {
            if (sliderRef) observer.unobserve(sliderRef);
        });
    });

    return (
        <section
            class="py-20 sm:py-28 bg-gradient-to-br from-gray-50 to-white font-sans relative"
            ref={sliderRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Декоративные элементы */}
            <div class="absolute top-10 left-10 w-20 h-20 bg-yellow-100 rounded-full opacity-60 blur-xl"></div>
            <div class="absolute bottom-10 right-10 w-16 h-16 bg-blue-100 rounded-full opacity-40 blur-lg"></div>

            <div class="container mx-auto px-4 relative z-10">
                {/* Заголовок секции (без изменений) */}
                <div class="mb-16 text-center">
                    <div class="flex items-center justify-center gap-2 mb-3">
                        <span class="w-3 h-3 bg-yellow-400 rounded-full"></span>
                        <p class="text-sm font-bold uppercase tracking-wider text-gray-600">
                            WHAT OUR CLIENTS SAY
                        </p>
                    </div>
                    <h2 class="text-4xl sm:text-6xl font-bold text-gray-900 mb-4">
                        Customer Reviews
                    </h2>
                    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover why thousands of customers trust our services
                    </p>
                </div>

                {/* Контейнер слайдера */}
                <div class="relative group">
                    {/* Градиентные overlay для плавного исчезновения по краям */}
                    <div class="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
                    <div class="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

                    {/* Обертка для скрытия лишних карточек */}
                    <div class="overflow-hidden">
                        {/* "Трек" слайдера, который анимируется с помощью CSS */}
                        <div
                            class="flex gap-6"
                            classList={{
                                'animate-scroll': isVisible(),
                                'paused': isPaused()
                            }}
                            style={{ '--scroll-duration': animationDuration() }}
                        >
                            <For each={scrollingTestimonials()}>
                                {(testimonial) => (
                                    <div class="flex-shrink-0 w-[90vw] sm:w-[45vw] md:w-[40vw] lg:w-1/3 p-2">
                                        <TestimonialCard {...testimonial} />
                                    </div>
                                )}
                            </For>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}