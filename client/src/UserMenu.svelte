<script>
	import { myrouter } from './resources/router.js';
	import { getUserMenu } from './resources/getData.js';
	import Topic from './Topic.svelte';
	import Tag from './Tag.svelte';
	import UserList from './UserList.svelte';

	export let overview = true;
	export let shownav;

	export let user = '';
	export let activeTopics = [];
	export let activeTags = [];

	let singleSelect = true;
	let topics = [];

	$: loadUserMenu(overview, user);
	$: updateUserMenu(activeTopics, activeTags);

	async function loadUserMenu() {
		// reset for reload
		topics = [];
		if (overview) return;
		const r = await getUserMenu(user);
		for (const topic of r) {
			const tags = topic.tags.map((t)=>{ return {
				name: t,
				active: false
			}});
			topics.push({
				name: topic.name,
				tags: tags,
				active: false
			});
		}
		//topics = topics;
		updateUserMenu();
	}

	function updateUserMenu() {
		//console.log('updateUserMenu')
		//console.log('Nav/topics, activeTopics: ', topics, activeTopics)
		for (const topic of topics) {
			if (activeTopics.includes(topic.name)) {
				topic.active = true;
				for (const tag of topic.tags) {
					if (activeTags.includes(tag.name)) tag.active = true;
					else tag.active = false;
				}
			} else {
				topic.active = false;
				resetTags(topic);
			}
		}
		topics = topics
	}

	function resetTags(topic) {
		for (const tag of topic.tags) {
			tag.active = false;
		}
	}

	function toggleTopic(topic) {
		// reset
		if (singleSelect) {
			for (const t of topics) {
				if (t === topic) {
					if (t.active) {
						t.active = false;
						// reset tags
						resetTags(t);
					} else t.active = true;
				} else {
					t.active = false;
					resetTags(t);
				}
			}
		} else {
			// set
			topic.active = !topic.active;
		}
		// update triggered by assignment!!
		topics = topics;
		updateURL();
	}

	function toggleTag(topic, tag) {
		const v = tag.active;
		for (const t of topic.tags) {
			t.active = false;
		}
		tag.active = !v;
		topics = topics;
		updateURL();
	}

	function updateURL() {
		const activeTopics = [];
		const activeTags = [];
		for (const t of topics) {
			if (t.active) activeTopics.push(t.name);
			for (const tag of t.tags) {
				if (tag.active) activeTags.push(tag.name);
			}
		}
		myrouter.setURL(myrouter.getRoute(), [ activeTopics, activeTags ]);
	}

</script>

<nav class:shownav>
	<div class="marginbox"></div>
	<div class="scrollbox">
	{#if overview}
		<UserList />
	{:else}
		<div class="topics">
			{#each topics as topic}
				<Topic title={topic.name} active={topic.active} on:click={()=>toggleTopic(topic)} />
				{#if topic.active}
				<div class="tags">
					{#each topic.tags as tag}
						<Tag title={tag.name} active={tag.active} on:click={()=>toggleTag(topic, tag)} />
					{/each}
				</div>
				{/if}
			{:else}
			 	<p>loading...</p>
			{/each}
		</div>
	{/if}
	</div>
</nav>

<style>
	nav {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		width: var(--side-width-extended);
		position: fixed;
		left: calc(-1 * var(--side-width-extended));
		transition: left 0.2s;
		top: 0;
		bottom: 0;
		background-color: var(--side-background-color);
		z-index: 15;
		border-right: 2px solid var(--logo-secondary-color);
	}
	nav.shownav {
		left: 0;
		transition: left 0.2s;
	}
	/*nav.nomenu {
		display: none;
	}*/
	@media all and (min-width: 700px) {
		nav {
			left: 0;
		}
	}
	.marginbox {
		min-height: calc(var(--header-height) - 1px);
		border-bottom: 1px solid var(--side-lines-color);
	}
	.scrollbox {
		overflow-y: auto;
		overflow-x: hidden;
		scrollbar-color:
			var(--side-scrollbar-color)
			var(--side-background-color);
		scrollbar-width: thin;
	}
	.topics {
		border-bottom: 1px solid var(--side-lines-color);
	}
	.tags {
		padding: 4px 10px 4px 10px;
		border-bottom: 1px solid var(--side-lines-color);
	}
</style>
