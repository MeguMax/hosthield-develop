import { useRef, useEffect } from "react";
import styled from "styled-components";
import { RiCloseFill, RiFileCopyLine } from "react-icons/ri";
//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  setShareModalIsOpen,
  setShareModalLink,
} from "../../../redux/actions/main";
export default function ShareModal({
  ModalTitle,
  shareUrl,
  shareUrlName,
  children,
}) {
  const CopyInputRef = useRef(null);
  const dispatch = useDispatch();
  const { shareModal } = useSelector((state) => state);
  useEffect(() => {
    dispatch(setShareModalIsOpen(false));
  }, [dispatch]);
  const CopyToClipBoardHandler = () => {
    if (CopyInputRef.current.value !== "") {
      CopyInputRef.current.select();
      document.execCommand("copy");
      CopyInputRef.current.focus();
    } else {
      console.log("Empty");
    }
  };
  return (
    <StyledModal className={`${shareModal.isOpen ? "visible" : "invisible"}`}>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col w-11/12 sm:w-9/12 lg:w-4/12 2xl:w-2/12 h-5/12 bg-white rounded-md">
          <div className="w-full py-4 px-6 flex justify-between items-center">
            <h4 className="font-semibold text-2xl tracking-wide">
              Send waiver
            </h4>
            <RiCloseFill
              className="text-gray-300 text-2xl cursor-pointer"
              onClick={() => {
                dispatch(setShareModalIsOpen(!shareModal.isOpen));
                dispatch(setShareModalLink(""));
              }}
            />
          </div>
          <hr />
          <div className="w-full py-4 space-y-3 px-6 flex-col justify-around">
            <h5 className="uppercase font-medium text-site-dark tracking-wider ">
              Waiver link
            </h5>
            <div className="w-full relative">
              <input
                readOnly
                ref={CopyInputRef}
                type="url"
                id="copy-url"
                value={shareModal.link == "" ? "" : shareModal.link}
                className="w-full bg-input-gray border-gray-100 focus:border-gray-300 focus:ring-0 text-sm text-site-dark text-opacity-60 py-4 pl-5 pr-8 rounded-md "
              />
              <RiFileCopyLine
                className="absolute cursor-pointer text-site-darkgray  top-4 right-2 text-xl"
                onClick={CopyToClipBoardHandler}
              />
            </div>
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
