<script lang="ts">
	import { Spinner } from '@/components/ui/spinner';
	import View360 from '@/components/View360.svelte';
	import WordpressPage from '@/components/WordpressPage.svelte';
	import { cn, createSrcset, createTitle } from '@/utils';
	import type { WP_PresepeFull } from '@/wp/types';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { fade } from 'svelte/transition';

	type $Props = {
		presepe: WP_PresepeFull;
	};

	let { presepe }: $Props = $props();

	let isLoaded = $state(false);

	$effect(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Animazione fade-in per i blocchi WordPress
		const wpBlocks = document.querySelectorAll('.wp-content > *');
		wpBlocks.forEach((block, index) => {
			gsap.fromTo(
				block,
				{
					opacity: 0,
					y: 20
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.5,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: block,
						start: 'top 90%',
						end: 'top 70%',
						toggleActions: 'play none none reverse'
					},
					delay: index * 0.1
				}
			);
		});

		isLoaded = true;

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});
</script>

<svelte:head>
	<title>{createTitle(presepe.title.rendered)}</title>
</svelte:head>

{#if !isLoaded}
	<div transition:fade class="fixed inset-0 z-50 flex items-center justify-center bg-background">
		<Spinner class="size-12" />
	</div>
{/if}

<WordpressPage content={presepe.content.rendered}>
	{#snippet title()}
		<div class={cn('wp-block-cover alignfull', presepe.featured_media ? 'md:min-h-[75vh]!' : '')}>
			{#if presepe.featured_media}
				<img
					loading="lazy"
					decoding="async"
					class="wp-block-cover__image-background"
					alt={presepe.title.rendered}
					src={presepe.featured_media.source_url}
					data-object-fit="cover"
					srcset={createSrcset(presepe.featured_media)}
					sizes="auto, (max-width: 1024px) 100vw, 1024px"
				/>
				<span
					aria-hidden="true"
					class="wp-block-cover__background has-black-background-color has-background-dim-60 has-background-dim"
				></span>
			{/if}
			<div
				class="wp-block-cover__inner-container is-layout-constrained wp-block-cover-is-layout-constrained"
			>
				<h1
					class="wp-block-heading has-text-align-center has-large-font-size my-0! leading-snug text-white!"
				>
					{@html presepe.title.rendered}
				</h1>
			</div>
		</div>
	{/snippet}

	{#if presepe.acf.panoramica}
		<h2>Immergiti</h2>
		<p>
			Ammira il presepe da una prospettiva unica ed esplora tutti i dettagli, scoprendo personaggi,
			scene e curiosità nascoste: clicca sui marker per aprire schede informative e vivere
			l'esperienza a 360°. Se sei sun dispositivo mobile (smartphone o tablet) utilizza due dita per
			muoverti all'interno del presepe. Altrimenti, utilizza il mouse (premi e trascina) per
			cambiare inquadratura.
		</p>
		<View360
			class="alignfull mx-auto!"
			id="view360"
			sourceUrl={presepe.acf.panoramica.source_url}
			markers={presepe.children.map((p) => ({
				id: p.id,
				title: p.title.rendered,
				description: p.excerpt.rendered,
				image: p.featured_media?.source_url,
				url: `/${p.slug}`,
				position: {
					textureX: p.acf.posizione.orizzontale || 0,
					textureY: p.acf.posizione.verticale || 0
				}
			}))}
		/>
	{/if}
</WordpressPage>
