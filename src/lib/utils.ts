import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { WP_REST_API_Attachment } from 'wp-types';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

export function createTitle(title?: string) {
	if (!title) return 'Presepe Artistico di Lugagnano';

	// Decodifica entità HTML
	const htmlEntities: Record<string, string> = {
		'&#8217;': "'",
		'&quot;': '"',
		'&amp;': '&',
		'&lt;': '<',
		'&gt;': '>',
		'&apos;': "'"
	};

	let decoded = title;
	for (const [entity, char] of Object.entries(htmlEntities)) {
		decoded = decoded.replaceAll(entity, char);
	}

	// Decodifica entità numeriche generiche
	decoded = decoded.replaceAll(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)));
	decoded = decoded.replaceAll(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));

	return `${decoded} - Presepe Artistico di Lugagnano`;
}

export function createSrcset(media: WP_REST_API_Attachment): string {
	const mediaDetails = media.media_details;

	if (!mediaDetails?.sizes) {
		return '';
	}

	return Object.values(mediaDetails.sizes)
		.filter((size) => !!size.source_url && !!size.width)
		.sort((a, b) => a.width - b.width)
		.map((size) => `${size.source_url} ${size.width}w`)
		.join(', ');
}
