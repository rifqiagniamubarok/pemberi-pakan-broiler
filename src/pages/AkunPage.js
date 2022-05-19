import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { parseCookies, destroyCookie } from "nookies";
import NavbarComponent from "../views/NavbarComponent";

import { database } from "../firebase";
import { ref, child, get } from "firebase/database";
import Swal from "sweetalert2";

import AkunAkunSetting from "../components/AkunAkunSetting";
import AkunAkunEdit from "../components/AkunAkunEdit";
import AkunPerangkatSetting from "../components/AkunPerangkatSetting";
import AkunPerangkatEdit from "../components/AkunPerangkatEdit";
import AkunWifiSetting from "../components/AkunWifiSetting";
import AkunWifiEdit from "../components/AkunWifiEdit";

function AkunPage() {
  // Inisiasi database firebase
  // dbref untuk melakukan write
  const dbRef = ref(database);

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

  // data perangkat
  const [dataSeri, setDataSeri] = useState([]);
  const [dataAkun, setDataAkun] = useState([]);

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
    get(child(dbRef, `daftarseri/dataseri`)).then((snapshot) => {
      if (snapshot.exists()) {
        setDataSeri(snapshot.val());
      } else {
      }
    });
    get(child(dbRef, `daftarakun/dataakun`)).then((snapshot) => {
      if (snapshot.exists()) {
        setDataAkun(snapshot.val());
      } else {
      }
    });
  }, []);

  console.log(kodeSeri);

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
              <AkunAkunSetting
                akunData={akunData}
                setAkunSettingOpen={setAkunSettingOpen}
                setAkunSettingEdit={setAkunSettingEdit}
                setUsernameBaru={setUsernameBaru}
                setEmailBaru={setEmailBaru}
                setPasswordBaru={setPasswordBaru}
              />
            ) : (
              <span></span>
            )}
            {akunSettingEdit ? (
              <AkunAkunEdit
                usernameBaru={usernameBaru}
                setUsernameBaru={setUsernameBaru}
                emailBaru={emailBaru}
                setEmailBaru={setEmailBaru}
                passwordBaru={passwordBaru}
                setPasswordBaru={setPasswordBaru}
                setAkunDataLengkap={setAkunDataLengkap}
                setAkunSettingOpen={setAkunSettingOpen}
                setAkunSettingEdit={setAkunSettingEdit}
                kodeSeri={kodeSeri}
                akunData={akunData}
              />
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
              <AkunPerangkatSetting
                kodeSeri={kodeSeri}
                setDeviceSettingOpen={setDeviceSettingOpen}
                setDeviceSettingEdit={setDeviceSettingEdit}
              />
            ) : (
              <span></span>
            )}
            {deviceSettingEdit ? (
              <AkunPerangkatEdit
                setSeriPerangkatBaru={setSeriPerangkatBaru}
                seriPerangkatBaru={seriPerangkatBaru}
                kodeSeri={kodeSeri}
                akunData={akunData}
                setDeviceSettingOpen={setDeviceSettingOpen}
                setDeviceSettingEdit={setAkunSettingEdit}
                dataSeri={dataSeri}
                dataAkun={dataAkun}
              />
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
              <AkunWifiSetting
                ssidBaru={ssidBaru}
                setWifiSettingOpen={setWifiSettingOpen}
                setWifiSettingEdit={setWifiSettingEdit}
              />
            ) : (
              <span></span>
            )}
            {wifiSettingEdit ? (
              <AkunWifiEdit
                ssidBaru={ssidBaru}
                setSsidBaru={setSsidBaru}
                passWifiBaru={passWifiBaru}
                setPassWifiBaru={setPassWifiBaru}
                setWifiSettingOpen={setAkunSettingOpen}
                setWifiSettingEdit={setAkunSettingEdit}
                dataSeri={dataSeri}
              />
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
