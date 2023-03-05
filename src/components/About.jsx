import React , { useState } from "react";
import Footer from "./Footer";
import HeaderNavbar from "./HeaderNavbar";

const About = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
    <HeaderNavbar />
    <div className="max-w-7xl lg:p-0 p-2 mt-12 mb-8 lg:h-96 mx-auto flex flex-col ">
      
      <h1 className="text-center text-4xl  font-bold">About Us</h1>
      <p className="font-bold">About us:</p>
      <p className=" ">
        Liefermars.de was founded in January 2023 in Ludwigshafen, Germany with
        a vision to transform the existing food delivery mechanism into a
        digital world throughout Europe. We are not only playing an intermediary
        role but also working on capacity building of newly emergent businesses
        in the food sector. With highly skilled team liefermars.de provides
        customer focused services including exchange of information among users
        and service providers, 6Hr technical support and complaint handling
        mechanism. Liefermars.de came into existence to transform the food
        delivery services for customers SMART and easy anywhere. Liefermars.de
        is unique consolidated platform which gives users options to order their
        favorite food from the nearest partner restaurant. The p…
      </p>
      
    </div>

    <Footer  />
    
    </>
  );
};

export default About;
