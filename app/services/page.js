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
      {/* Header Section */}
      <div className="container px-4 mx-auto text-center">
        <h1 className="text-4xl font-bold text-[#024BBE] mb-4">Our Services</h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600">
          At SnabbDeal, we provide a range of services designed to make buying and selling second-hand items more convenient than ever. From secure pickups to fast and reliable deliveries, we handle it all with care and efficiency.
        </p>
      </div>

      {/* Services Section */}
      <div className="container px-4 mx-auto mt-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

          {/* Service 1: Pickup and Delivery */}
          <div className="p-8 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
            <div className="flex items-center justify-center mb-4">
            </div>
            <h3 className="text-2xl font-bold text-[#024BBE] mb-2 text-center">Pickup & Delivery</h3>
            <p className="text-center text-gray-600">
              Our core service: we pick up your items from the seller and deliver them to your door. Whether it&apos;s a small item or large furniture, SnabbDeal ensures safe, quick, and reliable transportation.
            </p>
          </div>

          {/* Service 2: Marketplace Assistance */}
          <div className="p-8 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
            <div className="flex items-center justify-center mb-4">
            </div>
            <h3 className="text-2xl font-bold text-[#024BBE] mb-2 text-center">Marketplace Assistance</h3>
            <p className="text-center text-gray-600">
              Found something on OfferUp, Craigslist, or Facebook Marketplace? Let us handle the logistics. We&apos;ll coordinate with the seller to ensure your item gets picked up and delivered to you seamlessly.
            </p>
          </div>

          {/* Service 3: Large Item Handling */}
          <div className="p-8 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
            <div className="flex items-center justify-center mb-4">
            </div>
            <h3 className="text-2xl font-bold text-[#024BBE] mb-2 text-center">Large Item Handling</h3>
            <p className="text-center text-gray-600">
              Need help transporting larger items like furniture or appliances? No problem! SnabbDeal specializes in handling bulky goods with the care and attention they require.
            </p>
          </div>

          {/* Service 4: Scheduled Deliveries */}
          <div className="p-8 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
            <div className="flex items-center justify-center mb-4">
            </div>
            <h3 className="text-2xl font-bold text-[#024BBE] mb-2 text-center">Scheduled Deliveries</h3>
            <p className="text-center text-gray-600">
              You pick the time that works best for you, and we&apos;ll make sure the delivery happens on schedule. Flexibility is key, and we make sure to adapt to your timeline.
            </p>
          </div>

          {/* Service 5: Secure Payment Handling */}
          <div className="p-8 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
            <div className="flex items-center justify-center mb-4">
            </div>
            <h3 className="text-2xl font-bold text-[#024BBE] mb-2 text-center">Secure Payment Handling</h3>
            <p className="text-center text-gray-600">
              Worried about paying online or in person? We offer secure payment options to ensure your transaction goes smoothly and safely, protecting both buyers and sellers.
            </p>
          </div>

          {/* Service 6: On-Demand Courier */}
          <div className="p-8 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
            <div className="flex items-center justify-center mb-4">
            </div>
            <h3 className="text-2xl font-bold text-[#024BBE] mb-2 text-center">On-Demand Courier</h3>
            <p className="text-center text-gray-600">
              Need a courier service to pick up or deliver something quickly? Our on-demand couriers are ready to help, ensuring same-day deliveries for urgent items.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-[#024BBE] text-white py-12 mt-12">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold">Experience SnabbDeal Today</h2>
          <p className="mb-6 text-lg">
            Whatever your delivery needs, SnabbDeal is here to help. Contact us today to schedule a pickup or learn more about our services.
          </p>
          <a href="/contact" className="bg-[#FBB040] hover:bg-[#FF6B00] text-white px-6 py-3 rounded-md font-bold transition duration-300">
            Contact Us
          </a>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
