<script>
  import { Icon } from '@smui/icon-button';

  export let title = {};
  export let href = {};
	export let comment = {};
</script>

<div class="linkbox">
  <a href={href} target="_blank"><small>{href}</small></a>
  {title}
  <small>{comment}</small>
</div>

<style>
  .linkbox {
    padding: 10px;
    padding-top: 35px;
    position: relative;
    min-height: 45px;
  }
  .linkbox:hover {
    background-color: var(--main-hover-color);
  }
  a {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    padding: 10px;
  }
</style>
