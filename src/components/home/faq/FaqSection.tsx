import type { Component } from 'solid-js';
import { createSignal, For } from 'solid-js';
import FaqItem from './FaqItem';
import { faqData } from './faqData';

const FaqSection: Component = () => {
    const [openIndex, setOpenIndex] = createSignal<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(prevIndex => (prevIndex === index ? null : index));
    };

    return (
        <section class="section section-gap h-[700px]" style="margin-bottom: 200px;">
            <div class="container mx-auto px-4 h-full">
                <div class="flex flex-col md:flex-row md:space-x-12 h-full">
                    <div class="md:w-1/3 mb-8 md:mb-0">
                        <div class="max-w-3xl">
                            <div class="flex justify-between items-center my-2">
                                <div class="flex items-center">
                                    <div class="w-4 h-4 bg-[#D9D9D9] mr-2"></div>
                                    <p class="text-sm uppercase tracking-wider text-zinc-500">
                                        FAQ
                                    </p>
                                </div>
                            </div>
                            <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold text-zinc-900 mb-8 text-center md:text-left">
                                Frequently asked questions
                            </h2>
                        </div>
                    </div>

                    <div class="md:w-2/3 h-full overflow-y-auto">
                        <div class="space-y-4 h-full">
                            <For each={faqData}>
                                {(item, index) => (
                                    <FaqItem
                                        question={item.question}
                                        answer={item.answer}
                                        isOpen={openIndex() === index()}
                                        onClick={() => handleToggle(index())}
                                    />
                                )}
                            </For>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FaqSection;