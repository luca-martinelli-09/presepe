<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Info } from '@lucide/svelte';
</script>

<Button
	size="icon-lg"
	variant="default"
	class="size-14 cursor-pointer rounded-full bg-white text-black hover:bg-white"
>
	<Info class="size-7" />
</Button>
