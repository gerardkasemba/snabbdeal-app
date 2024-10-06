import Image from 'next/image'
import React, { useState } from 'react'

export default function Delivered({data}) {
   
  return (
   <section>
        <h2 className="mb-4 text-2xl font-semibold">Delivered Orders</h2>
        {data.map((order, index) =>  
            order.status === 'delivered' && (
            <div key={index} className='flex justify-between px-3 py-3 mb-5 shadow-md rounded-xl shadow-gray-300'>
                <div className='space-y-3'>
                    <p>
                        <span className='font-semibold'>Tracking id: </span> 
                        {order._id}
                    </p>
                    <p>
                        <span className='font-semibold'>Address delivered to: </span> 
                        {order.buyer.address.location}
                    </p>
                    <p>
                        <span className='font-semibold'>Buyer&apos;s Phone number: </span> 
                        {order.buyer.phone}
                    </p>
                </div>
                <button onClick={() => handleImage(order.image.url)} className='relative flex-none overflow-hidden border rounded-lg md:w-48 md:h-48'>
                    <Image 
                        alt='Delivered product image'
                        src={order.image.url}
                        fill
                        className='object-cover'
                    />
                </button>
            </div>)
        )}
       
   </section>
  )
}
