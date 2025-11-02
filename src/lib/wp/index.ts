import { env } from '$env/dynamic/public';

export interface WordPressClientConfig {
	baseUrl: string;
	headers?: Record<string, string>;
}

export interface WordPressAPIResponse<T> {
	data: T;
	headers: Headers;
	status: number;
}

type QueryParamValue = string | number | boolean | string[];
type QueryParams = Record<string, QueryParamValue>;

export class WordPressClient {
	private baseUrl: string;
	private defaultHeaders: Record<string, string>;

	constructor(config: WordPressClientConfig) {
		this.baseUrl = config.baseUrl.replace(/\/$/, '');
		this.defaultHeaders = {
			'Content-Type': 'application/json',
			...config.headers
		};
	}

	private buildUrl(endpoint: string, params?: QueryParams): URL {
		const url = new URL(`${this.baseUrl}${endpoint}`);

		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				if (Array.isArray(value)) {
					value.forEach((item) => {
						url.searchParams.append(`${key}[]`, String(item));
					});
				} else {
					url.searchParams.append(key, String(value));
				}
			});
		}

		return url;
	}

	private async request(url: URL): Promise<Response> {
		try {
			const response = await fetch(url.toString(), {
				method: 'GET',
				headers: this.defaultHeaders
			});

			if (!response.ok) {
				throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
			}

			return response;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to fetch from WordPress API: ${error.message}`);
			}
			throw error;
		}
	}

	async get<T>(endpoint: string, params?: QueryParams): Promise<T> {
		const url = this.buildUrl(endpoint, params);
		const response = await this.request(url);
		return response.json() as Promise<T>;
	}

	async getWithMeta<T>(endpoint: string, params?: QueryParams): Promise<WordPressAPIResponse<T>> {
		const url = this.buildUrl(endpoint, params);
		const response = await this.request(url);
		const data = await response.json();

		return {
			data: data as T,
			headers: response.headers,
			status: response.status
		};
	}

	getBaseUrl(): string {
		return this.baseUrl;
	}
}

export function createWordPressClient(baseUrl: string): WordPressClient {
	return new WordPressClient({ baseUrl });
}

export const wpClient = createWordPressClient(env.PUBLIC_WORDPRESS_API);
