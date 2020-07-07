<script>
  import { onMount } from "svelte";
	import { apiGetRequest } from './resources/requests.js';
	import { entriesURL } from './resources/urls.js';
  import UserLogo from './UserLogo.svelte';
	import Entry from './Entry.svelte';

  export let user;

	let entries = [];

  const bottomObserver = new IntersectionObserver(
    async (e) => {
      entries = [ ...entries, ...await getEntries(e) ]
      console.log(entries)
    },
    { threshold: 0.5 }
  );

  const ulMutationObserver = new MutationObserver(
    (m, o) => updateObserver()
  );

  function updateObserver() {
    const lastli = document.querySelector('.lastelement');
    if (lastli) {
      lastli.classList.remove('lastelement');
      bottomObserver.unobserve(lastli);
    }
    const ul = document.querySelector('.entrieslist');
    const newLastli = ul.lastElementChild;
    newLastli.classList.add('lastelement')
    bottomObserver.observe(newLastli);
  }

  /*function addObserver() {
    const ul = document.querySelector('.entrieslist');
    const lastli = ul.lastElementChild;
    bottomObserver.observe(lastli);
  }
  function removeObserver() {
    const ul = document.querySelector('.entrieslist');
    const lastli = ul.lastElementChild;
    bottomObserver.unobserve(lastli);
  }*/

	async function getEntries(e) {
    // in some cases the observable of the previous 'lastelement' is still
    // threre, therefor the last entry has to be used instead of 0
    if (e[e.length - 1].intersectionRatio <= 0) return;

    console.log("GETENTRIES")
    const skip = entries.length;
		const r = await apiGetRequest(entriesURL + '/' + user, {
      skip: skip
    });
		if (!r.success) {
			console.error(r)
			return [];
		}
    console.log(r.result)
		return r.result;
	}

	onMount(async () => {
		entries = await getEntries([{intersectionRatio: 1}]);
    const ul = document.querySelector('.entrieslist');
    ulMutationObserver.observe(ul, { childList: true });
    updateObserver();
	});
</script>

<div class="main-container">
  <div class="main-inner">
	  <h1><div class="logobox"><UserLogo /></div>{user}</h1>
	  <div class="entrieslist">
	  {#each entries as e}
      <Entry entry={e} />
	  {:else}
		  <p>loading...</p>
	  {/each}
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
    /*padding-left: 20px;
    padding-right: 10px;*/
	}
  .logobox {
    height: 50px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    margin-left: 10px;
  }
	.entrieslist {
    background-color: var(--main-background-color);
		box-sizing: border-box;
		/*background-color: var(--main-background-color-dark);*/
		/*max-width: var(--main-width);*/
		/*padding-left: 20px;
		padding-right: 10px;*/
    /*width: 100%;*/
		display: flex;
		flex-wrap: wrap;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.25);
	}
</style>
