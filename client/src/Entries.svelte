<script>
  import { onMount, onDestroy } from "svelte";
	import { apiGetRequest } from './resources/requests.js';
	import { entriesURL } from './resources/urls.js';
  import { myrouter } from './resources/router.js';
  import UserLogo from './UserLogo.svelte';
	import Entry from './Entry.svelte';

  //export let user;
  let user = "";
	let entries = [];
  let userNotFound = false;

  //$: updateEntries(user);
  function routerUpdate() {
    updateEntries();
  }

  const updateEntries = async (user) => {
    console.log("CALLED")
    entries = [];
    entries = await getEntries([{intersectionRatio: 1}]);
  }

  const bottomObserver = new IntersectionObserver(
    async (e) => {
      entries = [ ...entries, ...await getEntries(e) ]
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

	async function getEntries(e) {
    // in some cases the observable of the previous 'lastelement' is still
    // threre, therefor the last entry has to be used instead of 0
    if (e[e.length - 1].intersectionRatio <= 0) return [];

    user = myrouter.getRoute().slice(1);
    // avoid err. on unmount
    if (user === "") return;
    const topics = myrouter.getParts(0);
    const tags = myrouter.getParts(1);
    console.log(user, topics, tags)

    const skip = entries.length;
		const r = await apiGetRequest(entriesURL + '/' + user, {
      topics: topics,
      tags: tags,
      skip: skip
    });
		if (!r.success) {
			console.error(r)
      userNotFound = true;
			return [];
		}
    userNotFound = false;
		return r.result;
	}

	onMount(async () => {
    myrouter.registerSvelte(routerUpdate);
		entries = await getEntries([{intersectionRatio: 1}]);
    const ul = document.querySelector('.entrieslist');
    ulMutationObserver.observe(ul, { childList: true });
    //updateObserver();
	});
  onDestroy(() => {
    myrouter.unregisterSvelte(routerUpdate);
  });
</script>

<div class="main-container">
  <div class="main-inner">
	  <h1><div class="logobox"><UserLogo /></div>{user}</h1>
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
	}
  .logobox {
    height: 50px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    margin-left: 10px;
  }
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
