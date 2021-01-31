<script>
	import { getEntry } from './resources/getData.js';

  import ProfilePicture from './ProfilePicture.svelte';
	import Entry from './Entry.svelte';

  export let user;
  export let id;

	let entry = {};
  let notFound = false;

  $: update(user, id);

	async function update() {
		entry = await getEntry(user, id)
	}
	update();
</script>

<div class="main-container">
  <div class="main-inner">
    <div class="viewheader">
      <div class="arrow">
    	  <svg class="arrowsvg" viewbox="0 0 100 100">
    		  <polyline points="31,12 69,50 31,88" fill="none" stroke="currentColor" stroke-width="12px" />
    	  </svg>
    	 </div>
      <div class="logobox"><ProfilePicture /></div>
      <h3>{user}</h3>
      <a href={'#~' + user} title="To User" class="clicklink"></a>
    </div>
	  <div class="entrieslist">
    {#if notFound}
      <p>Ooops, user/entry not found...</p>
    {:else}
      <Entry {entry} />
    {/if}
	  </div>
  </div>
</div>

<style>
  .main-container {
    display: flex;
    /* -> add media query? */
    justify-content: center;
  }
	.main-inner {
    width: 100%;
    max-width: var(--main-width);
    margin-bottom: 30px;
	}
  .viewheader {
    display: flex;
    position: relative;
    height: 50px;
    align-items: center;
  }
  .viewheader:hover {
    background-color: var(--main-hover-color);
  }
  .viewheader h3 {
    margin: 0;
  }
  .arrow {
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 15px;
  }
  .arrowsvg {
    height: 100%;
    transform: rotate(180deg);
  }
  .logobox {
    height: 25px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    margin-right: 10px;
  }
	.entrieslist {
    background-color: var(--main-background-color);
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		border-top: 1px solid var(--main-lines-color);
	}
	@media all and (min-width: 700px) {
		.entrieslist {
			border: 1px solid var(--main-lines-color);
			border-bottom: 0;
		}
	}
  .clicklink {
    position:absolute;
    width:100%;
    height:100%;
    top:0;
    left: 0;
    z-index: 10;
  }
</style>
