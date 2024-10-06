import React from 'react';
// import Step1 from './img/step1.svg';
// import Step2 from '../images/step2.svg';
// import Step3 from '../images/step3.svg';
// import Step4 from '../images/step4.svg';

const HowItWorks = () => {
  return (
    <div className="text-black">
      <div className="px-8 py-12 bg-white">
        <h1 className="mb-12 text-4xl font-bold text-center text-[#024BBE]">How It Works</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-4">
            {/* <img src='./img/step1.svg' alt="Find Your Item" className="object-contain w-full h-48 mb-4" /> */}
            <div className="mb-4 bg-[#FBB040] w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold">1</div>
            <h3 className="mb-2 text-lg font-semibold text-center">Find Your Item</h3>
            <p className="text-sm text-center">Browse and shop as usual on your favorite platforms like Facebook Marketplace, OfferUp, Craigslist, or any other site where second-hand goods are sold.</p>
          </div>
          <div className="flex flex-col items-center p-4">
            {/* <img src={Step2} alt="Negotiate and Agree" className="object-contain w-full h-48 mb-4" /> */}
            <div className="mb-4 bg-[#FBB040] w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold">2</div>
            <h3 className="mb-2 text-lg font-semibold text-center">Negotiate and Agree</h3>
            <p className="text-sm text-center">Communicate with the seller directly on the original platform to negotiate the price and any other details. Once you both agree on the transaction, get the item’s details ready for delivery.</p>
          </div>
          <div className="flex flex-col items-center p-4">
            {/* <img src={Step3} alt="Create a Delivery Order" className="object-contain w-full h-48 mb-4" /> */}
            <div className="mb-4 bg-[#FBB040] w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold">3</div>
            <h3 className="mb-2 text-lg font-semibold text-center">Create a Delivery Order</h3>
            <p className="text-sm text-center">Enter the item’s details, seller’s contact information, and pick-up location. Provide your delivery address and choose your preferred delivery time. Review and confirm the delivery order.</p>
          </div>
          <div className="flex flex-col items-center p-4">
            {/* <img src={Step4} alt="Receive Your Item" className="object-contain w-full h-48 mb-4" /> */}
            <div className="mb-4 bg-[#FBB040] w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold">4</div>
            <h3 className="mb-2 text-lg font-semibold text-center">Receive Your Item</h3>
            <p className="text-sm text-center">Be available at the scheduled delivery time to receive your item. If there’s any issue, our support team is here to help.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
