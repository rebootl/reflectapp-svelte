<script>
	import Drawer, {AppContent, Content, Header, Title, Subtitle, Scrim} from '@smui/drawer';
	import List, {Item, Text, Graphic, Separator, Subheader} from '@smui/list';
	import H6 from '@smui/common/H6.svelte';
	import { myDataStore } from './resources/dataStore.js';
	import Topic from './Topic.svelte';
	import Tag from './Tag.svelte';

	export let user = '';

	let activeTopics = new Set();
	let activeTags = new Set();

	let topics = [];
	let tags = [];

	$: loadUserMenu(user);

	async function loadUserMenu() {
		// reset for reload
		//topics = [];
		topics = await myDataStore.getUserMenu(user);
		//topics = r;
	}

	function toggleTopic(t) {
		for (const e of topics) {
			if (e.name !== t.name)
				e.active = false;

			for (const f of e.tags) {
				f.active = false;
			}
		}
		t.active = !t.active;
		topics = topics;
		tags = t.tags
		// -> update State
		myDataStore.currentMenu = topics;
  }

	function toggleTag(t) {
		for (const e of tags) {
			if (e.name !== t.name)
				e.active = false;
		}
		t.active = !t.active;
		tags = tags;
		myDataStore.currentMenu = topics;
	}
</script>

<div class="topics">
	<Drawer>
		<Content>
	    <List>
	      <Separator nav />
	      <Subheader component={H6}>Topics</Subheader>
	      {#each topics as t}
					<Topic active={t.active}
								 on:click={() => toggleTopic(t)}>{t.name}</Topic>
	      {/each}
				{#if tags.length > 0}
	    		<Separator nav />
	    		<Subheader component={H6}>Tags</Subheader>
					{#each tags as t}
						<Tag active={t.active}
								 on:click={() => toggleTag(t)}>{t.name}</Tag>
					{/each}
				{/if}
			</List>
	  </Content>
	</Drawer>
</div>

<style>
</style>
