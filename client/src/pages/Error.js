import { Link } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";
const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="not found" />
        <h3>Hmmm, page not found</h3>
        <p>We cannot seem to find the page you're looking for.</p>
        <Link to="/">Back to Home</Link>
      </div>
    </Wrapper>
  );
};
export default Error;
