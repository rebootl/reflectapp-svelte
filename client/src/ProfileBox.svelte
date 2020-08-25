<script>
  import UserLogo from './UserLogo.svelte';

	export let username = "";
</script>

<div class="wrapper">
  <a href={ "#~" + username }>
    <span class="clickspan"></span>
    <span class="username">{username}</span>
  </a>
  <div class="miniheader"></div>
  <div class="minisidebar"></div>
  <div class="bg"></div>
  <div class="logobox">
    <UserLogo />
  </div>
</div>

<style>
	.wrapper {
    margin-right: 25px;
    margin-bottom: 25px;
    position: relative;
    display: grid;
    box-sizing: border-box;
    width: 200px;
    height: 120px;
    background-color: var(--main-background-color);
    border: 1px solid var(--main-lines-color);
    /*grid-template-rows: 20px auto;
    grid-template-columns: 20px auto;
    grid-template-areas:
      "mini-header mini-header"
    	"mini-sidebar bg";*/
	}
  .wrapper:hover {
    background-color: rgba(255, 255, 255, 0.12);
  }
  /*.miniheader {
    grid-area: mini-header;
    background-color: var(--header-background-color);
  }
  .minisidebar {
    grid-area: mini-sidebar;
    background-color: var(--side-background-color);
  }
  .bg {
    grid-area: bg;
  }*/
  .logobox {
    position: absolute;
    height: 50px;
    width: 50px;
    top: 10px;
    left: 10px;
  }
  .username {
    position: absolute;
    right: 10px;
    top: 20px;
    margin-top: 0;
    font-size: 1.2em;
    text-decoration: underline;
    font-weight: bold;
  }
  a {
    position: absolute;
    width: 100%;
    height: 100%;
    /*text-decoration: none;
    color: var(--main-text-color);*/
  }
  .clickspan {
    position:absolute;
    width:100%;
    height:100%;
    top:0;
    left: 0;
    z-index: 1;
  }
</style>
