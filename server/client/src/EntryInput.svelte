<script>
  import Textfield from '@smui/textfield';

  let inputText = "";
  let type = "Autodetect";
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
    console.log("called")
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
      console.log("urlInfo:", urlInfo);
    } else if (/^<image_placeholder .*?>/.test(inputText)) {
      type = "image";
    } else {
      type = "note";
    }
    console.log(inputText)
  }

</script>

<div class="entry-input-box">
  <Textfield textarea bind:value={inputText} label="New Entry" /><br>
  <small>Type: {type}
  {#if type === 'link'}
    {#if detecting}
      ...
    {:else}
      {urlInfo.info}
      {urlInfo.type}
    {/if}
  {/if}
  </small>
</div>

<style>
  .entry-input-box {
    padding: 0 20px 20px 20px;
  }
  /*:global(.mdc-notched-outline__trailing) {
    background-color: var(--main-background-color);
  }*/
</style>
