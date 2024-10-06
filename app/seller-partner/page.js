"use client";
import { useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import AddressAutocomplete from '../../components/SellerAddressAutocomplete';
import TermsAndConditionsModal from '../../components/TermsAndConditionsModal';
import SuccessMessage from '../../components/SuccessMessage';
import NavBar from '../../components/NavBar2';
import Footer from '../../components/Footer';
import Select from 'react-select';
import { useCreatePartnerMutation } from '../api/features/seller';

const libraries = ['places'];

const SellerPartner = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [platformValues, setPlatformValues] = useState([]);
  const [ submitData, { isLoading, isError } ] = useCreatePartnerMutation();
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [names, setNames] = useState({
    firstName: '',
    lastName: ''
  });

  const handleSellerClick = (seller) => {
    setSelectedSeller(seller);
  };

  const handleStatusChange = (status) => {
    if (status === 'missing') {
      setIsMessageModalOpen(true);
    } else {
      // Handle approve or deny logic
    }
  };

  const handleSendMessage = () => {
    // Logic to send message to the partner
    setIsMessageModalOpen(false);
  };

  const [formData, setFormData] = useState({
    from: '',
    to: '',
    location: '',
    lng: null,
    lat: null,
    name: '',
    phone: '',
    email: '',
    business: '',
    item_type: '',
    payment_method: '',
    file_front: null,
    file_back: null,
    platforms: []
  });

  const [errors, setErrors] = useState({});

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY, // Replace with your API key
    libraries,
  });

  const [showTerms, setShowTerms] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lngLat, setLngLat] = useState({
    lng: 0,
    lat: 0
  });
  const platforms = [
    { value: 'Facebook Marketplace', label: 'Facebook Marketplace' },
    { value: 'OfferUp', label: 'OfferUp' },
    { value: 'Craigslist', label: 'Craigslist' },
    { value: 'eBay', label: 'eBay' },
    { value: 'Etsy', label: 'Etsy' },
  ];

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      platforms: selectedPlatforms.map(platform => platform.value)
    }));
  }, [selectedPlatforms]);

  const handlePlatformChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedPlatforms(value);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files : value,
    });
  };

  useEffect(() => {
      setFormData({
        ...formData,
        name: names.firstName + " " + names.lastName
      })
  }, [names]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      lat: lngLat.lat,
      lng: lngLat.lng
    }));
  }, [lngLat]);

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setNames({
      ...names,
      [name]: value
    });
  };

  const handleSubmit =  async(e) => {
    e.preventDefault();
    setShowSuccess(true);

    const partnerData = new FormData();
    partnerData.append('name', formData.name);
    partnerData.append('email', formData.email);
    partnerData.append('location', formData.location);
    partnerData.append('lat', formData.lat);
    partnerData.append('lng', formData.lng);
    partnerData.append('item_type', formData.item_type);
    partnerData.append('files', formData.file_front[0]);
    partnerData.append('files', formData.file_back[0]);
    partnerData.append('platforms', JSON.stringify(formData.platforms));
    partnerData.append('payment_method', formData.payment_method);
    partnerData.append('business', formData.business);
    partnerData.append('phone', formData.phone);
    partnerData.append('from', formData.from);
    partnerData.append('to', formData.to);

    try{
      const response = await submitData(partnerData).unwrap();
      console.log(response);
    }catch(err){
      console.error(err);
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.from) newErrors.pickupTime = true;
    if (!formData.to) newErrors.pickupTime = true;
    if (!formData.location) newErrors.pickupAddress = true;
    if (!formData.price) newErrors.price = true;
    if (!formData.name) newErrors.firstName = true;
    if (!formData.phone) newErrors.phoneNumber = true;
    if (!validateEmail(formData.email)) newErrors.email = true;
    if (!formData.payment_method) newErrors.paymentMethod = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div className="text-black">
        <NavBar />
            <div className="min-h-screen p-4 pt-24 bg-gray-100">
                <h1 className="mb-8 text-3xl font-bold text-center">Become a SnabbDeal Partner</h1>
                {showSuccess ? (
                    <SuccessMessage />
                ) : (
                <form onSubmit={handleSubmit} className="bg-white md:w-[60%] flex flex-col mx-auto p-6 rounded space-y-4">
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
                    <div className="w-full md:w-1/2 px-3">
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
                  <label className="block text-gray-700">Business Name</label>
                  <input
                      type="text"
                      name="business"
                      value={formData.business}
                      onChange={handleChange}
                      className={`mt-1 p-2 border border-gray-300 rounded w-full`}
                  />
                  </div>
                  <div>
                      <label className="text-gray-700 fblock">Types of Items Sold</label>
                      <textarea
                          name="item_type"
                          value={formData.item_type}
                          onChange={handleChange}
                          className={`mt-1 p-2 border ${errors.itemTypes ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
                          required
                      ></textarea>
                  </div>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block text-gray-700">Select a Pick-Up Time From:</label>
                      <input
                      type="time"
                      name="from"
                      value={formData.from}
                      onChange={handleChange}
                      className={`mt-1 p-2 border ${errors.from ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
                      required
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block text-gray-700">Select a Pick-Up Time To:</label>
                      <input
                      type="time"
                      name="to"
                      value={formData.to}
                      onChange={handleChange}
                      className={`mt-1 p-2 border ${errors.pickupTimeTo ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
                      required
                      />
                    </div>
                  </div>
                  <div>
                      <label className="block text-gray-700">Pick-Up Address:</label>
                      <AddressAutocomplete
                  name="location"
                  coordinates={setLngLat}
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full p-2 border 'border-gray-300'} rounded mb-4`}
                  placeholder="Delivery Address"
                />
                  </div>
                  <div>
                    <label className="block text-gray-700">Upload ID Front</label>
                    <input
                          type="file"
                          name="file_front"
                          onChange={handleChange}
                          className="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg"
                          required
                    />
                    <label className="block text-gray-700">Upload ID Back</label>
                    <input
                          type="file"
                          name="file_back"
                          onChange={handleChange}
                          className="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg"
                          required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Platforms</label>
                    <Select
                      isMulti
                      options={platforms}
                      value={selectedPlatforms}
                      onChange={setSelectedPlatforms}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </div>
                  <div>
                      <label className="block text-gray-700">Payment Method:</label>
                      <select
                      name="payment_method"
                      value={formData.payment_method}
                      onChange={handleChange}
                      className={`mt-1 p-2 border ${errors.payment_method ? 'border-red-500' : 'border-gray-300'} rounded w-full`}
                      required
                      >
                      <option value="">Select Payment Method</option>
                      <option value="Venmo">Venmo</option>
                      <option value="CashApp">CashApp</option>
                      <option value="Cash">Cash</option>
                      <option value="Zelle">Zelle</option>
                      </select>
                  </div>
                  <label className="inline-flex items-center mt-3">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    onChange={handleChange}
                    className="w-5 h-5 text-gray-600 form-checkbox"
                    required
                  />
                  <span className="ml-2 text-gray-700">
                    I agree to the&#39;{' '}
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => setShowTerms(true)}
                    >
                      terms and conditions
                    </span>
                  </span>
                </label>
                  <button disabled={isLoading ? true : false} type="submit" className="w-full px-4 py-2 flex mx-auto justify-center md:w-[40%] text-white bg-blue-500 rounded hover:bg-blue-700">
                      {isLoading ? "Processing..." : "Submit"}
                  </button>
                </form>
                )}
            </div>
            {showTerms && <TermsAndConditionsModal onClose={() => setShowTerms(false)} />}
        <Footer />
    </div>
  );
};

export default SellerPartner;
