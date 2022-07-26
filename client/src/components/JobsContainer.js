import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import PaginationButtonContainer from "./PaginationButtonContainer";
import Loading from "./Loading";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
const JobsContainer = () => {
  const {
    getJobs,
    jobs,
    isLoading,
    totalJobs,
    search,
    searchJobStatus,
    searchJobType,
    sort,
    pages,
    currentPage
  } = useAppContext();

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line
  }, [currentPage, search, searchJobStatus, searchJobType, sort]);

  if (isLoading) {
    return <Loading center />;
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>Let the job hunt begin.</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"}
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {pages > 1 && <PaginationButtonContainer />}
    </Wrapper>
  );
};
export default JobsContainer;
