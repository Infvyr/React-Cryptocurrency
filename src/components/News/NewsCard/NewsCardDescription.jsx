const NewsCardDescription = ({ data }) => {
	return (
		<p>
			{data.description > 100
				? `${data.description.substring(0, 100)}`
				: data.description}
		</p>
	);
};

export default NewsCardDescription;
