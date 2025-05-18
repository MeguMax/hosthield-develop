import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { RiCloseFill, RiFileCopyLine } from "react-icons/ri";
import { PUBLIC_API_KEY } from "../../../utils";
import { useRouter } from 'next/router';
//Redux
import { useDispatch, useSelector } from "react-redux";
import { setCancelSubscriptionIsOpen } from "../../../redux/actions/main";
export default function ShareModal({ ModalTitle, children }) {
  const CopyInputRef = useRef(null);
  const dispatch = useDispatch();
  const { cancelSubscriptionModal } = useSelector((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const eventCancelSubscription = () => {
    var user = JSON.parse(localStorage.getItem('user'));
    const url = `${PUBLIC_API_KEY}/cancel`;
    setIsLoading(true);
    fetch(url, {
      method: "POST",
      credentials: 'include',      
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.value.username
      }),
    })
      .then((response) => {
        setIsLoading(false);
        dispatch(setCancelSubscriptionIsOpen(false));
        localStorage.removeItem('user');
        const userItem = JSON.parse(localStorage.getItem('user'));
        if (!userItem || !userItem.ttl || userItem.ttl < new Date().getTime()) {
          return router.push('/');
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    dispatch(setCancelSubscriptionIsOpen(false));
  }, [dispatch]);
  return (
    <StyledModal className={`${cancelSubscriptionModal.isOpen ? "visible" : "invisible"}`}>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col w-11/12 sm:w-9/12 lg:w-4/12 2xl:w-2/12 h-5/12 bg-white rounded-md">
          <div className="w-full py-4 px-6 flex justify-between items-center">
            <h4 className="font-semibold text-2xl tracking-wide">Cancel subscription</h4>
            <RiCloseFill
              className="text-gray-300 text-2xl cursor-pointer"
              onClick={() => {
                dispatch(setCancelSubscriptionIsOpen(!cancelSubscriptionModal.isOpen));
              }}
            />
          </div>
          <hr />
          <div className="w-full py-4 space-y-3 px-6 flex-col justify-around">
            <h5 className="uppercase font-medium text-site-dark tracking-wider ">
              Warning
            </h5>
            <p>
              Are you sure you want to disable your account and cancel subscription
            </p>
          </div>
          <div className="mt-5">
            <fieldset>
              <div className="flex space-y-1 flex-col justify-center">
              {isLoading
                    ? (
                      <div className="flex justify-center py-4 px-4 border border-transparent bg-site-main text-sm font-medium rounded-md text-white focus:outline-none uppercase tracking-widest">
                      <StyledLoadingSpinner><div></div><div></div><div></div><div></div></StyledLoadingSpinner>
                      </div>
                    )
                    : (
                      <button
                        type="button"
                        className="savesign-button group relative py-4 px-4 border border-transparent bg-site-main text-sm font-medium rounded-md text-white focus:outline-none uppercase tracking-widest"
                        onClick={eventCancelSubscription}
                      >
                        CANCEL SUBSCRIPTION
                      </button>
                    )}
              </div>
            </fieldset>
          </div>
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
const StyledLoadingSpinner = styled.div`
  display: inline-block;
  position: relative;
  height: 20px;
  width: 76px;

  div {
    position: absolute;
    top: 3.5px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;
