<script>
  import { Icon } from '@smui/icon-button';
  import moment from 'moment';
  import Linkbox from './Linkbox.svelte';
  import TopicTag from './TopicTag.svelte';
  import TagTag from './TagTag.svelte';
  import { getHTML } from './resources/helpers.js';

  const md = window.markdownit();

	export let entry = {};

  let html = "";

  let iconsTypes = {
    task: 'task_alt',
    link: 'link',
    article: 'article',
    image: 'image'
  };

  if (entry.type === 'task' || entry.type === 'article')
    html = md.render(entry.text);

  //let dateFormat = 'ddd MMM D YYYY - HH:mm:ss';
  const dateFormat = 'MMM D YYYY - HH:mm';
  const date = moment(new Date(entry.date)).format(dateFormat);
</script>

<div class="entry">
  <div class="entryheader">
    <span class="link-icon">
      <i class="material-icons">{iconsTypes[entry.type]}</i>
    </span>
    <small class="date">
      {date}
    </small>
  </div>
  <div class="entrycontent">
  {#if entry.type === 'task'}
    {@html html}
  {:else if entry.type === 'article'}
    {@html html}
  {:else if entry.type === 'link'}
    <Linkbox href={entry.text}
             title={entry.title}
             comment={entry.comment} />
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
    width: 220px;
    border: 1px solid var(--main-lines-color);
    border-radius: 4px;
  }
  .entryheader {
    display: flex;
    padding: 7px 0 7px 10px;
    font-size: smaller;
    color: var(--main-text-color-low-emph);
    border-bottom: 1px solid var(--main-lines-color);
  }
  .link {
    color: var(--links-color);
  }
  /*.entrycontent {
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
  }*/
</style>
