import React from "react";
import poster1 from "../../assets/poster1.jpg";
import poster2 from "../../assets/poster2.jpg";
import poster3 from "../../assets/poster3.jpg";
const Poster = () => {
  return (
    <div className="flex flex-col md:flex-row justify-evenly gap-14 md:justify-between p-24 mt-2">
      <div className=" flex flex-col basis-full px-4 mt-10 gap-4 md:basis-1/3  ">
        <img
          src={poster1}
          alt="Poster 1"
          className="w-full h-auto mb-2 rounded-2xl shadow-xl gap-4" 
          />
        <img
          src={poster2}
          alt="Poster 2"
          className="w-full h-auto rounded-2xl"
        />
      </div>
      <div className=" basis-1/2 md:basis-1/3 flex justify-center">
        <img
          src={poster3}
          alt="Poster 3"
          className="w-full h-[70vh] mt-20 mx-4 rounded-2xl"
        />
      </div>

      <div className="text-area basis-full md:basis-1/3 font-bold font-exo gap-10 flex flex-col mt-30">
        {/* <div className="text-2xl md:text-4xl lg:text-2xl font-bold text-center text-banner-color text-area text-banner-color basis-full md:basis-1/3 flex flex-col mt-30"> */}
        <h1 className=" text-2xl md:text-4xl lg:text-5xl font-bold text-center text-banner-color justify-start text-xl font-bold mb-2">
          Personal care & healthy living
        </h1>
        
        <p className="mb-4 text-gray-600">
          We provide the best leading medical service. Nulla perferendis veniam
          deleniti ipsum officia dolores repellat laudantium obcaecati neque.
        </p>
        <button className=" bg-red-500 w-1/2 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300">
          Services
        </button>
      </div>
    </div>
  );
};

export default Poster;
