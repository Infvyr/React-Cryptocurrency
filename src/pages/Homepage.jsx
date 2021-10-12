import { Skeleton } from "antd";
import { Cryptocurrencies, News } from "./";
import { CryptoStats, ShowMore, HeadingTitle } from "../components";

import { useGetCryptosQuery } from "../services/cryptoApi";

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Skeleton active />;

  return (
    <>
      <CryptoStats stats={globalStats} />
      <div className="home-heading-container">
        <HeadingTitle
          levelNumber={2}
          title="Top 10 Worldwide Cryptocurrencies"
          cssClass="heading-title"
        />
        <ShowMore title="Show More" url="/cryptocurrencies" />
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <HeadingTitle
          levelNumber={2}
          title="Latest Crypto News"
          cssClass="heading-title"
        />
        <ShowMore title="Show More" url="/news" />
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
