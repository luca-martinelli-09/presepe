import { getPresepeFull } from '$lib/wp/repository';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch }) => {
	const { presepi } = await parent();

	if (!presepi[0]) {
		return error(404);
	}

	const presepe = await getPresepeFull(presepi[0], fetch);

	return {
		presepe
	};
};
