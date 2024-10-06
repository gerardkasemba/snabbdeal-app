"use client"
import { useSubmitTestimonialMutation } from '@/app/api/features/admin';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Testimonial = () => {
  const [submitData, { isSuccess, isError }] = useSubmitTestimonialMutation();
  const route = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    testimony: '',
    feedback: '',
  });
  const [trackId, setTrackingId] = useState();

  const { trackingId } = useParams();

  useEffect(() => {
    setTrackingId(trackingId);
  }, [trackingId])

  // console.log(trackId)
 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log('Form data:', formData);
    const newData = {
      name: formData.firstName + " " + formData.lastName,
      email: formData.email,
      feedback: formData.feedback,
      testimonial: formData.testimony
    }
    // console.log("new data: ",newData)
    try{
      const res = await submitData({trackingId, data: newData}).unwrap();
      if(isSuccess){
        //  Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          testimony: '',
          feedback: '',
        });
      }
    }catch(err){
      console.error(err)
    }

   
  };

  return (
    <div className="flex flex-col justify-center min-h-screen py-12 text-black bg-gray-100 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Share Your Testimonial
        </h2>
      </div>

      {isSuccess ? (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <h3 className="text-center text-2xl font-bold text-[#023e8a]">Thank You!</h3>
            <p className="mt-4 text-center text-gray-700">
              Thank you for your cooperation. We&apos;ll be happy to see you again.
            </p>
            <div className="mt-6 text-center">
              <button
                onClick={() => route.push('/')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#023e8a] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#023e8a]"
              >
                Go Back Home
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
            {
              isError && (
                <div className='p-3 text-sm text-center text-white bg-red-600 rounded'>
                    Testimonial already exist for this order!
                </div>
              )
            }

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#023e8a] focus:border-[#023e8a] sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#023e8a] focus:border-[#023e8a] sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#023e8a] focus:border-[#023e8a] sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="testimony" className="block text-sm font-medium text-gray-700">
                  Your Testimony
                </label>
                <div className="mt-1">
                  <textarea
                    id="testimony"
                    name="testimony"
                    rows="4"
                    required
                    value={formData.testimony}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#023e8a] focus:border-[#023e8a] sm:text-sm"
                  ></textarea>
                </div>
              </div>

              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
                  Feedback for Improvement
                </label>
                <div className="mt-1">
                  <textarea
                    id="feedback"
                    name="feedback"
                    required
                    rows="4"
                    value={formData.feedback}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#023e8a] focus:border-[#023e8a] sm:text-sm"
                  ></textarea>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#023e8a] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#023e8a]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonial;
