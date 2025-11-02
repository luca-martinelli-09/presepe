<script lang="ts">
	import '@photo-sphere-viewer/core/index.css';
	import '@photo-sphere-viewer/markers-plugin/index.css';

	import InfoMarker from '$lib/components/InfoMarker.svelte';
	import { Spinner } from '@/components/ui/spinner';
	import WordpressPage from '@/components/WordpressPage.svelte';
	import { Viewer } from '@photo-sphere-viewer/core';
	import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
	import { mount } from 'svelte';
	import type { PageProps } from './$types';

	let containerElement: HTMLDivElement;
	let spinnerElement: HTMLDivElement;

	let { data }: PageProps = $props();

	$effect(() => {
		const viewer = new Viewer({
			container: containerElement,
			panorama: data.presepe.acf.panoramica.source_url,
			navbar: false,
			moveInertia: 0.95,
			mousewheel: false,
			touchmoveTwoFingers: true,
			lang: {},
			plugins: [
				MarkersPlugin.withConfig({
					markers: data.presepe.children.map((p) => {
						const markerContainer = document.createElement('div');

						mount(InfoMarker, {
							target: markerContainer,
							props: {
								presepe: p
							}
						});

						return {
							id: `marker-${p.id}`,
							element: markerContainer,
							position: {
								textureX: p.acf.posizione.orizzontale || 0,
								textureY: p.acf.posizione.verticale || 0
							}
						};
					})
				})
			]
		});

		viewer.addEventListener('panorama-loaded', () => {
			spinnerElement.classList.add('opacity-0');
			containerElement.classList.add('opacity-100');
		});
	});
</script>

<article>
	<WordpressPage content={data.presepe.content.rendered}>
		<h2>Immergiti</h2>
		<p>
			Ammira il presepe da una prospettiva unica ed esplora tutti i dettagli, scoprendo personaggi,
			scene e curiosità nascoste: clicca sui marker per aprire schede informative e vivere
			l'esperienza a 360°.
		</p>
		<div class="alignfull relative aspect-9/16 w-full sm:aspect-square lg:aspect-video">
			<div
				bind:this={spinnerElement}
				class="absolute inset-0 flex items-center justify-center bg-background transition-opacity duration-1000"
			>
				<Spinner class="size-12" />
			</div>
			<div
				bind:this={containerElement}
				class="h-full w-full overflow-hidden rounded-xl opacity-0 transition-opacity duration-1000"
			></div>
		</div>
	</WordpressPage>
</article>
