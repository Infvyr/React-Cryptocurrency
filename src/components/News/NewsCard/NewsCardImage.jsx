import { HeadingTitle } from '../..';
import demoImage from '../../../images/demo-image.jpeg';

const NewsCardImage = ({ data }) => {
	return (
		<div className="news-image-container">
			<HeadingTitle levelNumber={4} title={data.name} cssClass="news-title" />
			<img
				src={data?.image?.thumbnail?.contentUrl || demoImage}
				alt={data.name}
			/>
		</div>
	);
};

export default NewsCardImage;
