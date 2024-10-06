// components/SuccessMessage.js
import Link from 'next/link';

const SuccessMessage = () => {
  return (
    <div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3" role="alert">
        <div class="flex">
            <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
            <div>
            <p class="font-bold">Thank you for joining SwiftSwap!</p>
            <p className="text-gray-700 mb-4">Your application has been submitted successfully.</p>
            <p className="text-gray-700 mb-4">We will review your information and get back to you shortly.</p>
            <p className="text-gray-700">As a partner, you can:</p>
            <ul className="text-gray-700 list-disc list-inside mb-4">
                <li>List your products with SwiftSwap delivery options</li>
                <li>Reach more customers</li>
                <li>Provide a seamless delivery experience</li>
                <li>Get paid easily through your preferred method</li>
            </ul>
            <Link href="/">
                <span className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                Go Back Home
                </span>
            </Link>
            </div>
        </div>
    </div>
  );
};

export default SuccessMessage;
