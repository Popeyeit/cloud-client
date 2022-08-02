import React from "react";
import Logo from "../../assets/img/navbar-logo.svg";
import { NavLink } from "react-router-dom";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Container from "../Container/Container";
import { logoutOperation } from "../../store/user";

const navigation = [
  { name: "Sign In", href: "/login", current: true },
  { name: "Sign Up", href: "/registration", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar({
  dispatch,
  isAuth = false,
  avatarUrl = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
}) {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <Container className="px-2 mx-auto sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16 md:h-24">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <img
                    className="block w-auto h-8 md:hidden "
                    src={Logo}
                    alt="pied piper"
                  />
                  <img
                    className="hidden w-auto h-16 md:block "
                    src={Logo}
                    alt="pied piper"
                  />
                  <span>
                    <span className="text-xl font-medium text-white md:text-3xl">
                      pied
                    </span>
                    <span className="text-[#019688] text-xl md:text-3xl font-medium">
                      piper
                    </span>
                  </span>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {!isAuth && (
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) =>
                            isActive
                              ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm md:text-lg font-medium"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm md:text-lg font-medium"
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}

                {/* Profile dropdown */}
                {!isAuth && (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="w-8 h-8 rounded-full"
                          src={avatarUrl}
                          alt="avatar"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                dispatch(logoutOperation());
                              }}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700",
                                "w-full"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
            </div>
          </Container>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default NavBar;
