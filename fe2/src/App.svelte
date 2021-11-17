<script lang="ts">
	import {onMount} from "svelte";
	import * as api from "./api";

	let name: string = "";
	let searchSongs: api.Track[] = [{id: "aaa", name: "aaa"}, {id: "bbb", name: "bbb"}];
	let queue: api.Track[] = [];
	let add = (id: string) => {
		api.add(id).then(getQueue)
	}

	$: name, api.search(name).then(res => {
		searchSongs = res;
	})

	function getQueue() {
		api.queue().then(res => {
			queue = res;
		})
	}

	onMount(() => {
		getQueue();
	})
</script>

<main style="display: flex; flex-direction: row">
	<div style="flex: 1">
		<h3>Pick a song</h3>
		<input placeholder="search" bind:value={name} />

		<div style="text-align: left">
			{#each searchSongs as song}
				<div style="margin-top: 8px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid black">
					<span>{song.name} - {song.artist}</span>
					<button on:click={() => add(song.uri)}>+</button>
				</div>
			{/each}
		</div>
	</div>
	<div style="flex: 1; padding-left: 20px">
		<h3>Currently queued songs</h3><button on:click={() => api.clear().then(getQueue)}>Clear</button>
		{#each queue as song}
			<div style="margin-top: 8px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid black">
				<span>{song.name} - {song.artist}</span>
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
