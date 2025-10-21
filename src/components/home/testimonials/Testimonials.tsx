import { createSignal, For, onMount, onCleanup } from 'solid-js';
import { TestimonialCard, type Testimonial } from './TestimonialCard';

const testimonialsData: Testimonial[] = [
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
            class="section-how-it-works font-sans py-2xl" 
            style="background-color: var(--bg-features);"
            ref={sliderRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div class="container-sm">
                {/* Заголовок секции */}
                <div class="mb-4 text-center">
                    <div class="flex items-center justify-center gap-2 mb-md">
                        <span class="w-3 h-3 bg-yellow-400 rounded-full"></span>
                        <p class="text-sm font-bold uppercase tracking-wider text-gray-600">
                            WHAT OUR CLIENTS SAY
                        </p>
                    </div>
                    <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-md">
                        Customer Reviews
                    </h2>
                    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover why thousands of customers trust our services
                    </p>
                </div>

                {/* Контейнер слайдера */}
                <div class="relative group">
                    {/* Градиентные overlay для плавного исчезновения по краям */}
                    <div class="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-[var(--bg-how-it-works)] to-transparent z-10 pointer-events-none"></div>
                    <div class="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-[var(--bg-how-it-works)] to-transparent z-10 pointer-events-none"></div>

                    {/* Обертка для скрытия лишних карточек */}
                    <div class="overflow-hidden rounded-3xl p-8" style="background-color: var(--bg-how-it-works);">
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