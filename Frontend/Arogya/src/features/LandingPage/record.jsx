import React from "react";
import records from "../../assets/records.jpg";
import card1 from "../../assets/card1.png";
import card2 from "../../assets/card2.png";
import card3 from "../../assets/card3.png";
import card4 from "../../assets/card4.png";
import card5 from "../../assets/card5.png";
import card6 from "../../assets/card6.png";

const Record = () => {
  const cards = [
    {
      icon: card1,
      title: "Laboratory services",
      text: "Saepe nulla praesentium eaque omnis perferendis a doloremque.",
    },
    {
      icon: card2,
      title: "Heart Disease",
      text: "Saepe nulla praesentium eaque omnis perferendis a doloremque.",
    },
    {
      icon: card3,
      title: "Dental Care",
      text: "Saepe nulla praesentium eaque omnis perferendis a doloremque.",
    },
    {
      icon: card4,
      title: "Body Surgery  ",
      text: "Saepe nulla praesentium eaque omnis perferendis a doloremque.",
    },
    {
      icon: card5,
      title: "Neurology Sargery",
      text: "Saepe nulla praesentium eaque omnis perferendis a doloremque.",
    },
    {
      icon: card6,
      title: "Gynecology",
      text: "Saepe nulla praesentium eaque omnis perferendis a doloremque.",
    },
  ];
  return (
    <div className="bg-back-record w-full " id="about">
      <div
        className="bg-cover bg-center bg-no-repeat opacity-90 z-0 max-h-[200px] md:h-[500px] sm:h-[400px]"
        style={{ backgroundImage: `url(${records})` }}
      >
        <div>card1</div>
      </div>

      {/* this is the records card section */}
      <div className="p-10  flex flex-col items-center">
        <div className="heading">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center text-banner-color font-exo p-4">
            Award Winning Patient Care
          </h1>
          <div className="bg-custom-red h-1.5 w-1/16 my-6 ml-4 my-4 items-center"></div>
          <div className="red line"></div>
          <p className="mb-4 text-gray-600 flex flex-wrap items-center pl-4">
            Lets know moreel necessitatibus dolor asperiores illum possimus sint
            voluptates incidunt molestias nostrum laudantium. Maiores porro
            cumque quaerat.
          </p>
        </div>
        <div className="flex flex-wrap justify-center m-10 gap-4 sm:flex-row  lg:flex-row">
          {cards.map((card, index) => {
            return (
              <div
                key={index}
                // className="flex flex-col basis-1/4  p-10 m-4 w-full max-w-[90vw]  border rounded bg-white border border-gray-100 font-exo shadow-lg   lg:basis-1/4 "
                className="flex flex-col basis-full sm:basis-full md:basis-1/2 lg:basis-1/4 m-4 p-10 w-full max-w-[90vw] border rounded bg-white border-gray-100 font-exo shadow-lg"
              >
                <div className="flex flex-row items-center">
                  <img
                    src={card.icon}
                    alt={card.title}
                    className="w-12 h-12 mr-4"
                  />
                  <h1 className="text-lg font-bold">{card.title}</h1>
                </div>
                <p className="mt-2 text-gray-600">{card.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Record;
