<script lang="ts">
	import '@photo-sphere-viewer/core/index.css';
	import '@photo-sphere-viewer/markers-plugin/index.css';

	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { cn } from '@/utils';
	import { Viewer } from '@photo-sphere-viewer/core';
	import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
	import { mount } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { fade } from 'svelte/transition';
	import InfoMarker from './InfoMarker.svelte';
	import { Spinner } from './ui/spinner';

	export type MarkerProps = {
		id: number;
		title: string;
		description: string;
		url?: string;
		image?: string;
		position?: { textureX?: number; textureY?: number };
	};

	type $Props = HTMLAttributes<HTMLDivElement> & {
		sourceUrl: string;
		markers?: MarkerProps[];
	};

	let videoSectionElement: HTMLDivElement;
	let containerElement: HTMLDivElement;

	let isLoaded: boolean = $state(false);

	let markerDetailOpen: boolean = $state(false);
	let selectedMarker: MarkerProps | null = $state(null);

	const { sourceUrl, markers, class: className, ...restProps }: $Props = $props();

	$effect(() => {
		const viewer = new Viewer({
			container: containerElement,
			panorama: sourceUrl,
			navbar: false,
			moveInertia: 0.95,
			mousewheel: false,
			touchmoveTwoFingers: true,
			lang: {
				twoFingers: 'Usa due dita per navigare'
			},
			plugins: [
				MarkersPlugin.withConfig({
					clickEventOnMarker: true,
					markers: markers?.map((p) => {
						const markerContainer = document.createElement('div');
						markerContainer.style.pointerEvents = 'auto';
						markerContainer.style.cursor = 'pointer';

						mount(InfoMarker, {
							target: markerContainer
						});

						return {
							id: p.id.toString(),
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

		const markersPlugin = viewer.getPlugin(MarkersPlugin);
		markersPlugin.addEventListener('select-marker', ({ marker }) => {
			markerDetailOpen = true;
			selectedMarker = markers?.filter((m) => m.id.toString() === marker.id).at(0) || null;
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

<Dialog.Root bind:open={markerDetailOpen}>
	<Dialog.Content class="md:max-w-3xl">
		<Dialog.Header>
			<Dialog.Title>{selectedMarker?.title}</Dialog.Title>
			<Dialog.Description>{@html selectedMarker?.description}</Dialog.Description>
		</Dialog.Header>
		{#if selectedMarker?.image}
			<img
				class="aspect-video rounded-xl object-cover object-center"
				src={selectedMarker?.image}
				alt={selectedMarker?.title}
			/>
		{/if}
		{#if selectedMarker?.url}
			<Button data-sveltekit-reload href={selectedMarker?.url}>Esplora i dettagli</Button>
		{/if}
	</Dialog.Content>
</Dialog.Root>
