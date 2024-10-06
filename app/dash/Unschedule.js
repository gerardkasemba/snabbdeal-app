"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { useEditBuyerInfoMutation, useEditSellerInfoMutation, useGetAllDeliveriesQuery, useUnscheduledDeliveriesQuery, useUnscheduledSellerMutation, useUnscheduledSellerQuery } from '../api/features/admin';
import moment from 'moment';
import AddressAutocomplete from '@/components/SellerAddressAutocomplete';
import calculateDistance from '@/components/calculateMiles';
import { ImSpinner6 } from 'react-icons/im';
import { formatTimeToAmPm } from '../../lib/timeUtils';

const Dashboard = () => {
  // const { isError, data: deliveries  } = useUnscheduledDeliveriesQuery();
  // const [submitData , {data, isSuccess}] = useUnscheduledSellerMutation();
  const {isError, data: deliveries, isLoading, isSuccess} = useGetAllDeliveriesQuery();
  const [submitInfo, { data: infoData, isLoading: loadingEditInfo,  isSuccess: buyerSuccess }] = useEditBuyerInfoMutation();
  const [submitSellerData, {isSuccess: sellerSuccess} ] = useEditSellerInfoMutation();
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [lngLat, setLngLat] = useState({
    lng: selectedDelivery?.address?.lng,
    lat: selectedDelivery?.address?.lat,
  })
  const [filteredDeliveries, setFilteredDeliveries] = useState(deliveries)
  const [filters, setFilters] = useState({ _id: '', phone: '',date: '' });
  const [miles, setMiles] = useState({})
  const [loading, setLoading] = useState(true);
  const [editSeller, setEditSellers] = useState({
    name: selectedDelivery?.seller?.name,
    email: selectedDelivery?.seller?.email,
    phone: selectedDelivery?.seller?.phone,
    location: selectedDelivery?.seller?.address?.location,
    lng: selectedDelivery?.seller?.address?.lng,
    lat: selectedDelivery?.seller?.address?.lat
  })

  // console.log(deliveries)
  // console
  // Handle input change
  const handleFilterChange = (e) => {
    const { value, name } = e.target;
    setFilters({ [name]: value });

    // Filter data based on the input value
   if(name === '_id'){
    const filtered = deliveries.filter(item =>
      item._id.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDeliveries(filtered);
   }else if(name === "phone"){
    const filtered = deliveries.filter(item =>
      item.buyer.phone.includes(value)
    );
    setFilteredDeliveries(filtered);
   }
  };

  const [isSavedBuyer, setIsSavedBuyer] = useState(false)
  const [isSavedSeller, setIsSavedSeller] = useState(false)

  const [sellerLngLat, setSellerLngLat] = useState({
    lng: deliveries?.seller?.address?.lng,
    lat: deliveries?.seller?.address?.lat,
  })
  // Fetch distances for all deliveries

  useEffect(() => {
    const fetchDistances = async () => {
      try{
        // Set loading to true while fetching distances
        setLoading(true);

        // Fetch distances for each delivery
        const distancePromises = await deliveries && deliveries.map(async (delivery) => {
          // console.log(deliveries)
          // Holds data of each seller
        // try{
        //   const response = await submitData(delivery._id).unwrap();
        //     if(response){
              const source = {
                lng: delivery.seller.address?.lng,
                lat: delivery.seller.address?.lat
              };
              const dest = {
                lng: delivery.buyer.address?.lng,
                lat: delivery.buyer.address?.lat
              };

              // console.log("first", source)
              // console.log("second", dest)
              const distance = calculateDistance(source, dest);
              // console.log({ id: delivery._id, distance, date: delivery?.seller.date })
              return { id: delivery._id, distance, date: delivery?.seller.date };
            // }
        // }
          // catch(err){
          //   console.error(`Failed to get data for delivery ID: ${delivery._id}`);
          //   console.log("not found")
          //   return { id: delivery._id, distance: "-" };
          // }
        });

        // Wait for all distance calculations to complete
        const results = await Promise.all(distancePromises);
        const milesMap = results.reduce((acc, { id, distance, date }) => {
          acc[id] = {distance, date};

          return acc;
        }, {});

        setMiles(milesMap);
      } catch (err) {
        console.error("Error fetching distances:", err);
      } finally {
        setLoading(false); // Set loading to false once all distances are fetched
      }
      setFilteredDeliveries(deliveries)
    };

    fetchDistances();
  }, [deliveries]);

  // console.log("latlng", lngLat)

  const [editInfo, setEditInfo] = useState({
    name: selectedDelivery?.buyer?.name,
    email: selectedDelivery?.buyer?.email,
    phone: selectedDelivery?.buyer?.phone,
    location: selectedDelivery?.buyer?.address?.location,
    lng: selectedDelivery?.buyer?.address?.lng,
    lat: selectedDelivery?.buyer?.address?.lat
  });



  useEffect(() => {
    setEditSellers(prev => ({
      ...prev,
      lng: sellerLngLat.lng,
      lat: sellerLngLat.lat
    }))
  }, [sellerLngLat])

  useEffect(() => {
    setEditInfo(prev => ({
      ...prev,
      lng: lngLat.lng,
      lat: lngLat.lat
    }))
  }, [lngLat])

  useEffect(() => {
    setEditInfo({
      name: selectedDelivery?.buyer?.name,
      email: selectedDelivery?.buyer?.email,
      phone: selectedDelivery?.buyer?.phone,
      location: selectedDelivery?.buyer?.address?.location,
      lng: selectedDelivery?.address?.lng,
      lat: selectedDelivery?.address?.lat
    });
    setLngLat({
      lng: selectedDelivery?.buyer?.address.lng,
      lat: selectedDelivery?.buyer?.address.lat
    })
  }, [selectedDelivery])

  useEffect(() => {
    setEditSellers({
      phone: selectedDelivery?.seller?.phone,
      location: selectedDelivery?.seller?.address?.location,
      lng: selectedDelivery?.seller?.address?.lng,
      lat: selectedDelivery?.seller?.address?.lat
    })
    setSellerLngLat({
      lng: selectedDelivery?.seller?.address.lng,
      lat: selectedDelivery?.seller?.address.lat
    })
  }, [selectedDelivery])


  // console.log(mockData)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('buyer'); // 'buyer' or 'seller'

  const libraries = ['places'];
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY, // Replace with your API key
    libraries,
  });





  const handleEdit = async (delivery) => {
    setSelectedDelivery(delivery);
    setModalTab('buyer');
    setIsModalOpen(true);

    try{
      const response = await submitData(delivery._id).unwrap();
    }catch(err){
      console.error(err);
    }
  };

  const handlerSellerChange = (e) => {
    const { name, value } = e.target;

    setEditSellers(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDelivery(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleEditSubmit = async () => {
    closeModal();
    const info = {
        "buyer": {
          "name": editInfo.name,
          "email": editInfo.email,
          "phone": editInfo.phone,
          "address": {
            "location": editInfo.location,
            "lng": editInfo.lng,
            "lat": editInfo.lat
          },
          "comment": selectedDelivery.buyer.comment
        },
        "seller": {
          "date": selectedDelivery.seller.date,
          "time": selectedDelivery.seller.time,
          "phone": editSeller.phone,
          "address": {
            "location": editSeller.location,
            "lng": editSeller.lng,
            "lat": editSeller.lat
          },
          "paymentMethod": selectedDelivery.seller.paymentMethod
        },
        "item": {
          "note": selectedDelivery.item.note,
          "price":selectedDelivery.item.price,
          "link": selectedDelivery.item.link
        },
      }

      console.log(info)
   try{
      const response = await submitInfo({deliveryId: selectedDelivery._id, data: info}).unwrap();
      if(await buyerSuccess){
        setIsSavedBuyer(true);
      }
   }catch(err){
      console.error(err);
   }
  }

  // const handleSellerEdit = async () => {
  //   closeModal();
  //   try{
  //     const response = await submitSellerData({sellerId: data._id, data: editSeller }).unwrap()
  //     if(await sellerSuccess){
  //       setIsSavedSeller(true);
  //     }
  //   }catch(err){
  //     console.error(err)
  //   }
  // }

  // const filteredDeliveries = mockData && mockData.filter((delivery) => {

  //   return (
  //     // (!filters.date || delivery.dateExpected.includes(filters.date)) &&
  //     (!filters._id || delivery._id.includes(filters._id)) &&
  //     (!filters.phone || delivery.phone.includes(filters.phone))
  //   );
  // });

  // console.log(filteredDeliveries)

  let counter = 1;
  const checkCurrent = (delivery) => {
    return ( moment().utc().month() + 1 !== Number(moment.utc(delivery.seller?.date).format('MM')) || moment().utc().date() !== Number(moment.utc(delivery.seller?.date).format('DD'))) && delivery.status !== 'delivered'
  }

  return (

    <div className="">
      {/* {isSavedSeller && sellerSuccess && (
        <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black/40'>
            <div className='w-[30%] py-8 rounded bg-white gap-4 flex items-center justify-center flex-col '>
              <span className='text-4xl font-semibold'>Successfully Saved</span>
              <button onClick={() => setIsSavedSeller(false)} className='px-10 py-2 text-white bg-red-600 rounded'>Close</button>

            </div>
        </div>
      )}

    {buyerSuccess && (
        <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black/40'>
            <div className='w-[30%] py-8 rounded bg-white gap-4 flex items-center justify-center flex-col '>
              <span className='text-4xl font-semibold'>Successfully Saved</span>
              <button onClick={() => setIsSavedBuyer(false)} className='px-10 py-2 text-white bg-red-600 rounded'>Close</button>

            </div>
        </div>
      )} */}
      <div className="">
        <div className="">
          <h2 className="mb-6 text-3xl font-bold text-gray-800">Unscheduled Deliveries</h2>

          {/* Filter Section */}
          <div className="flex flex-wrap mb-8 gap-4">
            <input
              type="text"
              name="_id"
              value={filters._id}
              onChange={handleFilterChange}
              className="p-3 w-full md:w-1/3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Filter by Order #"
            />
            <input
              type="text"
              name="phone"
              value={filters.phone}
              onChange={handleFilterChange}
              className="p-3 w-full md:w-1/3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Filter by Cell Phone"
            />
          </div>

          {/* Loader */}
          {isLoading && (
            <ImSpinner6 className="text-5xl text-indigo-600 animate-spin mx-auto" />
          )}

          {/* Deliveries Cards */}
          {isSuccess && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDeliveries &&
                filteredDeliveries.map((delivery, index) => (
                  checkCurrent(delivery) && (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600 font-medium">Order # {delivery?._id}</span>
                      </div>

                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700">Delivery Details</h3>
                        <p className="text-gray-500 mt-2 text-sm">
                          <b className='bg-green-100 text-green-800 p-1 rounded-md'>Pick-up Date : </b>
                          <span className="text-sm text-gray-500 ml-2">
                            {moment.utc(miles[delivery?._id]?.date).format('MM/DD/YYYY')}
                          </span>
                        </p>
                        <p className="text-gray-500 mt-2 text-sm">
                          <b className='bg-green-100 text-green-800 p-1 rounded-md'>Pick-up Time : </b>
                          <span className='ml-2 text-sm text-gray-500'>
                            {formatTimeToAmPm(delivery?.seller.time)}
                          </span>
                        </p>
                        <p className="text-gray-500 mt-2 text-sm">
                          <b className='text-sm text-gray-500'>Payment Method : </b>
                          <span className='bg-blue-100 text-blue-800 font-bold p-1 rounded-md ml-2'>
                            {delivery?.seller.paymentMethod}
                          </span>
                        </p>
                        <p className="text-gray-500 mt-2">
                          <span className="font-medium">Phone:</span> {delivery?.buyer.phone}
                        </p>
                        <p className="text-gray-500">
                          <span className="font-medium">Location:</span> {delivery?.buyer.address?.location}
                        </p>
                        <p className="text-gray-500">
                          <span className="font-medium">Distance:</span> {miles[delivery?._id]?.distance} miles
                        </p>
                      </div>

                      <div className="flex w-full justify-between items-center">
                        <button
                          onClick={() => handleEdit(delivery)}
                          className="px-4 py-2 w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  )
                ))}
            </div>
          )}
        </div>


        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-lg p-6 bg-white rounded shadow-md">
              <div className="flex justify-between mb-4">
                <button
                  onClick={() => setModalTab('buyer')}
                  className={`py-2 px-10 ${modalTab === 'buyer' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
                >
                  Buyer
                </button>
                {deliveries && <button
                  onClick={() => setModalTab('seller')}
                  className={`py-2 px-10 ${modalTab === 'seller' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
                >
                  Seller
                </button>}
                {/* <button
                  onClick={() => setModalTab('schedule')}
                  className={`p-2 ${modalTab === 'schedule' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
                >
                  Schedule
                </button> */}
                <button
                  onClick={closeModal}
                  className="px-10 py-2 text-white bg-red-500 rounded"
                >
                  Close
                </button>
              </div>
              {modalTab === 'buyer' && (
                <form className="space-y-4">
                  <h2 className="text-xl font-semibold">Edit Buyer Information</h2>
                  {/* {!deliveries && (<h4 className='text-sm font-semibold text-gray-400'>Verified partner affiliated</h4>)} */}
                  <input
                    type="text"
                    name="name"
                    value={editInfo.name}
                    onChange={handleEditChange}
                    placeholder="Buyer Name"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                  />
                  <input
                    type="email"
                    name="email"
                    value={editInfo.email}
                    onChange={handleEditChange}
                    placeholder="Buyer Email"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={editInfo.phone}
                    onChange={handleEditChange}
                    placeholder="Buyer Phone"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                  />
                  <AddressAutocomplete
                    type="text"
                    name="location"
                    coordinates={setLngLat}
                    value={editInfo.location}
                    onChange={handleEditChange}
                    placeholder="Delivery Address"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                  />
                  <button
                  onClick={handleEditSubmit}
                  className="px-10 py-2 text-white bg-green-500 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                </form>
              )}
              {modalTab === 'seller' && (
                <form className="space-y-4">
                  <h2 className="text-xl font-semibold">Edit Seller Information</h2>
                  {/* <input
                    type="text"
                    name="name"
                    value={editSeller.name}
                    onChange={handlerSellerChange}
                    placeholder="Seller Name"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                  />
                  <input
                    type="email"
                    name="email"
                    value={editSeller.email}
                    onChange={handlerSellerChange}
                    placeholder="Seller Email"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                  /> */}
                  <input
                    type="text"
                    name="phone"
                    value={editSeller.phone}
                    onChange={handlerSellerChange}
                    placeholder="Seller Phone"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                  />
                  <AddressAutocomplete
                    coordinates={setSellerLngLat}
                    type="text"
                    name="location"
                    value={editSeller.location}
                    onChange={handlerSellerChange}
                    placeholder="Delivery Address"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                  />
                  <button
                  onClick={handleEditSubmit}
                  className="px-10 py-2 text-white bg-green-500 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                </form>
              )}
              {modalTab === 'schedule' && (
                <form className="space-y-4">
                  <h2 className="text-xl font-semibold">Schedule Delivery</h2>
                  <input
                    type="date"
                    name="dateExpected"
                    value={selectedDelivery?.dateExpected || ''}
                    onChange={() => {}}
                    placeholder="Expected Delivery Date"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                  />
                </form>
              )}
              <div className="flex justify-end mt-4">

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
