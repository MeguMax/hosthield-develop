import { useRef, useEffect, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import { RiCloseFill } from "react-icons/ri";

import Link from "next/link";
import { FiPlus } from "react-icons/fi";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { setWarningPaymentModalIsOpen } from "../../../redux/actions/main";
export default function WarningPaymentModal({
  ModalTitle,
  shareUrl,
  shareUrlName,
  children,
}) {
  const CopyInputRef = useRef(null);
  const dispatch = useDispatch();
  const { warningPaymentModal } = useSelector((state) => state);
  const [remainingDays, setRemainingDays] = useState(0);
  const [aditionalPrice, setAditionalPrice] = useState(0);

  useLayoutEffect(() => {
    const userItem = JSON.parse(localStorage.getItem("user"));
    let now = new Date(Date.now());
    let unix_timestamp = userItem.value.subscription.current_period_end;
    var date = new Date(unix_timestamp * 1000);
    var calc1 = now.getDate() - date.getDate();

    var newQuantity = userItem.value.quantity + 1;
    var discount = userItem.value.discount;

    if (calc1 < 0) {
      setRemainingDays(Math.abs(calc1));
      let percents = 100 - Number(remainingDays / 0.3).toFixed(2);
      setAditionalPrice(39.99 - (39.99 / 100) * percents);
    } else {
      setRemainingDays(30 - calc1);
      let percents = 100 - Number(remainingDays / 0.3).toFixed(2);
      setAditionalPrice(39.99 - (39.99 / 100) * percents);
    }
  });

  useEffect(() => {
    dispatch(setWarningPaymentModalIsOpen(false));
  }, [dispatch]);
  return (
    <StyledModal
      className={`${warningPaymentModal.isOpen ? "visible" : "invisible"}`}
    >
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col w-11/12 sm:w-9/12 lg:w-6/12 2xl:w-3/12 h-5/12 bg-white rounded-md">
          <div className="w-full py-4 px-6 flex justify-between items-center">
            <h1 className="font-semibold text-2xl tracking-wide" >Create a New Waiver.</h1>
            <RiCloseFill
              className="text-gray-300 text-2xl cursor-pointer"
              onClick={() => {
                dispatch(
                  setWarningPaymentModalIsOpen(!warningPaymentModal.isOpen)
                );
                dispatch(setWarningPaymentModalIsOpen(""));
              }}
            />
          </div>
          <StyledModalHeader>
            <div>
              <svg
                width="570"
                height="634"
                viewBox="0 0 570 634"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.25">
                  <path
                    d="M533.203 336.891L297.863 102.246C294.475 98.8397 289.869 96.9244 285.065 96.9244C280.26 96.9244 275.654 98.8397 272.266 102.246L36.6479 337.03C-6.89371 212.491 0.89648 117.931 0.89648 117.931C0.89648 117.931 159.448 0.0347776 284.891 0C410.403 0 568.954 117.827 568.954 117.827C568.954 117.827 576.814 212.387 533.203 336.891Z"
                    fill="#9C2D1F"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M272.161 181.54C279.254 174.497 290.7 174.497 297.792 181.54L510.11 394.587C441.389 544.792 286.629 632.293 284.89 633.266C284.828 633.23 284.733 633.175 284.606 633.101C276.172 628.202 126.516 541.266 59.5654 394.309L272.161 181.54ZM246.565 412.603L211.788 517.249H358.062L323.285 412.603C350.417 395.495 362.958 362.501 354.04 331.691C345.122 300.881 316.896 279.687 284.821 279.717C252.813 279.833 224.722 301.057 215.867 331.816C207.012 362.574 219.519 395.486 246.565 412.603Z"
                    fill="#9C2D1F"
                  />
                </g>
              </svg>
              <div>
                <p>
                  You have {remainingDays} days left until the next billing, you
                  will be charged{" "}
                  <b>{"$" + Number(aditionalPrice).toFixed(2)}</b> and then will
                  be charged monthly.
                </p>
              </div>
            </div>
            <div className="w-full flex-col justify-center items-center">
              <div className="mt-5 px-2">
                <div className="flex justify-center items-center">
                  <label
                    className="text-site-dark text-opacity-50 mr-2"
                    htmlFor="transaction-amount"
                  >
                    Your Total:
                  </label>
                  <span className="text-xl text-dark font-medium">
                    {"$" + Number(aditionalPrice).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="py-2 px-8">
                <Link href="/dashboard/user/create-waiver">
                  <a className="bg-site-main text-white uppercase text-base flex space-x-1 justify-center items-center rounded-md py-2 px-3">
                    <FiPlus className="text-base text-white font-medium" />
                    <span className="text-xs font-medium tracking-widest">
                      Create Waiver
                    </span>
                  </a>
                </Link>
              </div>
            </div>
          </StyledModalHeader>
        </div>
      </div>
    </StyledModal>
  );
}

const StyledModal = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(159, 48, 34, 0.9);
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  transition: visibility 0.15s linear;
`;

const StyledModalHeader = styled.div`
  position: relative;
  background: linear-gradient(180deg, #f9917b -65.76%, #9d2516 100%);
  padding: 36px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  > div:first-child {
    position: relative;
    > svg {
      width: 312px;
      height: 312px;
      overflow: hidden;
    }
    > div {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      bottom: 96px;
      color: white;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      > h1 {
        margin-top: 16px;
        font-weight: bold;
        font-size: 40px;
        line-height: 100%;
        margin-bottom: 16px;
      }
    }
  }
  > div:last-child {
    position: absolute;
    background-color: white;
    bottom: 0;
  }
`;
