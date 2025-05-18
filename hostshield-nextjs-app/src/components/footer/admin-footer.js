import styled from "styled-components";

export default function AdminFooter() {
  return (
    <StyledFooter className=" w-full flex justify-center footer mt-10 mb-3 pb-3 md:mt-10 md:mb-3 overflow-hidden">
      <p className="text-center w-full text-site-gray font-light text-opacity-60">
        {new Date().getFullYear()} &#169; HostShield
      </p>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0%;
`;
