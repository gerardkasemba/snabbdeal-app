"use client"
import Image from 'next/image';
import { useState } from 'react';
import NavBar from '../../components/NavBar2';
import Footer from '../../components/Footer';

const AboutUs = () => {

  return (
    <div className="text-black">
      <NavBar />
      <div className="min-h-screen px-12 pt-24 bg-white">
      <h1 className="text-4xl font-bold text-center text-[#024BBE] mb-8">Terms and Conditions</h1>
      <p className="mb-12 text-center text-gray-600">Last Updated: [09/27/2024]</p>

      {/* Introduction */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#024BBE] mb-4">1. Introduction</h2>
        <p className="text-gray-700">
          Welcome to SnabbDeal! By accessing or using our services, you agree to comply with and be bound by these terms and conditions. Please read these terms carefully before using our platform.
        </p>
      </section>

      {/* Service Description */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#024BBE] mb-4">2. Services Provided</h2>
        <p className="text-gray-700">
          SnabbDeal offers a convenient pickup and delivery service for items purchased through third-party platforms like OfferUp, Craigslist, and Facebook Marketplace. We facilitate the logistics of delivering these items between buyers and sellers.
        </p>
      </section>

      {/* User Responsibilities */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#024BBE] mb-4">3. User Responsibilities</h2>
        <ul className="pl-6 space-y-2 text-gray-700 list-disc">
          <li>Users must provide accurate contact and delivery information to ensure the successful pickup and delivery of items.</li>
          <li>Users are responsible for ensuring that the item is ready for pickup at the agreed time.</li>
          <li>SnabbDeal is not responsible for any disputes that arise between buyers and sellers regarding the condition or authenticity of the items.</li>
        </ul>
      </section>

      {/* Payment and Fees */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#024BBE] mb-4">4. Payment and Fees</h2>
        <p className="text-gray-700">
          All payments for services must be completed through the payment options provided on the SnabbDeal platform. Service fees are based on the distance and size of the item being delivered. You agree to pay any applicable service fees at the time of booking.
        </p>
      </section>

      {/* Delivery Process */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#024BBE] mb-4">5. Delivery Process</h2>
        <p className="text-gray-700">
          SnabbDeal ensures timely and secure delivery of items. However, delivery times may vary due to unforeseen circumstances. We will keep you informed of any delays.
        </p>
        <p className="text-gray-700">
          Upon delivery, it is the recipient&apos;s responsibility to inspect the item. Once the delivery is complete and accepted, SnabbDeal is not responsible for any damage or missing parts.
        </p>
      </section>

      {/* Cancellations and Refunds */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#024BBE] mb-4">6. Cancellations and Refunds</h2>
        <p className="text-gray-700">
          Cancellations can be made up to 24 hours before the scheduled pickup. Any cancellations made less than 24 hours in advance may result in a cancellation fee. Refunds are issued at SnabbDeal&apos;s discretion based on the circumstances of the cancellation.
        </p>
      </section>

      {/* Limitation of Liability */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#024BBE] mb-4">7. Limitation of Liability</h2>
        <p className="text-gray-700">
          SnabbDeal is not liable for any damages or losses that occur during the use of our services, except where such liability cannot be excluded by law. Our maximum liability to you for any claims arising out of our service is limited to the total amount paid for the delivery service in question.
        </p>
      </section>

      {/* Changes to Terms */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#024BBE] mb-4">8. Changes to Terms</h2>
        <p className="text-gray-700">
          SnabbDeal reserves the right to modify these terms and conditions at any time. Any changes will be effective immediately upon posting on our website. It is your responsibility to review these terms regularly.
        </p>
      </section>

      {/* Governing Law */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#024BBE] mb-4">9. Governing Law</h2>
        <p className="text-gray-700">
          These terms and conditions are governed by the laws of the state of Massachusetts, and you agree to submit to the exclusive jurisdiction of its courts.
        </p>
      </section>

      {/* Contact Us */}
      <section>
        <h2 className="text-2xl font-semibold text-[#024BBE] mb-4">10. Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions about these terms, please contact us at <a href="mailto:support@snabbdeal.com" className="text-[#024BBE] underline">support@snabbdeal.com</a>.
        </p>
      </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
