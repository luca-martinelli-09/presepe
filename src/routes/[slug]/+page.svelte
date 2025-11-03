<script lang="ts">
	import Page from '@/components/Page.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Page presepe={data.presepe} />
