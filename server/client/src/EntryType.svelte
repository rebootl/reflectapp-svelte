<script>
	import {Icon} from '@smui/icon-button';

  export let type = 'None';
  console.log(type)
</script>

{#if type === 'tasks'}
  <button class="tasks">
    <div class="icon-box">
      <Icon class="material-icons">task_alt</Icon>
    </div>
    Tasks
  </button>
{:else if type === 'links'}
  <button class="links">
    <div class="icon-box">
      <Icon class="material-icons">link</Icon>
    </div>
    Links
  </button>
{:else}
  <button class="">None</button>
{/if}

<style>
  button {
    padding: 10px 20px 10px 5px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0);
    border: 0;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    /*color: var(--main-text-color);*/
  }
  .icon-box {
    padding-left: 6px;
    padding-right: 6px;
    display: flex;
    align-items: center;
  }
  .tasks {
    color: var(--tasks-color);
    border: 1px solid var(--tasks-color);
  }
  .links {
    color: var(--links-color);
    border: 1px solid var(--links-color);
  }
  .notes {
    background-color: var(--notes-color);
  }
  .images {
    background-color: var(--images-color);
  }
</style>
