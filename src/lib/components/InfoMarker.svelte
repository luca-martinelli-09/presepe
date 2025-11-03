<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Info } from '@lucide/svelte';

	export type $Props = {
		id: number;
		title: string;
		description: string;
		url?: string;
		image?: string;
		position?: { textureX?: number; textureY?: number };
	};

	const { title, description, url, image }: $Props = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Button
			size="icon-lg"
			variant="default"
			class="size-14 rounded-full bg-white text-black hover:bg-white"
		>
			<Info class="size-7" />
		</Button>
	</Dialog.Trigger>
	<Dialog.Content class="md:max-w-3xl">
		<Dialog.Header>
			<Dialog.Title>{title}</Dialog.Title>
			<Dialog.Description>{@html description}</Dialog.Description>
		</Dialog.Header>
		{#if image}
			<img class="aspect-video rounded-xl object-cover object-center" src={image} alt={title} />
		{/if}
		{#if url}
			<Button data-sveltekit-reload href={url}>Esplora i dettagli</Button>
		{/if}
	</Dialog.Content>
</Dialog.Root>
