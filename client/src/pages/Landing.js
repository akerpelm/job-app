import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>tracking</span> app
          </h1>
          <p>
            A simple application that allows users to track job applications
            inspired by the arduous journey that is finding your first dev job.
          </p>
          <p>
            Users may create, edit, and delete job apps. Additionally, users may
            view all current applications (in a paginated manner), filter jobs
            by position, and visualize their job app progress through some
            simple area and bar charts.
          </p>
          <p>
            Create your own username and password, or use the 'Demo User'
            button.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};
export default Landing;
