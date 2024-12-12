import React, { useState } from "react";
import position1 from "../../assets/banner1.jpg";
import position2 from "../../assets/card1.png";
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import SwiperCore, { EffectCoverflow, Pagination, Navigation } from 'swiper';
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

const Testimonials = () => {
  const testimonialCards = [
    {
      image: position1,
      name: "Vivek Kumar Verma",
      title: "Nero Department",
      para: "This platform is awesome and it shows the most credible part of the website",
    },
    {
      image: position2,
      name: "Vivek Kumar Verma",
      title: "Nero Department",
      para: "This platform is awesome and it shows the most credible part of the website",
    },
    {
      image: position1,
      name: "Vivek Kumar Verma",
      title: "Nero Department",
      para: "This platform is awesome and it shows the most credible part of the website",
    },
    {
      image: position2,
      name: "Vivek Kumar Verma",
      title: "Nero Department",
      para: "This platform is awesome and it shows the most credible part of the website",
    },
    // Add more testimonials as needed
  ];

  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === testimonialCards.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? testimonialCards.length - 1 : slide - 1);
  };
  const goToSlide = (slideIndex) => {
    setSlide(slideIndex);
  };

  return (
    <div className="bg-back-record w-full -mt-4">
      <div className="text-section mt-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center text-banner-color font-exo">
          We served over 5000+ Patients
        </h1>
        <div className="bg-custom-red h-1.5 mx-auto mt-4 w-1/2 sm:w-1/4 md:w-1/3 lg:w-1/4"></div>
        <p className="p-4 md:p-8 lg:p-10 text-center w-full md:w-3/4 lg:w-2/3 mx-auto">
          Let's know more necessitatibus dolor asperiores illum possimus sint
          voluptates incidunt molestias nostrum laudantium. Maiores porro cumque
          quaerat.
        </p>
      </div>

      <div className="container ">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="bg-back-record"
        >
          {testimonialCards.map((card, index) => {
            return (
              <SwiperSlide className="bg-back-record" key={index}>
                <div className="p-4 w-full mb-10 max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                  {/* <div className="p-4 max-w-sm mx-auto  rounded-xl  overflow-hidden md:max-w-2xl"> */}
                  <div className="md:flex  p-6 mb-6">
                    <div className="md:flex-shrink-0">
                      <img
                        className="h-48 w-full object-cover md:h-full md:w-48"
                        src={card.image}
                        alt={card.name}
                      />
                    </div>
                    <div className="p-4">
                      <h1 className="text-lg font-semibold text-gray-900">
                        {card.name}
                      </h1>
                      <h3 className="text-gray-600">{card.title}</h3>
                      <p className="mt-2 text-gray-500">
                        Let's know more necessitatibus dolor asperiores illum
                        possimus sint voluptates incidunt molestias nostrum
                        laudantium. Maiores porro cumque quaerat.
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
          <div classNameName="slider-controler ">
            <div classNameName="swiper-button-prev slider-arrow">
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div classNameName="swiper-button-next slider-arrow">
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
