import React from "react";
import reactjs from "../assets/imgTek/reactjs.png";
import tailwind from "../assets/imgTek/tailwind.png";
import vscode from "../assets/imgTek/vscode.png";
import firebase from "../assets/imgTek/firebase.png";
import nodemcu from "../assets/imgTek/nodemcu.png";
import arduino from "../assets/imgTek/arduino.png";

function LandingTeknologi() {
  return (
    <div className="bg-indigo-900  md:pb-52 pb-32">
      <p
        className="text-2xl md:text-3xl font-semibold md:mt-0 mt-16 md:mb-20 md:tracking-widest text-white"
        data-aos={"fade-down"}
      >
        TEKNOLOGI
      </p>

      <div className="grid grid-cols-2 md:mx-0 mx-3 md:grid-cols-3 gap-x-2 md:gap-x-10 gap-y-5 md:gap-y-20 md:px-36 pt-10">
        {/* React */}
        <div
          className="bg-white p-2 md:p-5 rounded shadow"
          data-aos={"zoom-in"}
          data-aos-duration={"1000"}
        >
          <div>
            <img
              src={reactjs}
              alt="logo-react"
              className="rounded mb-2 shadow"
            />
          </div>
          <div>
            <p className="text-yellow-500 font-semibold text-xl md:text-3xl mb-5">
              React JS
            </p>
            <p className="text-black text-xs md:text-xl text-justify ">
              Kami menggunakan framework React JS sebagai pembangun utama
              website ini. React JS merupakan framework keluaran dari facebook
              yang telah banyak digunakan.
            </p>
          </div>
        </div>
        {/* akhir React */}
        {/* Tailwind */}
        <div
          className="bg-white p-2 md:p-5 rounded shadow"
          data-aos={"zoom-in"}
          data-aos-duration={"1000"}
        >
          <div>
            <img
              src={tailwind}
              alt="logo-react"
              className="rounded mb-2 shadow"
            />
          </div>
          <div>
            <p className="text-yellow-500 font-semibold text-xl md:text-3xl mb-5">
              Tailwind
            </p>
            <p className="text-black text-xs md:text-xl text-justify ">
              Kami menggunakan framework css Tailwind sebagai penghias utama
              website ini. Tailwind merupakan framework css yang cukup bagus dan
              mudah digunakan.
            </p>
          </div>
        </div>
        {/* akhir React */}
        {/* vscode */}
        <div
          className="bg-white p-2 md:p-5 rounded shadow"
          data-aos={"zoom-in"}
          data-aos-duration={"1000"}
        >
          <div>
            <img
              src={vscode}
              alt="logo-react"
              className="rounded mb-2 shadow "
            />
          </div>
          <div>
            <p className="text-yellow-500 font-semibold text-xl md:text-3xl mb-5">
              VS Code
            </p>
            <p className="text-black text-xs md:text-xl text-justify ">
              VS code atau visual studio code adalah kode editor yang kami
              gunakan dalam membuat website ini.
            </p>
          </div>
        </div>
        {/* akhirvscode */}
        {/*  firebase*/}
        <div
          className="bg-white p-2 md:p-5 rounded shadow"
          data-aos={"zoom-in"}
          data-aos-duration={"1000"}
        >
          <div>
            <img
              src={firebase}
              alt="logo-react"
              className="rounded mb-2 shadow "
            />
          </div>
          <div>
            <p className="text-yellow-500 font-semibold text-xl md:text-3xl mb-5">
              Firebase
            </p>
            <p className="text-black text-xs md:text-xl text-justify ">
              Kami menggunakan fitur realtime databse pada firebase untuk
              menampung data dari hardware/perangkat maupun software/website.
            </p>
          </div>
        </div>
        {/* akhir firebase*/}
        {/* nodemcu */}
        <div
          className="bg-white p-2 md:p-5 rounded shadow"
          data-aos={"zoom-in"}
          data-aos-duration={"1000"}
        >
          <div>
            <img
              src={nodemcu}
              alt="logo-react"
              className="rounded mb-2 shadow "
            />
          </div>
          <div>
            <p className="text-yellow-500 font-semibold text-xl md:text-3xl mb-5">
              Node MCU
            </p>
            <p className="text-black text-xs md:text-xl text-justify ">
              NodeMCU merupakan board elektronik yang kami pilih untuk digunakan
              sebagai media hardware yang kami buat.
            </p>
          </div>
        </div>
        {/* akhir nodemcu */}
        {/* arduin ide */}
        <div
          className="bg-white p-2 md:p-5 rounded shadow"
          data-aos={"zoom-in"}
          data-aos-duration={"1000"}
        >
          <div>
            <img
              src={arduino}
              alt="logo-react"
              className="rounded mb-2 shadow "
            />
          </div>
          <div>
            <p className="text-yellow-500 font-semibold text-xl md:text-3xl mb-5">
              Arduino IDE
            </p>
            <p className="text-black text-sm md:text-xl text-justify ">
              Arduino IDE adalah text editor yang kami gunakan dalam memprogram
              alat/hardware ini.
            </p>
          </div>
        </div>
        {/* akhir arduin ide */}
      </div>
    </div>
  );
}

export default LandingTeknologi;
