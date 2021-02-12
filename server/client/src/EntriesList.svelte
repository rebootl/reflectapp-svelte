<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from 'svelte';
	import Entry from './Entry.svelte';

  const dispatch = createEventDispatcher();

  export let entries = [];
  export let edit = false;

  // trigger fetch at nth element from the bottom
  // -> loading get's stuck at some point when using 4, why?
  const n = 3;

  function lazyload(e) {
    if (e[e.length - 1].intersectionRatio <= 0) return;
    //console.log('FETCH!')
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
      //console.log('add observer')
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
    <Entry entry={entry} {edit} />
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
    gap: 20px;
	}
</style>
