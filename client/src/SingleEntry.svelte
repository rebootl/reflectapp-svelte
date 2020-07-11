<script>
  import { onMount } from "svelte";
	import { apiGetRequest } from './resources/requests.js';
	import { entriesURL } from './resources/urls.js';
  import UserLogo from './UserLogo.svelte';
	import Entry from './Entry.svelte';

  export let user;
  export let entryId;

	let entries = [];
  let notFound = false;

  $: updateEntries(user);

  async function updateEntries() {
    entries = await getEntry();
  }

	async function getEntry() {
    console.log(entryId)
		const r = await apiGetRequest(entriesURL + '/' + user
      + '/' + entryId);
    console.log(r);
		if (!r.success) {
			console.error(r)
      notFound = true;
			return [];
		}
    notFound = false;
		return [ r.result ];
	}

	onMount(async () => {
	});
</script>

<div class="main-container">
  <div class="main-inner">
    <div class="viewheader">
      <div class="arrow">
    	  <svg class="arrowsvg" viewbox="0 0 100 100">
    		  <polyline points="31,12 69,50 31,88" fill="none" stroke="currentColor" stroke-width="12px" />
    	  </svg>
    	 </div>
      <div class="logobox"><UserLogo /></div>
      <h3>{user}</h3>
      <a href={'#~' + user} title="To User"><span class="clickspan"></span></a>
    </div>
	  <div class="entrieslist">
    {#if notFound}
      <p>Ooops, user/entry not found...</p>
    {:else}
      {#each entries as e}
        <Entry entry={e} />
      {/each}
	  <!--{:else}
	    <p>loading...</p>-->
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
    box-sizing: border-box;
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
    background-color: rgba(255, 255, 255, 0.025);
  }
  .viewheader h3 {
    margin: 0;
    /*font-size: 1.3rem;*/
  }
  .arrow {
    height: 25px;
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
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.25);
	}
  .clickspan {
    position:absolute;
    width:100%;
    height:100%;
    top:0;
    left: 0;
    z-index: 10;
  }
</style>
