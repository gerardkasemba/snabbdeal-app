"use client"
import { useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import AddressAutocomplete from './SellerAddressAutocomplete';
import { useCreateBuyerIntentMutation, useScheduleDeliveryMutation } from '@/app/api/features/buyer';
import { useSearchParams } from 'next/navigation';
import { ImSpinner6 } from 'react-icons/im';
import calculateDistance from '@/components/calculateMiles';
import { formatTimeToAmPm } from '../lib/timeUtils';


const libraries = ['places'];

const FormSteps = ({ activeColor, inactiveColor, linkColor }) => {
  // const [currentStep, setCurrentStep] = useState(0);
  const searchParams = useSearchParams();
  const [miles, setMiles] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [partner, setPartner] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [partnerVerified, setPartnerVerified] = useState(false)
  const [lngLat, setLngLat] = useState({
        lng: 0,
        lat: 0
  })
  miles

  const [sellerLngLat, setSellerLngLat] = useState({
    lng: 0,
    lat: 0
})
  const [ submitData, { isLoading, isError, data, isSuccess} ] = useScheduleDeliveryMutation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    buyer_location: '',
    message: "",
    lng: null,
    lat: null,
    seller_phone: '',
    seller_location: '',
    time: '',
    date: '',
    payment_method: '',
    seller_lng: null,
    seller_lat: null,
    price: null,
    tag: '',
    link: '',
  });

  // update latitude and logitude
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      lat: lngLat.lat,
      lng: lngLat.lng
    }));
  }, [lngLat]);

  //  update latitude and logitude for seller
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      seller_lat: sellerLngLat.lat,
      seller_lng: sellerLngLat.lng
    }))
  }, [sellerLngLat]);

  useEffect(() => {
    setMiles({
      source:{
        lng: sellerLngLat.lng,
        lat: sellerLngLat.lat
      },
      dest: {
        lng: lngLat.lng,
        lat: lngLat.lat
      }
    });
  }, [lngLat, sellerLngLat]);

  useEffect(() => {
      if(miles.source && miles.dest){
        const distanceCovered = calculateDistance(miles?.source, miles?.dest);
        setTotalAmount(distanceCovered + formData.price);
      }
  }, [miles, formData.price])

  // console.log(totalAmount)

  // console.log(miles)
  const [errors, setErrors] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState('');
  const [uniqueLink, setUniqueLink] = useState('');
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY, // Replace with your API key
    libraries,
  });

  const steps = ['Buyer', 'Seller', 'Item Details', 'Summary'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = async () => {
    const isValid = validateForm();
      if (isValid && currentStep <= 4) {
        setCurrentStep(prevStep => prevStep + 1);
      }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const delivery = {
      "buyer": {
        "name": formData.name,
        "email": formData.email,
        "phone": formData.phone,
        "address": {
          "location": formData.buyer_location,
          "lng": formData.lng,
          "lat": formData.lat
        },
        "comment": formData.message
      },
      "seller": {
        "date": formData.date,
        "time": formData.time,
        "phone": formData.seller_phone,
        "address": {
          "location": formData.seller_location,
          "lng": formData.seller_lng,
          "lat": formData.seller_lat
        },
        "paymentMethod": formData.payment_method
      },
      "item": {
        "note": formData.tag,
        "price": formData.price,
        "link": formData.link
      }
    }

    // console.log(delivery)
    try{
      const response = await submitData(delivery).unwrap();
      console.log(response)
    }catch(err){
      console.error(err);
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setIsSubmitted(false);
    setConfirmationNumber('');
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePhoneNumber = (phone, seller_phone) => {
    const re = /^[0-9\b]+$/;
    return re.test(phone, seller_phone);
  };

  const validateForm = () => {
    let newErrors = {};
    if (currentStep === 1) {
      if (!formData.name) newErrors.name = true;
      if (!validateEmail(formData.email)) newErrors.email = true;
      if (!validatePhoneNumber(formData.phone)) newErrors.phone = true;
      if (!formData.buyer_location) newErrors.location = true;
    } else if (currentStep === 2) {
      if (!validatePhoneNumber(formData.seller_phone)) newErrors.seller_phone = true;
      if (!formData.seller_location) newErrors.seller_location = true;
      if (!formData.payment_method) newErrors.payment_method = true;
      if (!formData.time) newErrors.time = true;
      if (!formData.date) newErrors.date = true;
    }else if (currentStep === 3) {
      if (!formData.price) newErrors.price = true;
      if (!formData.link) newErrors.link = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  if (!isLoaded) return <ImSpinner6 className='flex mx-auto text-4xl text-black animate-spin' />;



  const messageToSeller = `
  <p id="messageToSeller">
    I’ll be using SnabbDeal, a trusted local delivery service specializing in marketplace transactions to handle the payment, pick-up, and delivery.
    <br /><br />
    Please click the secure link below to choose a date and time that works best for you:
    <br /><br />
    ${uniqueLink}
    <br /><br />
      <div id="videoBanner" style={{ textAlign: 'center' }}>
        <video width="100%" height="auto" controls style={{ maxWidth: '600px' }}>
      <source src="https://res.cloudinary.com/dnskkty8q/video/upload/f_auto:video,q_auto/eva0rxrwqgvhql0ryydd">
      Your browser does not support the video tag.
    </video>
  </div>
  </p>
`;


  return (
    <div className="w-full">
      {isSubmitted && isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="relative w-full max-w-lg p-6 bg-white rounded shadow-md">
            <button
              onClick={handleReset}
              className="absolute text-gray-600 top-2 right-2 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            {/* <h2 className="mb-4 text-xl font-semibold lg:text-2xl">Order Created Successfully!</h2> */}
            {/* <p>Your order has been created successfully. Your confirmation number is:</p>
            <p className="text-lg font-bold">{confirmationNumber}</p> */}
            <div className='h-60 overflow-y-auto text-wrap'>
              <div className="rounded-b text-[#72b01d] px-4 py-3" role="alert">
                <div className="flex">
                  <div className="py-1"><svg class="fill-current h-6 w-6 text-[#72b01d] mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                  <div>
                    <p className="font-bold text-lg">Order payment:</p>
                    <p className="text-sm font-bold">To complete your order, complete your payment.</p>
                  </div>
                </div>
              </div>
              {/* <div className="p-4 mt-4 bg-yellow-100 rounded break-words">
                <p><strong>Instructions:</strong> To complete your order complete your payment.</p>
              </div> */}
              <div className="p-4 mt-4 bg-white w-full border-gray-300 rounded">
                  <a href={`${data?.url}`} className='w-full' id='linkId'>
                  <button class="w-full bg-[#72b01d] hover:bg-[#3e8914] text-white font-bold py-2 px-4 border-[#3f7d20] hover:border-[#72b01d] rounded">Complete Order</button>
                  </a>
                {/* <p>Thanks</p>
                <button type="button" onClick={() => copyMessage('messageToSeller')} className="px-4 py-2 mt-2 text-white bg-[#FBB040] rounded">Copy Link</button> */}
              </div>
            </div>
            {/* <button onClick={handleReset} className="mt-4 py-2 px-4 bg-[#023e8a] text-white rounded">Close</button> */}
          </div>
        </div>
      )}
      {!isSubmitted && (
        <>
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`w-1/3 text-md flex items-center justify-center text-center p-2 rounded-md font-bold`}
                style={{
                  backgroundColor: currentStep === index + 1 ? activeColor : "transparent",
                  color: currentStep === index + 1 ? linkColor : inactiveColor // Active text is white, inactive uses dynamic color
                }}
              >
                {step}
              </div>
            ))}
          </div>
          <form className="w-full space-y-4">
            {currentStep === 1 && (
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Buyer Name"
                className={`w-full py-3 px-4 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg mb-4 text-base focus:outline-none focus:ring-2 focus:ring-[#FBB040] focus:border-transparent shadow-sm transition-all duration-300 ease-in-out hover:shadow-md placeholder-gray-400 text-gray-700`}
                required
              />
              <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/2 px-3 md:mb-0">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Buyer Email"
                    className={`w-full py-3 px-4 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg mb-4 text-base focus:outline-none focus:ring-2 focus:ring-[#FBB040] focus:border-transparent shadow-sm transition-all duration-300 ease-in-out hover:shadow-md placeholder-gray-400 text-gray-700`}
                    required
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Buyer Phone"
                    className={`w-full py-3 px-4 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg mb-4 text-base focus:outline-none focus:ring-2 focus:ring-[#FBB040] focus:border-transparent shadow-sm transition-all duration-300 ease-in-out hover:shadow-md placeholder-gray-400 text-gray-700`}
                    required
                  />
                </div>
              </div>
              <AddressAutocomplete
                name="buyer_location"
                coordinates={setLngLat}
                value={formData.buyer_location}
                onChange={handleChange}
                className={`w-full py-3 px-4 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg mb-4 text-base focus:outline-none focus:ring-2 focus:ring-[#FBB040] focus:border-transparent shadow-sm transition-all duration-300 ease-in-out hover:shadow-md placeholder-gray-400 text-gray-700`}
                placeholder="Delivery Address"
              />
              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3 md:mb-0">
                  <input
                    type="text"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Apt # (Optional)"
                    className={`w-full py-3 px-4 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg mb-4 text-base focus:outline-none focus:ring-2 focus:ring-[#FBB040] focus:border-transparent shadow-sm transition-all duration-300 ease-in-out hover:shadow-md placeholder-gray-400 text-gray-700`}
                  />
                </div>
              </div>
            </div>
          )}
            {currentStep === 2 && (
            <div>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/2 px-3">
                  <label className="text-md font-bold text-white">Pick-up Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full py-3 px-4 border mt-2 ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-lg mb-4 text-base focus:outline-none focus:ring-2 focus:ring-[#FBB040] focus:border-transparent shadow-sm transition-all duration-300 ease-in-out hover:shadow-md text-gray-700`}
                    required
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="text-md font-bold text-white">Pick-up Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`w-full py-3 px-4 border mt-2 ${errors.time ? 'border-red-500' : 'border-gray-300'} rounded-lg mb-4 text-base focus:outline-none focus:ring-2 focus:ring-[#FBB040] focus:border-transparent shadow-sm transition-all duration-300 ease-in-out hover:shadow-md text-gray-700`}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/2 px-3">
                  <input
                    type="text"
                    name="seller_phone"
                    value={formData.seller_phone}
                    onChange={handleChange}
                    placeholder="Seller Phone#"
                    className={`w-full py-3 px-4 border ${errors.seller_phone ? 'border-red-500' : 'border-gray-300'} rounded-lg mb-4 text-base focus:outline-none focus:ring-2 focus:ring-[#FBB040] focus:border-transparent shadow-sm transition-all duration-300 ease-in-out hover:shadow-md placeholder-gray-400 text-gray-700`}
                    required
                  />
                </div>
              </div>
              <AddressAutocomplete
                name="seller_location"
                coordinates={setSellerLngLat}
                value={formData.seller_location}
                onChange={handleChange}
                className={`w-full py-3 px-4 border ${errors.seller_location ? 'border-red-500' : 'border-gray-300'} rounded-lg mb-4 text-base focus:outline-none focus:ring-2 focus:ring-[#FBB040] focus:border-transparent shadow-sm transition-all duration-300 ease-in-out hover:shadow-md placeholder-gray-400 text-gray-700`}
                placeholder="Pick-up Address"
              />
              <div className="w-full">
                <select
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleChange}
                  className={`w-full py-3.5 px-4 border ${errors.payment_method ? 'border-red-500' : 'border-gray-300'} rounded-lg mb-4 text-base focus:outline-none focus:ring-2 focus:ring-[#FBB040] focus:border-transparent shadow-sm transition-all duration-300 ease-in-out text-gray-700`}
                  required
                >
                  <option value="">Preferred Payment Method</option>
                  <option value="Venmo">Venmo</option>
                  <option value="CashApp">CashApp</option>
                  <option value="Cash">Cash</option>
                  <option value="Zelle">Zelle</option>
                </select>
              </div>
            </div>
          )}
            {currentStep === 3 && (
            <div>
              <textarea
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                placeholder="Delivery Note (Optional)"
                className={`w-full py-3 px-4 border ${errors.tag ? 'border-red-500' : 'border-gray-300'} rounded-lg mb-4 text-base focus:outline-none focus:ring-2 focus:ring-[#FBB040] focus:border-transparent shadow-sm transition-all duration-300 ease-in-out hover:shadow-md placeholder-gray-400 text-gray-700`}
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Item Price"
                className={`w-full py-3 px-4 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-lg mb-4 text-base focus:outline-none focus:ring-2 focus:ring-[#FBB040] focus:border-transparent shadow-sm transition-all duration-300 ease-in-out hover:shadow-md placeholder-gray-400 text-gray-700`}
                required
              />
              <input
                type="text"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="Item Link"
                className={`w-full py-3 px-4 border ${errors.link ? 'border-red-500' : 'border-gray-300'} rounded-lg mb-4 text-base focus:outline-none focus:ring-2 focus:ring-[#FBB040] focus:border-transparent shadow-sm transition-all duration-300 ease-in-out hover:shadow-md placeholder-gray-400 text-gray-700`}
                required
              />
            </div>
          )}
            {currentStep === 4 && (
              <div className='p-4 text-md bg-white rounded-md text-wrap md:text-balance'>
                <p className='break-words'><strong>Item Link:</strong> <a href={formData.link} target="_blank" className=' text-[#FBB040]' rel="noopener noreferrer">{formData.link}</a></p>
                <p><strong>Pick Up Address:</strong> {formData.seller_location}</p>
                <p><strong>Pick Up Date and Time:</strong> {formData.date}, {formatTimeToAmPm(formData.time)}</p>
                <p><strong>Dropoff Address:</strong> {formData.buyer_location}</p>
                <p><strong>Item Price:</strong> ${formData.price}</p>
                <p><strong>Miles between locations:</strong> {calculateDistance(miles?.source, miles?.dest)} miles</p>
                <p><strong>Mileage Fee:</strong> {(calculateDistance(miles?.source, miles?.dest)) >= 11 ? "$12" : "$5"}</p>
                <hr className="my-2"/>  {/* Line divider */}
                <p><strong>Total Price:</strong> ${parseFloat(formData.price) + parseFloat((calculateDistance(miles?.source, miles?.dest)) >=11 ? 12 : 5)}</p>
              </div>

            )}
            <div className="flex justify-between">
              {currentStep > 1 && <button type="button" onClick={handlePrevious} className="px-6 py-3 text-sm font-bold text-white bg-gray-500 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:bg-gray-600 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">Previous</button>}
              {currentStep < steps.length && <button type="button" onClick={handleNext} className="px-6 py-3 w-[35%] text-sm font-bold text-white bg-[#FBB040] rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:bg-[#e6a834] hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FBB040] focus:ring-opacity-50">Next</button>}
              {currentStep === steps.length && <button
              onClick={handleSubmit}
              disabled={isLoading ? true : false}
              type="submit"
              className={`py-3 px-6 text-md font-bold text-white bg-[#FBB040] rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:bg-[#e6a834] hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FBB040] focus:ring-opacity-50 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V12H4z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Create Order"
              )}
            </button>
            }
            </div>
          </form>
        </>
      )}
    </div>
  );
};

const copyMessage = () => {
  const messageElement = document.getElementById('linkId');
  const range = document.createRange();
  range.selectNode(messageElement);
  window.getSelection().removeAllRanges();  // clear current selection
  window.getSelection().addRange(range);    // to select text
  document.execCommand('copy');
  window.getSelection().removeAllRanges();  // to deselect
  alert('Message copied to clipboard!');
};

export default FormSteps;
