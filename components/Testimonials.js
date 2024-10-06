"use client";
import { useGetTestimonyQuery } from '@/app/api/features/admin';
import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, isLoading, isError } = useGetTestimonyQuery();

  useEffect(() => {
    const interval = setInterval(() => {
      if (data) {
        setCurrentIndex((prevIndex) =>
          prevIndex === data?.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [data]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data?.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data?.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center  text-[#024BBE] mb-10">
          What People Say
        </h2>

        <div className="relative mx-auto max-w-xl">
          {isLoading && (
            <div className="text-center text-white">Loading Testimonials...</div>
          )}
          {data?.length === 0 && (
            <div className="text-center text-white">No testimonials available</div>
          )}
          {data && data.length > 0 && (
            <div className="relative">
              <div className="w-full p-8 text-center transition-all duration-300 ease-in-out">
                <p className="text-lg text-md text-gray-800">

                  {data[currentIndex]?.testimonial}
                </p>
                <p className="mt-4 font-bold text-[#024BBE]">
                  - {data[currentIndex]?.name}
                </p>
              </div>

              {data.length > 1 && (
                <>
                  <button
                    onClick={handlePrevClick}
                    className="absolute left-[-2rem] top-1/2 transform -translate-y-1/2 bg-[#024BBE] text-white p-2 rounded-full shadow-md hover:bg-[#023e8a] transition-colors duration-300"
                  >
                    <FaChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextClick}
                    className="absolute right-[-2rem] top-1/2 transform -translate-y-1/2 bg-[#024BBE] text-white p-2 rounded-full shadow-md hover:bg-[#023e8a] transition-colors duration-300"
                  >
                    <FaChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
