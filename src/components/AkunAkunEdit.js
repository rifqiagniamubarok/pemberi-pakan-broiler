import React from "react";

import { useNavigate } from "react-router-dom";

import { database } from "../firebase";
import { ref, set, child, get, remove } from "firebase/database";
import Swal from "sweetalert2";

import { parseCookies, destroyCookie, setCookie } from "nookies";

function AkunAkunEdit({
  usernameBaru,
  setUsernameBaru,
  passwordBaru,
  setPasswordBaru,
  emailBaru,
  setEmailBaru,
  setAkunDataLengkap,
  setAkunSettingOpen,
  setAkunSettingEdit,
  kodeSeri,
  akunData,
}) {
  const dbRef = ref(database);
  const db = database;
  const cookies = parseCookies();
  const navigate = useNavigate();

  return (
    <div className="border-2 border-indigo-900 rounded grid grid-cols-4 p-2">
      <div className="grid col-span-4 text-left text-sm font-medium text-black place-self-center w-2/3">
        <p className="text-center text-md md:text-lg mb-2">Edit Data Akun</p>
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
                get(child(dbRef, `daftarakun/${cookies.akunTervalidasi}`)).then(
                  (snapshot) => {
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
                      Swal.fire("Maaf", "Tidak ada seri yang terbaca", "error");
                      navigate("/login");
                    }
                  }
                );

                remove(ref(db, `daftarakun/${cookies.akunTervalidasi}`));
                setCookie(null, "akunTervalidasi", usernameBaru);
                navigate("/akun");
                Swal.fire("Berhasil!", "Data akun berhasil diubah", "success");
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
  );
}

export default AkunAkunEdit;
