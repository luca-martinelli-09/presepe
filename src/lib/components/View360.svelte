<script lang="ts">
	import '@photo-sphere-viewer/core/index.css';
	import '@photo-sphere-viewer/markers-plugin/index.css';

	import { fade } from 'svelte/transition';
	import { Spinner } from './ui/spinner';
	import { cn } from '@/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Viewer } from '@photo-sphere-viewer/core';
	import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
	import { mount } from 'svelte';
	import InfoMarker from './InfoMarker.svelte';
	import type { $Props as MarkerProps } from './InfoMarker.svelte';

	type $Props = HTMLAttributes<HTMLDivElement> & {
		sourceUrl: string;
		markers?: MarkerProps[];
	};

	let videoSectionElement: HTMLDivElement;
	let containerElement: HTMLDivElement;

	let isLoaded: boolean = $state(false);

	const { sourceUrl, markers, class: className, ...restProps }: $Props = $props();

	$effect(() => {
		const viewer = new Viewer({
			container: containerElement,
			panorama: sourceUrl,
			navbar: false,
			moveInertia: 0.95,
			mousewheel: false,
			touchmoveTwoFingers: true,
			lang: {},
			plugins: [
				MarkersPlugin.withConfig({
					markers: markers?.map((p) => {
						const markerContainer = document.createElement('div');

						mount(InfoMarker, {
							target: markerContainer,
							props: p
						});

						return {
							id: `marker-${p.id}`,
							element: markerContainer,
							position: {
								textureX: p.position?.textureX || 0,
								textureY: p.position?.textureY || 0
							}
						};
					})
				})
			]
		});

		viewer.addEventListener('panorama-loaded', () => {
			isLoaded = true;
		});
	});
</script>

<div
	bind:this={videoSectionElement}
	class={cn('relative aspect-9/16 w-full sm:aspect-square lg:aspect-video', className)}
	{...restProps}
>
	{#if isLoaded}
		<div transition:fade class="absolute inset-0 flex items-center justify-center bg-background">
			<Spinner class="size-12" />
		</div>
	{/if}
	<div
		bind:this={containerElement}
		class="h-full w-full overflow-hidden rounded-xl opacity-100 transition-opacity duration-1000"
	></div>
</div>
