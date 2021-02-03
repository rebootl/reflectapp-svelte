<script>
  import Textfield from '@smui/textfield';
  import Button from '@smui/button';
  import Chip, { Set, Icon, Checkmark, Text } from '@smui/chips';
  import TextArea from './Elements/TextArea.svelte';
  import { apiPostRequest } from './resources/requests.js';
  import { entriesURL } from './resources/urls.js';
  import { getUserName } from './resources/auth.js';
  import { digestMessage, getPrefix } from './resources/helpers.js';

  export let type = 'any';
  export let editEntry = {};

  let inputText = '';
  let comment = '';
  let linkTitle = '';
  let newTopic = '';
  let newTopics = [];
  let topics = [ 'abc', '123', 'test' ];
  let selectedTopics = [];
  let newTag = '';
  let newTags = [];
  let tags = [ 'lala', '123', 'test' ];
  let selectedTags = [];

  let editId = '';

  let ready = false;
  let edit = false;

  $: checkReady(inputText);
  $: loadEdit(editEntry);

  function checkReady() {
    console.log("checkReady")
    if (type === 'task' || type === 'link' || type === 'article') {
      if (inputText.length > 0)
        ready = true;
      else ready = false;
    }
  }

  function loadEdit() {
    console.log("loadEdit")
    //editId = editEntry.id;
    inputText = editEntry.text;
    topics = editEntry.topics;
    tags = editEntry.tags;
    selectedTopics = editEntry.topics;
    selectedTags = editEntry.tags;

    if (editEntry.type === 'link') {
      linkTitle = editEntry.title;
      comment = editEntry.comment;
    }
    edit = true;
    ready = true;
  }

  function addTopic() {
    if (newTopics.includes(newTopic) || newTopic === '') return;
    newTopics.push(newTopic);
    newTopics = newTopics;
    newTopic = '';
  }

  function removeTopic(t) {
    const f = newTopics.filter(e => e !== t);
    newTopics = f;
  }

  function addTag() {
    if (newTags.includes(newTag) || newTag === '') return;
    newTags.push(newTag);
    newTags = newTags;
    newTag = '';
  }

  function removeTag(t) {
    const f = newTags.filter(e => e !== t);
    newTags = f;
  }

  async function makeId(entry) {
    // create id/ref
    // -> the digest function is total overkill but meh... :D
    const digest = await digestMessage(JSON.stringify(entry));
    return entry.type + "-" + digest.slice(0, 12);
  }

  async function create() {

    const d = {
      user: getUserName(),
      type: type,
    };

    if (type === 'task' || type === 'article' || type === 'link') {
      d.text = inputText; // -> escape or anything???
    }
    if (type === 'link') {
      d.title = linkTitle;
      d.comment = comment;
    }
    // -> type images

    d.topics = [ ...newTopics, ...selectedTopics ];
    d.tags = [ ...newTags, ...selectedTags ];

    // handle edit / new
    if (!edit) {
      d.date = new Date();
      d.id = await makeId(d);
      console.log(d.id)
    } else {
      d.date = editEntry.date;
      d.mdate = new Date();
      d.id = editEntry.id;
    }

    const r = await apiPostRequest(entriesURL, d);
    if (!r.success) {
      console.error(r);
    }
    // reset
    reset();
  }

  function reset() {
    ready = false;
    edit = false;
    inputText = '';
    comment = '';
    linkTitle = '';
    newTopic = '';
    newTopics = [];
    topics = [ 'abc', '123', 'test' ];
    selectedTopics = [];
    newTag = '';
    newTags = [];
    tags = [ 'lala', '123', 'test' ];
    selectedTags = [];
  }
</script>

<div class="entry-input-box">
{#if type !== 'any'}
  <div class="inputs-box">
    {#if type === 'task'}
      <Textfield textarea bind:value={inputText} label="New Task" />
    {:else if type === 'link'}
      <div class="inputs-links-box">
        <Textfield variant="outlined" on:input={checkReady}
                   bind:value={inputText} label="New URL" />
        {#if ready}
          <Textfield variant="outlined" bind:value={linkTitle} label="Title" />
          <Textfield variant="outlined" bind:value={comment} label="Comment" />
        {/if}
      </div>
    {:else if type === 'article'}
      <Textfield textarea fullwidth on:input={checkReady} bind:value={inputText}
                 label="New Entry" />
    {:else if type === 'image'}
    {:else}
    {/if}
  </div>

  {#if ready}
  <div class="topics-tags-box">
    <div class="topics-box">
      <h3>Topics</h3>
      <div class="new-topic-box">
        <Textfield variant="outlined" bind:value={newTopic} label="New Topic" />
        <Button on:click={addTopic}>Add</Button>
      </div>
      <Set chips={newTopics} let:chip input>
        <Chip>
          <Text>{chip}</Text>
          <Icon on:click={removeTopic(chip)} class="material-icons">cancel</Icon>
        </Chip>
      </Set>
      <Set chips={topics} let:chip filter bind:selected={selectedTopics}>
        <Chip tabindex="0"><Checkmark /><Text>{chip}</Text></Chip>
      </Set>
    </div>
    <div class="tags-box">
      <h3>Tags</h3>
      <div class="new-tag-box">
        <Textfield variant="outlined" bind:value={newTag} label="New Tag" />
        <Button on:click={addTag}>Add</Button>
      </div>
      <Set chips={newTags} let:chip input>
        <Chip>
          <Text>{chip}</Text>
          <Icon on:click={removeTag(chip)} class="material-icons">cancel</Icon>
        </Chip>
      </Set>
      <Set chips={tags} let:chip filter bind:selected={selectedTags}>
        <Chip tabindex="0"><Checkmark /><Text>{chip}</Text></Chip>
      </Set>
    </div>
  </div>

  <div class="buttons-box">
    {#if edit}
      <Button on:click={create} variant="unelevated" disabled={!ready}>Update</Button>
    {:else}
      <Button on:click={create} variant="unelevated" disabled={!ready}>Create</Button>
    {/if}
    <Button on:click={reset}>Cancel</Button>
  </div>
  {/if}
{:else}
  <small>Select type to add entry.</small>
{/if}
</div>

<style>
  .entry-input-box {
    padding-bottom: 20px;
  }
  .inputs-links-box {
    display: flex;
    flex-flow: column;
    gap: 10px;
    width: 250px;
  }
  .textarea-box {
    height: 250px;
  }
  .topics-tags-box {
    display: flex;
    gap: 20px;
  }
  .topics-box {
    margin-bottom: 15px;
  }
  .new-topic-box {
    margin-bottom: 5px;
  }
</style>
