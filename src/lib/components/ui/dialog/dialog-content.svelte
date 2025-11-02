<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import XIcon from '@lucide/svelte/icons/x';
	import type { Snippet } from 'svelte';
	import * as Dialog from './index.js';
	import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area';

	let {
		ref = $bindable(null),
		class: className,
		portalProps,
		children,
		showCloseButton = true,
		...restProps
	}: WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
		portalProps?: DialogPrimitive.PortalProps;
		children: Snippet;
		showCloseButton?: boolean;
	} = $props();
</script>

<Dialog.Portal {...portalProps}>
	<Dialog.Overlay>
		<ScrollArea
			class="fixed inset-0 h-screen w-screen **:data-scroll-area-content:flex **:data-scroll-area-content:items-center **:data-scroll-area-content:justify-center"
		>
			<DialogPrimitive.Content
				bind:ref
				data-slot="dialog-content"
				class={cn(
					'relative z-50 my-5 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg',
					className
				)}
				{...restProps}
			>
				{@render children?.()}
				{#if showCloseButton}
					<DialogPrimitive.Close
						class="absolute end-4 top-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
					>
						<XIcon />
						<span class="sr-only">Close</span>
					</DialogPrimitive.Close>
				{/if}
			</DialogPrimitive.Content>
		</ScrollArea>
	</Dialog.Overlay>
</Dialog.Portal>
