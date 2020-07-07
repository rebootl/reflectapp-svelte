
// adapt the brightness of a color
// original from: https://www.sitepoint.com/javascript-generate-lighter-darker-color/
// adapted/fixed calc, orig. uses shitty calc.
function getColorVariant(hex, f) {
	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	f = f || 0;
	// convert to decimal and change luminosity
	let rgb = "#"
  let c;
	for (let i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round( Math.min( Math.max(0, c + 255 * f), 255) ).toString(16);
		rgb += ("00"+c).substr(c.length);
	}
	return rgb;
}

// set colorvariant properties on element
// e: element
// p: property
export function setColorVariants(e, p) {
  const s = getComputedStyle(e);
  const c = s.getPropertyValue(p);
  e.style.setProperty(p + '-light', getColorVariant(c, 0.08));
  e.style.setProperty(p + '-lighter', getColorVariant(c, 0.16));
  e.style.setProperty(p + '-dark', getColorVariant(c, -0.08));
  e.style.setProperty(p + '-darker', getColorVariant(c, -0.16));
}
