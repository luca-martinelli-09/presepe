<script lang="ts">
	import { cn } from '@/utils';
	import type { Snippet } from 'svelte';

	type $Props = {
		content: string;
		class?: string;
		children?: Snippet;
	};

	const { content, class: className = '', children }: $Props = $props();
</script>

<article class={cn('wp-content', className)}>
	{@html content}

	{@render children?.()}
</article>
