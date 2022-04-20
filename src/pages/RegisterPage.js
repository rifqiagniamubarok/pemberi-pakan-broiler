import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { database } from "../firebase";
import { set, ref, child, get } from "firebase/database";
import Swal from "sweetalert2";

function RegisterPage() {
  const navigate = useNavigate();
  const db = database;
  const dbRef = ref(database);

  // state pengambilan data
  const [akunTerdaftar, setAkunTerdaftar] = useState([]);
  const [seriTerdaftar, setSeriTerdaftar] = useState([]);

  const [seriInput, setSeriInput] = useState(0);
  const [emailInput, setEmailInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInputValidasi, setPasswordValidasi] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [passSama, setPassSama] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (passwordInputValidasi === passwordInput) {
      get(child(dbRef, `daftarseri/${seriInput}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            // cc
            get(child(dbRef, `daftarseri/${seriInput}/status`))
              .then((snapshot) => {
                if (snapshot.exists()) {
                  // cc
                  if (snapshot.val() === false) {
                    // cc
                    get(child(dbRef, `daftarakun/${usernameInput}`))
                      .then((snapshot) => {
                        if (snapshot.exists()) {
                          // cc
                          Swal.fire(
                            "Maaf",
                            "Akun telah terdaftar silakan menambahkan seri di akun anda secara langsung ",
                            "error"
                          );
                        } else {
                          set(ref(db, `daftarseri/${seriInput}/status`), true);

                          set(ref(db, `daftarakun/${usernameInput}`), {
                            data: {
                              email: emailInput,
                              pass: passwordInput,
                            },
                            kodeseri: {
                              1: seriInput,
                            },
                          });

                          set(ref(db, `daftardevice/${seriInput}`), {
                            akun: {
                              username: usernameInput,
                              email: emailInput,
                              pass: passwordInput,
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
                          });
                          Swal.fire(
                            "success",
                            "Akun telah berhasil dibuat  ",
                            "true"
                          );
                          navigate("/login");
                        }
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  } else {
                    Swal.fire("Maaf", "Seri telah terdaftar  ", "error");
                  }
                } else {
                  Swal.fire("Maaf", "Seri telah terdaftar  ", "error");
                }
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            Swal.fire("Maaf", "Seri belum terdaftar  ", "error");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setPassSama(true);
    }

    // let jumlahAkun = akunTerdaftar.length;
    // let jumlahSeri = seriTerdaftar.length;

    // let cekAkun = akunTerdaftar.filter((akun) => akun.email === emailInput);
    // let cekSeri = seriTerdaftar.filter((akun) => akun.kode === seriInput);

    // if (passwordInputValidasi === passwordInput) {
    //   if (cekAkun.length === 0) {
    //     if (cekSeri === 0) {
    //       Swal.fire("Maaf", "Seri belum terdaftar  ", "error");
    //     } else {
    //       seriTerdaftar.map((nilai, idx) => {
    //         if (nilai.kode === seriInput && nilai.status === false) {
    //           const db = database;
    //           // input data pendukung
    //           set(ref(db, `akunvalidasi/` + jumlahAkun), {
    //             email: emailInput,
    //             pass: passwordInput,
    //             seri: seriInput,
    //           });
    //           set(ref(db, `seriterdaftar/` + idx + "/status"), true);

    //           // input data utama
    //           set(ref(db, seriInput + "/akun"), {
    //             email: emailInput,
    //             pass: passwordInput,
    //           });
    //           set(ref(db, seriInput + "/data/aksi/manual"), false);
    //           set(ref(db, seriInput + "/data/sensor/nilai"), 0);
    //           Swal.fire("success", "Seri telah berhasil dibuat  ", "true");
    //           navigate("/login");
    //         } else if (nilai.kode === seriInput && nilai.status === true) {
    //           Swal.fire("Maaf", "Seri telah terdaftar dan aktif ", "error");
    //         }
    //       });
    //     }

    //     // console.log(jumlah);
    //   } else {
    //     Swal.fire("Maaf", "Akun telah terdaftar  ", "error");
    //   }
    // } else {
    //   setPassSama(true);
    // }
  };

  // useEffect(() => {
  //   const dbRef = ref(database);
  //   get(child(dbRef, `akunvalidasi`))
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         setAkunTerdaftar(snapshot.val());
  //       } else {
  //         console.log("No data available");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //   get(child(dbRef, `seriterdaftar`))
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         setSeriTerdaftar(snapshot.val());
  //       } else {
  //         console.log("No data available");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // });

  return (
    <div className="h-screen flex bg-gray-100 md:p-0 p-3">
      <div className="w-full md:max-w-md m-auto bg-white rounded-lg border border-primary Border shadow py-10 px-16">
        <p className="text-xl md:text-2xl font-semibold text-primary mt-1  text-center">
          PEMBERI PAKAN BROILER
        </p>
        <p className="text-md md:text-2xl mt-1 mb-12">Register</p>

        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="seri">Kode Seri</label>
            <input
              type="number"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="seri"
              placeholder="Masukin Seri (Maximal 5 digit)"
              onChange={(e) => setSeriInput(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="username"
              placeholder="Masukin Username"
              onChange={(e) => setUsernameInput(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="email"
              placeholder="Masukin Email"
              onChange={(e) => setEmailInput(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="password"
              placeholder="Masukin Password"
              onChange={(e) => setPasswordInput(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Ulangin Masukin Password</label>
            <input
              type="password"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="password"
              placeholder="Ulangin Password"
              onChange={(e) => setPasswordValidasi(e.target.value)}
              required
            />
          </div>
          {passSama ? (
            <p className="text-red-400 text-sm ">email atau password salah</p>
          ) : (
            <span></span>
          )}
          <div className="text-sm text-sky-500">
            <p className="inline">sudah punya akun ?</p>
            <p className="inline ml-2 cursor-pointer">
              <Link to="/login">Login</Link>
            </p>
          </div>
          <div className="flex justify-center items-center mt-6">
            <Link to="/">
              <div
                className={`bg-white py-2 px-4 text-sm text-indigo-900 font-semibold rounded border border-indigo-900 focus:outline-none focus:border-green-dark mr-2 cursor-pointer`}
              >
                {" "}
                Back
              </div>
            </Link>
            <button
              className={`bg-indigo-900 py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
