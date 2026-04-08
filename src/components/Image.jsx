import { storyblokEditable } from '@storyblok/react/rsc';
import Image from 'next/image';

const ImageComponent = ({ blok }) => {
	const src = blok.asset[0].filename;
	const alt = blok.asset[0].alt;

    console.log(blok.asset[0].filename)
	return (
		<figure className="image-component" {...storyblokEditable(blok)}>
			{src && (
				<Image
					src={src}
					alt={alt}
					width={blok.width || 240}
					height={blok.height || 100}
					className="image-component__image"
				/>
			)}
		</figure>
	);
};

export default ImageComponent;