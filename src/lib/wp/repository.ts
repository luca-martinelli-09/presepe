import type { WP_REST_API_Attachment, WP_REST_API_Attachments } from 'wp-types';
import { wpClient } from '.';
import type { WP_Presepe, WP_Presepe_With_Featured_Image, WP_PresepeFull } from './types';

export const getPresepeFull = async (presepe: WP_Presepe): Promise<WP_PresepeFull> => {
	const presepeId = presepe.id;
	const panoramicaId = presepe.acf.panoramica;

	const [presepeDetailed, panoramica, children] = await Promise.all([
		wpClient.get<WP_PresepeFull>(`/presepe/${presepeId}`),
		wpClient.get<WP_REST_API_Attachment>(`/media/${panoramicaId}`),
		wpClient.get<WP_Presepe[]>(`/presepe`, {
			parent: presepeId
		})
	]);

	presepeDetailed.acf.panoramica = panoramica;
	presepeDetailed.children = await withFeaturedImage(children);

	return presepeDetailed;
};

export const withFeaturedImage = async (
	presepi: WP_Presepe[]
): Promise<WP_Presepe_With_Featured_Image[]> => {
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
};
