import type { Component } from 'solid-js';
import { Show } from 'solid-js';

interface FaqItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const FaqItem: Component<FaqItemProps> = (props) => {
    return (
        <div class="w-full shadow-sm border border-gray-100 rounded-xl overflow-hidden">
            <div
                class="flex justify-between items-start p-4 md:p-5 cursor-pointer bg-violet-50"
                onClick={props.onClick}
            >
                <p class="text-base font-medium text-gray-800 pr-4">
                    {props.question}
                </p>
                <button class="flex-shrink-0 w-7 h-7 bg-black text-white rounded-full flex justify-center items-center hover:bg-gray-800 hover:cursor-pointer">
                    <Show
                        when={props.isOpen}
                        fallback={
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                            </svg>
                        }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
                        </svg>
                    </Show>
                </button>
            </div>

            <div
                class="grid transition-[grid-template-rows] duration-300 ease-in-out bg-white"
                classList={{
                    'grid-rows-[1fr]': props.isOpen,
                    'grid-rows-[0fr]': !props.isOpen,
                }}
            >
                <div class="overflow-hidden">
                    <div class="px-5 pb-5 pt-3 text-sm text-gray-700 leading-relaxed border-t border-gray-200/80">
                        <ul class="list-none">
                            <li class="pl-4 relative before:content-['•'] before:absolute before:left-0 before:top-0 before:text-gray-500">
                                {props.answer}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqItem;