<script>
  import moment from 'moment';
  import Linkbox from './Linkbox.svelte';
  import TopicTag from './TopicTag.svelte';
  import TagTag from './TagTag.svelte';
  import { getHTML } from './resources/helpers.js';

	export let entry = {};

  let html = "";

  if (entry.type === 'note' || entry.type === 'image')
    html = getHTML(entry.text, entry.images);

  //let dateFormat = 'ddd MMM D YYYY - HH:mm:ss';
  const dateFormat = 'MMM D YYYY - HH:mm';
  const date = moment(new Date(entry.date)).format(dateFormat);
</script>

<div class="entry">
  <div class="entryheader">
    <em class="date"><small>{date}</small></em>
  </div>
  <div class="entrycontent">
  {#if entry.type === 'note'}
    {@html html}
  {:else if entry.type === 'image'}
    {@html html}
    {#if entry.comment && entry.comment !== ""}
      <small class="imagecomment">{entry.comment}</small>
    {/if}
  {:else if entry.type === 'link'}
    <Linkbox href={entry.text}
             title={entry.title}
             comment={entry.comment} />
  {:else}
    <p>oops entry type unknown...</p>
  {/if}
  </div>
  <div class="tagbox">
    {#each entry.topics as title}
      <TopicTag>{title}</TopicTag>
    {/each}
    {#each entry.tags as title}
      <TagTag>{title}</TagTag>
    {/each}
  </div>
</div>

<style>
  .entry {
    box-sizing: border-box;
    width: 100%;
    padding: 0 20px 0 20px;
    border-bottom: 1px solid var(--main-lines-color);
  }
  .entryheader {
    margin: 15px 0 35px 0;
    color: var(--main-text-color-low-emph);
  }
  .entrycontent {
    margin: 35px 0 35px 0;
  }
  :global(pre) {
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
  .tagbox {
    margin: 24px 0 24px 0;
  }
</style>
