import React from "react";
import { BsFillGearFill } from "react-icons/bs";

function AkunAkunSetting({
  akunData,
  setAkunSettingOpen,
  setAkunSettingEdit,
  setUsernameBaru,
  setEmailBaru,
  setPasswordBaru,
}) {
  return (
    <div className="border-2 border-indigo-900 rounded grid grid-cols-4 p-2">
      <div className="col-span-1 text-left text-sm md:text-md font-medium">
        <p>Username</p>
        <p>Email</p>
        <p>Password</p>
      </div>
      <div className="col-span-3 text-left text-sm md:text-md font-medium text-gray-400">
        <p>{akunData.username}</p>
        <p>{akunData.email}</p>
        <p>****</p>
      </div>
      <div className="col-span-4 place-self-end">
        <button
          onClick={() => {
            setAkunSettingOpen(false);
            setAkunSettingEdit(true);
            setUsernameBaru(akunData.username);
            setEmailBaru(akunData.email);
            setPasswordBaru(akunData.pass);
          }}
        >
          <BsFillGearFill className="fill-gray-500 cursor-pointer hover:fill-gray-800" />
        </button>
      </div>
    </div>
  );
}

export default AkunAkunSetting;
