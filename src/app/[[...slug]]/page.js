import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';

export default async function Page(props) {
	const params = await props.params;
	const searchParams = await props.searchParams;

	const slug = params?.slug || ['home'];
	const isEditMode = searchParams?._storyblok !== undefined;

	let fullSlug = slug ? slug.join('/') : 'home';

	let sbParams = {
		version: 'draft',
	};

	const storyblokApi = getStoryblokApi();
	let { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, sbParams);
	return <StoryblokStory story={data.story}/>;
}
