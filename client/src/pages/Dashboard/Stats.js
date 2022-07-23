import { Fragment, useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { StatsContainer, Loading, ChartsContainer } from "../../components";

const Stats = () => {
  const { getJobStats, isLoading, monthlyApplications } = useAppContext();
  useEffect(() => {
    getJobStats();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <Fragment>
      <StatsContainer />
      {/* {monthlyApplications.length > 0 &&  */}

      <ChartsContainer />
      {/* } */}
    </Fragment>
  );
};
export default Stats;
