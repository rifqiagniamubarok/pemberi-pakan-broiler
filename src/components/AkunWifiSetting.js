import React from "react";
import { BsFillGearFill } from "react-icons/bs";

function AkunWifiSetting({ ssidBaru, setWifiSettingOpen, setWifiSettingEdit }) {
  return (
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
  );
}

export default AkunWifiSetting;
