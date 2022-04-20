import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

function NavbarLandingPage() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <div>
      <nav className="z-20 flex flex-wrap w-screen items-center justify-between md:px-24 py-1 top-0 bg-white fill-white   ">
        <div className="container md:px-20 md:mx-20 flex flex-wrap items-center justify-between  ">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start mt-2 md:mt-1 ">
            <div
              className="text-indigo-900 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
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
                <Link to="#">
                  <p className="px-3 py-2 flex items-center text-sm md:text-lg font-semibold leading-snug text-indigo-900   hover:opacity-75">
                    <i className="fab fa-facebook-square text-lg  leading-lg "></i>
                    <span className="ml-2">Tutorial</span>
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#">
                  <p className="px-3 py-2 flex items-center text-sm md:text-lg font-semibold leading-snug text-indigo-900  hover:opacity-75">
                    <i className="fab fa-twitter text-lg leading-lg  "></i>
                    <span className="ml-2">Pengembang</span>
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#">
                  <p className="px-3 py-2 flex items-center text-sm md:text-lg font-semibold leading-snug text-indigo-900  hover:opacity-75">
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

export default NavbarLandingPage;
