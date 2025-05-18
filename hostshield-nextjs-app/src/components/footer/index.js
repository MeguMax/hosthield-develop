import styled from "styled-components";
//Components
import Chat from "./chat";

export default function Footer() {
  return (
    <StyledFooter className=" w-full flex bottom-0 justify-center footer mt-2 pb-3 md:mt-10 md:mb-3 overflow-hidden">
      <Chat />
      <p className="text-center w-full text-site-gray font-light text-opacity-60">
        {new Date().getFullYear()} &#169; HostShield
      </p>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0;
`;
