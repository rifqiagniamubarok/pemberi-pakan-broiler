import React, { useState, useEffect } from "react";
import NavbarComponent from "../views/NavbarComponent";
import { ImSwitch } from "react-icons/im";

import { useNavigate } from "react-router-dom";
import { parseCookies } from "nookies";

import { database } from "../firebase";
import { ref, set, child, get } from "firebase/database";
import Swal from "sweetalert2";

function ManualPage() {
  const dbRef = ref(database);
  const db = database;

  const [kodeSeri, setKodeSeri] = useState([]);

  const cookies = parseCookies();
  const navigate = useNavigate();

  const [beriMakan, setBeriMakan] = useState(false);

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
      <div className="container mx-auto pt-12 mt-10 grid px-2">
        <p className="text-2xl md:text-3xl font-semibold mb-4">MANUAL</p>
        {beriMakan ? (
          <div
            className="place-self-center bg-red-300 p-10 rounded-full mt-20 cursor-pointer hover:bg-red-200"
            onClick={() => {
              setBeriMakan(!beriMakan);
              set(
                ref(db, `daftardevice/${cookies.kodeseri}/data/manual`),
                false
              );
            }}
          >
            <ImSwitch className="w-20 h-20 fill-red-700 " />
          </div>
        ) : (
          <div
            className="place-self-center bg-green-300 p-10 rounded-full mt-20 cursor-pointer hover:bg-green-200"
            onClick={() => {
              setBeriMakan(!beriMakan);
              set(
                ref(db, `daftardevice/${cookies.kodeseri}/data/manual`),
                true
              );
            }}
          >
            <ImSwitch className="w-20 h-20 fill-green-700 " />
          </div>
        )}
        {beriMakan ? (
          <p className="font-medium text-2xl mt-8 text-black">
            BERHENTI MEMBERI PAKAN
          </p>
        ) : (
          <p className="font-medium text-2xl mt-8 text-black">
            BERI PAKAN SAAT INI
          </p>
        )}
      </div>
    </div>
  );
}

export default ManualPage;
