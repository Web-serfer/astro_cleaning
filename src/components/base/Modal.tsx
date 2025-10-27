import { createSignal, createEffect, type Component } from 'solid-js';
import type { JSX } from 'solid-js';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ValidationErrors {
    name?: string;
    email?: string;
    phone?: string;
    service?: string;
    date?: string;
    time?: string;
    message?: string;
}

const BookingModal: Component<BookingModalProps> = (props) => {
    const [isModalRendered, setIsModalRendered] = createSignal(false);
    const [isContentVisible, setIsContentVisible] = createSignal(false);
    const [isSelectOpen, setIsSelectOpen] = createSignal(false);
    const [isSubmitting, setIsSubmitting] = createSignal(false);
    const [errors, setErrors] = createSignal<ValidationErrors>({});
    const [touched, setTouched] = createSignal<Set<string>>(new Set());

    let modalContentRef: HTMLDivElement | undefined;
    let selectRef: HTMLSelectElement | undefined;
    let honeypotRef: HTMLInputElement | undefined;

    // Валидация имени
    const validateName = (name: string): string | undefined => {
        if (!name.trim()) return 'Name is required';
        if (name.length < 2) return 'Name must be at least 2 characters';
        if (name.length > 30) return 'Name must not exceed 30 characters';
        if (!/^[a-zA-Z\s\-']+$/u.test(name)) return 'Name can only contain letters, spaces, and hyphens';
        return undefined;
    };

    // Валидация email
    const validateEmail = (email: string): string | undefined => {
        if (!email.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return 'Please enter a valid email address';
        return undefined;
    };

    // Валидация телефона
    const validatePhone = (phone: string): string | undefined => {
        if (!phone.trim()) return 'Phone number is required';
        const digitsOnly = phone.replace(/[^\d+]/g, '');
        const digitCount = digitsOnly.replace(/[^\d]/g, '').length;
        if (digitCount < 10) return 'Phone number must contain at least 10 digits';
        if (!/^[\d\s+\-()]+$/.test(phone)) return 'Phone number can only contain digits, spaces, +, -, ()';
        return undefined;
    };

    // Валидация даты
    const validateDate = (date: string): string | undefined => {
        if (!date) return 'Date is required';
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) return 'Date cannot be in the past';
        return undefined;
    };

    // Валидация времени
    const validateTime = (time: string): string | undefined => {
        if (!time) return 'Time is required';
        const [hours] = time.split(':').map(Number);
        if (hours < 8 || hours > 20) return 'Time must be between 8:00 AM and 8:00 PM';
        return undefined;
    };

    // Валидация сообщения
    const validateMessage = (message: string): string | undefined => {
        if (message.length > 500) return 'Message must not exceed 500 characters';
        return undefined;
    };

    // Санитизация ввода
    const sanitizeInput = (value: string, field: string): string => {
        let sanitized = value;
        switch (field) {
            case 'name':
                sanitized = value.replace(/[^a-zA-Z\s\-']/gu, '');
                break;
            case 'phone':
                sanitized = value.replace(/[^\d\s+\-()]/g, '');
                break;
            case 'message':
                sanitized = value
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .substring(0, 500);
                break;
            case 'email':
                break;
        }
        return sanitized;
    };

    // Валидация всей формы
    const validateForm = (formData: FormData): ValidationErrors => {
        const newErrors: ValidationErrors = {};
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const service = formData.get('service') as string;
        const date = formData.get('date') as string;
        const time = formData.get('time') as string;
        const message = formData.get('message') as string;
        const website = formData.get('website') as string;

        if (website && website.trim() !== '') {
            newErrors.name = 'Suspicious activity detected';
            return newErrors;
        }

        const nameError = validateName(name);
        if (nameError) newErrors.name = nameError;
        const emailError = validateEmail(email);
        if (emailError) newErrors.email = emailError;
        const phoneError = validatePhone(phone);
        if (phoneError) newErrors.phone = phoneError;
        if (!service) newErrors.service = 'Please select a service type';
        const dateError = validateDate(date);
        if (dateError) newErrors.date = dateError;
        const timeError = validateTime(time);
        if (timeError) newErrors.time = timeError;
        const messageError = validateMessage(message);
        if (messageError) newErrors.message = messageError;

        return newErrors;
    };

    // Проверка валидности формы (без изменений)
    const isFormValid = () => {
        const formData = new FormData(document.getElementById('booking-form') as HTMLFormElement);
        const currentErrors = validateForm(formData);
        // Проверяем, есть ли ошибки для полей, которые были "тронуты"
        for (const key of Object.keys(currentErrors)) {
            if (!touched().has(key)) {
                // Если поле не тронуто, его ошибка не мешает сабмиту на начальном этапе
            }
        }
        // Форма валидна для сабмита, если нет ошибок
        return Object.keys(validateForm(formData)).length === 0;
    };

    // Обработчик изменения поля
    const handleInput = (e: Event, field: string) => {
        const target = e.target as HTMLInputElement | HTMLTextAreaElement;
        const sanitizedValue = sanitizeInput(target.value, field);
        if (sanitizedValue !== target.value) {
            target.value = sanitizedValue;
        }
        if (touched().has(field)) {
            validateField(field, sanitizedValue);
        }
    };

    // Валидация отдельного поля
    const validateField = (field: string, value: string) => {
        setErrors(prev => {
            const newErrors = { ...prev };
            let error: string | undefined;
            switch (field) {
                case 'name': error = validateName(value); break;
                case 'email': error = validateEmail(value); break;
                case 'phone': error = validatePhone(value); break;
                case 'date': error = validateDate(value); break;
                case 'time': error = validateTime(value); break;
                case 'message': error = validateMessage(value); break;
            }
            if (error) {
                newErrors[field as keyof ValidationErrors] = error;
            } else {
                delete newErrors[field as keyof ValidationErrors];
            }
            return newErrors;
        });
    };

    // Обработчик потери фокуса
    const handleBlur = (e: Event, field: string) => {
        const target = e.target as HTMLInputElement | HTMLTextAreaElement;
        setTouched(prev => new Set<string>(prev).add(field));
        validateField(field, target.value);
    };

    // --- КЛЮЧЕВОЕ ИЗМЕНЕНИЕ ЗДЕСЬ ---
    createEffect(() => {
        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') props.onClose();
        };

        if (props.isOpen) {
            setIsModalRendered(true);
            setTimeout(() => setIsContentVisible(true), 20);

            // Просто отключаем прокрутку. Расчеты и padding больше не нужны.
            document.body.style.overflow = 'hidden';

            document.addEventListener('keydown', handleEscapeKey);
        } else {
            setIsContentVisible(false);
            setTimeout(() => {
                setIsModalRendered(false);

                // Просто включаем прокрутку обратно.
                document.body.style.overflow = '';

                setErrors({});
                setTouched(new Set<string>());
                setIsSubmitting(false);
            }, 300);
            document.removeEventListener('keydown', handleEscapeKey);
        }
    });

    const handleClickOutside = (e: MouseEvent) => {
        if (modalContentRef && !modalContentRef.contains(e.target as Node)) {
            props.onClose();
        }
    };

    const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (e) => {
        e.preventDefault();
        if (isSubmitting()) return;

        const formData = new FormData(e.currentTarget);
        // "Трогаем" все поля перед валидацией, чтобы показать все ошибки
        const allFields = ['name', 'email', 'phone', 'service', 'date', 'time'];
        setTouched(new Set<string>(allFields));

        const validationErrors = validateForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const data = Object.fromEntries(formData);
                console.log('Form data:', data);
                alert('Your request has been submitted successfully!');
                props.onClose();
            } catch (error) {
                console.error('Submission error:', error);
                alert('An error occurred while submitting. Please try again.');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    // Обработчики для селекта (без изменений)
    const handleSelectClick = () => setIsSelectOpen(!isSelectOpen());
    const handleSelectChange = () => {
        setIsSelectOpen(false);
        if (selectRef) {
            selectRef.blur();
            // Валидация при изменении
            handleBlur({ target: selectRef } as any, 'service');
        }
    };
    const handleSelectBlur = () => {
        setTimeout(() => setIsSelectOpen(false), 150);
        handleBlur({ target: selectRef } as any, 'service');
    };
    const handleArrowClick = () => {
        if (selectRef) {
            selectRef.focus();
            setIsSelectOpen(!isSelectOpen());
        }
    };

    // Условие для отключения кнопки (без изменений)
    const isSubmitDisabled = () => {
        if (isSubmitting()) return true;
        // Кнопка отключена, если есть ошибки в "тронутых" полях
        const currentErrors = errors();
        const touchedFields = touched();
        for (const field of touchedFields) {
            if (currentErrors[field as keyof ValidationErrors]) {
                return true;
            }
        }
        return false;
    };

    return (
        <>
            {isModalRendered() && (
                <div
                    class={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-opacity duration-300 ${
                        isContentVisible() ? 'bg-white/30 backdrop-blur-sm' : 'bg-white/0 backdrop-blur-none'
                    }`}
                    onClick={handleClickOutside}
                >
                    <div
                        ref={modalContentRef}
                        class={`relative w-full max-w-md bg-white/80 backdrop-blur-xl rounded-xl shadow-xl overflow-hidden border border-white/20 transform transition-all duration-300 ease-out ${
                            isContentVisible() ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div class="p-6 border-b border-gray-200 flex justify-between items-center">
                            <p class="text-xl font-bold text-gray-800">Book a Cleaning Service</p>
                            <button
                                type="button"
                                class="p-1 rounded-full text-gray-700 hover:text-gray-700 border border-gray-300 hover:border-gray-500 transition-all duration-300 cursor-pointer"
                                onClick={props.onClose}
                                aria-label="Close modal"
                            >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <form id="booking-form" class="p-6" onSubmit={handleSubmit} novalidate>
                            <div class="space-y-4">
                                <div class="hidden">
                                    <label for="website" class="sr-only">Website</label>
                                    <input ref={honeypotRef} type="text" id="website" name="website" tabindex="-1" autocomplete="off" />
                                </div>
                                <div>
                                    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                    <input type="text" id="name" name="name" class={`w-full px-4 py-2 border rounded-lg focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-colors duration-300 placeholder:text-gray-400 ${ errors().name ? 'border-red-500' : 'border-gray-300' }`} placeholder="Enter your name" required onInput={(e) => handleInput(e, 'name')} onBlur={(e) => handleBlur(e, 'name')} />
                                    {errors().name && <p class="mt-1 text-sm text-red-600">{errors().name}</p>}
                                </div>
                                <div>
                                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input type="email" id="email" name="email" class={`w-full px-4 py-2 border rounded-lg focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-colors duration-300 placeholder:text-gray-400 ${ errors().email ? 'border-red-500' : 'border-gray-300' }`} placeholder="Enter your email" required onInput={(e) => handleInput(e, 'email')} onBlur={(e) => handleBlur(e, 'email')} />
                                    {errors().email && <p class="mt-1 text-sm text-red-600">{errors().email}</p>}
                                </div>
                                <div>
                                    <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input type="tel" id="phone" name="phone" class={`w-full px-4 py-2 border rounded-lg focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-colors duration-300 placeholder:text-gray-400 ${ errors().phone ? 'border-red-500' : 'border-gray-300' }`} placeholder="Enter your phone number" required onInput={(e) => handleInput(e, 'phone')} onBlur={(e) => handleBlur(e, 'phone')} />
                                    {errors().phone && <p class="mt-1 text-sm text-red-600">{errors().phone}</p>}
                                </div>
                                <div>
                                    <label for="service" class="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                                    <div class="relative">
                                        <select ref={selectRef} id="service" name="service" class={`w-full pl-4 pr-10 py-2 border rounded-lg focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-colors duration-300 appearance-none cursor-pointer ${ errors().service ? 'border-red-500' : 'border-gray-300' }`} required onClick={handleSelectClick} onChange={handleSelectChange} onBlur={handleSelectBlur}>
                                            <option value="">Select a service</option>
                                            <option value="regular">Regular Cleaning</option>
                                            <option value="deep">Deep Cleaning</option>
                                            <option value="move">Move-Out/Move-In</option>
                                            <option value="post">Post-Construction</option>
                                        </select>
                                        <div class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 transition-transform duration-300 cursor-pointer" classList={{ 'rotate-180': isSelectOpen() }} onClick={handleArrowClick}>
                                            <svg class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                    </div>
                                    {errors().service && <p class="mt-1 text-sm text-red-600">{errors().service}</p>}
                                </div>
                                <div>
                                    <label for="date" class="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                                    <input type="date" id="date" name="date" class={`w-full px-4 py-2 border rounded-lg focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-colors duration-300 ${ errors().date ? 'border-red-500' : 'border-gray-300' }`} required onInput={(e) => handleInput(e, 'date')} onBlur={(e) => handleBlur(e, 'date')} />
                                    {errors().date && <p class="mt-1 text-sm text-red-600">{errors().date}</p>}
                                </div>
                                <div>
                                    <label for="time" class="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                                    <input type="time" id="time" name="time" min="08:00" max="20:00" class={`w-full px-4 py-2 border rounded-lg focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-colors duration-300 ${ errors().time ? 'border-red-500' : 'border-gray-300' }`} required onInput={(e) => handleInput(e, 'time')} onBlur={(e) => handleBlur(e, 'time')} />
                                    {errors().time && <p class="mt-1 text-sm text-red-600">{errors().time}</p>}
                                </div>
                                <div>
                                    <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                                    <textarea id="message" name="message" rows="2" class={`w-full px-4 py-2 border rounded-lg focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-colors duration-300 placeholder:text-gray-400 ${ errors().message ? 'border-red-500' : 'border-gray-300' }`} placeholder="Any specific requirements?" onInput={(e) => handleInput(e, 'message')} onBlur={(e) => handleBlur(e, 'message')}></textarea>
                                    {errors().message && <p class="mt-1 text-sm text-red-600">{errors().message}</p>}
                                </div>
                            </div>
                            <div class="mt-6">
                                <button type="submit" disabled={isSubmitting()} class={`w-full font-medium text-white px-6 py-3 rounded-full transition-all duration-300 overflow-hidden cursor-pointer ${ isSubmitting() ? 'bg-gray-400 cursor-not-allowed' : 'bg-[var(--primary)] hover:bg-[var(--primary-hover)] hover:-translate-y-1' }`}>
                                    {isSubmitting() ? 'Submitting...' : 'Submit Request'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default BookingModal;