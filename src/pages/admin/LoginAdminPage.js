import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import { database } from "../../firebase";
import { ref, child, get } from "firebase/database";
import { setCookie, parseCookies } from "nookies";

function LoginAdminPage() {
  const navigate = useNavigate();
  const dbRef = ref(database);
  const cookies = parseCookies();

  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");

  const [inputSalah, setInputSalah] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    get(child(dbRef, `admin/email`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          if (snapshot.val() === emailInput) {
            get(child(dbRef, `admin/pass`))
              .then((snapshot) => {
                if (snapshot.exists()) {
                  if (snapshot.val() === passInput) {
                    setCookie(null, "emailAdmin", emailInput);
                    setCookie(null, "passAdmin", passInput);
                    navigate("/dashboardadmin");
                  } else {
                    setInputSalah(true);
                  }
                } else {
                  console.log("erro");
                }
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            setInputSalah(true);
          }
        } else {
          console.log("erro");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="h-screen flex bg-indigo-900 md:p-0 p-3">
      <div className="w-full md:max-w-md m-auto bg-white rounded-lg border border-primary Border shadow py-10 px-16">
        <p className="text-xl md:text-2xl font-semibold text-primary mt-1  text-center">
          PEMBERI PAKAN BROILER
        </p>
        <p className="text-md md:text-2xl mt-1 mb-12">Login as Admin</p>

        {/* {akunvalidasi.map((dc, n) => (
        <p>{dc}</p>
      ))} */}
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="email"
              placeholder="Masukan Email Admin"
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
              placeholder="Masukan Password Admin"
              onChange={(e) => setPassInput(e.target.value)}
              required
            />
          </div>
          {inputSalah ? (
            <p className="text-red-400 text-sm ">email atau password salah</p>
          ) : (
            <span></span>
          )}
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

export default LoginAdminPage;
