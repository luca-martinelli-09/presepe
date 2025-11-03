import { createWordPressClient } from '$lib/wp';
import { getPresepeFull } from '$lib/wp/repository';
import type { WP_Presepe } from '$lib/wp/types';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const wpClient = createWordPressClient({ fetchFunction: fetch });

	const findPresepe = await wpClient.get<WP_Presepe[]>('/presepe', {
		slug: params.slug
	});

	if (!(findPresepe.length && findPresepe[0])) {
		return error(404);
	}

	const presepe = await getPresepeFull(findPresepe[0], fetch);

	return {
		presepe
	};
};
