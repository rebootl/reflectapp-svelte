<script>
  const md = window.markdownit();
  //const md = window.markdownit().use(window.markdownitEmoji);
  import { onMount } from "svelte";

	export let text = "";
  export let images = [];

  let html = "";

  const hashPlaceholder = "b43677c465ece0cf2c6e4af3004fbe29";

  function getHTML() {
    //console.log(text)
    //if (!images)
    //return md.render(text);
    if (images.length === 0) return md.render(text);

    const hashedText = text.replace(/<image_placeholder .*?>/g, hashPlaceholder);

    let htmlText = md.render(hashedText);
    for (const image of images) {
      let imageTag = '<img class="entryimage" src="' + image.filepath + '" />';
      /*let imageTag = "";
      if (image.uploaded) {
        // -> and currently online
        imageTag = '<img src="' + image.filepath + '" />';
      } else {
        imageTag = '<img src="' + image.previewData + '" />';
      }*/
      htmlText = htmlText.replace(hashPlaceholder, imageTag);
    }
    return htmlText;
  }

  html = getHTML(text);

  onMount(async () => {
		//html = getHTML(text);
	});
</script>

{@html html}

<style>
  /*:global(img) {*/
  .entryimage {
    width: 100%;
  }
</style>
