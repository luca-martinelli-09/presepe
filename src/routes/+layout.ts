import { createWordPressClient } from '$lib/wp';
import type { WP_Presepe } from '$lib/wp/types';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	const wpClient = createWordPressClient({ fetchFunction: fetch });

	const presepi = await wpClient.get<WP_Presepe[]>('/presepe', {
		_fields: ['id', 'title', 'excerpt', 'acf', 'slug'],
		parent: 0
	});

	if (!presepi.length) return error(404);

	return {
		presepi
	};
};
