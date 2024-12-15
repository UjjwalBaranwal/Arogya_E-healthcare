import ReactDOM from "react-dom";
import { useOutSideClick } from "../hook/useOutside";

function Modal({ children, handleClose }) {
  const ref = useOutSideClick(handleClose);
  return ReactDOM.createPortal(
    <div>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Modal Box */}
      <div className="fixed inset-0 flex items-center justify-center p-4 ">
        <div
          className="relative bg-white rounded-lg shadow-lg p-6 max-w-lg w-full text-center  "
          ref={ref}
        >
          {/* Close Button */}
          <button
            onClick={() => handleClose()}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-4xl"
          >
            &times;
          </button>

          {/* Modal Content */}
          <div className="flex flex-col justify-center">{children}</div>
        </div>
      </div>
    </div>,
    document.querySelector("#modal-container")
  );
}

export default Modal;
