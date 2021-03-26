<script>
	import Drawer, { Header, Title, Content } from '@smui/drawer';
	import List, { Separator, Subheader, Item, Text, Graphic } from '@smui/list';
	import H6 from '@smui/common/H6.svelte';
	import { createEventDispatcher } from 'svelte';
	import UserList from './UserList.svelte';
	import TopicsTags from './TopicsTags.svelte';

	const dispatch = createEventDispatcher();

	export let showmenu;
	export let overview = true;
	export let user = '';

</script>

<nav class:showmenu>
	<div class="marginbox"></div>
	<div class="scrollbox">
		<div>
			<Drawer>
				<Content>
					<List>
						<Item href="/#">
							<Graphic class="material-icons" aria-hidden="true">home</Graphic>
							<Text>Home</Text>
						</Item>
						{#if overview}
							<UserList {user} />
						{:else}
							<Subheader component={H6}>User</Subheader>
							<Header>
								<Title>{user}</Title>
							</Header>
							<TopicsTags />
						{/if}
					</List>
				</Content>
			</Drawer>
		</div>
	</div>
</nav>
<div class="overlay" class:showmenu on:click={() => dispatch('togglemenu')}></div>

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
		z-index: 25;
		color: var(--side-text-color);
		background-color: var(--side-background-color);
		border-right: 1px solid var(--side-lines-color);
	}
	.subtitle {
		text-align: center;
	}
	nav.showmenu {
		left: 0;
		transition: left 0.2s;
	}
	.overlay {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgb(0, 0, 0);
		/*opacity: 1;*/
		z-index: 15;
		display: none;
	}
	.overlay.showmenu {
		display: flex;
		opacity: 0.5;
		/* transition opacity somehow doesn't work */
		/*transition: opacity 0.2s;*/
	}
	.spacer {
		height: 20px;
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
	@media all and (min-width: 700px) {
		nav {
			left: 0;
		}
		nav.showmenu {
			left: calc(-1 * var(--side-width-extended));
			transition: left 0.2s;
		}
		.overlay.showmenu {
			display: none;
		}
	}
</style>
