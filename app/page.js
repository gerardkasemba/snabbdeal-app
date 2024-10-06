import Image from 'next/image';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import FormSteps from '../components/FormSteps';
import HowItWorks from '@/components/Howitworks';
import AreaServices from '@/components/Area-Services';
import Testimonial from '@/components/Testimonials';

export const metadata = {
  title: "SnabbDeal - Your Trusted Delivery Service",
  description: "Delivering your second-hand treasures with care and efficiency.",
};

export default function Home() {

  // Define the tab colors
  const tabColors = {
    active: "#FFFFFF",   // Active tab color
    inactive: "#FFFFFF",
    linkColor: "#FBB040"
  };

  return (
    <div>
      <NavBar />

      <div className="flex flex-col items-center justify-center pt-16 text-black bg-[#024BBE] lg:flex-row">
        <div className="w-full px-3 mt-12 py-8 lg:p-8 lg:w-1/2 md:min-h-screen">
          {/* Main Heading */}
          <h1 className="text-5xl text-center lg:text-left font-bold text-white">
            Fast, Reliable Marketplace Deliveries
          </h1>
          <p className="flex mx-auto lg:flex-none lg:mx-0 w-[80%] text-lg text-center text-white lg:text-left">
            Let us handle your delivery logistics, so you don&#39;t have to. Fill in the form to schedule your delivery.
          </p>

          {/* Image */}
          <div className="hidden lg:block">
            <Image
              src="/img/aa.svg"
              alt="Invite Partners"
              width={750}
              height={600}
              className="object-cover"
            />
          </div>
        </div>

        <div className="w-full p-8 lg:w-1/2">
          <FormSteps activeColor={tabColors.active} inactiveColor={tabColors.inactive} linkColor={tabColors.linkColor} />
        </div>
      </div>

      {/* How It Works Section */}
      <div className="w-full p-0 m-0">
        <HowItWorks />
      </div>

      {/* Partner Section */}
      <section className="flex flex-col md:flex-row bg-gray-100" style={{ minHeight: '350px' }}>
        <div className="relative w-full md:w-1/2">
          <div className="absolute inset-0 transform overflow-hidden">
            <Image
              src="/img/seller-partner.png"
              alt="Invite Partners"
              layout="fill"
              objectFit="cover"
              className="transform"
            />
          </div>
        </div>
        <div className="w-full p-12 text-center md:w-1/2 md:text-left">
          <h2 className="mb-4 text-4xl font-bold text-[#024BBE]">
            Join Us as a <span>Partner</span>
          </h2>
          <p className="mb-4 text-black">
            Become a part of the SnabbDeal family and let us help you reach more customers. By joining our partnership program, you can offer your customers a seamless delivery service that they will love.
          </p>
          <Link href="/seller-partner">
            <p className="inline-block px-4 py-2 text-white transition duration-300 bg-[#FBB040] rounded hover:bg-orange-600">
              Become a Partner
            </p>
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-4xl font-bold text-center text-[#024BBE] mb-8">Why Choose SnabbDeal?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4 md:px-16 text-center">
          <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-[#FBB040] text-white rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold">🚚</span>
            </div>
            <h3 className="font-semibold text-xl text-gray-800 mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Get your items delivered within hours.</p>
          </div>
          <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-[#FBB040] text-white rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold">💳</span>
            </div>
            <h3 className="font-semibold text-xl text-gray-800 mb-2">Secure Payment</h3>
            <p className="text-gray-600">Payments are securely handled through our platform.</p>
          </div>
          <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-[#FBB040] text-white rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold">👨‍✈️</span>
            </div>
            <h3 className="font-semibold text-xl text-gray-800 mb-2">Trusted Drivers</h3>
            <p className="text-gray-600">Background-checked, experienced drivers.</p>
          </div>
        </div>
      </section>

      {/* Testimonials and Area Services */}
      <div>
        <Testimonial />
      </div>
      <div>
        <AreaServices />
      </div>

      <Footer />
    </div>
  );
}
