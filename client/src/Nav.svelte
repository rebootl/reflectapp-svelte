<script>
	import { onMount, onDestroy } from "svelte";
	import { apiGetRequest } from './resources/requests.js';
	import { menuURL } from './resources/urls.js';
	import { myrouter } from './resources/router.js';
	import Topic from './Topic.svelte';
	import Tag from './Tag.svelte';

	export let shownav;
	export let nomenu;
	//export let user;

	//let user = "";
	let topics = [];

	let singleSelect = true;

	onMount(async () => {
		await loadMenu();
		myrouter.registerSvelte(routerUpdate);
		updateMenu();
	})
	onDestroy(() => {
		myrouter.unregisterSvelte(routerUpdate);
	});

	function routerUpdate() {
		updateMenu();
	}

	function updateMenu() {
		const activeTopics = myrouter.getParts(0);
		const activeTags = myrouter.getParts(1);
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

	async function loadMenu() {
		// reset for reload
		topics = [];
		const r = await getUserMenu();
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
		// (set in updateMenu)
		//topics = topics;
	}

	async function getUserMenu() {
		const user = myrouter.getRoute().slice(1);
		const r = await apiGetRequest(menuURL + '/' + user);
		if (!r.success) {
			console.error(r)
			return [];
		}
		return r.result;
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

	function toggleTag(tag) {
		tag.active = !tag.active;
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

<nav class:shownav class:nomenu>
	<div class="marginbox"></div>
	<div class="scrollbox">
		<div class="topics">
			{#each topics as t}
				<Topic title={t.name} active={t.active} on:click={()=>toggleTopic(t)} />
				{#if t.active}
				<div class="tags">
					{#each t.tags as t}
						<Tag title={t.name} active={t.active} on:click={()=>toggleTag(t)} />
					{/each}
				</div>
				{/if}
			{:else}
			 	<p>loading...</p>
			{/each}
		</div>
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
	nav.nomenu {
		display: none;
	}
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
