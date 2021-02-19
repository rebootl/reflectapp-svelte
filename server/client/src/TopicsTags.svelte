<script>
	import Drawer, {Content} from '@smui/drawer';
	import List, {Separator, Subheader} from '@smui/list';
	import H6 from '@smui/common/H6.svelte';
	import { myDataStore } from './resources/dataStore.js';
	import { activeTopics, activeTags } from './store.js';
	import Topic from './Topic.svelte';
	import Tag from './Tag.svelte';

	export let user = '';

	let topics = [];
	let tags = [];

	$: loadUserMenu(user);

	async function loadUserMenu() {
		// reset for reload
		topics = await myDataStore.getUserMenu(user);
	}

	function toggleTopic(t) {
		if ($activeTopics.has(t.name)) $activeTopics.delete(t.name);
		else {
			$activeTopics.clear();
			$activeTopics.add(t.name);
		}
		$activeTopics = $activeTopics;

		tags = t.tags;
		$activeTags.clear();
  }

	function toggleTag(t) {
		if ($activeTags.has(t)) $activeTags.delete(t);
		else {
			$activeTags.clear();
			$activeTags.add(t);
		}
		$activeTags = $activeTags;
	}
</script>

<div class="topics">
	<Drawer>
		<Content>
	    <List>
	      <Separator nav />
	      <Subheader component={H6}>Topics</Subheader>
	      {#each topics as t}
					<Topic active={$activeTopics.has(t.name)}
								 on:click={() => toggleTopic(t)}>{t.name}</Topic>
	      {/each}
				{#if tags.length > 0}
	    		<Separator nav />
	    		<Subheader component={H6}>Tags</Subheader>
					{#each tags as t}
						<Tag active={$activeTags.has(t)}
								 on:click={() => toggleTag(t)}>{t}</Tag>
					{/each}
				{/if}
			</List>
	  </Content>
	</Drawer>
</div>

<style>
</style>
