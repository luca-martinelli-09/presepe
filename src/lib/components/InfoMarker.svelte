<script lang="ts">
	import type { WP_Presepe_With_Featured_Image } from '@/wp/types';
	import { Info } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';

	type $Props = {
		presepe: WP_Presepe_With_Featured_Image;
	};

	const { presepe }: $Props = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Button
			size="icon-lg"
			variant="default"
			class="rounded-full bg-white text-black hover:bg-white size-14"
		>
			<Info class="size-7" />
		</Button>
	</Dialog.Trigger>
	<Dialog.Content class="md:max-w-3xl">
		<Dialog.Header>
			<Dialog.Title>{presepe.title.rendered}</Dialog.Title>
			<Dialog.Description>{@html presepe.excerpt.rendered}</Dialog.Description>
		</Dialog.Header>
		<img
			class="aspect-video rounded-xl object-cover object-center"
			src={presepe.featured_media?.source_url}
			alt={presepe.title.rendered}
		/>
		<Button data-sveltekit-reload href={`/${presepe.slug}`}>Esplora i dettagli</Button>
	</Dialog.Content>
</Dialog.Root>
