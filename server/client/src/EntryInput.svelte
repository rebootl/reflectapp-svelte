<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import Textfield from '@smui/textfield';
  import Button from '@smui/button';
  import Chip, { Set, Icon, Checkmark, Text } from '@smui/chips';

  //import TextArea from './Elements/TextArea.svelte';
  import './special-theme.scss';

  import { getUserName } from './resources/auth.js';
  import { digestMessage, getPrefix } from './resources/helpers.js';

  import { topics, filteredEntries, userEntries } from './resources/store.js';
  import { compressImage, encodeData, uploadMultiImagesGenerator }
    from './resources/imagestore.js';

  const dispatch = createEventDispatcher();

  export let type = 'any';
  export let single = false;
  export let entriesInstance;

  let inputText = '';
  let comment = '';
  let linkTitle = '';
  let newTopic = '';
  let newTopics = [];
  //let topics = $topics;
  let selectedTopics = [];
  let newTag = '';
  let newTags = [];
  let tags = [];
  let selectedTags = [];

  //let editEntry = {};
  let editEntryId = '';
  let editEntryDate = '';

  let newImages = [];
  let images = [];
  let uploadProgress = 0.;

  let ready = false;
  let edit = false;

  $: checkReady(inputText);
  //$: loadEdit(editEntry);
  $: setTagsForTopics($userEntries, selectedTopics);

  function checkReady() {
    //console.log("checkReady")
    if (type === 'task' || type === 'link' || type === 'article') {
      if (inputText.length > 0)
        ready = true;
      else ready = false;
    }
  }

  export function loadEdit(editEntry) {

    type = editEntry.type;
    editEntryId = editEntry.id;
    editEntryDate = editEntry.date

    selectedTopics = editEntry.topics;
    selectedTags = editEntry.tags;

    inputText = editEntry.text || "";
    images = editEntry.images || [];

    if (editEntry.type === 'link') {
      linkTitle = editEntry.title;
      comment = editEntry.comment;
    }
    edit = true;
    ready = true;
  }

  function setTagsForTopics() {
    const currentTags = [];
    if (selectedTopics.length === 0) {
      for (const e of $userEntries) {
        for (const t of e.tags) {
          if (!currentTags.includes(t)) currentTags.push(t);
        }
      }
    } else {
      for (const e of $userEntries) {
        for (const topic of e.topics) {
          if (selectedTopics.includes(topic)) {
            for (const t of e.tags) {
              if (!currentTags.includes(t)) currentTags.push(t);
            }
          }
        }
      }
    }
    tags = currentTags.sort();
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

  async function handleImages(files) {
    console.log(files)
    const n = await Promise.all(Array.from(files)
      //.filter((file)=>file.type.startsWith('image/'))
      .filter((file) => !images.map(v => v.filename).includes(file.name))
      .filter((file) => !newImages.map(v => v.filename).includes(file.name))
      .map(async (file) => {
        const placeholder = `<image_placeholder ${file.name}>`;
        const blob = await compressImage(file, 240, 240);
        const data = await encodeData(blob);
        const image = {
          placeholder: placeholder,
          filename: file.name,
          osize: file.size,
          type: file.type,
          lastModified: file.lastModified,
          previewData: data,
          file: file,
          comment: "",
        };
        //this.dispatchEvent(new CustomEvent('addimage', {detail: image}));
        return image;
      })
    );
    console.log(n)
    newImages = [ ...newImages, ...n ];
    if (newImages.length > 0) ready = true;
  }

  function setImageComment(comment, filename) {
    const image = newImages.find(i => i.filename === filename);
    image.comment = comment;
  }

  function setLoadedImageComment(comment, filename) {
    const image = images.find(i => i.filename === filename);
    image.comment = comment;
  }

  function toggleImageRemove(i, v) {
    if (i.remove) delete i.remove;
    else i.remove = true;
    images = images;
  }

  function removeNewImage(i) {
    newImages = newImages.filter(n => i.filename !== n.filename);
  }

  async function create() {
    const d = {
      user: getUserName(),
      type: type,
    };

    // upload new images
    if (newImages.length > 0) {
      const res = await uploadNewImages();
      // -> alert or so...
      if (!res) return false;
    }

    // remove marked images from entry
    images = images.filter(i => !i.remove);
    console.log(images)

    if (type === 'task' || type === 'article' || type === 'link') {
      d.text = inputText; // -> escape or anything???
      if (type === 'article') {
        d.images = [ ...images, ...newImages ];
      }
    } else if (type === 'link') {
      d.title = linkTitle;
      d.comment = comment;
    } else if (type === 'image') {
      d.images = [ ...images, ...newImages ];
    }

    d.topics = [ ...newTopics, ...selectedTopics ];
    d.tags = [ ...newTags, ...selectedTags ];

    // handle edit / new
    if (!edit) {
      d.date = new Date();
      d.id = await makeId(d);
      console.log(d.id)
      entriesInstance.new(d);
    } else {
      d.date = editEntryDate;
      d.mdate = new Date();
      d.id = editEntryId;
      entriesInstance.update(d);
    }

    reset();
    dispatch('created')
  }

  async function uploadImages() {
    const r = uploadNewImages();
    if (r) newImages = [];
  }

  function insertImageLink(i) {
    inputText += `\n![${i.comment}](${i.filepath})\n`;
  }

  async function uploadNewImages() {
    let uploadResult = {};
    console.log(newImages)
    for await (const r of uploadMultiImagesGenerator(newImages)) {
      // update progress
      uploadResult = r;
      uploadProgress = r.progress;
    }
    // handle the upload result
    if (!uploadResult.result.success) return false;
    newImages.map((i) => {
      const r = uploadResult.result.files.find(e => e.originalname === i.filename);
      i.filepath = r.path;
      delete i.file;
      return i;
    });
    return true;
  }

  function _delete() {
    // -> confirm dialog!!
    if (!confirm("Do u really want to delete this entry?"));
      return;
    // -> delete
    entriesInstance.delete({
      id: editEntryId,
      user: getUserName(),
      images: images,
    });
    reset();
    dispatch('deleted');
  }

  function reset() {
    type = 'any';
    ready = false;
    edit = false;
    inputText = '';
    comment = '';
    linkTitle = '';
    newTopic = '';
    newTopics = [];
    //topics = [ 'abc', '123', 'test' ];
    selectedTopics = [];
    newTag = '';
    newTags = [];
    //tags = [ 'lala', '123', 'test' ];
    selectedTags = [];
    newImages = [];
    images = [];
    uploadProgress = 0.;
    dispatch('cancel');
  }

  onMount(() => {
    setTagsForTopics();
  });
</script>

{#if (type !== 'any' && !single) || edit}
  <div class="entry-input-box">
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
      {/if}
      {#if type === 'image' || type === 'article'}
        <input on:change={ (e) => handleImages(e.target.files) }
               type="file"
               accept="image/*"
               multiple>
        {#if newImages.length > 0}
          <div class="edit-images-list">
            {#each newImages as i}
              <div class="edit-image">
                <!--{i.filename}-->
                <img src={i.previewData} />
                <div class="edit-image-fields">
                  <div class="shortwidth">
                    <div class="delete-button-box">
                      <Button on:click={removeNewImage(i)}>Unload</Button>
                    </div>
                    <input placeholder="Add comment..."
                           on:input={(e) => setImageComment(e.target.value, i.filename)} />
                  </div>
                </div>
              </div>
            {/each}
            <Button on:click={() => uploadImages()}>Upload</Button>
            <progress max="100" value={uploadProgress}></progress>
          </div>
        {/if}
        {#if images.length > 0}
          <div class="edit-images-list">
            {#each images as i}
              <div class="edit-image">
                <img src={i.previewData} />
                <div class="edit-image-fields">
                  <div class="shortwidth">
                      <div class="delete-button-box">
                        <Button on:click={toggleImageRemove(i)}>
                          {#if i.remove}<Icon class="material-icons">checkmark</Icon>{/if}
                          Remove
                        </Button>
                      </div>
                    <!--{:else}
                      <Button on:click={toggleImageRemove(i, false)}><Icon class="material-icons">checkmark</Icon>Keep</Button>
                    {/if}-->
                  </div>
                  <input value={i.comment} placeholder="Add comment..."
                         on:input={(e) => setLoadedImageComment(e.target.value, i.filename)} />
                  {#if type === 'article'}
                    <div class="shortwidth">
                      <Button on:click={() => insertImageLink(i)}>Insert Link</Button>
                    </div>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        {/if}
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
        <Set chips={$topics} let:chip filter bind:selected={selectedTopics}>
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
      <div>
        <Button variant="unelevated" on:click={create} disabled={!ready}>
          {#if edit}
            Update
          {:else}
            Create
          {/if}
        </Button>
        <Button on:click={reset}>Cancel</Button>
      </div>
      {#if edit}
        <div class="delete-button-box">
          <Button variant="unelevated" on:click={_delete}>Delete</Button>
        </div>
      {/if}
    </div>
    {/if}
  </div>
{/if}

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
  .buttons-box {
    display: flex;
    justify-content: space-between;
  }
  /*.newimages-list {
    display: flex;
    flex-flow: column;
  }*/
  .edit-image {
    display: flex;
  }
  .edit-image-fields {
    display: flex;
    flex-flow: column;
  }
  .shortwidth {
    max-width: 120px;
  }
</style>
