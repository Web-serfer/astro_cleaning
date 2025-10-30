import type { Component } from 'solid-js';
import { Show } from 'solid-js';

// Интерфейс для пропсов компонента FaqItem
interface FaqItemProps {
    question: string;        // Вопрос
    answer: string;          // Ответ
    isOpen: boolean;         // Состояние открытия/закрытия
    onClick: () => void;     // Обработчик клика
}

// Компонент элемента FAQ
const FaqItem: Component<FaqItemProps> = (props) => {
    return (
        <div class="w-full shadow-sm border border-gray-100 rounded-[48px] overflow-hidden">
            {/* Блок заголовка вопроса */}
            <div
                class="flex justify-between items-center p-6 h-[95px] cursor-pointer bg-[#F1F0F9] overflow-hidden"
                onClick={props.onClick}
            >
                {/* Текст вопроса */}
                <p class="text-base font-medium text-gray-800 pr-4 flex-1 overflow-hidden text-ellipsis">
                    {props.question}
                </p>
                {/* Кнопка переключения (плюс/минус) */}
                <button class="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex justify-center items-center hover:bg-gray-800 hover:cursor-pointer">
                    {/* Отображение иконки в зависимости от состояния (плюс при закрытии, минус при открытии) */}
                    <Show
                        when={props.isOpen}
                        fallback={
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                            </svg>
                        }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
                        </svg>
                    </Show>
                </button>
            </div>

            {/* Контейнер для ответа с анимацией открытия/закрытия */}
            <div
                class="grid transition-[grid-template-rows] duration-300 ease-in-out bg-white"
                classList={{
                    'grid-rows-[1fr]': props.isOpen,      // При открытии показывает содержимое
                    'grid-rows-[0fr]': !props.isOpen,     // При закрытии скрывает содержимое
                }}
            >
                <div class="overflow-hidden">
                    {/* Блок с текстом ответа */}
                    <div class="p-6 text-sm text-gray-700 leading-relaxed border-t border-gray-200/80">
                        <p class="relative pl-4 before:content-['•'] before:absolute before:left-0 before:top-0 before:text-gray-500">
                            {props.answer}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqItem;