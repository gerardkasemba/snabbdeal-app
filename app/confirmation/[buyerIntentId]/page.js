"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useParams } from 'next/navigation';
import { useConfirmIntentQuery, useConfirmPaymentQuery } from '@/app/api/features/buyer';
import Link from 'next/link';
import NavBar from '@/components/NavBar2';
import { ImSpinner6 } from 'react-icons/im';
import { FaRegCopy } from 'react-icons/fa';

export default function Intent() {

  
  const isPartner = useSearchParams();
  const partnerId = isPartner?.get('id')

  const { buyerIntentId } = useParams();
  // console.log("buyerIntentId", buyerIntentId)
  // console.log("partnerId", partnerId)

  // console.log(buyerIntentId)

  // const { data, isLoading, isError, isSuccess } = useConfirmIntentQuery({ buyerIntent: buyerIntentId, partnerId });
  const {isLoading, isError, data, isSuccess} = useConfirmPaymentQuery(buyerIntentId)

  console.log(data)
  
  const handleTrackingId = () => {
    if(data){
      localStorage.setItem('trackingId', data.deliveryId)
    }
  }
  
    
 if(isLoading){
  return <div className='flex items-center justify-center w-screen h-screen'><ImSpinner6 className='text-4xl text-black animate-spin' /></div>
 }
 if(isError){
  return(
    <>
      <NavBar />
      <section className='flex items-center justify-center w-screen h-screen bg-white'>
        <div className='md:w-1/3 w-[85%] py-10 text-black bg-gray-100 h-fit'>
            <h1 className='p-3 text-xl font-bold text-center rounded md:text-2xl'>OPPS! Payment could not be confirmed</h1>
        </div>
    </section>
    </>
  )
 }
 if(isSuccess){
  return(
    <>
      <NavBar />
      <section className='flex items-center justify-center w-screen h-screen bg-gray-100'>
          <div className='w-[85%] md:w-1/3 py-10 space-y-5 text-black bg-white h-fit'>
              <h3 className='font-semibold text-center'>Your Payment has been successfully confirmed!</h3>
              <h1 className='font-bold text-center rounded text-md md:text-2xl'>
                Your tracking Number is: <br />
                <span className='flex flex-col'>
                  <span id='trackingId'>{data.deliveryId}</span>
                  <button onClick={() => copyMessage('trackingId')} className='flex items-center gap-2 mx-auto mt-2 font-normal w-fit'><FaRegCopy /> <span>copy</span></button>
                </span>
              </h1>
              
              <Link href={'/track'} target='_blank' onClick={handleTrackingId} className='flex px-8 py-2 mx-auto text-white bg-blue-600 rounded w-fit'>Track now</Link>
              
          </div>
      </section>
    </>
  )
 }
}

const copyMessage = (messageId) => {
  const messageElement = document.getElementById(messageId);
  const range = document.createRange();
  range.selectNode(messageElement);
  window.getSelection().removeAllRanges();  // clear current selection
  window.getSelection().addRange(range);    // to select text
  document.execCommand('copy');
  window.getSelection().removeAllRanges();  // to deselect
  alert('Tracking ID copied to clipboard!');
};
