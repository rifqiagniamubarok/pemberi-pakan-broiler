import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { parseCookies, destroyCookie, setCookie } from "nookies";
import NavbarComponent from "../views/NavbarComponent";

import { database } from "../firebase";
import { ref, set, child, get, remove } from "firebase/database";
import Swal from "sweetalert2";

import { BsFillGearFill } from "react-icons/bs";
import { CgMoveRight, CgInsertAfterR } from "react-icons/cg";

function AkunPage() {
  const dbRef = ref(database);
  const db = database;

  const [kodeSeri, setKodeSeri] = useState([]);

  const cookies = parseCookies();
  const navigate = useNavigate();

  // akun
  const [akunData, setAkunData] = useState([]);
  const [akunDataLengkap, setAkunDataLengkap] = useState([]);

  const [usernameBaru, setUsernameBaru] = useState("");
  const [emailBaru, setEmailBaru] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  // setting
  const [akunSettingOpen, setAkunSettingOpen] = useState(false);
  const [akunSettingEdit, setAkunSettingEdit] = useState(false);

  // device
  const [seriPerangkatBaru, setSeriPerangkatBaru] = useState(0);
  // setting
  const [deviceSettingOpen, setDeviceSettingOpen] = useState(false);
  const [deviceSettingEdit, setDeviceSettingEdit] = useState(false);

  // wifi
  const [ssidBaru, setSsidBaru] = useState("");
  const [passWifiBaru, setPassWifiBaru] = useState("");
  // setting
  const [wifiSettingOpen, setWifiSettingOpen] = useState(false);
  const [wifiSettingEdit, setWifiSettingEdit] = useState(false);

  const handleLogOut = () => {
    destroyCookie(null, "akunTervalidasi");
    destroyCookie(null, "kodeseri");

    navigate("/login");
  };

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
    get(child(dbRef, `daftardevice/${cookies.kodeseri}/akun`)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          setAkunData(snapshot.val());
        } else {
          Swal.fire("Maaf", "Tidak ada seri yang terbaca", "error");
          navigate("/login");
        }
      }
    );
    get(child(dbRef, `daftardevice/${cookies.kodeseri}/wifi/ssid`)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          setSsidBaru(snapshot.val());
          get(child(dbRef, `daftardevice/${cookies.kodeseri}/wifi/pass`)).then(
            (snapshot) => {
              if (snapshot.exists()) {
                setPassWifiBaru(snapshot.val());
              } else {
              }
            }
          );
        } else {
        }
      }
    );
  }, []);

  return (
    <div>
      <NavbarComponent />
      <div className="container mx-auto pt-12 mt-10 grid px-2 ">
        <p className="text-2xl md:text-3xl font-semibold mb-4 ">AKUN</p>
        <div className="grid grid-cols-1  border-2 border-indigo-900 mx-2 md:w-1/3 place-self-center w-full rounded px-5 ">
          <div className="border-b-2 border-b-indigo-900  pb-2">
            <div
              className="bg-indigo-900 hover:bg-indigo-700 text-white rounded p-1 my-1 font-semibold cursor-pointer"
              onClick={() => {
                setAkunSettingOpen(!akunSettingOpen);
                setAkunSettingEdit(false);
              }}
            >
              <p className="">Akun</p>
            </div>
            {akunSettingOpen ? (
              <div className="border-2 border-indigo-900 rounded grid grid-cols-4 p-2">
                <div className="col-span-1 text-left text-sm md:text-md font-medium">
                  <p>Username</p>
                  <p>Email</p>
                  <p>Password</p>
                </div>
                <div className="col-span-3 text-left text-sm md:text-md font-medium text-gray-400">
                  <p>{akunData.username}</p>
                  <p>{akunData.email}</p>
                  <p>****</p>
                </div>
                <div className="col-span-4 place-self-end">
                  <button
                    onClick={() => {
                      setAkunSettingOpen(false);
                      setAkunSettingEdit(true);
                      setUsernameBaru(akunData.username);
                      setEmailBaru(akunData.email);
                      setPasswordBaru(akunData.pass);
                    }}
                  >
                    <BsFillGearFill className="fill-gray-500 cursor-pointer hover:fill-gray-800" />
                  </button>
                </div>
              </div>
            ) : (
              <span></span>
            )}
            {akunSettingEdit ? (
              <div className="border-2 border-indigo-900 rounded grid grid-cols-4 p-2">
                <div className="grid col-span-4 text-left text-sm font-medium text-black place-self-center w-2/3">
                  <p className="text-center text-md md:text-lg mb-2">
                    Edit Data Akun
                  </p>
                  <form className=" w-full">
                    <input
                      className="border border-indigo-900 rounded px-2 py-1 mb-1 w-full"
                      placeholder="Username Baru"
                      type="text"
                      value={usernameBaru}
                      onChange={(e) => setUsernameBaru(e.target.value)}
                    />
                    <input
                      className="border border-indigo-900 rounded px-2 py-1 mb-1 w-full"
                      placeholder="Email Baru"
                      type="email"
                      value={emailBaru}
                      onChange={(e) => setEmailBaru(e.target.value)}
                    />
                    <input
                      className="border border-indigo-900 rounded px-2 py-1 w-full"
                      placeholder="Password Baru"
                      type="password"
                      value={passwordBaru}
                      onChange={(e) => setPasswordBaru(e.target.value)}
                    />
                  </form>
                </div>
                <div className="col-span-4 place-self-center mt-4">
                  <button
                    className="bg-indigo-900 text-white w-20 text-sm font-semibold py-1 mr-1 rounded border border-indigo-900 "
                    onClick={() => {
                      Swal.fire({
                        title: "Yakin ?",
                        text: "Yakin Ingin Mengubah data akun ?",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Ya, yakin",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          kodeSeri.map((kode, idx) => {
                            set(ref(db, `daftardevice/${kode}/akun`), {
                              email: emailBaru,
                              pass: akunData.pass,
                              username: usernameBaru,
                            });
                          });
                          get(
                            child(
                              dbRef,
                              `daftarakun/${cookies.akunTervalidasi}`
                            )
                          ).then((snapshot) => {
                            if (snapshot.exists()) {
                              setAkunDataLengkap(snapshot.val());
                              set(ref(db, `daftarakun/${usernameBaru}/data`), {
                                email: emailBaru,
                                pass: passwordBaru,
                              });
                              set(
                                ref(db, `daftarakun/${usernameBaru}/kodeseri`),
                                kodeSeri
                              );
                            } else {
                              Swal.fire(
                                "Maaf",
                                "Tidak ada seri yang terbaca",
                                "error"
                              );
                              navigate("/login");
                            }
                          });

                          remove(
                            ref(db, `daftarakun/${cookies.akunTervalidasi}`)
                          );
                          setCookie(null, "akunTervalidasi", usernameBaru);
                          navigate("/akun");
                          Swal.fire(
                            "Berhasil!",
                            "Data akun berhasil diubah",
                            "success"
                          );
                        }
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-white text-indigo-900 w-20 text-sm font-semibold py-1 mr-1 rounded border border-indigo-900 "
                    onClick={() => {
                      setAkunSettingOpen(true);
                      setAkunSettingEdit(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <span></span>
            )}

            {/* BATASS */}
            <div
              className="bg-indigo-900 hover:bg-indigo-700 text-white rounded p-1 my-1 font-semibold cursor-pointer"
              onClick={() => {
                setDeviceSettingOpen(!deviceSettingOpen);
                setDeviceSettingEdit(false);
              }}
            >
              <p className="">Perangkat</p>
            </div>
            {deviceSettingOpen ? (
              <div className="border-2 border-indigo-900 rounded grid grid-cols-4 p-2">
                {kodeSeri.map((kode, ini) => (
                  <div className="col-span-4 text-right  font-medium grid grid-cols-2 gap-x-3">
                    <div className="text-sm md:text-lg">
                      <p>{kode}</p>
                    </div>
                    <div className="place-self-start">
                      {kode == cookies.kodeseri ? (
                        <span></span>
                      ) : (
                        <button
                          className="text-left bg-yellow-500 rounded  px-2 text-white hover:bg-yellow-300"
                          onClick={() => {
                            setCookie(null, "kodeseri", kode);
                            navigate("/home");
                          }}
                        >
                          <CgMoveRight className="text-white w-5 h-5 inline" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <div className="col-span-4 place-self-end">
                  <button
                    onClick={() => {
                      setDeviceSettingOpen(false);
                      setDeviceSettingEdit(true);
                    }}
                  >
                    <CgInsertAfterR className="text-gray-500 cursor-pointer hover:text-gray-800" />
                  </button>
                </div>
              </div>
            ) : (
              <span></span>
            )}
            {deviceSettingEdit ? (
              <div className="border-2 border-indigo-900 rounded grid grid-cols-4 p-2">
                <div className="grid col-span-4 text-left text-sm font-medium text-black place-self-center w-2/3">
                  <p className="text-center text-md md:text-lg mb-2">
                    Tambah Perangkat
                  </p>
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
                      get(
                        child(dbRef, `daftarseri/${seriPerangkatBaru}/status`)
                      ).then((snapshot) => {
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
                                  ref(
                                    db,
                                    `daftarseri/${seriPerangkatBaru}/status`
                                  ),
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
                                set(
                                  ref(db, `daftardevice/${seriPerangkatBaru}`),
                                  {
                                    akun: {
                                      username: akunData.username,
                                      email: akunData.email,
                                      pass: akunData.pass,
                                    },
                                    data: {
                                      sensor: 0,
                                      manual: false,
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
                                  }
                                );
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
                      });
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
            ) : (
              <span></span>
            )}
            {/* BATASss */}
            <div
              className="bg-indigo-900 hover:bg-indigo-700 text-white rounded p-1 my-1 font-semibold cursor-pointer"
              onClick={() => {
                setWifiSettingOpen(!wifiSettingOpen);
                setWifiSettingEdit(false);
              }}
            >
              <p className="">Wifi</p>
            </div>
            {wifiSettingOpen ? (
              <div className="border-2 border-indigo-900 rounded grid grid-cols-4 p-2">
                <div className="col-span-1 text-left text-sm md:text-md font-medium">
                  <p>Ssid</p>
                  <p>Password</p>
                </div>
                <div className="col-span-3 text-left text-sm md:text-md font-medium text-gray-400">
                  <p>{ssidBaru}</p>
                  <p>****</p>
                </div>
                <div className="col-span-4 place-self-end">
                  <button
                    onClick={() => {
                      setWifiSettingOpen(false);
                      setWifiSettingEdit(true);
                    }}
                  >
                    <BsFillGearFill className="fill-gray-500 cursor-pointer hover:fill-gray-800" />
                  </button>
                </div>
              </div>
            ) : (
              <span></span>
            )}
            {wifiSettingEdit ? (
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
                          set(
                            ref(db, `daftardevice/${cookies.kodeseri}/wifi`),
                            {
                              pass: ssidBaru,
                              ssid: passWifiBaru,
                            }
                          );

                          navigate("/akun");
                          Swal.fire(
                            "Berhasil!",
                            "Wifi berhasil diubah",
                            "success"
                          );
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
            ) : (
              <span></span>
            )}

            {/* batasss */}
          </div>
          <div className="">
            <p
              className="text-gray-400 text-sm cursor-pointer my-5"
              onClick={handleLogOut}
            >
              {" "}
              Log Out{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AkunPage;
