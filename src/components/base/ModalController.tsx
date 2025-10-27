import { createSignal, type Component, type JSX } from 'solid-js';
import BookingModal from './Modal';

interface ModalControllerProps {
    children: JSX.Element;
}

const ModalController: Component<ModalControllerProps> = (props) => {
    const [isModalOpen, setIsModalOpen] = createSignal(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <div onClick={openModal}>
                {props.children}
            </div>
            <BookingModal isOpen={isModalOpen()} onClose={closeModal} />
        </>
    );
};

export default ModalController;