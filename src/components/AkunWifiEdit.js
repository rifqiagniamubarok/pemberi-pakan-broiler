import React from "react";
import { database } from "../firebase";
import { parseCookies } from "nookies";
import { useNavigate } from "react-router-dom";

import { ref, set } from "firebase/database";
import Swal from "sweetalert2";

function AkunWifiEdit({
  ssidBaru,
  setSsidBaru,
  passWifiBaru,
  setPassWifiBaru,
  setWifiSettingOpen,
  setWifiSettingEdit,
}) {
  const navigate = useNavigate();

  const cookies = parseCookies();

  const db = database;
  return (
    <div className="border-2 border-indigo-900 rounded grid grid-cols-4 p-2">
      <div className="grid col-span-4 text-left text-sm font-medium text-black place-self-center w-2/3">
        <p className="text-center text-md md:text-lg mb-2">
          Edit Wifi Perangkat
        </p>
        <form className=" w-full">
          <input
            className="border border-indigo-900 rounded px-2 py-1 mb-1 w-full"
            placeholder="Ssid Baru"
            type="text"
            value={ssidBaru}
            onChange={(e) => setSsidBaru(e.target.value)}
          />

          <input
            className="border border-indigo-900 rounded px-2 py-1 w-full"
            placeholder="Password Baru"
            type="password"
            value={passWifiBaru}
            onChange={(e) => setPassWifiBaru(e.target.value)}
          />
        </form>
      </div>
      <div className="col-span-4 place-self-center mt-4 ">
        <button
          className="bg-indigo-900 text-white w-20 text-sm font-semibold py-1 mr-1 rounded border border-indigo-900 "
          onClick={() => {
            Swal.fire({
              title: "Yakin ?",
              text: "Yakin Ingin Mengubah ssid dan password wifi ?",
              icon: "question",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ya, yakin",
            }).then((result) => {
              if (result.isConfirmed) {
                set(ref(db, `daftardevice/${cookies.kodeseri}/wifi`), {
                  pass: ssidBaru,
                  ssid: passWifiBaru,
                });

                navigate("/akun");
                Swal.fire("Berhasil!", "Wifi berhasil diubah", "success");
              }
            });
          }}
        >
          Edit
        </button>
        <button
          className="bg-white text-indigo-900 w-20 text-sm font-semibold py-1 mr-1 rounded border border-indigo-900 "
          onClick={() => {
            setWifiSettingOpen(true);
            setWifiSettingEdit(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AkunWifiEdit;
