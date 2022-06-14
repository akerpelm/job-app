import Wrapper from "../assets/wrappers/LargeSidebar";
import NavLinks from "./NavLinks";
import Logo from "../components/Logo";
import { useAppContext } from "../context/appContext";
const LargeSidebar = () => {
  const { showSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default LargeSidebar;
