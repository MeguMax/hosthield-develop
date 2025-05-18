import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
//Icons
import HostshieldShieldSymbol from "../icons/hostshield-symbol";
import {
  ProfileIcon,
  LogoutIcon,
  HamburgerIcon,
  MenuCloseIcon,
  AddWaiverIcon,
  MyWaiverIcon,
} from "../icons/icons";
import { ChevronDownIcon } from "@heroicons/react/solid";

function Header() {
  const router = useRouter();
  const [profileName, setProfileName] = useState('');

  useEffect(() => {
    // check if user is logged in: if not, redirect to login page
    const userItem = JSON.parse(localStorage.getItem('user'));
    if (!userItem || !userItem.ttl || userItem.ttl < new Date().getTime()) {
      return router.push('/');
    }
    setProfileName(userItem.value.username);
  }, [router]);

  const handleLogout = () => {
    // remove user token from localStorage and redirect to login screen
    localStorage.removeItem('user');
  }

  return (
    <header className="text-gray-600 body-font fixed z-50">
      <div className="w-screen mx-auto flex justify-between md:justify-start flex-wrap bg-navbar-gradient items-center">
        <a className="flex title-font font-medium p-5.5 bg-navbar-logo-gradient items-center text-gray-900">
          <HostshieldShieldSymbol className="w-6 h-6 md:w-7 md:h-7" />
        </a>
        <div className="w-9/12 sm:w-10/12 md:w-10/12 md:ml-8 md:mx-auto xl:w-11/12 xl:ml-5 2xl:mx-auto ml-2 flex justify-between space-x-2 items-center">
          <Link href="/dashboard">
            <a className="text-xl text-white text-center w-full md:w-auto font-normal">
              Host<span className="font-medium">Shield</span>
            </a>
          </Link>
          <div className=" text-right">
            <Menu
              as="div"
              className="relative inline-block md:hidden text-left"
            >
              {({ open, active }) => (
                <>
                  <div className="rounded-none border-none">
                    <Menu.Button className="bg-opacity-0 inline-flex justify-center w-full items-center px-4 py-5 lg:p-1.55 text-xs lg:text-sm font-medium text-white bg-black rounded-none border-transparent  focus:outline-none focus:ring-0 ring-transparent relative">
                      {open == false && (
                        <HamburgerIcon
                          className="w-5 h-5 ml-2"
                          aria-hidden="true"
                        />
                      )}
                      {open && (
                        <MenuCloseIcon
                          className="w-5 h-5 ml-2 rin"
                          aria-hidden="true"
                        />
                      )}
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
                    <StyledMenuItems className="absolute right-0 w-screen bg-white rounded-t-none rounded-b-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div>
                        <Menu.Item>
                          {({ active }) => (
                            <>
                              <Link href="/dashboard/user/create-waiver">
                                <a
                                  className={`${
                                    active
                                      ? "bg-site-main text-white "
                                      : "text-site-dark text-opacity-50"
                                  } hover:bg-site-main hover:text-white flex items-center w-screen p-left-1.6 py-4 cursor-pointer text-sm`}
                                  id="menu-link"
                                >
                                  {active ? (
                                    <AddWaiverIcon
                                      className="w-5 h-5 mr-4"
                                      aria-hidden="true"
                                      fillColor="#fff"
                                      opacity={1}
                                    />
                                  ) : (
                                    <AddWaiverIcon
                                      className="w-5 h-5 mr-4"
                                      aria-hidden="true"
                                    />
                                  )}
                                  Add New Waiver
                                </a>
                              </Link>
                              <hr className="w-11/12 mx-auto sm:mx-6 border-site-dark border-opacity-10" />
                            </>
                          )}
                        </Menu.Item>
                      </div>
                      <div>
                        <Menu.Item>
                          {({ active }) => (
                            <>
                              <Link href="/dashboard/user/my-waiver">
                                <a
                                  className={`${
                                    active
                                      ? "bg-site-main text-white "
                                      : "text-site-dark text-opacity-50"
                                  } hover:bg-site-main hover:text-white flex items-center w-screen p-left-1.6 py-4 cursor-pointer text-sm`}
                                  id="menu-link"
                                >
                                  {active ? (
                                    <MyWaiverIcon
                                      className="w-5 h-5 mr-4"
                                      aria-hidden="true"
                                      fillColor="#fff"
                                      opacity={1}
                                    />
                                  ) : (
                                    <MyWaiverIcon
                                      className="w-5 h-5 mr-4"
                                      aria-hidden="true"
                                    />
                                  )}
                                  My Waivers
                                </a>
                              </Link>
                              <hr className="w-11/12 mx-auto sm:mx-6 border-site-dark border-opacity-10" />
                            </>
                          )}
                        </Menu.Item>
                      </div>

                      <div>
                        <Menu
                          as="div"
                          className="relative inline-block text-left "
                        >
                          {({ open, active }) => (
                            <>
                              <div
                                className={`${
                                  open
                                    ? "hover:bg-site-main hover:text-white"
                                    : ""
                                }`}
                              >
                                <Menu.Button
                                  className={`${
                                    open
                                      ? "bg-site-main text-white"
                                      : " text-site-dark"
                                  } inline-flex w-screen text-left items-center p-left-1.6 py-4 text-sm font-medium  text-opacity-50 focus:outline-none relative`}
                                >
                                  {profileName}
                                  <ChevronDownIcon
                                    className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                                    aria-hidden="true"
                                  />
                                  <div
                                    className={`${
                                      open
                                        ? "absolute bottom-0 left-12"
                                        : "hidden"
                                    }`}
                                    style={{
                                      borderLeft: "8px solid transparent",
                                      borderRight: "8px solid transparent",
                                      borderBottom: "8px solid white",
                                      width: 0,
                                      height: 0,
                                    }}
                                  ></div>
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
                                <Menu.Items className="absolute left-6 w-3/4 sm:w-2/4 origin-top-left bg-white divide-y divide-gray-200 rounded-t-none rounded-b-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <div className="">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <Link href="/dashboard/user/my-profile">
                                          <a
                                            className={`${
                                              active
                                                ? "bg-site-main text-white "
                                                : "text-site-dark text-opacity-50"
                                            } hover:bg-site-main hover:text-white flex items-center w-full p-left-1.6 py-4 cursor-pointer text-sm`}
                                            id="menu-link"
                                          >
                                            {active ? (
                                              <ProfileIcon
                                                className="w-5 h-5 mr-4 "
                                                aria-hidden="true"
                                                fillColor="#fff"
                                                opacity={1}
                                              />
                                            ) : (
                                              <ProfileIcon
                                                className="w-5 h-5 mr-4"
                                                aria-hidden="true"
                                              />
                                            )}
                                            My Profile
                                          </a>
                                        </Link>
                                      )}
                                    </Menu.Item>
                                  </div>
                                  <div>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <Link href="/">
                                          <a
                                            className={`${
                                              active
                                                ? "bg-site-main text-white"
                                                : "text-site-dark text-opacity-50"
                                            } hover:bg-site-main hover:text-white flex items-center rounded-b-md w-full pl-7 py-4  text-sm`}
                                            id="menu-link"
                                          >
                                            {active ? (
                                              <LogoutIcon
                                                className="w-5 h-5 mr-3.5"
                                                aria-hidden="true"
                                                fillColor="#fff"
                                                opacity={1}
                                              />
                                            ) : (
                                              <LogoutIcon
                                                className="w-5 h-5 mr-3.5"
                                                aria-hidden="true"
                                              />
                                            )}
                                            <span onClick={handleLogout}>Logout</span>
                                          </a>
                                        </Link>
                                      )}
                                    </Menu.Item>
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </>
                          )}
                        </Menu>
                      </div>
                    </StyledMenuItems>
                  </Transition>
                </>
              )}
            </Menu>
            <Menu
              as="div"
              className="relative hidden md:inline-block text-left "
            >
              {({ open, active }) => (
                <>
                  <div>
                    <StyledMenuButton
                      className={`${
                        open ? "bg-opacity-10" : "bg-opacity-0"
                      } inline-flex justify-center w-full h-full items-center px-4 py-5 lg:p-1.55 text-xs lg:text-sm font-medium text-white bg-black  hover:bg-opacity-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative`}
                    >
                      {profileName}
                      <ChevronDownIcon
                        className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                        aria-hidden="true"
                      />
                      <div
                        className={`${open ? "absolute bottom-0" : "hidden"}`}
                        style={{
                          borderLeft: "8px solid transparent",
                          borderRight: "8px solid transparent",
                          borderBottom: "8px solid white",
                          width: 0,
                          height: 0,
                        }}
                      ></div>
                    </StyledMenuButton>
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
                    <Menu.Items className="absolute right-0 w-56 origin-top-left bg-white divide-y divide-gray-200 rounded-t-none rounded-b-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="">
                        <Menu.Item>
                          {({ active }) => (
                            <Link href="/dashboard/user/my-profile">
                              <a
                                className={`${
                                  active
                                    ? "bg-site-main text-white "
                                    : "text-site-dark text-opacity-50"
                                } hover:bg-site-main hover:text-white flex items-center w-full p-left-1.6 py-4 cursor-pointer text-sm`}
                                id="menu-link"
                              >
                                {active ? (
                                  <ProfileIcon
                                    className="w-5 h-5 mr-4 "
                                    aria-hidden="true"
                                    fillColor="#fff"
                                    opacity={1}
                                  />
                                ) : (
                                  <ProfileIcon
                                    className="w-5 h-5 mr-4"
                                    aria-hidden="true"
                                  />
                                )}
                                My Profile
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                      <div>
                        <Menu.Item>
                          {({ active }) => (
                            <Link href="/">
                              <a
                                className={`${
                                  active
                                    ? "bg-site-main text-white"
                                    : "text-site-dark text-opacity-50"
                                } hover:bg-site-main hover:text-white flex items-center rounded-b-md w-full pl-7 py-4  text-sm`}
                                id="menu-link"
                              >
                                {active ? (
                                  <LogoutIcon
                                    className="w-5 h-5 mr-3.5"
                                    aria-hidden="true"
                                    fillColor="#fff"
                                    opacity={1}
                                  />
                                ) : (
                                  <LogoutIcon
                                    className="w-5 h-5 mr-3.5"
                                    aria-hidden="true"
                                  />
                                )}
                                <span onClick={handleLogout}>Logout</span>
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}
const StyledMenuItems = styled(Menu.Items)``;

const StyledMenuButton = styled(Menu.Button)`
  @media screen and (max-width: 1023px) {
    height: 69.6px;
  }
`;

export default Header;
