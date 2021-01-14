<script>

	export let n = 1;

	let a = [ ...Array(n).keys() ];

</script>

<div>
{#each a as p}
<p>Lorem ipsum dolor sit <a href="/#">amet</a>, consectetur adipiscing elit. Aliquam tristique nunc ac orci consectetur sollicitudin.
Phasellus consectetur, ligula porttitor elementum blandit, lacus tortor interdum neque, ut tincidunt massa mauris ac
dui. Aenean ut nisi ut sapien pharetra rutrum et sit amet eros. Suspendisse egestas orci et pharetra viverra. Ut
commodo, nunc vel blandit aliquet, justo tortor pulvinar mauris, ac cursus risus nisi vitae odio. Morbi pharetra a purus
vel eleifend. <a href="/#">Cras tempus</a> erat nec odio dictum consequat. Vestibulum lacus urna, suscipit eget ante vel, luctus rutrum
ipsum. Quisque a fermentum nulla. Pellentesque facilisis nisi non lorem consectetur mollis. Pellentesque sit amet libero
vitae odio fringilla condimentum. Praesent ut iaculis ante. Quisque ultricies eros ligula, vitae imperdiet justo
volutpat at. Donec fermentum nec lacus quis porta. Phasellus scelerisque gravida placerat.</p>
{/each}
<!--
<p>Pellentesque ornare, dolor et viverra pharetra, metus ipsum suscipit erat, nec feugiat sem lectus quis purus. In
bibendum nec neque non efficitur. Duis a sollicitudin urna. Pellentesque efficitur ipsum turpis. Quisque sodales
tincidunt orci eget laoreet. Fusce pellentesque magna a imperdiet rutrum. Nullam iaculis leo in placerat convallis.
Quisque ut sem rutrum, fringilla mi eget, tempus mi. Etiam vitae ligula vehicula, malesuada ipsum ac, gravida nisi.</p>

<p>Vestibulum sit amet semper ante. Curabitur nec dapibus nunc. Pellentesque habitant morbi tristique senectus et netus et
malesuada fames ac turpis egestas. Morbi vehicula nisi quis finibus vulputate. Class aptent taciti sociosqu ad litora
torquent per conubia nostra, per inceptos himenaeos. In viverra varius sapien, id hendrerit urna rutrum ac. Vestibulum
at blandit tellus, et semper sapien. software like Aldus PageMaker including versions of Lorem Ipsum.</p>
-->
</div>

<style>
	div {
		box-sizing: border-box;
		background-color: var(--main-background-color);
		max-width: var(--main-width);
		padding-left: 20px;
		padding-right: 10px;
	}
</style>
