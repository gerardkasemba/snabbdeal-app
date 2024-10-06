import React from 'react';

const Modal = ({ show, onClose, delivery }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg relative mx-4 my-8">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h2 className="text-2xl font-semibold mb-4">Delivery Details</h2>
        {delivery && (
          <div>
            <p><strong>ID:</strong> {delivery.id}</p>
            <p><strong>Date:</strong> {delivery.date}</p>
            <p><strong>Time:</strong> {delivery.time}</p>
            <p><strong>Location:</strong> {delivery.location}</p>
            <p><strong>Distance:</strong> {delivery.distance}</p>
            <p><strong>Amount:</strong> {delivery.amount}</p>
            <p><strong>Status:</strong> {delivery.status}</p>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Buyer Information</h3>
              <p><strong>Name:</strong> {delivery.buyer.name}</p>
              <p><strong>Contact:</strong> {delivery.buyer.contact}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Seller Information</h3>
              <p><strong>Name:</strong> {delivery.seller.name}</p>
              <p><strong>Contact:</strong> {delivery.seller.contact}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Delivery Information</h3>
              <p><strong>Address:</strong> {delivery.delivery.address}</p>
              <p><strong>Notes:</strong> {delivery.delivery.notes}</p>
            </div>
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-4 py-2 px-4 bg-primary text-white rounded hover:bg-dark"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
