import { AiOutlineQuestionCircle } from "react-icons/ai";
import styled from "styled-components";
import { motion } from "framer-motion";
import { spring } from "popmotion";
import Link from "next/link";

export default function Chat() {
  return (
    <div className="fixed right-6 bottom-6">
    <Link href="https://www.notion.so/hostshield/Help-Center-ac8c83a69d8542f8aab68c1a82b16770">
      <StyledChatContainer
        className="flex justify-center items-center cursor-pointer w-16 h-16 bg-site-main rounded-full"
        transition={bounceTransition}
        animate={{ y: ["5%", "-10%"] }}
      >
        <AiOutlineQuestionCircle className="text-white w-7 h-7" />
      </StyledChatContainer>
    </Link>
    </div>
  );
}

const bounceTransition = {
  y: {
    duration: 1,
    yoyo: Infinity,
    ease: "linear",
  },
};
const StyledChatContainer = styled(motion.div)`
  box-shadow: 0 5px 36px 0 rgba(164, 53, 37, 0.2);
`;
