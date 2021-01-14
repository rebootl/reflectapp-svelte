<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from 'svelte';
	import Entry from './Entry.svelte';

  const dispatch = createEventDispatcher();

  export let entries = [];

  // trigger fetch at nth element from the bottom
  // -> loading get's stuck at some point when using 4, why?
  const n = 3;

  function lazyload(e) {
    if (e[e.length - 1].intersectionRatio <= 0) return;
    console.log('FETCH!')
		dispatch('fetch');
  }

  const bottomObserver = new IntersectionObserver(
    (e) => { lazyload(e) },
    { threshold: 0.5 }
  );

  const ulMutationObserver = new MutationObserver(
    (m, o) => updateObserver(m, o)
  );

  function updateObserver(m, o) {
    const triggerElement = document.querySelector('.triggerelement');
    if (triggerElement) {
      triggerElement.classList.remove('triggerelement');
      bottomObserver.unobserve(triggerElement);
    }
    const el = document.querySelector('.entrieslist');
    const newTriggerElement = el.children[el.children.length - n];
    if (newTriggerElement) {
      console.log('add observer')
      newTriggerElement.classList.add('triggerelement')
      bottomObserver.observe(newTriggerElement);
    }
  }

	onMount(async () => {
    const ul = document.querySelector('.entrieslist');
    ulMutationObserver.observe(ul, { childList: true });
	});
</script>

<div class="entrieslist">
{#each entries as entry}
  <div class="entrybox">
    <Entry entry={entry} />
    <a href={'#~' + entry.user + '/~' + entry.id} class="clicklink"></a>
  </div>
{:else}
  <p>loading...</p>
{/each}
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
