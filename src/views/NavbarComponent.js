import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

function NavbarComponent() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <div>
      <nav className="fixed z-20 flex flex-wrap w-screen items-center justify-between px-2 py-1 top-0 bg-indigo-900 fill-white mb-3  ">
        <div className="container px-2 mx-auto flex flex-wrap items-center justify-between container  md:px-10">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start mt-2 md:mt-1 ">
            <Link to="/" className="font-bold text-white">
              PEMBERI PAKAN BROILER
            </Link>

            <div
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <GiHamburgerMenu className=" inline" />
            </div>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center " +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link to="/otomatis">
                  <p className="px-3 py-2 flex items-center text-sm md:text-lg font-semibold leading-snug text-white  hover:opacity-75">
                    <i className="fab fa-facebook-square text-lg  leading-lg "></i>
                    <span className="ml-2">Otomatis</span>
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/manual">
                  <p className="px-3 py-2 flex items-center text-sm md:text-lg font-semibold leading-snug text-white hover:opacity-75">
                    <i className="fab fa-twitter text-lg leading-lg  "></i>
                    <span className="ml-2">Manual</span>
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/akun">
                  <p className="px-3 py-2 flex items-center text-sm md:text-lg font-semibold leading-snug text-white hover:opacity-75">
                    <i className="fab fa-twitter text-lg leading-lg text-black  "></i>
                    <span className="ml-2">Akun</span>
                  </p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavbarComponent;
