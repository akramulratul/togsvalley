// PaymentSuccessModal.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import accepted from "../../assets/accepted.png";

const PaymentSuccessModal = ({ onClose }) => (
  <dialog open className="modal">
    <div className="modal-box py-20 flex flex-col items-center">
      <img src={accepted} className="w-36" alt="" />
      <p className="py-4 text-xl">Your payment has been completed!</p>
      <div className="modal-action">
        <button
          onClick={onClose}
          className="btn btn-primary text-white font-normal"
        >
          Back to home
        </button>
      </div>
    </div>
  </dialog>
);

export default PaymentSuccessModal;
