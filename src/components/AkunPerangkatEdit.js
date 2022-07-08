import React from "react";
import { useNavigate } from "react-router-dom";
import { parseCookies } from "nookies";

import { database } from "../firebase";
import { ref, set, child, get } from "firebase/database";

import Swal from "sweetalert2";

function AkunPerangkatEdit({
  setSeriPerangkatBaru,
  seriPerangkatBaru,
  kodeSeri,
  akunData,
  setDeviceSettingOpen,
  setDeviceSettingEdit,
  dataSeri,
  dataAkun,
}) {
  const cookies = parseCookies();
  const navigate = useNavigate();

  const dbRef = ref(database);
  const db = database;

  return (
    <div className="border-2 border-indigo-900 rounded grid grid-cols-4 p-2">
      <div className="grid col-span-4 text-left text-sm font-medium text-black place-self-center w-2/3">
        <p className="text-center text-md md:text-lg mb-2">Tambah Perangkat</p>
        <form className=" w-full">
          <input
            className="border border-indigo-900 rounded px-2 py-1 mb-1 w-full"
            placeholder="Masukan Seri Perangkat Baru"
            type="number"
            onChange={(e) => setSeriPerangkatBaru(e.target.value)}
          />
        </form>
      </div>
      <div className="col-span-4 place-self-center mt-4">
        <button
          className="bg-indigo-900 text-white w-20 text-sm font-semibold py-1 mr-1 rounded border border-indigo-900 "
          onClick={() => {
            get(child(dbRef, `daftarseri/${seriPerangkatBaru}/status`)).then(
              (snapshot) => {
                if (snapshot.exists()) {
                  if (snapshot.val() === false) {
                    Swal.fire({
                      title: "yakin",
                      text: `yakin ingin menambahkan perangkat baru dengan seri ${seriPerangkatBaru}`,
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Ya",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        set(
                          ref(db, `daftarseri/${seriPerangkatBaru}/status`),
                          true
                        );

                        set(
                          ref(
                            db,
                            `daftarakun/${cookies.akunTervalidasi}/kodeseri/${kodeSeri.length}`
                          ),
                          parseInt(seriPerangkatBaru)
                        );
                        // console.log(akunData.pass);
                        set(ref(db, `daftardevice/${seriPerangkatBaru}`), {
                          akun: {
                            username: akunData.username,
                            email: akunData.email,
                            pass: akunData.pass,
                          },
                          data: {
                            sensor: 0,
                            manual: false,
                            totalOtomatis: 6,
                            otomatis: {
                              1: {
                                jam: 0,
                                menit: 0,
                              },
                            },
                          },
                          wifi: {
                            ssid: "pemberiPakanBroiler",
                            pass: "broiler",
                          },
                          terhubung: false,
                        });

                        dataSeri.map((x, y) => {
                          if (x.seri == seriPerangkatBaru) {
                            set(
                              ref(db, `daftarseri/dataseri/${y}/status`),
                              true
                            );
                          }
                        });

                        dataAkun.map((x, y) => {
                          if (x.username == akunData.username) {
                            set(
                              ref(
                                db,
                                `daftarakun/dataakun/${y}/perangkat/${kodeSeri.length}`
                              ),
                              seriPerangkatBaru
                            );
                          }
                        });

                        Swal.fire(
                          "Berhasil",
                          `Seri baru telah ditambahkan`,
                          "success"
                        );
                        navigate("/akun");
                      }
                    });
                  } else {
                    Swal.fire(
                      "Maaf",
                      "Akun telah terdaftar silakan menambahkan seri di akun anda secara langsung ",
                      "error"
                    );
                  }
                } else {
                  Swal.fire("Maaf", "Akun telah terdaftar  ", "error");
                }
              }
            );
          }}
        >
          Add
        </button>
        <button
          className="bg-white text-indigo-900 w-20 text-sm font-semibold py-1 mr-1 rounded border border-indigo-900 "
          onClick={() => {
            setDeviceSettingOpen(true);
            setDeviceSettingEdit(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AkunPerangkatEdit;
