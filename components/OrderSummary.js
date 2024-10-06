'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderSummary = ({ orderDetails }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      const payments = window.Square.payments(process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID, process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID);
      const card = payments.card();
      card.attach('#card-container');
      document.getElementById('card-button').addEventListener('click', async (event) => {
        event.preventDefault();
        const result = await card.tokenize();
        if (result.status === 'OK') {
          handlePayment(result.token);
        } else {
          console.error('Tokenization failed');
        }
      });
    }
  }, [isLoaded]);

  const handlePayment = async (token) => {
    try {
      const response = await axios.post('/api/processPayment', {
        sourceId: token,
        amount: orderDetails.totalCost * 100, // Square expects amount in cents
      });
      if (response.data.success) {
        alert('Payment successful!');
      } else {
        alert('Payment failed.');
      }
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Order Summary</h1>
        <div className="bg-white p-6 rounded shadow-md space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Summary</h2>
            <div className="space-y-2">
              <p><strong>Buyer Name:</strong> {orderDetails.buyerName}</p>
              <p><strong>Buyer Email:</strong> {orderDetails.buyerEmail}</p>
              <p><strong>Buyer Phone:</strong> {orderDetails.buyerPhone}</p>
              <p><strong>Pick-Up Address:</strong> {orderDetails.pickupAddress}</p>
              <p><strong>Delivery Address:</strong> {orderDetails.deliveryAddress}</p>
              <p><strong>Item Description:</strong> {orderDetails.itemDescription}</p>
              <p><strong>Item Price:</strong> ${orderDetails.itemPrice}</p>
              <p><strong>Distance:</strong> {orderDetails.distance} miles</p>
              <p><strong>Rate per Mile:</strong> $1.50</p>
              <p><strong>Total Cost:</strong> ${orderDetails.totalCost}</p>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold">Payment</h2>
              <div className="space-y-4">
                <div id="card-container"></div>
                <button id="card-button" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">
                  Pay ${orderDetails.totalCost}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
