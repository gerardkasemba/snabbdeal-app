"use client";
import NavBar from '../../components/NavBar2';
import Footer from '../../components/Footer';
import FormSteps from '../../components/FormSteps';
import Image from 'next/image';

const CreateOrder = () => {

  // Define the tab colors
  const tabColors = {
    active: "#FBB040",   // Active tab color
    inactive: "#222222",  // Inactive tab color
    linkColor: "#FFFFFF"
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen pt-24 bg-gray-100 flex items-center justify-center">
        <div className="container mx-auto py-12 px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-[#024BBE] mb-4">
              Create Your Delivery Order
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Seamlessly schedule your delivery by filling out the form below. We&#39;ll handle the logistics so you can enjoy hassle-free delivery of your marketplace treasures.
            </p>
          </div>

          {/* Main Section */}
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            {/* Form Steps */}
            <div className="w-full lg:w-2/3 bg-white shadow-lg rounded-lg p-8">
              <FormSteps activeColor={tabColors.active} inactiveColor={tabColors.inactive} linkColor={tabColors.linkColor} />
            </div>

            {/* Optional Image Section */}
            {/* You can enable this if you&#39;d like an image next to the form */}
            {/* <div className="hidden lg:block lg:w-1/2 mt-8">
              <Image
                src="/img/create-order-banner.png"
                alt="Delivery illustration"
                width={500}
                height={500}
                className="object-contain"
              />
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateOrder;
