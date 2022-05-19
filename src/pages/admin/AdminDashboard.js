import React, { useState, useEffect } from "react";
import { MdOutlineExitToApp } from "react-icons/md";
import { database } from "../../firebase";
import { ref, set, child, get } from "firebase/database";
import { useNavigate, Link } from "react-router-dom";
import { parseCookies, destroyCookie } from "nookies";
import Swal from "sweetalert2";

function AdminDashboard() {
  const db = database;
  const dbRef = ref(database);
  const cookies = parseCookies();
  const navigate = useNavigate();

  const [daftarPerangkat, setDaftarPerangkat] = useState([]);
  const [daftarAkun, setDaftarAkun] = useState([]);

  const [inputPerangkatBaru, setInputPerangkatBaru] = useState(0);

  const sampless = [1, 2, 223, 43234, 24];
  const [tambahPerangkat, setTambahPerangkat] = useState(false);

  const handleLogOut = () => {
    Swal.fire({
      text: "Yakin mau keluar ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Keluar",
    }).then((result) => {
      if (result.isConfirmed) {
        destroyCookie(null, "emailAdmin");
        destroyCookie(null, "passAdmin");

        Swal.fire("Anda berhasil Keluar", "success");
        navigate("/loginadmin");
      }
    });
  };

  const handleInputPerangkatBaru = () => {
    if (inputPerangkatBaru > 99999) {
      Swal.fire("Error!", "kodebaru lebih dari 5 digit", "error");
    } else {
      get(child(dbRef, `daftarseri/${inputPerangkatBaru}`)).then((snapshot) => {
        if (snapshot.exists()) {
          Swal.fire("Maaf", "Kode Seri Sudah ada", "error");
        } else {
          Swal.fire({
            title: "Yakin menambahkan",
            text: `menambahkan ${inputPerangkatBaru} sebagai kodeseri perangkat baru ?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, add it",
          }).then((result) => {
            if (result.isConfirmed) {
              set(ref(db, `daftarseri/dataseri/${daftarPerangkat.length}`), {
                seri: parseInt(inputPerangkatBaru),
                status: false,
              });
              set(ref(db, `daftarseri/${inputPerangkatBaru}`), {
                status: false,
              });
              Swal.fire(
                "Sukses",
                "Kode seri perangkat baru berhasil di input, silakan refresh halaman ini",
                "success"
              );
            }
          });
          setInputPerangkatBaru(0);
          navigate("/dashboardadmin");
        }
      });
    }
    // console.log(daftarPerangkat.length);
  };

  useEffect(() => {
    if (cookies.emailAdmin === undefined || cookies.passAdmin === undefined) {
      Swal.fire("Maaf", "email atau password salah", "error");
      navigate("/loginadmin");
    } else {
      get(child(dbRef, `admin/email`)).then((snapshot) => {
        if (snapshot.exists()) {
          if (snapshot.val() === cookies.emailAdmin) {
            get(child(dbRef, `admin/pass`)).then((snapshot) => {
              if (snapshot.exists()) {
                if (snapshot.val() === cookies.passAdmin) {
                } else {
                  Swal.fire("Maaf", "email atau password salah", "error");

                  destroyCookie(null, "emailAdmin");
                  destroyCookie(null, "passAdmin");

                  navigate("/loginadmin");
                }
              } else {
                Swal.fire(
                  "Maaf",
                  "terjadi kendala dalam login sebagai admin",
                  "error"
                );

                destroyCookie(null, "emailAdmin");
                destroyCookie(null, "passAdmin");

                navigate("/loginadmin");
              }
            });
          } else {
            Swal.fire("Maaf", "email atau password salah", "error");

            destroyCookie(null, "emailAdmin");
            destroyCookie(null, "passAdmin");

            navigate("/loginadmin");
          }
        } else {
          Swal.fire(
            "Maaf",
            "terjadi kendala dalam login sebagai admin",
            "error"
          );
          navigate("/loginadmin");
        }
      });
    }
  }, []);

  useEffect(() => {
    get(child(dbRef, `daftarseri/dataseri`)).then((snapshot) => {
      if (snapshot.exists()) {
        setDaftarPerangkat(snapshot.val());
      } else {
        console.log("errorrr");
      }
    });
    get(child(dbRef, `daftarakun/dataakun`)).then((snapshot) => {
      if (snapshot.exists()) {
        setDaftarAkun(snapshot.val());
      } else {
        console.log("errorrr");
      }
    });
  }, [get]);

  return (
    <div className="bg-slate-700 min-h-screen">
      <div className=" py-1 md:py-2 text-md md:text-xl text-indigo-300 font-semibold bg-slate-600 text-left ">
        <div className="container md:mx-auto mx-2 grid grid-cols-2">
          <div className="  ">
            <Link to="/dashboardadmin">Admin Dashboard</Link>
          </div>
          <div
            className="text-right cursor-pointer text-md pr-4 md:pr-0"
            onClick={() => handleLogOut()}
          >
            Keluar <MdOutlineExitToApp className="inline" />
          </div>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 mt-5 gap-x-2 ">
        {/* isi */}
        <div className="mx-2 md:mx-0">
          <div className="text-white bg-indigo-500 rounded px-1 text-xl">
            <p>Daftar Akun</p>
          </div>
          <div className="bg-slate-50 mt-2 rounded px-2 ">
            <div className="flex flex-row text-md text-indigo-500 font-semibold">
              <div className="basis-1/12">No.</div>
              <div className="basis-4/12 text-left">Username</div>
              <div className="basis-7/12">Perangkat</div>
            </div>
            <div>
              {daftarAkun.map((i, j) => (
                <div className="flex flex-row text-md text-black font-md">
                  <div className="basis-1/12 mr-1 text-right pr-3">{j}</div>
                  <div className="basis-4/12 text-left">{i.username}</div>
                  <div className="basis-7/12 grid grid-cols-4 md:grid-cols-5 justify-items-end">
                    {i.perangkat.map((m, n) => (
                      <div className="inline mx-1">{m}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5 md:mt-0 mx-2 md:mx-0">
          <div className="text-white bg-indigo-500 rounded px-1 text-xl">
            <p>Daftar Perangkat</p>
          </div>
          <div className="bg-slate-50 mt-2 rounded px-2 py-2 mb-20 md:mb-5">
            <div className="flex flex-row text-md text-indigo-500 font-semibold ">
              <div className="basis-1/12">No.</div>
              <div className="basis-11/12 text-left">Kode Perangkat</div>
            </div>
            <div className="">
              {daftarPerangkat.map((i, j) => (
                <div className="flex flex-row text-md text-black font-md my-0.5">
                  <div className="basis-1/12 mr-1 text-right pr-3">{j}</div>
                  <div className="basis-4/12 text-left">{i.seri}</div>
                  <div className="basis-4/12 text-center">
                    {i.status === true ? (
                      <p className="text-sm text-green-500">terpakai</p>
                    ) : (
                      <p className="text-sm text-red-600">belum terpakai</p>
                    )}
                  </div>
                  <div className="basis-3/12 text-right md:mr-3">
                    {i.status === false ? (
                      <button className="bg-red-500 py-1 px-2 rounded text-white text-xs font-semibold hover:bg-red-400">
                        Hapus
                      </button>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-black mt-3 " />

            {tambahPerangkat ? (
              <div className="grid grid-cols-2 text-xs md:text-sm mt-3 mb-3 ">
                <div className="text-left">
                  <input
                    className="border-2 border-gray-500 py-1 px-3 rounded focus:outline-none w-full"
                    type="number"
                    onChange={(e) => setInputPerangkatBaru(e.target.value)}
                  />
                </div>
                <div className="text-right font-semibold">
                  <button
                    className="bg-green-600 text-white py-1 px-1 md:px-2 rounded hover:bg-green-500"
                    onClick={() => handleInputPerangkatBaru()}
                  >
                    Tambah Perangkat
                  </button>
                  <button
                    className="bg-red-600 text-white py-1 px-1 md:px-2 rounded hover:bg-red-500 ml-1"
                    onClick={() => setTambahPerangkat(false)}
                  >
                    Batalkan
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid justify-items-center ">
                <button
                  className="bg-green-600 text-white py-2 px-5 rounded mt-3 font-semibold"
                  onClick={() => setTambahPerangkat(true)}
                >
                  Tambah perangkat
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
