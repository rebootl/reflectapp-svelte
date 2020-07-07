<script>
  import moment from 'moment';
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
    <div class="linkbox">
      <small class="linkref">
        <a href={entry.text} target="_blank">
          <span class="clickspan"></span>{entry.text}
        </a>
      </small>
      <p class="linktitle">{entry.title}</p>
      <small class="linkcomment">{entry.comment}</small>
    </div>
  {:else}
    oops entry type unknown...
  {/if}
  </div>
  <div class="tagbox">
    {#each entry.topics as title}
      <small class="topictag">{title}</small>
    {/each}
    {#each entry.tags as title}
      <small class="tagtag">{title}</small>
    {/each}
  </div>
</div>

<style>
  .entry {
    width: 100%;
    padding: 0 20px 0 20px;
    border-bottom: 1px solid var(--main-background-color-light);
  }
  .entryheader {
    margin: 15px 0 15px 0;
    color: var(--main-text-color-low-emph);
  }
  .date {
    /*font-family: serif;*/
  }
  .entrycontent {
    margin: 16px 0 16px 0;
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
    margin-top: -16px;
    padding: 10px 0 10px 0;
    border-top: 1px solid var(--main-background-color-lighter);
    background-color: var(--main-background-color-light);
  }
  .linkbox {
    max-width: 550px;
    background-color: var(--main-background-color);
    border: 1px solid var(--main-background-color-lighter);
    border-radius: 0.5rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    /* for clickspan */
    position: relative;
  }
  .linkbox:hover {
    background-color: rgba(255, 255, 255, 0.04);
  }
  .linkref {
    display: block;
    margin: 10px 16px 0 16px;
  }
  .linktitle {
    margin: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    /* -> only needed for corrupted title w/ long words, remove later */
    word-break: break-all;
  }
  .linkcomment {
    /* -> test */
    /*margin: 0;*/
    display: block;
    text-align: center;
    padding: 10px 0 10px 0;
    border-top: 1px solid var(--main-background-color-lighter);
    background-color: var(--main-background-color-light);
  }
  .clickspan {
    position:absolute;
    width:100%;
    height:100%;
    top:0;
    left: 0;
    z-index: 1;
  }
  .tagbox {
    margin: 24px 0 24px 0;
  }
  .topictag {
    margin-right: 5px;
    padding: 5px;
    border-radius: 3px;
    font-size: 0.9em;
    background-color: var(--main-background-color-lighter);
    color: var(--main-text-color);
  }
  .tagtag {
    margin-right: 5px;
    padding: 5px;
    border-radius: 10px;
    font-size: 0.9em;
    border: 1px solid var(--main-background-color-lighter);
    color: var(--main-text-color-low-emph);
  }
</style>
