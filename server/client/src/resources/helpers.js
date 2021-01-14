const md = window.markdownit();

export async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  return hashHex;
}

export async function getPrefix(text) {
  text = text.trimStart().split(" ").slice(0,3).join().replace(/[^a-zA-Z0-9]/g,'-');
  if (text.length > 50) text = text.slice(0, 50);
  return text;
}

const hashPlaceholder = "b43677c465ece0cf2c6e4af3004fbe29";

export function getHTML(text, images) {
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
