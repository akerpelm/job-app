import { useAppContext } from "../context/appContext";
import StatCard from "./StatCard";
import { GiSandsOfTime, GiCardDiscard } from "react-icons/gi";
import { MdOutlineEmojiPeople } from "react-icons/md";
import Wrapper from "../assets/wrappers/StatsContainer";

const StatsContainer = () => {
  const {
    jobStats: {
      accepted,
      applicationPending,
      applicationSubmitted,
      declined,
      interview,
      phoneScreen,
      rejected
    }
  } = useAppContext();

  const allStats = [
    {
      title: "pending / submitted applications",
      count: applicationPending + applicationSubmitted,
      icon: <GiSandsOfTime />,
      color: "#e9b949",
      bcg: "#fcefc7"
    },
    {
      title: " phone screens / interviews",
      count: phoneScreen + interview,
      icon: <MdOutlineEmojiPeople />,
      color: "#647acb",
      bcg: "#e0e7f9"
    },
    {
      title: "declined / turned down",
      count: declined + rejected,
      icon: <GiCardDiscard />,
      color: "#d66a6a",
      bcg: "#ffeeee"
    }
  ];

  return (
    <Wrapper>
      {allStats.map((item, index) => {
        return <StatCard key={index} {...item} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;
