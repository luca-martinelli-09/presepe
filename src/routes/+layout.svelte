<script lang="ts">
	import '$lib/assets/fonts/nightingale/index.css';
	import '$lib/assets/fonts/sorts-mill-goudy/index.css';
	import '../app.css';

	import * as Alert from '$lib/components/ui/alert';
	import NavigationMenu from '$lib/components/NavigationMenu.svelte';
	import { Button } from '$lib/components/ui/button';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
</script>

<svelte:head>
	<!-- <link rel="icon" href={favicon} /> -->
</svelte:head>

<Alert.Root class="rounded-none py-0">
	<Alert.Description class="container mx-auto">
		<Button variant="link" href="https://parrocchiadilugagnano.it" class="m-0 p-0">
			Torna al sito della Parrocchia di Lugagnano
		</Button>
	</Alert.Description>
</Alert.Root>

<NavigationMenu title="Presepe di Lugagnano" presepi={data.presepi} />

{@render children()}
