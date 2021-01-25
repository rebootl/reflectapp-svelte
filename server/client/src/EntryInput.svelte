<script>
  import Textfield from '@smui/textfield';
  import Button from '@smui/button';
  import Chip, { Set, Icon, Checkmark, Text } from '@smui/chips';
  import TextArea from './Elements/TextArea.svelte';

  export let type = 'any';

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

  let ready = false;

  $: checkReady(inputText);

  function checkReady() {
    if (type === 'tasks' || type === 'links' || type === 'articles') {
      if (inputText.length > 0)
        ready = true;
      else ready = false;
    }
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

  function create() {
    console.log(selectedTopics)
  }

  /*let type = "Autodetect";
  const urlInfoDefault = {
    info: '',
    title: ''
  };
  let urlInfo = urlInfoDefault;
  let detecting = false;

  $: typeDetect(inputText);

  let inDebounce = null;
  function debounce(f, t=1000) {
    return new Promise((res, rej) => {
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => res(f()), t);
    });
  }

  function getUrlInfo() {
    // dummy test function that takes some time
    // to execute
    //console.log("called")
    return new Promise((res, rej) => {
      setTimeout(() => res("url dummy info"), 2000);
    });
  }

  async function typeDetect() {
    if (inputText == '') {
      type = 'Autodetect';
      urlInfo = urlInfoDefault;
    } else if (inputText.startsWith("http://")
        || inputText.startsWith("https://")) {
      type = "link";
      detecting = true;
      urlInfo = await debounce(getUrlInfo);
      detecting = false;
      //console.log("urlInfo:", urlInfo);
    } else if (/^<image_placeholder .*?>/.test(inputText)) {
      type = "image";
    } else {
      type = "note";
    }
    //console.log(inputText)
  }*/

</script>

<div class="entry-input-box">
{#if type !== 'any'}

  <div class="inputs-box">
    {#if type === 'tasks'}
      <Textfield textarea bind:value={inputText} label="New Task" />
    {:else if type === 'links'}
      <div class="inputs-links-box">
        <Textfield variant="outlined" on:input={checkReady}
                   bind:value={inputText} label="New URL" />
        {#if ready}
          <Textfield variant="outlined" bind:value={linkTitle} label="Title" />
          <Textfield variant="outlined" bind:value={comment} label="Comment" />
        {/if}
      </div>
    {:else if type === 'articles'}
      <Textfield textarea fullwidth on:input={checkReady} bind:value={inputText}
                 label="New Entry" />
    {:else if type === 'images'}
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

  <Button on:click={create} variant="unelevated" disabled={!ready}>Create</Button>
  {/if}
  <!--<small>Type: {type}
  {#if type === 'link'}
    {#if detecting}
      ...
    {:else}
      {urlInfo.info}
      {urlInfo.type}
    {/if}
  {/if}
  </small>-->
{:else}
  <small>Select type to add entry.</small>
{/if}
</div>

<style>
  .entry-input-box {
    margin-bottom: 20px;
  }
  .inputs-box {
    margin-bottom: 20px;
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
    margin-bottom: 20px;
  }
  .new-topic-box {
    margin-bottom: 5px;
  }
</style>
