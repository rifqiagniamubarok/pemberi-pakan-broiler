import React, { useState, useEffect } from "react";
import NavbarComponent from "../views/NavbarComponent";
import { useNavigate } from "react-router-dom";
import { parseCookies } from "nookies";
// import { ImSwitch } from "react-icons/im";
import { database } from "../firebase";
import { ref, set, child, get } from "firebase/database";
import Swal from "sweetalert2";

import { BiRefresh } from "react-icons/bi";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function HomePage() {
  // const [lamp, setLamp] = useState(false);
  const dbRef = ref(database);
  const cookies = parseCookies();
  const navigate = useNavigate();

  const [kodeSeri, setKodeSeri] = useState([]);

  let [percentage, setPercentage] = useState(0);

  // const handleLampu = () => {
  //   setLamp(!lamp);
  //   const db = database;
  //   set(ref(db, "989202"), {S
  //     lampuKuning: !lamp,
  //   });
  // };
  // const dbRef = ref(database);
  // get(child(dbRef, `coba`))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //     } else {
  //       console.log("No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  useEffect(() => {
    get(child(dbRef, `daftardevice/${cookies.kodeseri}/data/sensor`)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          setPercentage(snapshot.val());
        }
      }
    );
  });

  useEffect(() => {
    if (cookies.akunTervalidasi === undefined) {
      navigate("/login");
    }
    get(child(dbRef, `daftarakun/${cookies.akunTervalidasi}/kodeseri`)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          setKodeSeri(snapshot.val());
        } else {
          Swal.fire("Maaf", "Tidak ada seri yang terbaca", "error");
          navigate("/login");
        }
      }
    );
  }, []);

  return (
    <div>
      <NavbarComponent />
      <div className="container mx-auto pt-12 mt-10 grid grid-cols-1 md:grid-cols-2 p-5 gap-x-10">
        {/* {lamp ? (
            <button className="bg-red-200 p-4 rounded" onClick={handleLampu}>
              <ImSwitch className="fill-red-600 h-10 w-10" />
            </button>
          ) : (
            <button className="bg-green-200 p-4 rounded" onClick={handleLampu}>
              <ImSwitch className="fill-green-600 h-10 w-10" />
            </button>
          )}

          <p className="font-semibold mt-2">
            {lamp ? "TURN OFF LAMP" : "TURN ON LAMP"}
          </p> */}
        <div className="w-full md:w-1/2 justify-self-end md:p-1 p-7">
          <CircularProgressbar
            value={percentage}
            text={` ${percentage}%`}
            styles={buildStyles({
              // Rotation of path and trail, in number of turns (0-1)
              rotation: 0,

              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "butt",

              // Text size
              textSize: "25px",

              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,

              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',

              // Colors
              pathColor: `rgba(250, 204, 21, ${percentage / 20})`,
              textColor: "rgba(49, 46, 129)",
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
          />
        </div>
        <div className="justify-self-start h-full grid place-content-center  w-full">
          <div className="w-full ">
            <p className="text-4xl text-center md:text-left mt-5 md:text-5xl text-indigo-900 font-semibold">
              {percentage >= 80
                ? "Stok Pakan Banyak"
                : percentage >= 20
                ? "Stok Pakan cukup"
                : "Stok Pakan kurang"}
            </p>
          </div>
          <p className="cursor-pointer" onClick={() => navigate("/")}>
            refresh <BiRefresh className="inline" />
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
