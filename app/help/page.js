"use client"
import { useState } from 'react';
import NavBar from '../../components/NavBar2';
import Footer from '../../components/Footer';

const HelpFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const questionsAndAnswers = [
    {
      question: "How does SnabbDeal work?",
      answer: "SnabbDeal connects buyers with drivers to pick up and deliver second-hand items from platforms like Facebook Marketplace, OfferUp, and Craigslist. After negotiating with a seller, create a delivery order on SnabbDeal, and we'll handle the logistics, including secure payment."
    },
    {
      question: "How do I create a delivery order?",
      answer: "Once you finalize the deal with the seller, visit SnabbDeal and create a delivery order. Provide the seller’s pick-up address, your delivery address, and item information. You don’t need to list your item on SnabbDeal; simply link it to the original marketplace listing."
    },
    {
      question: "How does SnabbDeal handle payments?",
      answer: "SnabbDeal simplifies the payment process by allowing the buyer to pay directly through our platform. Once the item is picked up by our driver, we will release the payment to the seller. This ensures a smooth and secure transaction for both parties."
    },
    {
      question: "How do I schedule a pick-up?",
      answer: "After creating a delivery order, the seller will be notified to schedule a convenient pick-up time. Once the seller selects a date and time, a SnabbDeal driver will be assigned to handle the pick-up and delivery."
    },
    {
      question: "How are drivers assigned?",
      answer: "Drivers are notified of delivery orders in their area. After the seller schedules the pick-up, a driver will claim the order and ensure your item is picked up and delivered safely."
    },
    {
      question: "Can I track my delivery?",
      answer: "Yes! Once a driver is assigned, you’ll receive a tracking number. You can use this number on the 'Track Package' page to get real-time updates on the status of your delivery."
    },
    {
      question: "What payment methods do you accept?",
      answer: "You can pay for SnabbDeal's delivery service through various methods, including credit cards, Venmo, CashApp, and Zelle. Once the payment is processed, we handle the transaction with the seller."
    },
    {
      question: "What if I need to cancel or reschedule my delivery?",
      answer: "You can cancel or reschedule your delivery by contacting our support team or using the rescheduling option before the driver is dispatched."
    },
    {
      question: "What areas do you service?",
      answer: "SnabbDeal services a wide range of areas. Visit our 'Areas We Service' page to find out if we deliver to your city. You can search by city or state to confirm availability."
    },
    {
      question: "What happens if there’s an issue with my order?",
      answer: "If something goes wrong, contact our support team immediately. Provide your order number, and we’ll work to resolve the issue as quickly as possible."
    }
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredQuestionsAndAnswers = questionsAndAnswers.filter(item =>
    item.question.toLowerCase().includes(searchQuery) ||
    item.answer.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="text-black">
      <NavBar />
      <div className="min-h-screen p-12 pt-24 bg-gray-100">
        <h1 className="mb-8 text-3xl font-bold text-center">Help & FAQ</h1>
        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for a question..."
            className="w-full p-3 border rounded-md lg:w-1/2 focus:outline-none focus:ring hover:border-[#024BBE]"
          />
        </div>
        <div className="p-6 space-y-4 bg-white rounded flex flex-col mx-auto">
          {filteredQuestionsAndAnswers.length > 0 ? (
            filteredQuestionsAndAnswers.map((item, index) => (
              <div key={index} className="pb-4 border-b border-gray-200">
                <button
                  onClick={() => handleToggle(index)}
                  className="flex items-center justify-between w-full text-lg font-semibold text-left focus:outline-none"
                >
                  {item.question}
                  <span>{activeIndex === index ? '-' : '+'}</span>
                </button>
                {activeIndex === index && <p className="mt-2 text-gray-600">{item.answer}</p>}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No results found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HelpFAQ;
