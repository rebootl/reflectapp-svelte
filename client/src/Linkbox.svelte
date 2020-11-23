<script>
  import { Icon } from '@smui/icon-button';

  export let title = {};
  export let href = {};
	export let comment = {};
</script>

<div class="linkbox">
  <span class="link-icon">
    <i class="material-icons">link</i>
  </span>
  <a href={href} target="_blank">
    <span class="clickspan"></span>
    <small class="linkref">{href}</small>
  </a>
  <p class="linktitle">{title}</p>
  <small class="linkcomment">{comment}</small>
</div>

<style>
  .imagecomment {
    display: block;
    text-align: center;
    margin-top: -20px;
    padding: 10px 0 10px 0;
    border-top: 1px solid var(--main-background-color-lighter);
    background-color: var(--main-background-color-light);
  }
  .link-icon {
    position: absolute;
    top: 8px;
    left: 12px;
    color: var(--logo-primary-color);
  }
  .linkbox {
    display: inline-block;
    max-width: 100%; /* (needed for link ellipsis) */
    background-color: var(--linkbox-color);
    border: 1px solid var(--main-background-color-lighter);
    border-radius: 8px;
    /*box-shadow: 0 6px 0 -2px rgba(0, 0, 0, 0.4);*/
    /* for clickspan */
    position: relative;
  }
  .linkbox:hover {
    background-color: var(--main-hover-color);
  }
  .linkbox:focus-within {
    outline-style: solid;
    outline-offset: -1px;
    outline-color: var(--focus-color);
    outline-width: 1px;
    background-color: var(--main-hover-color);
  }
  .linkref {
    display: block;
    margin: 10px 16px 0 46px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    padding: 10px 16px 10px 16px;
    border-top: 1px solid var(--main-background-color-lighter);
    background-color: var(--main-background-color-light);
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
  }
  .clickspan {
    position: absolute;
    width:100%;
    height:100%;
    top:0;
    left: 0;
    z-index: 10;
  }
</style>
