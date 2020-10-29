<script>
  import { onMount, onDestroy } from "svelte";
	//import { apiGetRequest } from './resources/requests.js';
	//import { entriesURL } from './resources/urls.js';
  //import { myrouter } from './resources/router.js';
  //import UserLogo from './UserLogo.svelte';
	import Entry from './Entry.svelte';

  export let entries = [];
  let userNotFound = false;


  const updateEntries = async (user) => {
    console.log("CALLED")
    //entries = [];
    //entries = await getEntries([{intersectionRatio: 1}]);
  }

  const bottomObserver = new IntersectionObserver(
    async (e) => {
      //entries = [ ...entries, ...await getEntries(e) ]
    },
    { threshold: 0.5 }
  );

  const ulMutationObserver = new MutationObserver(
    (m, o) => updateObserver(m, o)
  );

  function updateObserver(m, o) {
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

  function fetchEntries() {

  }

	onMount(async () => {
    const ul = document.querySelector('.entrieslist');
    ulMutationObserver.observe(ul, { childList: true });
    //console.log(entries)
    //updateObserver();
	});
  onDestroy(() => {
    //myrouter.unregisterSvelte(routerUpdate);
  });
</script>

<div class="entrieslist">
{#if userNotFound}
  <p>Ooops, user not found...</p>
{:else}
  {#each entries as entry}
    <div class="entrybox">
      <Entry entry={entry} />
      <a href={'#~' + entry.user + '/~' + entry.id} class="clicklink"></a>
    </div>
  {:else}
	  <p>loading...</p>
  {/each}
{/if}
</div>

<style>
	.entrieslist {
    background-color: var(--main-content-background-color);
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
  .entrybox {
    position: relative;
    width: 100%;
  }
  .entrybox:hover {
    background-color: var(--main-hover-color);
  }
  .entrybox:focus-within {
    background-color: var(--main-hover-color);
  }
  a {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  a:focus {
    outline-style: solid;
    outline-offset: -1px;
    outline-color: var(--focus-color);
    outline-width: 1px;
  }
</style>
