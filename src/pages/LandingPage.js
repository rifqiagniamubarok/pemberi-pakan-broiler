import React, { useEffect } from "react";
import ControlVector from "../assets/control.svg";
import WaktuImg from "../assets/img/waktu.png";
import HematImg from "../assets/img/hemat.png";
import TenangImg from "../assets/img/tenang.png";

import logoPolmed from "../assets/img/logoPolmed.png";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function LandingPage() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  return (
    <div className="">
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
              <button className="text-xs md:text-sm font-medium text-white bg-indigo-900 px-3 py-1 rounded border-2 border-indigo-800 md:w-24 w-20 hover:bg-indigo-800">
                <Link to="/login">Login</Link>
              </button>
              <button className="text-xs md:text-sm font-medium text-indigo-800 bg-white border-2 border-indigo-800 px-3 py-1 rounded ml-1 md:w-24 w-20 hover:bg-gray-100">
                <Link to="/register">Register</Link>
              </button>
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
        <div className="bg-indigo-900 text-white md:pb-52 pb-32">
          <p
            className="text-2xl md:text-3xl font-semibold md:mt-0 mt-16 md:mb-20 md:tracking-widest"
            data-aos={"fade-down"}
          >
            MANFAAT
          </p>

          <div className="grid grid-cols-1 md:px-36 pt-10">
            {/* isi colom */}
            <div className="grid grid-cols-1 md:flex md:items-center md:justify-center">
              <div
                className=" md:basis-1/2 w-full grid grid-cols-1 md:ml-5 md:order-last"
                data-aos={"fade-left"}
              >
                <div className="place-self-center md:place-self-start md:w-3/5 w-full grid">
                  <img
                    src={WaktuImg}
                    alt="waktu gambar"
                    className="rounded w-3/5 place-self-center"
                  />
                </div>
              </div>
              <div
                className=" md:basis-1/2 w-full md:mr-5 grid md:px-0 px-4 md:mt-0 mt-10"
                data-aos={"fade-right"}
              >
                <div className="md:place-self-end md:w-3/5 ">
                  <p className="text-xl md:text-3xl font-semibold text-center text-yellow-300">
                    Efesiensi Waktu
                  </p>
                  <p className="text-md md:text-xl text-justify mt-2 md:mt-10">
                    Efesiensi waktu akan terjadi karena peternak tidak perlu
                    mengalokasikan lagi untuk memberi pakan secara langsung ke
                    peternakan.
                  </p>
                </div>
              </div>
            </div>

            {/* akhir colom */}

            {/* isi colom */}
            <div className="grid grid-cols-1 md:flex md:items-center md:justify-center md:mt-32 mt-20">
              <div
                className=" md:basis-1/2 w-full grid grid-cols-1 md:ml-5 "
                data-aos={"fade-right"}
              >
                <div className="place-self-center md:place-self-end md:w-3/5 w-full grid">
                  <img
                    src={HematImg}
                    alt="waktu gambar"
                    className="rounded w-3/5 place-self-center"
                  />
                </div>
              </div>
              <div
                className=" md:basis-1/2 w-full md:mr-5 grid md:px-0 px-4 md:mt-0 mt-10"
                data-aos={"fade-left"}
              >
                <div className="md:place-self-start md:w-3/5 ">
                  <p className="text-xl md:text-3xl font-semibold text-center text-yellow-300">
                    Menghemat Biaya
                  </p>
                  <p className="text-md md:text-xl text-justify mt-2 md:mt-10">
                    Biaya operasional peternak akan berkurang karena tidak
                    memerlukan karywan tambahan .
                  </p>
                </div>
              </div>
            </div>

            {/* akhir colom */}

            {/* isi colom */}
            <div className="grid grid-cols-1 md:flex md:items-center md:justify-center md:mt-32 mt-20">
              <div
                className=" md:basis-1/2 w-full grid grid-cols-1 md:ml-5 md:order-last"
                data-aos={"fade-left"}
              >
                <div className="place-self-center md:place-self-start md:w-3/5 w-full grid">
                  <img
                    src={TenangImg}
                    alt="waktu gambar"
                    className="rounded w-3/5 place-self-center"
                  />
                </div>
              </div>
              <div
                className=" md:basis-1/2 w-full md:mr-5 grid md:px-0 px-4 md:mt-0 mt-10"
                data-aos={"fade-right"}
              >
                <div className="md:place-self-end md:w-3/5 ">
                  <p className="text-xl md:text-3xl font-semibold text-center text-yellow-300">
                    Lebih Tenang
                  </p>
                  <p className="text-md md:text-xl text-justify mt-2 md:mt-10">
                    Teknologi pada alat ini bisa membuat peternak lebih tenang
                    karena memiliki sistem otomatis dan kendali jarak jauh.
                  </p>
                </div>
              </div>
            </div>

            {/* akhir colom */}
          </div>
        </div>
        {/* BATASSS */}

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#312e81"
            fill-opacity="1"
            d="M0,160L80,144C160,128,320,96,480,74.7C640,53,800,43,960,64C1120,85,1280,139,1360,165.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
        <div className="grid md:grid-cols-2 grid-cols-1 mb-32">
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
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
