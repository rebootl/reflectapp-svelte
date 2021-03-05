<script>
  import { Icon } from '@smui/icon-button';

  export let title = {};
  export let href = {};
	export let comment = {};
</script>

<div class="linkbox">
  <div class="refbox">
    <small>
      <a href={href} target="_blank">
        <span class="clickspan"></span>
        {href}
      </a>
    </small>
  </div>
  {title}
  <small>{comment}</small>
</div>

<style>
  .linkbox {
    padding: 10px;
    position: relative;
    /*min-height: 45px;*/
  }
  .linkbox:hover {
    background-color: var(--main-hover-color);
  }
  .refbox {
    padding-bottom: 10px;
  }
  .clickspan {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    padding: 10px;
  }
</style>
