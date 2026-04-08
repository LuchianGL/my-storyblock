import { storyblokEditable } from '@storyblok/react/rsc';
import Link from 'next/link';

const Feature = ({ blok, isEditMode }) => {
	const content = (
		<div className="feature" {...storyblokEditable(blok)}>
			<span>{blok.name}</span>
		</div>
	);

	if (blok.link) {
		return <Link 
                href={blok.link} 
                // If in edit mode, we disable clicking via CSS
                style={isEditMode ? { pointerEvents: 'none' } : {}}
            >
                {content}
            </Link>;
	}

	return content;
};

export default Feature;