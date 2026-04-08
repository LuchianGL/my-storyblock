import { storyblokEditable } from '@storyblok/react/rsc';
import Link from 'next/link';

const Info = ({ blok }) => {
	const content = (
		<div className="info" {...storyblokEditable(blok)}>
			<h1>{blok.title}</h1>
			<p>{blok.description}</p>
		</div>
	);

	if (blok.link) {
		return <Link href={blok.link}>{content}</Link>;
	}

	return content;
};

export default Info;