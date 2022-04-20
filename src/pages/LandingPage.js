import React, { useEffect } from "react";
import ControlVector from "../assets/control.svg";

import logoPolmed from "../assets/img/logoPolmed.png";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import NavbarLandingPage from "../views/NavbarLandingPage";

import LandingManfaat from "../components/LandingManfaat";
import LandingFitur from "../components/LandingFitur";

function LandingPage() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  return (
    <div className="">
      <NavbarLandingPage />
      <div className="grid grid-cols-1 ">
        <div className="grid grid-cols-1 md:grid-cols-2  pb-20 px-20 gap-x-20">
          <div className="w-full md:w-2/3 md:pl-20 mt-20 md:mt-36 md:place-self-end ">
            <img
              src={ControlVector}
              alt="gambar vector"
              className="w-full"
              data-aos={"fade-right"}
            />
          </div>
          <div
            className="text-center md:text-right text-2xl md:text-6xl font-bold text-indigo-900 mt-20 md:mt-44 md:place-self-start "
            data-aos={"fade-left"}
          >
            <p>PEMBERI PAKAN</p>
            <p>BROILER</p>
            <div className="text-xs md:text-xl text-yellow-500 mt-5 md:mt-0">
              <p>Media bantu peternak broiler untuk</p>
              <p>mengatasi permasalahan pemberian pakan</p>
            </div>
            <div className="md:mt-10 mt-5">
              <Link to="/login">
                <button className="text-xs md:text-sm font-medium text-white bg-indigo-900 px-3 py-1 rounded border-2 border-indigo-800 md:w-24 w-20 hover:bg-indigo-800">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="text-xs md:text-sm font-medium text-indigo-800 bg-white border-2 border-indigo-800 px-3 py-1 rounded ml-1 md:w-24 w-20 hover:bg-gray-100">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#312e81"
            fill-opacity="1"
            d="M0,96L48,101.3C96,107,192,117,288,112C384,107,480,85,576,85.3C672,85,768,107,864,117.3C960,128,1056,128,1152,128C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        {/* BATASSS */}
        <LandingManfaat />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#312e81"
            fill-opacity="1"
            d="M0,160L80,144C160,128,320,96,480,74.7C640,53,800,43,960,64C1120,85,1280,139,1360,165.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
        <LandingFitur />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#312e81"
            fill-opacity="1"
            d="M0,64L80,85.3C160,107,320,149,480,170.7C640,192,800,192,960,170.7C1120,149,1280,107,1360,85.3L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>

        {/* <div className="grid md:grid-cols-2 grid-cols-1 mb-32">
          <div className="place-self-center col-span-2">
            <img
              src={logoPolmed}
              alt="logo polmed"
              className="w-32 md:w-52 place-self-center"
              data-aos={"fade-down"}
            />
          </div>
          <div className="col-span-2 mt-10" data-aos={"fade-up"}>
            <p className="text-2xl text-center md:text-4xl font-semibold text-indigo-900">
              PROFIL PENGEMBANG
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default LandingPage;
