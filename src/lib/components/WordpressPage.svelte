<script lang="ts">
	import { cn } from '@/utils';
	import type { Snippet } from 'svelte';
	import * as Dialog from '@/components/ui/dialog';
	import Button from './ui/button/button.svelte';

	type $Props = {
		content: string;
		class?: string;
		title?: Snippet;
		children?: Snippet;
	};

	const { content, class: className = '', title, children }: $Props = $props();

	let imageOpened: boolean = $state(false)
	let selectedImage: HTMLImageElement | null = $state(null);
	let articleEl: HTMLElement | undefined = $state();
	let allImages: HTMLImageElement[] = $state([]);
	let currentImageIndex: number = $state(-1);

	$effect(() => {
		if (!articleEl) return;

		const images = Array.from(articleEl.querySelectorAll('img'));
		allImages = images;

		images.forEach((img, index) => {
			img.style.cursor = 'pointer';
			img.addEventListener('click', () => {
				selectedImage = img;
				currentImageIndex = index;
				imageOpened = true;
			});
		});
	});

	function showPreviousImage() {
		if (currentImageIndex > 0) {
			currentImageIndex--;
			selectedImage = allImages[currentImageIndex];
		}
	}

	function showNextImage() {
		if (currentImageIndex < allImages.length - 1) {
			currentImageIndex++;
			selectedImage = allImages[currentImageIndex];
		}
	}
</script>

<article bind:this={articleEl} class={cn('wp-content', className)}>
	{@render title?.()}

	{@html content}

	{@render children?.()}
</article>

<Dialog.Root bind:open={imageOpened}>
	<Dialog.Content class="md:max-w-7xl">
		<Dialog.Header>
			<Dialog.Title>{selectedImage?.alt}</Dialog.Title>
		</Dialog.Header>
		<img src={selectedImage?.src} alt="Immagine ingrandita" class="w-full h-full object-contain rounded-xl" />
		<Dialog.Footer class="grid grid-cols-2 gap-2 mb-0">
			<Button variant="outline" onclick={showPreviousImage} disabled={currentImageIndex <= 0}>Precedente</Button>
			<Button variant="outline" onclick={showNextImage} disabled={currentImageIndex >= allImages.length - 1}>Successiva</Button>
		</Dialog.Footer>
		<Dialog.Close />
	</Dialog.Content>
</Dialog.Root>