<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
	import '$lib/assets/fonts/nightingale/index.css';
	import '$lib/assets/fonts/sorts-mill-goudy/index.css';
	import '../app.css';

	import NavigationMenu from '$lib/components/NavigationMenu.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';
	import Footer from '@/components/Footer.svelte';
	import { createTitle } from '@/utils';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{createTitle()}</title>
</svelte:head>

<Alert.Root class="rounded-none px-2 py-0">
	<Alert.Description class="container mx-auto">
		<Button variant="link" href="https://parrocchiadilugagnano.it" class="m-0 p-0">
			Torna al sito della Parrocchia di Lugagnano
		</Button>
	</Alert.Description>
</Alert.Root>

<NavigationMenu title="Presepe Artistico di Lugagnano" presepi={data.presepi} />

{@render children()}

<Footer />
