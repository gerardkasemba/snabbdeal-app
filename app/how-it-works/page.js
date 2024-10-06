import NavBar from '../../components/NavBar2';
import Footer from '../../components/Footer';

export default function HowItWorks() {
  return (
    <div>
      <NavBar />
      <div className="min-h-screen p-8 pt-24 text-black bg-gray-100">
        <div className="container mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center">How It Works</h1>
        <div className="p-6 space-y-8 bg-white rounded shadow-md">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">For Buyers</h2>
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4">
              <div className="flex-1 p-4 bg-blue-100 rounded shadow-sm">
                <h3 className="mb-2 text-lg font-semibold lg:text-xl">1. Fill Out the Form</h3>
                <p>Provide your information, the delivery address, and details about the item you want to purchase.</p>
              </div>
              <div className="flex-1 p-4 bg-blue-100 rounded shadow-sm">
                <h3 className="mb-2 text-lg font-semibold lg:text-xl">2. Send Message to Seller</h3>
                <p>Copy the pre-written message and send it to the seller to coordinate the pick-up time and payment method.</p>
              </div>
              <div className="flex-1 p-4 bg-blue-100 rounded shadow-sm">
                <h3 className="mb-2 text-lg font-semibold lg:text-xl">3. Wait for Confirmation</h3>
                <p>The seller will schedule a convenient date and time for us to pick up the item. You&apos;ll receive a notification with the total amount to pay.</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">For Sellers</h2>
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4">
              <div className="flex-1 p-4 bg-green-100 rounded shadow-sm">
                <h3 className="mb-2 text-lg font-semibold lg:text-xl">1. Click the Link</h3>
                <p>Click the link provided by the buyer to access the scheduling form.</p>
              </div>
              <div className="flex-1 p-4 bg-green-100 rounded shadow-sm">
                <h3 className="mb-2 text-lg font-semibold lg:text-xl">2. Fill Out the Form</h3>
                <p>Select a convenient date and time for the item to be picked up, and provide your contact and payment details.</p>
              </div>
              <div className="flex-1 p-4 bg-green-100 rounded shadow-sm">
                <h3 className="mb-2 text-lg font-semibold lg:text-xl">3. Confirm Pickup</h3>
                <p>Confirm the pickup details and get ready for the scheduled pick-up. You will be paid as per your preferred payment method.</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
