import type { WP_REST_API_Attachment, WP_REST_API_Post } from 'wp-types';

interface Presepe_ACF_Fields {
	panoramica: number;
	posizione: {
		verticale: number | null;
		orizzontale: number | null;
	};
}

interface Presepe_ACF_Fields_Detailed extends Presepe_ACF_Fields {
	panoramica: WP_REST_API_Attachment;
}

export interface WP_Presepe extends WP_REST_API_Post {
	acf: Presepe_ACF_Fields | Presepe_ACF_Fields_Detailed;
}

export interface WP_Presepe_With_Featured_Image extends WP_Presepe {
	featured_media?: WP_REST_API_Attachment;
}

export interface WP_PresepeFull extends WP_Presepe {
	children: WP_Presepe_With_Featured_Image[];
	acf: Presepe_ACF_Fields_Detailed;
}
