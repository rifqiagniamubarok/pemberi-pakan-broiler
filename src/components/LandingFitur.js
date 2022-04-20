import React from "react";

import responsif from "../assets/responsive.svg";
import automatis from "../assets/time.svg";
import manual from "../assets/now.svg";
import multiperangkat from "../assets/multidevice.svg";

function LandingFitur() {
  return (
    <div className="bg-white text-indigo-900 md:pb-52 pb-32">
      <p
        className="text-2xl md:text-3xl font-semibold md:mt-0 mt-16 md:mb-20 md:tracking-widest"
        data-aos={"fade-down"}
      >
        FITUR
      </p>

      <div className="grid grid-cols-1 md:px-36 pt-10">
        {/* isi colom */}

        {/* akses dimanapun */}
        <div className="grid grid-cols-1 md:flex md:items-center md:justify-center">
          <div
            className=" md:basis-1/2 w-full grid grid-cols-1 md:ml-5 "
            data-aos={"fade-down-right"}
          >
            <div className="place-self-center md:place-self-end md:w-3/5 w-full grid">
              <img
                src={responsif}
                alt="waktu gambar"
                className="rounded w-3/5 place-self-center"
              />
            </div>
          </div>
          <div
            className=" md:basis-1/2 w-full md:mr-5 grid md:px-0 px-4 md:mt-0 mt-10"
            data-aos={"fade-down-left"}
          >
            <div className="md:place-self-start md:w-3/5 ">
              <p className="text-xl md:text-3xl font-semibold text-center text-yellow-400">
                Akses Dimanapun
              </p>
              <p className="text-md md:text-xl text-justify mt-2 md:mt-10">
                Kami memilih website sebagai media pengontrol dan monitoring
                alat kami. Dimana website memiliki kelebihan yaitu bisa diakses
                di manapun seperti HP, PC ataupun Laptop.
              </p>
            </div>
          </div>
        </div>
        {/* akhir akses dimanapun */}

        {/* otomatis */}
        <div className="grid grid-cols-1 md:flex md:items-center md:justify-center md:mt-32 mt-20">
          <div
            className=" md:basis-1/2 w-full grid grid-cols-1 md:ml-5 md:order-last"
            data-aos={"fade-down-left"}
          >
            <div className="place-self-center md:place-self-start md:w-3/5 w-full grid">
              <img
                src={automatis}
                alt="waktu gambar"
                className="rounded w-3/5 place-self-center"
              />
            </div>
          </div>
          <div
            className=" md:basis-1/2 w-full md:mr-5 grid md:px-0 px-4 md:mt-0 mt-10"
            data-aos={"fade-down-right"}
          >
            <div className="md:place-self-end md:w-3/5 ">
              <p className="text-xl md:text-3xl font-semibold text-center text-yellow-400">
                Otomatis
              </p>
              <p className="text-md md:text-xl text-justify mt-2 md:mt-10">
                Dengan fitur ini peternak tidak perlu khawatir lagi bila lupa
                memberi pakan ternak. Karena fitur otomatis berfungsi untuk
                memberikan pakan sesuai waktu yang diinginkan.
              </p>
            </div>
          </div>
        </div>
        {/* akhir otomatis */}

        {/* manual*/}
        <div className="grid grid-cols-1 md:flex md:items-center md:justify-center md:mt-32 mt-20">
          <div
            className=" md:basis-1/2 w-full grid grid-cols-1 md:ml-5 "
            data-aos={"fade-down-right"}
          >
            <div className="place-self-center md:place-self-end md:w-3/5 w-full grid">
              <img
                src={manual}
                alt="waktu gambar"
                className="rounded w-3/5 place-self-center"
              />
            </div>
          </div>
          <div
            className=" md:basis-1/2 w-full md:mr-5 grid md:px-0 px-4 md:mt-0 mt-10"
            data-aos={"fade-down-left"}
          >
            <div className="md:place-self-start md:w-3/5 ">
              <p className="text-xl md:text-3xl font-semibold text-center text-yellow-400">
                Manual
              </p>
              <p className="text-md md:text-xl text-justify mt-2 md:mt-10">
                Selain otomatis alat ini juga tetap bisa memberi pakan bila
                peternak menginginkan pemberi pakan di waktu itu juga. Dan
                pemberian diwaktu itu juga dapat dilakukan melalui tombol yang
                ada di website maupun tombol fisik yang ada di alat.
              </p>
            </div>
          </div>
        </div>
        {/* akhir manual*/}

        {/* multiperangkat */}
        <div className="grid grid-cols-1 md:flex md:items-center md:justify-center md:mt-32 mt-20">
          <div
            className=" md:basis-1/2 w-full grid grid-cols-1 md:ml-5 md:order-last"
            data-aos={"fade-down-left"}
          >
            <div className="place-self-center md:place-self-start md:w-3/5 w-full grid">
              <img
                src={multiperangkat}
                alt="waktu gambar"
                className="rounded w-3/5 place-self-center"
              />
            </div>
          </div>
          <div
            className=" md:basis-1/2 w-full md:mr-5 grid md:px-0 px-4 md:mt-0 mt-10"
            data-aos={"fade-down-right"}
          >
            <div className="md:place-self-end md:w-3/5 ">
              <p className="text-xl md:text-3xl font-semibold text-center text-yellow-400">
                Kendalikan Multi Perangkat
              </p>
              <p className="text-md md:text-xl text-justify mt-2 md:mt-10">
                Peternak tidak perlu membuat lebih dari satu akun bila
                menginginkan mengendalikan lebih dari satu perangkat/alat
                pemberi pakan broiler. Karena kami telah membuat satu akun bisa
                mengendalikan lebih dari satu perangkat/alat pemberi pakan
                broiler.
              </p>
            </div>
          </div>
        </div>

        {/* akhir multi perangkat */}
      </div>
    </div>
  );
}

export default LandingFitur;
