import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { setLeftPanelIsOpen } from "../../../redux/actions/main";
//Icon
import { MyWaiverIcon, ProfileIcon, LogoutIcon } from "../icons/icons";
//Styles
import styled from "styled-components";

export default function LawyerLeftPanel() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { leftPanel } = useSelector((state) => state);
  const handleLogout = () => {
    // remove user token from localStorage and redirect to login screen
    localStorage.removeItem("user");
    router.push("/");
  };
  useEffect(() => {
    // check if user is logged in: if not, redirect to login page
    const userItem = JSON.parse(localStorage.getItem("user"));
    if (!userItem || !userItem.ttl || userItem.ttl < new Date().getTime()) {
      return router.push("/");
    }
  }, [router]);
  useEffect(() => {
    dispatch(setLeftPanelIsOpen(leftPanel.isOpen));
  }, []);
  return (
    <StyledLeftPanel
      className="leftpanel min-w-min hidden md:flex flex-col justify-between items-center shadow-xl bg-white fixed bottom-0 lg:bottom-auto"
      onMouseEnter={() => dispatch(setLeftPanelIsOpen(true))}
      onMouseLeave={() => dispatch(setLeftPanelIsOpen(false))}
    >
      <div className="w-full">
        <ul className="leftpanel-main-nav">
          <StyledLi className="w-full flex justify-center text-site-dark text-opacity-75 hover:text-opacity-100 hover:text-white p-4 border-b hover:bg-site-main hover:border-transparent ">
            <Link href="/dashboard/lawyer">
              <a className="flex justify-center cursor-pointer">
                <StyledMyWaiverIcon className="w-min" />
                <span className="hidden">Requests</span>
              </a>
            </Link>
          </StyledLi>
          <StyledLi className="w-full flex justify-center text-site-dark text-opacity-75 hover:text-opacity-100 hover:text-white p-4 border-b hover:bg-site-main hover:border-transparent ">
            <Link href="/dashboard/lawyer/my-profile">
              <a className="flex justify-center cursor-pointer">
                <StyledProfileIcon className="w-min" />
                <span className="hidden">My Profile</span>
              </a>
            </Link>
          </StyledLi>
        </ul>
      </div>
      <div className="w-full">
        <ul className="leftpanel-secondary-nav">
          <StyledLi
            onClick={handleLogout}
            className="w-full flex justify-center text-site-dark text-opacity-75 hover:text-opacity-100 hover:text-white p-4 border-t hover:bg-site-main hover:border-transparent cursor-pointer"
          >
            <StyledLogoutIcon className="w-min" />
            <span className="hidden">Logout</span>
          </StyledLi>
        </ul>
      </div>
    </StyledLeftPanel>
  );
}

const StyledLeftPanel = styled.div`
  transition: width 0.25s ease;
  width: 4.33rem;
  height: calc(100vh - 70px);
  @media (min-width: 1024px) {
    margin-top: 4.4rem;
    & :hover {
      width: 20vw;
      li {
        justify-content: start;
        svg {
          margin-left: 1.5rem;
        }
        span {
          display: flex;
        }
      }
      .leftpanel-main-nav,
      .leftpanel-secondary-nav {
        li:first-child {
          position: relative;
          span {
            margin-left: 2rem;
          }
        }
        li:nth-child(2) {
          position: relative;
          span {
            margin-left: 2rem;
          }
        }
        li:last-child {
          span {
            margin-left: 2rem;
          }
        }
      }
    }
  }
  @media (min-width: 1200px) {
    &:hover {
      width: 15vw;
    }
  }
  @media (min-width: 1536px) {
    &:hover {
      width: 15vw;
      li {
        padding: 1rem 2rem;
      }
    }
  }
  @media (min-width: 2000px) {
    &:hover {
      width: 10%;
    }
  }
`;
const StyledLi = styled.li`
  transition: background-color 0.25s ease;
  &:hover {
    svg g {
      opacity: 1;
    }
    svg > g path#Shape {
      fill: #fff !important;
    }
  }
`;
const StyledMyWaiverIcon = styled(MyWaiverIcon)`
  width: 1.15rem;
  height: 1.5rem;
`;
const StyledProfileIcon = styled(ProfileIcon)`
  width: 1.15rem;
  height: 1.3rem;
`;
const StyledLogoutIcon = styled(LogoutIcon)`
  width: 1.15rem;
  height: 1.3rem;
`;
