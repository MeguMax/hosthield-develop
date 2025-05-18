import React, { useState, useEffect } from "react";
import ReactTooltip from 'react-tooltip';
import { useRouter } from "next/router";
import styled from "styled-components";
//Icons
import { RiCloseFill } from "react-icons/ri";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { setSignWaiverModalIsOpen } from "../../../redux/actions/main";
// Canvas
import Canvas from "../canvas/Canvas";
import { PUBLIC_API_KEY } from "./../../../utils";

export default function SignWaiverModal() {
  const [imageURL, setImageURL] = useState(""); // base64 signature image url
  const { signModal } = useSelector((state) => state);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const handleOnSubmit = (event) => {
    const { target } = event;
    const { form } = target;
    const firstName = form["1"].name === "first-name" ? form["1"].value : "";
    const lastName = form["2"].name === "last-name" ? form["2"].value : "";
    const email = form["3"].name === "email" ? form["3"].value : "";

    const waiverId = router.query.id;

    if(firstName!="" && lastName!="" && email!=""){
      // send data to BE
      const url = `${PUBLIC_API_KEY}/sign-waiver`;
      setIsLoading(true);
      fetch(url, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          signature: imageURL,
          id: waiverId,
        }),
      })
        .then((response) => {
          setIsLoading(false);
          router.push("/guest-sign-waiver-success");
          dispatch(setSignWaiverModalIsOpen(!signModal.isOpen));
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }else{
      setError("Please fill all fields")
    }

  };
  useEffect(() => {
  }, [imageURL]);

  return (
    <StyledModal className={`${signModal.isOpen ? "visible" : "invisible"}`}>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col w-10/12 sm:w-6/12 md:w-6/12 lg:w-4/12 2xl:w-4/12 h-5/12 bg-white rounded-md">
          <div className="w-full py-4 px-6 flex justify-between items-center">
            <h4 className="font-semibold text-2xl tracking-wide">
              Sign Waiver
            </h4>
            <RiCloseFill
              className="text-gray-300 text-2xl cursor-pointer"
              onClick={() => {
                dispatch(setSignWaiverModalIsOpen(!signModal.isOpen));
              }}
            />
          </div>
          <hr />
          <div className="w-full py-4 space-y-3 px-6 flex-col justify-around">
            <form className="flex flex-col">
              <input type="hidden" value={imageURL} name="signature-image" />
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-gray-500 text-sm"
                  >
                    First Name
                  </label>
                  <div className="mt-2">
                    <input
                      data-for="form-left"
                      data-tip="Fill in the name and email address"
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="first-name"
                      required
                      className="block w-full bg-gray-100 border-gray-200 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-2 px-5 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-gray-500 text-sm"
                  >
                    Last Name
                  </label>
                  <div className="mt-2">
                    <input
                      data-for="form-right"
                      data-tip="Fill in the name and email address"
                      type="text"
                      name="last-name"
                      id="last-name"
                      required
                      autoComplete="last-name"
                      className="block w-full bg-gray-100 border-gray-200 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-2 px-5 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="flex space-y-2 flex-col justify-center">
                  <label
                    className="text-gray-500 text-sm"
                    htmlFor="email-address"
                  >
                    Email Address
                  </label>
                  <input
                    data-for="form-bottom"
                    data-tip="Fill in the name and email address"
                    type="email"
                    id="email-address"
                    placeholder=""
                    name="email"
                    autoComplete="email"
                    required
                    className="bg-gray-100 border-gray-200 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-2 px-5 rounded-md"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="text-gray-500 text-sm">Your Signature</div>
                <div>
                  <Canvas
                    className="border rounded-md border-b"
                    data-for="sign-right"
                    data-tip="Put your signature and confirm"
                    setImageURL={setImageURL}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="text-red-500 text-sm">{error}</div>
              </div>
              <div className="">
                <div className="flex space-y-2 flex-col justify-center">
                  <input
                    data-for="form-left"
                    data-tip="Accept the consent checkbox"
                    type="checkbox"
                    className="h-4 w-4 text-site-main focus:ring-offset-0 focus:ring-0 border-gray-300"
                    id="agree"
                    placeholder=""
                    name="agree"
                    required
                    onChange={(e) => {
                      if (agree == true) {
                        setAgree(false);
                      } else {
                        setAgree(true);
                      }
                    }}
                  />
                  {agree ? (
                    <label
                      className="text-gray-500"
                      style={{ fontSize: "0.5em" }}
                      htmlFor="agree"
                    >
                      You have agreed
                    </label>
                  ):(
                  <label
                    className="text-gray-500"
                    style={{ fontSize: "0.5em" }}
                    htmlFor="agree"
                  >
                    By checking here, you are consenting to the use of your
                    electronic signature in lieu of an original signature on
                    paper. You have the right to request that you sign a paper
                    copy instead. By checking here, you are waiving that right.
                    After consent, you may, upon written request to us, obtain a
                    paper copy of an electronic record. No fee will be charged
                    for such copy and no special hardware or software is
                    required to view it. Your agreement to use an electronic
                    signature with us for any documents will continue until such
                    time as you notify us in writing that you no longer wish to
                    use an electronic signature. There is no penalty for
                    withdrawing your consent. You should always make sure that
                    we have a current email address in order to contact you
                    regarding any changes, if necessary.
                  </label>
                )}
                </div>
              </div>
              <div className="w-full flex bg-site-main rounded-md">
                {isLoading ? (
                  <div className="flex justify-center text-sm uppercase w-full  py-4 tracking-widest text-white font-medium text-center">
                    <StyledLoadingSpinner>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </StyledLoadingSpinner>
                  </div>
                ) : (
                  <>
                  {agree && imageURL != "" ?
                    (<button
                      className="savesign-button text-sm uppercase w-full  py-4 tracking-widest text-white font-medium text-center"
                      type="button"
                      data-for="sign-top"
                      data-tip="Click on SIGN WAIVER button"
                      onClick={handleOnSubmit}
                    >
                      Sign Waiver
                    </button>
                  ) : (
                  <></>
                  )}
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <ReactTooltip id="sign-top" place="top" type="error" effect="solid"/>
      <ReactTooltip id="sign-right" place="right" effect="solid" type="error" />
      <ReactTooltip id="form-left" place="left" type="error" />
      <ReactTooltip id="form-right" place="right" type="error" />
      <ReactTooltip id="form-bottom" place="bottom" type="error" />
    </StyledModal>
  );
}

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
const StyledModal = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: scroll;
  background-color: rgba(159, 48, 34, 0.9);
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  transition: visibility 0.15s linear;
`;
const StyledSignSymbol = styled.div`
  bottom: 0%;
  transform: rotate(90deg);
  left: 0%;
  z-index: 1;
  span {
    width: 3rem;
    display: inline-block;
    padding-bottom: 0.2rem;
    text-align: center;
    border-top-left-radius: 0.2rem;
    border-bottom-left-radius: 0.2rem;
  }
  div.arrow {
    border-top: 0.68rem solid transparent;
    border-left: 0.68rem solid #9c2d1f;
    border-bottom: 0.68rem solid transparent;
    width: 0;
    height: 0;
  }
  @media (min-width: 1536px) {
    bottom: 14%;
  }
`;
const StyledCanvasContainer = styled.div`
  div.solid-line {
    position: absolute;
    border-bottom: 1px solid #e1e1e1;
    top: 29%;
    width: 98.4%;
    opacity: 0.45;
  }
  div.dash-line {
    position: absolute;
    border-bottom: 1px dashed #e1e1e1;
    top: 70%;
    width: 98.4%;
    opacity: 0.45;
    z-index: 0;
  }
  div.colored-solid-line {
    position: absolute;
    border-bottom: 2px solid #9c2d1f;
    bottom: 0%;
    left: 1%;
    width: 97.7%;
    opacity: 0.45;
    z-index: 0;
  }
`;
