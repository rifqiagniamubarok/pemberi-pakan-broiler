import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { database } from "../firebase";
import { ref, child, get } from "firebase/database";
import { setCookie, parseCookies } from "nookies";
import Swal from "sweetalert2";

function LoginPage() {
  const navigate = useNavigate();
  const dbRef = ref(database);
  const cookies = parseCookies();

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [unregistered, serUnregistered] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    get(child(dbRef, `daftarakun/` + usernameInput))
      .then((snapshot) => {
        if (snapshot.exists()) {
          get(child(dbRef, `daftarakun/` + usernameInput + `/data/pass`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                if (snapshot.val() === passwordInput) {
                  get(
                    child(dbRef, `daftarakun/${usernameInput}/kodeseri/1`)
                  ).then((snapshot) => {
                    if (snapshot.exists()) {
                      // setKodeSeri(snapshot.val());
                      setCookie(null, "akunTervalidasi", usernameInput);
                      setCookie(null, "kodeseri", snapshot.val());
                      Swal.fire("Login Success", "welcome", "success");
                      navigate("/home");
                    } else {
                      Swal.fire("Maaf", "Tidak ada seri yang terbaca", "error");
                      navigate("/login");
                    }
                  });
                } else {
                  serUnregistered(true);
                }
              } else {
                serUnregistered(true);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          console.log("No data available");
          serUnregistered(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
        <p className="text-md md:text-2xl mt-1 mb-12">Login</p>

        {/* {akunvalidasi.map((dc, n) => (
          <p>{dc}</p>
        ))} */}
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="username"
              placeholder="Masukan Username"
              onChange={(e) => setUsernameInput(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="password"
              placeholder="Masukan Password"
              onChange={(e) => setPasswordInput(e.target.value)}
              required
            />
          </div>
          {unregistered ? (
            <p className="text-red-400 text-sm ">email atau password salah</p>
          ) : (
            <span></span>
          )}
          <div className="text-sm text-sky-500">
            <p className="inline">belum punya akun ?</p>
            <p className="inline ml-2 cursor-pointer">
              <Link to="/register">register</Link>
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
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
