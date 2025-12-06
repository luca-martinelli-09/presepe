<script lang="ts">
	import type { WP_Presepe } from '@/wp/types';
	import { Menu, X } from '@lucide/svelte';
	import Button from './ui/button/button.svelte';
	import * as Sheet from '$lib/components/ui/sheet';

	type $Props = {
		title: string;
		presepi: WP_Presepe[];
	};

	const { title, presepi }: $Props = $props();

	let opened: boolean = $state(false);
</script>

<header class="w-full border-b px-2 py-3">
	<div class="container mx-auto flex items-center justify-between">
		<a data-sveltekit-reload href="/">
			<h1 class="font-display text-2xl">{title}</h1>
		</a>
		<Sheet.Root bind:open={opened}>
			<Sheet.Trigger>
				<Button variant="outline" size="icon-lg" class="size-14 rounded-full">
					<Menu class="size-6" />
					<span class="sr-only">Open menù</span>
				</Button>
			</Sheet.Trigger>
			<Sheet.Content side="top" showCloseButton={false} class="h-screen">
				<div class="container mx-auto px-2 text-right">
					<Button
						variant="outline"
						size="icon-lg"
						class="mt-16 mb-8 size-14 rounded-full"
						onclick={() => (opened = false)}
					>
						<X class="size-6" />
						<span class="sr-only">Close menù</span>
					</Button>
				</div>

				<nav>
					<ul class="divide-accent">
						{#each presepi as presepe (presepe.id)}
							<li class="relative overflow-hidden">
								<a
									data-sveltekit-reload
									class="group relative block px-3 py-7 font-display text-3xl lg:text-6xl"
									href={`/${presepe.slug}`}
								>
									<span
										class="relative z-10 container mx-auto block transition-colors duration-500 group-hover:text-primary-foreground"
									>
										{@html presepe.title.rendered}
									</span>
									<div
										class="absolute inset-0 -translate-y-full bg-primary transition-transform duration-500 group-hover:translate-y-0"
									></div>
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</Sheet.Content>
		</Sheet.Root>
	</div>
</header>
