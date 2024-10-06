"use client"
import { useState } from 'react';
import { MdVerified } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { useApprovePartnerMutation, useGetAllPartnersQuery } from '../api/features/admin';
import { ImSpinner6 } from 'react-icons/im';

const SellerPartners = () => {
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { isError, isLoading, isSuccess, data } = useGetAllPartnersQuery();
  const [updatePartner, { isLoading: isUpdatingPartner, isError: failedToUpdatePartner, isSuccess: partnerUpdated}] = useApprovePartnerMutation()

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
  const approvePartner = async (partnerId) => {
    const status = true
    setSelectedSeller('')
    try{  
        const response = await updatePartner({partnerId, status}).unwrap();
    }catch(err){
      console.error(err)
    }
  }
  const disapprovePartner = async (partnerId) => {
    const status = false
    setSelectedSeller('')

    try{  
        const response = await updatePartner({partnerId, status}).unwrap();
    }catch(err){
      console.error(err)
    }
  }
  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Seller Partners</h1>
      <div className="overflow-x-auto">
        {isLoading && (
          <ImSpinner6 className='text-4xl text-black animate-spin' />
        )}
        {
          isError && (
            <div>
              Error fetching Partners
            </div>
          )
        }
        { isSuccess && <table className="min-w-[120vw] bg-white">
          <thead className='text-left '>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Business Name</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
            <tbody>
              {data && data.map((seller) => 
              <tr key={seller._id} className="">
                <td onClick={() => handleSellerClick(seller)} className="px-4 cursor-pointer py-2 border w-[10%] ">
                  <div className='flex items-center justify-between gap-3'><span>{seller.name}</span> {seller.verified ? <MdVerified className='text-xl'/> : ''}</div>
                </td>
                <td onClick={() => handleSellerClick(seller)} className="px-4 cursor-pointer py-2 border w-[10%]">{seller.business}</td>
                <td onClick={() => handleSellerClick(seller)} className="px-4 cursor-pointer py-2 border w-[15%]">{seller.address.location}</td>
                <td onClick={() => handleSellerClick(seller)} className="px-4 cursor-pointer py-2 border w-[10%]">{seller.phone}</td>
                <td onClick={() => handleSellerClick(seller)} className="px-4 cursor-pointer py-2 border w-[10%]">{seller.email}</td>
                <td className="px-4 py-2 space-x-2 border w-[10%]">
                  {seller.verified ? <button className="px-2 py-1 w-[45%] text-white bg-red-500 rounded" onClick={() => disapprovePartner(seller._id)}>Disapprove</button> : <div className='flex gap-3'> <button className="px-2 py-1 text-white bg-red-500 rounded w-[45%]" onClick={() => handleStatusChange('deny')}>Deny</button>
                  <button className="px-2 py-1 text-white w-[45%] bg-green-500 rounded" onClick={() => approvePartner(seller._id)}>Approve</button> </div>}
                </td>
              </tr>)}
          </tbody>
        </table>}
      </div>

      {selectedSeller && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full p-6 mx-2 space-y-3 max-h-[80vh] overflow-y-scroll bg-white rounded-lg md:w-1/2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Seller Information</h2>
              <button className="text-red-500" onClick={() => setSelectedSeller(null)}><FaTimes className='text-xl' /></button>
            </div>
            <div className='font-semibold'>
              {
                selectedSeller.verified ? "Verified Partner" : "Not a verified Partner"
              }
            </div>
            <hr border />
           <div className='flex'>
              <div className='w-[50%] space-y-3 p-2'>
                  <p><strong>Name:</strong> {selectedSeller.name}</p>
                  <p><strong>Phone:</strong> {selectedSeller.phone}</p>
                  <p><strong>Email:</strong> {selectedSeller.email}</p>
                  <p><strong>Business Name:</strong> {selectedSeller.business}</p>
                  <p><strong>Item Sold:</strong> {selectedSeller.item_type}</p>
                  <p><strong>Pick Up Time:</strong> From:{selectedSeller.pickup_time.from} to:{selectedSeller.pickup_time.to}</p>
                  <p><strong>Platforms:</strong> {selectedSeller.platforms.join(', ')}</p>
                  <p><strong>Payment Method:</strong> {selectedSeller.payment_method}</p>
                  <p><strong>Location:</strong> {selectedSeller.address.location}</p>
                  <div>
                  {selectedSeller.verified ? <button className="px-10 py-1 text-white bg-red-500 rounded" onClick={() => disapprovePartner(selectedSeller._id)}>Disapprove</button> : <div className='flex gap-3'> <button className="px-10 py-1 text-white bg-red-500 rounded" onClick={() => handleStatusChange('deny')}>Deny</button>
                  <button className="px-10 py-1 text-white bg-green-500 rounded" onClick={() => approvePartner(selectedSeller._id)}>{isUpdatingPartner ? "Loading..." : "Approve"}</button> </div>}
                  </div>
              </div>
              <div className='w-[50%]'>
                    {
                      selectedSeller.documnent.map((doc, index) => {
                        return(
                          <p key={doc.id} className='p-2'><strong>ID {index + 1}:</strong> <img src={doc.url} alt="ID" className='w-full' /></p>
                        )
                      })
                    }
              </div>
           </div>
           
          </div>
        </div>
      )}

      {isMessageModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full p-6 mx-2 bg-white rounded-lg md:w-1/2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Send Message</h2>
              <button className="text-red-500" onClick={() => setIsMessageModalOpen(false)}>X</button>
            </div>
            <textarea
              className="w-full h-40 p-2 border rounded"
              placeholder="Enter your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-4 space-x-2">
              <button className="px-4 py-1 text-white bg-gray-500 rounded" onClick={() => setIsMessageModalOpen(false)}>Close</button>
              <button className="px-4 py-1 text-white bg-blue-500 rounded" onClick={handleSendMessage}>Send Message</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerPartners;
