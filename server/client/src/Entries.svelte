<script>
  import Button, { Icon } from '@smui/button';
  import EntryTypes from './EntryTypes.svelte';
  import EntryInput from './EntryInput.svelte';
	import EntriesList from './EntriesList.svelte';
  import { loggedIn, getUserName } from './resources/auth.js';

  import { entriesURL } from './resources/urls.js';
  import { DataSet } from './resources/dataSet.js';

  import { activeType, limitDisplay, userEntries, filteredEntries } from './store.js';

  export let routerReady = false;
  export let user = '';
  export let single = false;
  export let entryId = '';

  let typeSelect = '';
  let entries = [];

  let entryInputComponent;

  let edit = false;
  let editEntry = {
    text: ''
  };

  let entriesInstance;

  $: loadEntries(user);

  async function loadEntries() {
    if (user === '') return;
    entriesInstance = new DataSet(entriesURL + '/' + user);
    await entriesInstance.load();
    //console.log(entriesInstance.data)

    // load Entries into svelte store!!
    entriesInstance.useStore(userEntries);
  }

  async function fetchEntries() {
    $limitDisplay += 10;
  }

  function typeChange(type) {
    typeSelect = type;
    $activeType = typeSelect;
  }

  function loadEdit() {
    if (!single) return;
    if (!$userEntries[0]) return;
    const entry = $userEntries[0];
    editEntry = entry;
    entryInputComponent.loadEdit(entry);
    edit = true;
  }
</script>

<div class="main-container">
  <div class="entries-header-box">
    <EntryTypes on:change={ (e) => typeChange(e.detail.type) } {editEntry} />
    {#if loggedIn()}
      <EntryInput type={typeSelect} bind:this={entryInputComponent}
                  on:cancel={() => edit = false}
                  on:created={() => update()}/>
    {/if}
    {#if single && !edit}
      <div class="single-buttons-box">
        <Button href={'/#~' + user}>View All</Button>
        {#if loggedIn()}
          <Button on:click={()=>loadEdit()}><Icon class="material-icons">create</Icon>Edit</Button>
        {/if}
      </div>
    {/if}
  </div>
  <EntriesList entries={$filteredEntries}
               edit={ loggedIn() && getUserName() === user ? true : false }
               on:fetch={ ()=>fetchEntries() } />
</div>

<style>
  .main-container {
    display: flex;
    flex-flow: column;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .entries-header-box {
    border-bottom: 1px solid var(--main-lines-color);
    margin-bottom: 20px;
  }
  .single-buttons-box {
    margin-bottom: 5px;
  }
</style>
