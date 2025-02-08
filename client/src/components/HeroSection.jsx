import React from "react";

const HeroSection = () => {
  return (
    <section className="py-28 bg-gray-100 shadow-xl rounded-b-[8rem]">
 <div className="container mx-auto">
 <div className="grid grid-cols-12">
        <div className="col-span-12">
          <div className="flex justify-center">
            <img className="bg-gradient-to-b from-gray-900 to-white rounded-full size-56 h-1/2" src="/img/IfrahimImg.png" alt="" srcset="" />
          </div>
          <div className="flex justify-center mt-4">
            <h1 className="text-5xl text-center font-bold  text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-black to-gray-500">
              Building digital 
              <br /> products, brands, and 
              <br />experience.
            </h1>
          </div>
        </div>
      </div>
 </div>
    </section>
  );
};

export default HeroSection;
