<script>
	import { createEventDispatcher } from 'svelte';
  import Tab, { Icon, Label } from '@smui/tab';
  import TabBar from '@smui/tab-bar';

  const dispatch = createEventDispatcher();

	export let type = 'any';

  $: typeChanged(active);
	$: setType(type);

  function typeChanged() {
    dispatch('change', { type: active.type });
  }

	function setType() {
		const t = iconTabs.find(e => e.type === type);
		active = t;
	}

  let iconTabs = [
    {
      icon: 'view_module',
      label: 'Any',
			type: 'any'
    },
    {
      icon: 'task_alt',
      label: 'Tasks',
			type: 'task'
    },
    {
      icon: 'link',
      label: 'Links',
			type: 'link'
    },
    {
      icon: 'article',
      label: 'Articles',
			type: 'article'
    },
    {
      icon: 'image',
      label: 'Images',
			type: 'image'
    }
  ];

  let active = iconTabs[0];

</script>

<div class="box">

  <TabBar tabs={iconTabs} let:tab bind:active>
    <Tab {tab} minWidth>
      <Icon class="material-icons">{tab.icon}</Icon>
      <Label>{tab.label}</Label>
    </Tab>
  </TabBar>

<!--
  <Button variant="outlined"><Icon class="material-icons">task_alt</Icon>Tasks</Button>
  <EntryType type='tasks' />
  <EntryType type='links' />
  <EntryType type='notes' />
  <EntryType type='images' />
  <EntryType type='Video' />
-->
</div>

<style>
  .box {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
</style>
