<template>
  <div id="app">
    <nav class="blue-grey darken-3">
      <div class="nav-wrapper">
        <a href="#!" class="brand-logo">Logo</a>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger">
          <i class="material-icons">menu</i>
        </a>
        <ul class="right hide-on-med-and-down">
          <li>
            <a href="sass.html">Sass</a>
          </li>
          <li>
            <a href="badges.html">Components</a>
          </li>
          <li>
            <a href="collapsible.html">Javascript</a>
          </li>
          <li>
            <a href="mobile.html">Mobile</a>
          </li>
        </ul>
      </div>
    </nav>

    <ul class="sidenav" id="mobile-demo">
      <li id="inner">
        <a href="sass.html">Sass</a>
      </li>
      <li id="inner">
        <a href="badges.html">Components</a>
      </li>
      <li id="inner">
        <a href="collapsible.html">Javascript</a>
      </li>
      <li id="inner">
        <a href="mobile.html">Mobile</a>
      </li>
    </ul>

    <router-view class="container pt-4" />
  </div>
</template>

<script>
document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".sidenav");
  var options = document.querySelectorAll("#inner");
  var instances = M.Sidenav.init(elems, options);
});
export default {};
</script>

<style>
body,
html {
  background-color: #424242;
}
</style>
