"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoadScript } from '@react-google-maps/api';
import AddressAutocomplete from '../../components/SellerAddressAutocomplete';
import NavBar from '../../components/NavBar2';
import Footer from '../../components/Footer';
import { useSearchParams } from 'next/navigation';
import { useCreateSellerMutation } from '../api/features/seller';
import { ImSpinner6 } from "react-icons/im";
import { useGetBuyerDataQuery } from '../api/features/buyer';

const libraries = ['places'];

const SellerForm = () => {
  const route = useRouter()
  const getBuyerIntent = useSearchParams();
  const buyerIntent = getBuyerIntent.get('intent');
  const [ d, setData] = useState({})




    const { data: buyData, isError: err, isSuccess:suc } = useGetBuyerDataQuery(buyerIntent)

    useEffect(() => {
      const check = async () => {
        if(await buyData && buyData.acknowledged === true){
          route.push('/');
          alert('Link has already been used!')
        }
      }
      check()
    }, [buyerIntent, buyData]);



  const [modal, setModal] = useState(false);
  const [submitData, { isLoading, data, isSuccess, isError }] = useCreateSellerMutation();

  const [names, setNames] = useState({
    firstName: '',
    lastName: ''
  })
  const [lngLat, setLngLat] = useState({
    lng: 0,
    lat: 0
  });
  const [formData, setFormData] = useState({
    location: '',
    lng: null,
    lat: null,
    name: "",
    phone: '',
    email: '',
    payment_method: '',
    date: '',
    time: '',
    buy_intent: buyerIntent
  });
  const [errors, setErrors] = useState({});

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    libraries,
  });

  // console.log(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY)
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      lat: lngLat.lat,
      lng: lngLat.lng
    }))
  }, [lngLat]);

  useEffect(() => {
    setFormData({
      ...formData,
      name: names.firstName + " " + names.lastName
    })
  }, [names]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev, [name]: value
    }))
  };


  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setNames({
      ...names,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (validateForm()) {
    // Handle form submission
    // console.log('Form submitted:', formData);
    // alert('Form submitted successfully!');

    const fig = formData.time.split(":")
    const pickup_time = new Date(formData.date).setHours(fig[0], fig[1])
    try {
      const response = await submitData({ ...formData, pickup_time: new Date(pickup_time).

      toISOString() }).unwrap();
      setModal(true)
    } catch (err) {
      console.error(err)
      setModal(true)

    }
    // }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.pickup_time) newErrors.pickup_time = true;
    if (!formData.location) newErrors.location = true;
    if (!validateEmail(formData.email)) newErrors.email = true;
    if (!formData.paymentMethod) newErrors.paymentMethod = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  if (!isLoaded) return <div className='flex items-center justify-center w-screen h-screen'><ImSpinner6 className='text-4xl text-black animate-spin' /></div>;

  return (
    <div className="">
      <NavBar />
      <div className="min-h-screen p-4 pt-24 text-black bg-gray-100">
        {
          modal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
                <div className="relative w-full max-w-lg p-6 bg-white rounded shadow-md">
                  {isSuccess && (<div className='h-40 overflow-y-auto'>
                    <div className="p-4 mt-2 bg-yellow-100 rounded">
                      <strong>Instructions:</strong> Please copy the link below and send it to the buyer to proceed with the payment.
                    </div>
                    <div id='messageToBuyer' className="">
                      <div className='p-4 border border-gray-300 '>
                            <p>I have successfully scheduled your order for your item(s)!🎉
                              <br />
                              <br />
                            To complete your purchase and arrange for swift delivery, please follow the link below to view the order summary and make your payment:</p>
                            <br />
                            <a href={data?.payment_url} target="_blank" rel="noopener noreferrer">{data?.payment_url}</a><br /><br /> Thanks
                      </div>

                    </div>
                    <button type="button" onClick={() => copyMessage('messageToBuyer')} className="px-4 py-2 mt-2 text-white bg-blue-500 rounded">Copy Message</button>
                  </div>) }
                  {
                    isError && (
                      <div className='h-40 overflow-y-auto'>
                        <div className="p-4 mt-4 bg-yellow-100 rounded">
                          <p><strong>Instructions:</strong> Oops! Link is now invalid</p>
                        </div>
                    </div>
                    )
                  }

                  <button onClick={() => setModal(false)} className="mt-4 py-2 px-4 bg-[#023e8a] text-white rounded">Close</button>
                </div>
            </div>
          )
        }
        <h1 className="mb-8 text-3xl font-bold text-center">Schedule Pick-Up</h1>
        <form onSubmit={handleSubmit} className="p-6 md:w-[60%] flex flex-col mx-auto space-y-4 bg-white rounded">
          <div>
            <label className="block text-gray-700">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={names.firstName}
              onChange={handleNameChange}
              className={`mt-1 p-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={names.lastName}
              onChange={handleNameChange}
              className={`mt-1 p-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone Number:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`mt-1 p-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Select a Time:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`mt-1 p-2 border ${errors.pickupTime ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Select a Time:</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={`mt-1 p-2 border ${errors.pickupTime ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Pick-Up Address:</label>
            <AddressAutocomplete
              name="location"
              coordinates={setLngLat}
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter pick-up address"
              className={`mt-1 p-2 border ${errors.pickupAddress ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
            />
          </div>
          <div>
            <label className="block text-gray-700">Payment Method:</label>
            <select
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
              className={`mt-1 p-2 border ${errors.paymentMethod ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
              required
            >
              <option value="">Select Payment Method</option>
              <option value="Venmo">Venmo</option>
              <option value="CashApp">CashApp</option>
              <option value="Cash">Cash</option>
              <option value="Zelle">Zelle</option>
            </select>
          </div>
          <button disabled={isLoading ? true : false} type="submit" className="flex justify-center w-full px-4 py-2 mx-auto text-white bg-blue-500 rounded md:w-[40%] hover:bg-blue-700">
            {isLoading ? "Processing..." : "Submit"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};
const copyMessage = (messageId) => {
  const messageElement = document.getElementById(messageId);
  const range = document.createRange();
  range.selectNode(messageElement);
  window.getSelection().removeAllRanges();  // clear current selection
  window.getSelection().addRange(range);    // to select text
  document.execCommand('copy');
  window.getSelection().removeAllRanges();  // to deselect
  alert('Message copied to clipboard!');
};
export default SellerForm;
