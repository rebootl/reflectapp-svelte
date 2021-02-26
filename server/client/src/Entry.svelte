<script>
  import { onMount } from 'svelte';
  import { Icon } from '@smui/icon-button';
  import moment from 'moment';
  import Linkbox from './Linkbox.svelte';
  import TopicTag from './TopicTag.svelte';
  import TagTag from './TagTag.svelte';
  import { getHTML } from './resources/helpers.js';

  const md = window.markdownit();
  const dateFormat = 'MMM D YYYY - HH:mm';

	export let entry = {};
  export let edit = false;

  let html = '';
  let date = '';

  let iconsTypes = {
    task: 'task_alt',
    link: 'link',
    article: 'article',
    image: 'image'
  };

  $: update(entry);

  function update() {
    if (entry.type === 'task' || entry.type === 'article')
      html = md.render(entry.text);

    date = moment(new Date(entry.date)).format(dateFormat);
  }
</script>

<div class="entry">
  <div class="entryheader">
    <div>
      <i class="material-icons">{iconsTypes[entry.type]}</i>
      {#if entry.private}<i class="material-icons">lock</i>{/if}
    </div>
    <small class="date">
      {date}
    </small>
    <a class="entrylink" href={'/#~' + entry.user + '/~' + entry.id}></a>
    <!--{#if edit}<i class="material-icons">create</i>{/if}-->
  </div>
  {#if entry.type === 'task'}
    <div class="entrycontent">
      {@html html}
    </div>
  {:else if entry.type === 'article'}
    <div class="entrycontent">
      {@html html}
    </div>
  {:else if entry.type === 'link'}
    <Linkbox href={entry.text}
             title={entry.title}
             comment={entry.comment} />
  {:else if entry.type === 'image'}
  {:else}
    <div class="entrycontent">
      <p>oops entry type unknown...</p>
    </div>
  {/if}
  <div class="tagbox">
    {#each entry.topics as topic}<TopicTag>{topic}</TopicTag>{/each}
    {#each entry.tags as tag}<TagTag>{tag}</TagTag>{/each}
  </div>
</div>

<style>
  .entry {
    box-sizing: border-box;
    width: 220px;
    border: 1px solid var(--main-lines-color);
    border-radius: 4px;
  }
  .entryheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 7px 10px 7px 10px;
    font-size: smaller;
    color: var(--main-text-color-low-emph);
    border-bottom: 1px solid var(--main-lines-color);
  }
  .entryheader:hover {
    background-color: var(--main-hover-color);
  }
  .entrylink {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .link {
    color: var(--links-color);
  }
  .entrycontent {
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .tagbox {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding: 10px;
  }
  /*:global(pre) {
    overflow-x: scroll;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 20px;
    z-index: 20;
  }
  :global(.entryimage) {
    max-width: 100%;
  }
  :global(img) {
    max-width: 100%;
  }
  .imagecomment {
    display: block;
    text-align: center;
    margin-top: -20px;
    padding: 10px 0 10px 0;
    border-top: 1px solid var(--main-background-color-lighter);
    background-color: var(--main-background-color-light);
  }
*/
</style>
