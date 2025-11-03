<script lang="ts">
	import { cn } from '@/utils';
	import type { Snippet } from 'svelte';

	type $Props = {
		content: string;
		class?: string;
		title?: Snippet;
		children?: Snippet;
	};

	const { content, class: className = '', title, children }: $Props = $props();
</script>

<article class={cn('wp-content', className)}>
	{@render title?.()}

	{@html content}

	{@render children?.()}
</article>
