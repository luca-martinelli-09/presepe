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
		<Button size="icon-lg" variant="default" class="rounded-full bg-white hover:bg-white text-black">
			<Info class="size-5" />
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
		<Button href="">Esplora i dettagli</Button>
	</Dialog.Content>
</Dialog.Root>
