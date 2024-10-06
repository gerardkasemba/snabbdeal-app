"use client";
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar2';
import Footer from '../../components/Footer';
import { ImSpinner6 } from 'react-icons/im'; // Spinner Icon
import Image from 'next/image'; // Image Component
import { useTrackDeliveryMutation } from '../api/features/buyer';
import { formatTimeToAmPm } from '../../lib/timeUtils';

const Track = () => {
  const [trackingNumber, setTrackingNumber] = useState();
  const [trackingDetails, setTrackingDetails] = useState();
  const [id, { isLoading, isError }] = useTrackDeliveryMutation();

  useEffect(() => {
    const trackingId = localStorage.getItem('trackingId');
    if (trackingId) {
      setTrackingNumber(trackingId);
    }
  }, []);

  const handleChange = (e) => {
    setTrackingNumber(e.target.value);
  };

  const checkDetailsAsync = async () => {
    try {
      const res = await id(trackingNumber).unwrap();
      setTrackingDetails(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getStatusColor = (status) => {
    if (!status) return 'text-gray-500'; // Default color if status is undefined
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-500';
      case 'in transit':
        return 'text-blue-500';
      case 'pending':
        return 'text-yellow-500';
      case 'canceled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const faqQuestions = [
    {
      question: 'How can I track my package?',
      answer: 'Enter your tracking number in the form above, and we will provide real-time updates on your package’s location and status.',
    },
    {
      question: 'What should I do if my tracking number is not working?',
      answer: 'If your tracking number is not working, please ensure that you entered it correctly. If the issue persists, contact our support team for assistance.',
    },
    {
      question: 'How often is tracking information updated?',
      answer: 'Tracking information is updated in real-time as the package moves through different stages of the delivery process.',
    },
    {
      question: 'Can I track the exact location of my package?',
      answer: 'While we provide detailed tracking information, exact real-time GPS locations are not available for security and privacy reasons. You can see the latest status updates and delivery estimates.',
    },
    {
      question: 'What if my package is delayed?',
      answer: 'Delays can occur due to various reasons such as traffic, weather conditions, or operational issues. If your package is significantly delayed, feel free to reach out to our support team for more information.',
    },
  ];

  return (
    <div>
      <NavBar />
      <div className="min-h-screen p-8 pt-24 bg-gray-100 text-black">
        {/* Tracking Form Section */}
        <div className="md:w-[60%] mx-auto mt-12 bg-white shadow-lg rounded-lg p-6">
          <h1 className="mb-8 text-3xl font-extrabold text-center text-[#024BBE]">Track Your Package</h1>
          <input
            type="text"
            value={trackingNumber}
            onChange={handleChange}
            placeholder="Enter Tracking Number"
            className="w-full py-3 px-4 border border-gray-300 rounded-lg mb-4 text-base focus:outline-none focus:ring-2 focus:ring-[#FBB040] focus:border-transparent shadow-sm transition-all duration-300 ease-in-out hover:shadow-md placeholder-gray-400 text-gray-700"
          />
          <button
            className="w-full py-2 px-4 bg-[#024BBE] text-white rounded font-bold text-md transition duration-300 hover:bg-[#012E8F]"
            onClick={checkDetailsAsync}
            disabled={isLoading}
          >
            {isLoading ? <ImSpinner6 className="animate-spin inline-block mr-2" /> : "Track"}
          </button>

          {isError && (
            <div className="text-center mt-4 text-red-500 font-semibold">
              Invalid tracking number. Please try again!
            </div>
          )}
        </div>

        {/* Tracking Details Section */}
        {trackingDetails && (
          <div className="mt-12 md:w-[60%] mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center text-[#024BBE] mb-6">Tracking Details</h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Package Information */}
              <div className="w-full md:w-1/2">
                <div className="mb-4">
                  <p className="text-md font-semibold"><b>Location:</b> {trackingDetails?.buyer?.address?.location}</p>
                  <p className={`text-md font-semibold ${getStatusColor(trackingDetails?.status)}`}>
                    <b>Status:</b> {trackingDetails?.status}
                  </p>
                  <p className="text-md font-semibold"><b>Pickup Time:</b> {formatTimeToAmPm(trackingDetails?.seller?.time)}</p>
                </div>
              </div>
              {/* Package Image */}
              {trackingDetails?.image_url && (
                <div className="relative w-full md:w-1/2 h-64">
                  <Image
                    src={trackingDetails?.image_url}
                    alt="Package Image"
                    layout="fill"
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-16 md:w-[60%] mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-[#024BBE] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqQuestions.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-md text-gray-700 mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Track;
