import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { parseCookies } from "nookies";
import NavbarComponent from "../views/NavbarComponent";
import { MdDelete } from "react-icons/md";
import { RiAddLine } from "react-icons/ri";
import { TiCancel } from "react-icons/ti";
import { BiRefresh } from "react-icons/bi";

import { database } from "../firebase";
import { ref, set, child, get } from "firebase/database";
import Swal from "sweetalert2";

function OtomatisPage() {
  const dbRef = ref(database);
  const db = database;
  const cookies = parseCookies();
  const navigate = useNavigate();

  const [kodeSeri, setKodeSeri] = useState([]);
  const [jadwalOtomatis, setJadwalOtomatis] = useState([]);
  const [jadwalSetelahDelete, setJadwalSetelahDelete] = useState([]);

  const [inputSalah, setInputSalah] = useState(false);

  const [menitInput, setMenitInput] = useState(0);
  const [jamInput, setJamInput] = useState(0);

  const [addItem, setAddItem] = useState(false);

  const handleUDelete = (n) => {
    // e.preventDefault();
    jadwalOtomatis.splice(n, 1);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");

        set(
          ref(db, `daftardevice/${cookies.kodeseri}/data/otomatis`),
          jadwalOtomatis
        );
        navigate("/otomatis");
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (jamInput < 24 && menitInput < 60 && jamInput > 0 && menitInput > 0) {
      Swal.fire({
        title: "Yakin menambahkan",
        text: `menambahkan ${jamInput} : ${menitInput}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, add it",
      }).then((result) => {
        if (result.isConfirmed) {
          set(
            ref(
              db,
              `daftardevice/${cookies.kodeseri}/data/otomatis/${jadwalOtomatis.length}`
            ),
            {
              jam: parseInt(jamInput),
              menit: parseInt(menitInput),
            }
          );
        }
        navigate("/otomatis");
      });
    } else {
      setInputSalah(true);
    }
    navigate("/otomatis");
  };

  useEffect(() => {
    get(child(dbRef, `daftardevice/${cookies.kodeseri}/data/otomatis`)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          setJadwalOtomatis(snapshot.val());
        } else {
          Swal.fire("Maaf", "Tidak ada seri yang terbaca", "error");
        }
      }
    );
  }, []);

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
    // get(child(dbRef, `daftardevice/${cookies.kodeseri}/data/otomatis`)).then(
    //   (snapshot) => {
    //     if (snapshot.exists()) {
    //       setJadwalOtomatis(snapshot.val());
    //     } else {
    //       Swal.fire("Maaf", "Tidak ada seri yang terbaca", "error");
    //     }
    //   }
    // );
  }, []);

  // console.log(jadwalOtomatis);

  return (
    <div>
      <NavbarComponent />
      <div className="container mx-auto pt-12 mt-10 grid px-2">
        <p className="text-2xl md:text-3xl font-semibold mb-2">OTOMATIS</p>
        <Link to="/otomatis">
          <button
            className="cursor-pointer mb-4"
            onClick={() => {
              navigate("/home");
              navigate("/otomatis");
            }}
          >
            refresh <BiRefresh className="inline" />
          </button>
        </Link>
        <div className="grid grid-cols-1  border-b-2 border-b-violet-900 mx-2 md:w-1/3 place-self-center w-full">
          {jadwalOtomatis.map((i, j) => (
            <div className="grid grid-cols-3 w-full   place-self-center bg-indigo-900 text-white rounded p-4 text-2xl font-semibold mb-2">
              <div className="col-span-2 text-left pl-10">
                {i.jam}:{i.menit}
              </div>
              <div className="place-self-end">
                <MdDelete
                  className="cursor-pointer hover:fill-gray-200"
                  onClick={() => {
                    handleUDelete(j);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        {addItem ? (
          <div className="md:w-1/3 w-full grid grid-cols-1 mt-2   place-self-center bg-white border-4 border-indigo-900 rounded p-4 text-2xl font-semibold mb-2">
            <form className="w-full grid grid-cols-3" onSubmit={handleSubmit}>
              <div className="col-span-2 ">
                <p className="2xl:inline text-sm xl:text-xl mr-8">
                  {" "}
                  Masukin Waktu :
                </p>
                <input
                  type="number"
                  className="bg-white font-semibold text-indigo-900 focus:outline-none inline border-b-2 border-indigo-900 rounded mx-1 w-14 text-center"
                  placeholder="00"
                  onChange={(e) => setJamInput(e.target.value)}
                />
                <input
                  type="number"
                  className="bg-white font-semibold text-indigo-900 focus:outline-none inline border-b-2 border-indigo-900 rounded mx-1 w-14 text-center"
                  placeholder="00"
                  onChange={(e) => setMenitInput(e.target.value)}
                />
              </div>
              <div className="place-self-end inline">
                <button>
                  <RiAddLine
                    className=" w-8 h-8 fill-white hover:fill-gray-100 bg-yellow-400 hover:bg-yellow-300 rounded inline cursor-pointer "
                    type="submit"
                  />
                </button>
                <TiCancel
                  className=" w-8 h-8 fill-white hover:fill-gray-100 bg-red-600 hover:bg-red-400 rounded inline ml-1 cursor-pointer"
                  onClick={() => setAddItem(false)}
                />
              </div>
            </form>
          </div>
        ) : (
          <span></span>
        )}

        {addItem ? (
          <span></span>
        ) : (
          <div className="place-self-center bg-yellow-400 rounded-full mt-5 md:mt-10 hover:bg-yellow-300 cursor-pointer">
            <RiAddLine
              className="md:w-20 md:h-20 w-14 h-14 fill-white hover:fill-gray-100"
              onClick={() => setAddItem(!addItem)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default OtomatisPage;
