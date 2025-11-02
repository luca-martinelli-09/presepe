import { getPresepeFull } from '$lib/wp/repository';
import { wpClient } from '$lib/wp';
import type { WP_Presepe } from '$lib/wp/types';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const findPresepe = await wpClient.get<WP_Presepe[]>('/presepe', {
		slug: params.slug
	});

	if (!(findPresepe.length && findPresepe[0])) {
		return error(404);
	}

	const presepe = await getPresepeFull(findPresepe[0]);

	return {
		presepe
	};
};
