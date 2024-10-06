"use client"
import Image from 'next/image';
import { useState } from 'react';
import NavBar from '../../components/NavBar2';
import Footer from '../../components/Footer';

const AboutUs = () => {

  return (
    <div className="text-black">
      <NavBar />
      <div className="min-h-screen px-12 pt-24 bg-gray-100">
      {/* Header Section */}
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl font-bold text-[#024BBE] mb-4">About SnabbDeal</h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
          The story of SnabbDeal began with a simple problem: trying to pick up a great find on OfferUp while being stuck at work. We&apos;ve turned that everyday challenge into a solution that helps thousands of people shop from the comfort of their homes!
          </p>
        </div>

          {/* Story Section */}
          <div className="container px-4 mx-auto mt-12 lg:px-0">
          <div className="items-center lg:flex lg:space-x-8">
          <div className="mb-8 lg:w-1/2 lg:mb-0">
            <Image
              src="/img/SnabbDeal-About.png" // Make sure to replace with your actual image
              alt="SnabbDeal Delivery"
              width={600}
              height={400}
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-[#024BBE] mb-4">How It All Started</h2>
            <p className="mb-4 text-lg text-gray-700">
              It was just another busy day at work when I found the perfect second-hand item on OfferUp. But, being stuck at work meant there was no way I could pick it up in time, and the seller wouldn&apos;t hold it for long. That&apos;s when I realized — why isn&apos;t there a service that helps with this?
            </p>
            <p className="text-lg text-gray-700">
              Out of that moment of frustration, SnabbDeal was born. What started as a simple idea has now become a seamless delivery service, specializing in marketplace transactions for second-hand treasures. We make sure your items are delivered with care and efficiency, so you never have to miss out on a great find again.
            </p>
          </div>
          </div>
          </div>

          {/* Vision and Mission Section */}
          <div className="bg-[#FBB040] py-12 mt-12">
          <div className="container px-4 mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold text-white">Our Vision & Mission</h2>
          <div className="flex flex-col justify-center lg:flex-row lg:space-x-8">
            <div className="lg:w-1/2">
              <h3 className="mb-3 text-xl font-semibold text-white">Our Vision</h3>
              <p className="text-white">
                To revolutionize how people buy and sell second-hand items by making the pick-up and delivery process effortless, reliable, and accessible to everyone.
              </p>
            </div>
            <div className="mt-8 lg:w-1/2 lg:mt-0">
              <h3 className="mb-3 text-xl font-semibold text-white">Our Mission</h3>
              <p className="text-white">
                At SnabbDeal, we&apos;re committed to providing a trusted and efficient delivery service that connects buyers and sellers of second-hand goods, ensuring that no great deal is ever missed.
              </p>
            </div>
          </div>
          </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="container px-4 py-12 mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#024BBE] mb-8">Why Choose SnabbDeal?</h2>
          <div className="justify-center lg:flex lg:space-x-8">
          <div className="mb-8 lg:w-1/3 lg:mb-0">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-[#024BBE] mb-3">Convenience</h3>
              <p className="text-gray-700">
                We know how hard it can be to find the time to pick up your second-hand treasures. That&apos;s why we handle the entire process for you, from pickup to delivery.
              </p>
            </div>
          </div>
          <div className="mb-8 lg:w-1/3 lg:mb-0">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-[#024BBE] mb-3">Reliability</h3>
              <p className="text-gray-700">
                With SnabbDeal, you can rest easy knowing your items are in safe hands. Our trusted delivery service ensures that your items arrive in perfect condition.
              </p>
            </div>
          </div>
          <div className="lg:w-1/3">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-[#024BBE] mb-3">Efficiency</h3>
              <p className="text-gray-700">
                Time is of the essence when it comes to snagging a great deal. We work quickly and efficiently to make sure your items are delivered on time, every time.
              </p>
            </div>
          </div>
          </div>
          </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
