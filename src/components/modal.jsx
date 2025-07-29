import { createPortal } from "react-dom";

const ModalJsx = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                onClick={(e) => {
                    e?.stopPropagation();
                    onClose?.();
                }}
                className="absolute inset-0 bg-black/50"
            />
            <div
                onClick={(e) => {
                    e?.stopPropagation();
                }}
                className="relative z-50 max-w-[98vh]"
            >
                {children}
            </div>
        </div>
    );
};

const Modal = ({ children, isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }
    if (!document?.getElementById("modal-root")) {
        return null;
    }
    const id = (document.getElementById("modal-root")?.childNodes?.length || 0) + 1;
    return createPortal(<ModalJsx onClose={onClose}>{children}</ModalJsx>, document.getElementById("modal-root"), id);
};

export default Modal;
