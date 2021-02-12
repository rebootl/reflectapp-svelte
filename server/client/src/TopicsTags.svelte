<script>
	import Drawer, {AppContent, Content, Header, Title, Subtitle, Scrim} from '@smui/drawer';
	import List, {Item, Text, Graphic, Separator, Subheader} from '@smui/list';
	import H6 from '@smui/common/H6.svelte';
	//import Chip, {Set, Icon, Checkmark} from '@smui/chips';
	import { createEventDispatcher } from 'svelte';
	import { myrouter } from './resources/router.js';
	import { getUserMenu } from './resources/getData.js';
	import Topic from './Topic.svelte';
	import Tag from './Tag.svelte';

	const dispatch = createEventDispatcher();

	export let user = '';

	let activeTopics = new Set();
	let activeTags = new Set();

	let topics = [];
	let tags = [];

	$: loadUserMenu(user);

	async function loadUserMenu() {
		// reset for reload
		topics = [];
		const r = await getUserMenu(user);
		topics = r;
	}

	function toggleTopic(topicName) {
    if (activeTopics.has(topicName)) activeTopics.delete(topicName);
		else {
			activeTopics.clear();
			activeTopics.add(topicName);
		}
		activeTopics = activeTopics;

		if (activeTopics.size > 0) {
			const activeTopicObj = topics.filter((e) => e.name === topicName)[0];
			tags = activeTopicObj.tags;
		} else tags = [];

		activeTags.clear();
		dispatchChange();
  }

	function toggleTag(tag) {
		if (activeTags.has(tag)) activeTags.delete(tag);
		else {
			activeTags.clear();
			activeTags.add(tag);
		}
		activeTags = activeTags;
		dispatchChange();
	}

	function dispatchChange() {
		dispatch('change', { activeTopics: activeTopics, activeTags: activeTags });
	}
</script>

<div class="topics">
	<Drawer>
		<Content>
	    <List>
	      <Separator nav />
	      <Subheader component={H6}>Topics</Subheader>
	      {#each topics as t}
					<Topic active={activeTopics.has(t.name) ? true : false}
								 on:click={() => toggleTopic(t.name)}>{t.name}</Topic>
	      {/each}
				{#if tags.length > 0}
	    		<Separator nav />
	    		<Subheader component={H6}>Tags</Subheader>
					{#each tags as t}
						<Tag active={activeTags.has(t) ? true : false}
								 on:click={() => toggleTag(t)}>{t}</Tag>
					{/each}
				{/if}
			</List>
	  </Content>
	</Drawer>
</div>

<style>
</style>
