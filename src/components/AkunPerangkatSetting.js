import React from "react";
import { useNavigate } from "react-router-dom";
import { parseCookies, destroyCookie, setCookie } from "nookies";
import { CgMoveRight, CgInsertAfterR } from "react-icons/cg";

function AkunPerangkatSetting({
  kodeSeri,
  setDeviceSettingOpen,
  setDeviceSettingEdit,
}) {
  const cookies = parseCookies();
  const navigate = useNavigate();
  return (
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
  );
}

export default AkunPerangkatSetting;
