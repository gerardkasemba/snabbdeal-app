"use client"
import { useState, useEffect } from 'react';
import Unschedule_Box from './Unschedule';
import NavBar from '../../components/NavBar2';
import Footer from '../../components/Footer';
import SellerPartners from './SellerPartners';
import { useGetAllDeliveriesQuery, useGetAllPartnersQuery, useGetAllPickupsQuery, useUpdateDeliveryStatusMutation } from '../api/features/admin';
import moment from 'moment';
import { ImSpinner6 } from 'react-icons/im';
import calculateDistance from '@/components/calculateMiles';
import Delivered from './delivered';
import { formatTimeToAmPm } from '../../lib/timeUtils';

const Dashboard = () => {
  const [submitForm, {isLoading: deliveryLoading, isSuccess: deliverySuccess}] = useUpdateDeliveryStatusMutation();
  // const { isLoading, data, isError, isSuccess } = useGetAllPickupsQuery();
  const { isLoading, data, isError, isSuccess } = useGetAllDeliveriesQuery();
  const [deliveries, setDeliveries] = useState([]);
  const [unscheduledDeliveries, setUnscheduledDeliveries] = useState([]);
  const [newOrders, setNewOrders] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [fileDeliveryImage, setFileDeliveryImage] = useState()
  const [del, setDel] = useState();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditOrderModalOpen, setIsEditOrderModalOpen] = useState(false);
  const [deliveryImage, setDeliveryImage] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [editDeliveryDetails, setEditDeliveryDetails] = useState({
    id: '',
    location: '',
    distance: ''
  });
    const getSourceCoordinates = (sellLat, sellLng) => {
        return { lat: sellLat, lng: sellLng }
    }
    const getDestinationCoordinates = (buyLat, buyLng) => {
      return { lat: buyLat, lng: buyLng }
  }

    const [editOrderDetails, setEditOrderDetails] = useState({
    id: '',
    buyerName: '',
    buyerEmail: '',
    buyerPhone: '',
    deliveryAddress: '',
    itemPrice: '',
    itemDescription: '',
    itemLink: '',
  });

  const handleStatusChange = async (id, newStatus) => {
    setDel(id);
    // console.log(id)
    if (newStatus === 'Delivered'){
      setIsPictureModalOpen(true);
    } else if (newStatus === 'On Route'){
      const formData = new FormData();
      formData.append('status', 'onroute');
      // console.log(newStatus)
      try{
        const response = await submitForm({trackingId: id._id, formData}).unwrap();
        console.log(response);
       }catch(err){
        console.error(err)
       }
    }else if(newStatus === 'Arrived'){
      const formData = new FormData();
      formData.append('status', 'arrived');
      try{
        const response = await submitForm({trackingId: id._id, formData}).unwrap();
        console.log(response);
       }catch(err){
        console.error(err)
       }
    }else if(newStatus === 'Picked Up'){
      const formData = new FormData();
      formData.append('status', 'picked');
      try{
        const response = await submitForm({trackingId: id._id, formData}).unwrap();
        console.log(response);
       }catch(err){
        console.error(err)
       }
    } else {
      setDeliveries((prevDeliveries) =>
        prevDeliveries.map((delivery) =>
          delivery.id === id ? { ...delivery, status: newStatus } : delivery
        )
      );
    }
  };

  const handleDeliveryClick = (delivery) => {
    setSelectedDelivery(delivery);
    setIsModalOpen(true);
    console.log(delivery)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDelivery(null);
  };

  const handlePictureModalClose = () => {
    setIsPictureModalOpen(false);
    setSelectedDelivery(null);
  };

  const handleRescheduleModalClose = () => {
    setIsRescheduleModalOpen(false);
    setSelectedDelivery(null);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedDelivery(null);
  };

  const handleEditOrderModalClose = () => {
    setIsEditOrderModalOpen(false);
    setSelectedOrder(null);
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if(file) {
      setFileDeliveryImage(file);
      setDeliveryImage(URL?.createObjectURL(file));
    }
  };

//   const source = {lat: 12.445544, lng: 70.323323};
//  const des = {lat:10.455434, lng: 35.442333}

//   const k = calculateDistance(source, des );
//   console.log(k);
  const handleSubmitPicture = async () => {
    if (fileDeliveryImage) {
      // setDeliveries((prevDeliveries) =>
      //   prevDeliveries.map((delivery) =>
      //     delivery.id === selectedDelivery ? { ...delivery, status: 'Delivered', image: deliveryImage } : delivery
      //   )
      // );
      console.log(fileDeliveryImage[0])
      const formData = new FormData();
      formData.append("status", 'delivered');
      formData.append("proof", fileDeliveryImage);

     try{
      const response = await submitForm({trackingId: del._id, formData}).unwrap();
      console.log(response);
     }catch(err){
      console.error(err)
     }

      // setDeliveryImage(null);
      handlePictureModalClose();
    }
  };

  const handleCancelDelivery = (id) => {
    setDeliveries((prevDeliveries) =>
      prevDeliveries.filter((delivery) => delivery.id !== id)
    );
    handleCloseModal();
  };

  const handleRescheduleDelivery = () => {
    if (rescheduleDate) {
      setDeliveries((prevDeliveries) =>
        prevDeliveries.map((delivery) =>
          delivery.id === selectedDelivery ? { ...delivery, date: rescheduleDate, status: 'Rescheduled' } : delivery
        )
      );
      setRescheduleDate('');
      handleRescheduleModalClose();
    }
  };

  const handleFilterDateChange = (e) => {
    setFilterDate(e.target.value);
  };

  const handleFilterLocationChange = (e) => {
    setFilterLocation(e.target.value);
  };

  const handleEditDeliveryChange = (e) => {
    const { name, value } = e.target;
    setEditDeliveryDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleEditOrderChange = (e) => {
    const { name, value } = e.target;
    setEditOrderDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleEditDeliverySubmit = () => {
    setUnscheduledDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.id === selectedDelivery ? { ...delivery, ...editDeliveryDetails } : delivery
      )
    );
    handleEditModalClose();
  };

  const handleEditOrderSubmit = () => {
    setNewOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedOrder ? { ...order, ...editOrderDetails } : order
      )
    );
    handleEditOrderModalClose();
  };

  const handleDeleteOrder = (id) => {
    setNewOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  const filteredUnscheduledDeliveries = unscheduledDeliveries.filter((delivery) => {
    return (
      (filterDate === '' || delivery.date === filterDate) &&
      (filterLocation === '' || delivery.location.includes(filterLocation))
    );
  });

  // console.log(moment().utc().month())



  const checkIfCurrent = (delivery) => {
    if(moment().utc().month() + 1 === Number(moment.utc(delivery.seller?.date).format('MM')) && moment().utc().date() === Number(moment.utc(delivery.seller?.date).format('DD'))){
      return true
    }
  }

  return (
    <div className="text-black">
      <NavBar />

      <div className="min-h-screen p-8 pt-16 bg-gray-100">
        <h1 className="mb-8 text-3xl font-bold text-center">Delivery Dashboard</h1>
        <div className="p-6 mb-8 rounded">
          <h2 className="mb-4 text-2xl font-semibold">Pickups</h2>
          {
            isLoading && (
              <ImSpinner6 className='text-4xl text-black animate-spin' />
            )
          }

          {
            isError && (
              <div>Error Loading Pickups</div>
            )
          }

          {
            isSuccess && (
              <div className="overflow-x-auto">
                <div className="">
                  {data && data.map((delivery, index) => (
                   checkIfCurrent(delivery) && (
                      <div key={delivery._id} onClick={() => handleDeliveryClick(delivery)} className="p-4 mb-4 transition duration-300 bg-white border rounded-lg shadow-lg cursor-pointer hover:shadow-xl">
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                          <div className="flex-1">
                            <h4 className="text-xl font-semibold text-blue-600">Order #{index + 1}</h4>
                            <p className="text-sm"><span className="font-medium">Date:</span> {moment.utc(delivery.seller?.date).format('DD/MM/YYYY')}</p>
                            <p className="text-sm"><span className="font-medium">Location:</span> {delivery.seller?.address.location}</p>
                            <p className="text-sm"><span className="font-medium">Distance:</span> {calculateDistance(getSourceCoordinates(delivery?.seller?.address?.lat, delivery?.seller?.address?.lng), getDestinationCoordinates(delivery?.buyer?.address?.lat, delivery?.buyer?.address?.lng))} miles</p>
                            <p className="text-sm"><span className="font-medium">Status:</span> <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${delivery.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : delivery.status === 'onroute' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{delivery.status}</span></p>
                          </div>
                          <div className="flex-none md:w-48 md:h-48">
                            {delivery.image && delivery.status !== "onroute" ?
                              <img src={delivery.image.url} alt="Delivery" className="object-cover w-full h-full rounded-lg" /> :
                              <span className="flex items-center justify-center w-full h-full text-gray-500 bg-gray-300 rounded-lg">No Image</span>
                            }
                          </div>
                        </div>
                        <div className="w-full mt-2 md:w-auto">
                          <label htmlFor={`status-${delivery._id}`} className="block font-medium text-gray-700">Change Status:</label>
                          <select
                            id={`status-${delivery._id}`}
                            value={delivery.status === "pending" ? "Pending" : delivery.status === "delivered" ? "Delivered" : delivery.status === "onroute" ? "On Route" : delivery.status === "picked" ? "Picked Up" : delivery.status === "arrived" ? "Arrived" : "Pending"  }
                            onChange={(e) => handleStatusChange(delivery, e.target.value)}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm form-select focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="Pending">Pending</option>
                            <option value="On Route">On Route</option>
                            <option value="Arrived">Arrived</option>
                            <option value="Picked Up">Picked Up</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )
          }

        </div>


        {isModalOpen && selectedDelivery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="relative w-full max-w-lg p-6 bg-white rounded shadow-md">
              <button
                onClick={handleCloseModal}
                className="absolute text-gray-600 top-2 right-2 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <h2 className="mb-4 text-2xl font-semibold">Delivery Details</h2>
              <p><strong>ID:</strong> {selectedDelivery._id}</p>
              <p><strong>Date:</strong> {moment(selectedDelivery.seller?.date).format("DD-MM-YYYY")}, {formatTimeToAmPm(selectedDelivery.seller?.time)}</p>
              <p><strong>Location:</strong> {selectedDelivery.seller?.address.location}</p>
              <p><strong>Distance:</strong> {calculateDistance(getSourceCoordinates(selectedDelivery?.seller?.address?.lat, selectedDelivery?.seller?.address?.lng), getDestinationCoordinates(selectedDelivery?.buyer?.address?.lat, selectedDelivery?.buyer?.address?.lng ))}miles</p>
              <p><strong>Status:</strong> {selectedDelivery.status}</p>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Buyer Information</h3>
                <p><strong>Name:</strong> { selectedDelivery.buyer.name } </p>
                <p><strong>Contact:</strong> { selectedDelivery.buyer.phone || selectedDelivery.buyer.email }</p>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Seller Information</h3>
                <p><strong>Location:</strong> { selectedDelivery.seller?.address.location }</p>
                <p><strong>Contact:</strong> { selectedDelivery.seller?.email || selectedDelivery?.seller?.phone }</p>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Delivery Information</h3>
                <p><strong>Address:</strong> {selectedDelivery.buyer.address.location}</p>
                <p><strong>Notes:</strong> {selectedDelivery?.item?.note} </p>
              </div>
              <div className="flex justify-end mt-4 space-x-4">
                <button onClick={() => handleCancelDelivery(selectedDelivery.id)} className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700">Cancel Delivery</button>
                {/* <button onClick={() => setIsRescheduleModalOpen(true)} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">Reschedule Delivery</button> */}
              </div>
            </div>
          </div>
        )}


        {isPictureModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="relative w-full max-w-lg p-6 bg-white rounded shadow-md">
              <button
                onClick={handlePictureModalClose}
                className="absolute text-gray-600 top-2 right-2 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <h2 className="mb-4 text-2xl font-semibold">Take a Picture of the Package</h2>
              <input type="file" accept="image/*" onChange={handlePictureChange} className="mb-4" />
              {deliveryImage && <img src={deliveryImage} alt="Delivery" className="object-cover w-full h-48 mb-4" />}
              <button onClick={handleSubmitPicture} className="w-full py-2 px-4 bg-[#024BBE] text-white rounded hover:bg-dark">{deliveryLoading ? <ImSpinner6 className='flex mx-auto text-4xl text-white animate-spin' /> : "Submit" }</button>
            </div>
          </div>
        )}
        {/* {isRescheduleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="relative w-full max-w-lg p-6 bg-white rounded shadow-md">
              <button
                onClick={handleRescheduleModalClose}
                className="absolute text-gray-600 top-2 right-2 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <h2 className="mb-4 text-2xl font-semibold">Reschedule Delivery</h2>
              <input
                type="date"
                value={rescheduleDate}
                onChange={(e) => setRescheduleDate(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <button onClick={handleRescheduleDelivery} className="w-full py-2 px-4 bg-[#024BBE] text-white rounded hover:bg-dark">Submit</button>
            </div>
          </div>
        )} */}


        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="relative w-full max-w-lg p-6 bg-white rounded shadow-md">
              <button
                onClick={handleEditModalClose}
                className="absolute text-gray-600 top-2 right-2 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <h2 className="mb-4 text-2xl font-semibold">Edit Delivery Details</h2>
              <input
                type="text"
                name="location"
                value={editDeliveryDetails.location}
                onChange={handleEditDeliveryChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Location"
              />
              <input
                type="text"
                name="distance"
                value={editDeliveryDetails.distance}
                onChange={handleEditDeliveryChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Distance"
              />
              <button onClick={handleEditDeliverySubmit} className="w-full py-2 px-4 bg-[#024BBE] text-white rounded hover:bg-dark">Submit</button>
            </div>
          </div>
        )}


        {isEditOrderModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="relative w-full max-w-lg p-6 bg-white rounded">
              <button
                onClick={handleEditOrderModalClose}
                className="absolute text-gray-600 top-2 right-2 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <h2 className="mb-4 text-2xl font-semibold">Edit Order Details</h2>
              <input
                type="text"
                name="buyerName"
                value={editOrderDetails.buyerName}
                onChange={handleEditOrderChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Buyer Name"
              />
              <input
                type="email"
                name="buyerEmail"
                value={editOrderDetails.buyerEmail}
                onChange={handleEditOrderChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Buyer Email"
              />
              <input
                type="text"
                name="buyerPhone"
                value={editOrderDetails.buyerPhone}
                onChange={handleEditOrderChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Buyer Phone"
              />
              <input
                type="text"
                name="deliveryAddress"
                value={editOrderDetails.deliveryAddress}
                onChange={handleEditOrderChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Delivery Address"
              />
              <input
                type="text"
                name="itemPrice"
                value={editOrderDetails.itemPrice}
                onChange={handleEditOrderChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Item Price"
              />
              <textarea
                name="itemDescription"
                value={editOrderDetails.itemDescription}
                onChange={handleEditOrderChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Item Description"
              />
              <input
                type="text"
                name="itemLink"
                value={editOrderDetails.itemLink}
                onChange={handleEditOrderChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Item Link"
              />
              <button onClick={handleEditOrderSubmit} className="w-full py-2 px-4 bg-[#024BBE] text-white rounded hover:bg-dark">Submit</button>
            </div>
          </div>
        )}
        <div className="p-6 mb-8 bg-white rounded">
          <Unschedule_Box />
        </div>

        <div className="p-6 mb-8 bg-white rounded">
          {data && <Delivered data={data} />}
        </div>

        {/* <div className="p-6 mb-8 bg-white rounded">
          <SellerPartners />
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
