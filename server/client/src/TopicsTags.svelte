<script>
	import Drawer, {Content} from '@smui/drawer';
	import List, {Separator, Subheader} from '@smui/list';
	import H6 from '@smui/common/H6.svelte';

	import { topics, tags, activeTopics, activeTags } from './resources/store.js';

	import Topic from './Topic.svelte';
	import Tag from './Tag.svelte';

	function toggleTopic(t) {
		if ($activeTopics.has(t)) $activeTopics.delete(t);
		else {
			$activeTopics.clear();
			$activeTopics.add(t);
		}
		$activeTopics = $activeTopics;

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
	      {#each $topics as t}
					<Topic active={$activeTopics.has(t)}
								 on:click={() => toggleTopic(t)}>{t}</Topic>
	      {/each}
				{#if $tags.length > 0}
	    		<Separator nav />
	    		<Subheader component={H6}>Tags</Subheader>
					{#each $tags as t}
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
