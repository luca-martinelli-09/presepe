import type { WP_REST_API_Attachment, WP_REST_API_Attachments } from 'wp-types';
import { createWordPressClient } from '.';
import type { WP_Presepe, WP_PresepeFull } from './types';

export const getPresepeFull = async (
	presepe: WP_Presepe,
	fetchFunction?: typeof fetch
): Promise<WP_PresepeFull> => {
	const wpClient = createWordPressClient({ fetchFunction });

	const presepeId = presepe.id;
	const panoramicaId = presepe.acf.panoramica;

	const [presepeDetailed, panoramica, children] = await Promise.all([
		wpClient.get<WP_PresepeFull>(`/presepe/${presepeId}`),
		panoramicaId ? wpClient.get<WP_REST_API_Attachment>(`/media/${panoramicaId}`) : null,
		wpClient.get<WP_Presepe[]>(`/presepe`, {
			parent: presepeId
		})
	]);

	presepeDetailed.acf.panoramica = panoramica;
	presepeDetailed.children = await withFeaturedImage(children, fetchFunction);

	return (await withFeaturedImage([presepeDetailed], fetchFunction))[0];
};

export async function withFeaturedImage<T extends WP_Presepe | WP_PresepeFull>(
	presepi: T[],
	fetchFunction?: typeof fetch
): Promise<
	(T & {
		featured_media?: WP_REST_API_Attachment;
	})[]
> {
	const wpClient = createWordPressClient({ fetchFunction });

	const mediaList = await wpClient.get<WP_REST_API_Attachments>('/media', {
		include: presepi
			.map((p) => p.featured_media)
			.filter((v) => v)
			.join(',')
	});

	const mediaSet = new Map<number, WP_REST_API_Attachment>();
	mediaList.forEach((m) => mediaSet.set(m.id, m));

	return presepi.map((p) => {
		const attachment =
			typeof p.featured_media === 'number' ? mediaSet.get(p.featured_media) : undefined;

		return {
			...p,
			featured_media: attachment
		};
	});
}
