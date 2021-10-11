import { useContext } from "react";
import { HeadingTitle } from "../..";
import { ViewAsContext } from "../../../app/context/viewAsContext";

import demoImage from "../../../images/demo-image.jpeg";

const NewsCardImage = ({ data }) => {
  const { view } = useContext(ViewAsContext);

  return (
    <div className="news-image-container">
      <HeadingTitle levelNumber={4} title={data.name} cssClass="news-title" />
      {view === "grid" ? (
        <img
          src={data?.image?.thumbnail?.contentUrl || demoImage}
          alt={data.name}
        />
      ) : null}
    </div>
  );
};

export default NewsCardImage;
