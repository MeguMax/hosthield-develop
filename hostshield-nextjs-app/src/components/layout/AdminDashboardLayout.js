import Header from "../header/admin-navbar";
import Footer from "../footer/admin-footer";
import LeftPanel from "../leftpanel/admin";
import ShareModal from "../modal/share-modal";
//Redux
import { useSelector } from "react-redux";
//Animation
import { motion } from "framer-motion";
import { pageAnimation } from "../animation";
//Styles
import styled from "styled-components";

export default function AdminDashboardLayout({ children }) {
  const { leftPanel } = useSelector((state) => {
    return state;
  });
  return (
    <StyledDashboard className="min-h-screen relative overflow-hidden">
      <Header className="z-50" />
      <LeftPanel />
      <StyledDashboardBody
        className={`${
          leftPanel.isOpen ? "ml-10 lg:ml-64" : "md:ml-10 lg:ml-20"
        } z-0 overflow-hidden pb-12`}
        exit="exit"
        variants={pageAnimation}
        initial="hidden"
        animate="show"
      >
        {children}
        <Footer className="block" />
      </StyledDashboardBody>
      <ShareModal />
    </StyledDashboard>
  );
}
const StyledDashboard = styled.div`
  background-color: #fafafa;
`;
const StyledDashboardBody = styled(motion.div)`
  transition: all 0.25s ease;
  position: relative;
  margin-top: 8vh;
  @media (min-width: 768px) {
    margin-top: 15vh;
  }
`;
