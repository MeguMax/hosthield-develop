import { useState } from "react";
import styled from "styled-components";

export default function ToolTip({
  text = "",
  textColor = "",
  bgColorClass = "",
  arrowColor = "",
  arrowStyle = "",
  children,
  classNames = "",
  style = "",
}) {
  const [show, setShow] = useState(false);

  return (
    <>
      <StyledPopOver
        className={`${show ? "" : "hidden"} absolute ${
          bgColorClass == "" ? "bg-gray-900" : bgColorClass
        }  text-xs uppercase ${
          textColor == "" ? "text-white" : textColor
        } rounded-md py-2 px-3 ${
          classNames == "" ? "-top-9  right-5" : classNames
        }`}
        style={{ style }}
      >
        <span>{text}</span>
        <StyledPopOverArrow
          className="absolute"
          style={
            arrowStyle == ""
              ? {
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderTop: `8px solid ${
                    arrowColor == ""
                      ? "rgba(17, 24, 39, var(--tw-bg-opacity))"
                      : arrowColor
                  }`,
                  width: 0,
                  height: 0,
                }
              : arrowStyle
          }
        />
      </StyledPopOver>

      <span
        className="cursor-pointer"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </span>
    </>
  );
}
const StyledPopOver = styled.div``;
const StyledPopOverArrow = styled.div`
  bottom: -0.33rem;
  left: 50%;
  transform: translateX(-50%);
`;
