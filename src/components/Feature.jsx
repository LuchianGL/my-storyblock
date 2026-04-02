import { storyblokEditable } from '@storyblok/react/rsc';
import Link from 'next/link';

const Feature = ({ blok }) => {
	const content = (
		<div className="feature" {...storyblokEditable(blok)}>
			<span>{blok.name}</span>
		</div>
	);

	if (blok.link) {
		return <Link href={blok.link}>{content}</Link>;
	}

	return content;
};

export default Feature;