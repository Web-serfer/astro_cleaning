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
        <section class="section section-gap bg-white">
            <div class="container mx-auto px-4">
                <div class="flex flex-col md:flex-row md:space-x-12">
                    <div class="md:w-1/3 mb-8 md:mb-0">
                        <div class="max-w-3xl">
                            <div class="flex justify-between items-center my-2">
                                <div class="flex items-center">
                                    <div class="w-4 h-4 bg-[#D9D9D9] mr-2"></div>
                                    <p class="text-sm font-bold uppercase tracking-wider text-zinc-500">
                                        FAQ
                                    </p>
                                </div>
                            </div>
                            <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 mb-8 text-center md:text-left">
                                Frequently asked questions
                            </h2>
                        </div>
                    </div>

                    <div class="md:w-2/3 h-[480px] overflow-y-auto pr-2">
                        <div class="space-y-4">
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