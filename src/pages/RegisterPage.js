import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { database } from "../firebase";
import { set, ref, child, get } from "firebase/database";
import Swal from "sweetalert2";
import { parseCookies } from "nookies";

function RegisterPage() {
  const navigate = useNavigate();
  const db = database;
  const dbRef = ref(database);
  const cookies = parseCookies();

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
  };

  useEffect(() => {
    if (cookies.akunTervalidasi !== undefined) {
      navigate("/home");
    }
    get(child(dbRef, `daftarakun/${cookies.akunTervalidasi}/kodeseri`)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          // setKodeSeri(snapshot.val());
          navigate("/home");
        } else {
        }
      }
    );
  }, []);

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
