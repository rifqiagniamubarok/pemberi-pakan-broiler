import React from "react";
import WaktuImg from "../assets/img/waktu.png";
import HematImg from "../assets/img/hemat.png";
import TenangImg from "../assets/img/tenang.png";

function LandingManfaat() {
  return (
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
  );
}

export default LandingManfaat;
