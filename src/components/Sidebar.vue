<template>
  <div class="leftPart">

    <div class="innerSidebar">
      <Slide v-if="showSlide">
        <router-link id="home" to="/">
          <img src="../assets/home-run.966e5d31.svg" class="icon" alt="home">
          <span>Home</span>
        </router-link>
        <router-link id="about" to="/about">
          <img src="../assets/avatar.b8d92d86.svg" class="icon" alt="about">
          <span>About</span>
        </router-link>
        <router-link id="portFolio" to="/portFolio">
          <img src="../assets/briefcase.66307d98.svg" class="icon" alt="portFolio">
          <span>PortFolio</span>
        </router-link>
        <router-link id="contact" to="/contact" >
          <img src="../assets/mail.b5a8d8d5.svg" class="icon" alt="contact">
          <span>Contact</span>
        </router-link>
        <div class="select-container">
          <select v-model="$i18n.locale" class="custom-select">
            <option value="en">🇬🇧 EN</option>
            <option value="fr">🇫🇷 FR</option>
            <option value="jp">🇯🇵 日本語</option>
          </select>
        </div>
      </Slide>
      <!-- The active state is read off the router, not off a local counter: a
           counter only ever knew about clicks on these four links, so direct URL
           entry, the browser Back button and the home page's call-to-action
           links all left the red rule pointing at the wrong entry. -->
      <div v-if="!showSlide">
        <router-link class="item" to="/">
          <img src="../assets/home-run.966e5d31.svg" class="icon" alt="home">
          <div class="text">Home</div>
        </router-link>
        <router-link class="item" to="/about">
          <img src="../assets/avatar.b8d92d86.svg" class="icon" alt="about">
          <div class="text">About</div>
        </router-link>
        <router-link class="item" to="/portfolio">
          <img src="../assets/briefcase.66307d98.svg" class="icon" alt="portFolio">
          <div class="text">PortFolio</div>
        </router-link>
        <router-link class="item" to="/contact">
          <img src="../assets/mail.b5a8d8d5.svg" class="icon" alt="contact">
          <div class="text">Contact</div>
        </router-link>
        <p class="copyright">© 2024 Created by Camille Lupo</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1200px) {
  .copyright {
    font-size: 10px !important;
  }
}

@media (max-width: 1200px) {
  .copyright {
    display: none;
  }
}

.leftPart {
  width: 300px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  z-index: 10;
  padding: 0 100px;
  /* Was `black`, i.e. 1.08:1 against the #111111 pages: read as a smudge, not
     as a separation. The rail now shares --pf-paper with the pages and the
     --pf-line rule does the separating. */
  background-color: var(--pf-paper);
  border-right: 1px solid var(--pf-line);
  color: var(--pf-ink-soft);
}

@media (max-width: 1200px) {
  .leftPart {
    position: fixed;
    width: 100%;
    height: auto;
    padding: 0;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    color: var(--pf-ink);
    /* Below 1200px .leftPart is a full-width fixed top bar: a right border is
       useless and the faint black/#111111 edge that used to mark the bottom of
       the bar is gone, so the rule moves there. Same as `.mbar` in
       design/refonte/pages.html. */
    border-right: none;
    border-bottom: 1px solid var(--pf-line);
  }
}

.innerSidebar {
  width: 100%;
  height: auto;
}

@media (max-width: 1200px) {
  .innerSidebar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 25px;
  }
}

/* The 3px transparent border is what makes the active/hover state free of any
   layout shift: the space is reserved at rest, only its colour changes. */
.item {
  display: block;
  font-size: 20px;
  letter-spacing: 2px;
  cursor: pointer;
  text-decoration: none;
  color: var(--pf-ink-soft);
  border-left: 3px solid transparent;
  padding-left: 10px;
  /* The two properties the hover/active state actually changes. `all` also
     animated the focus outline, which has to appear instantly. */
  transition: color 0.3s ease, border-left-color 0.3s ease;
}

@media (min-width: 1200px) {
  .icon {
    display: none;
  }
}

.icon {
  width: 25px;
  height: 25px;
  filter: invert(1);
}

.text {
  padding: 6px;
  font-family: var(--pf-mono);
}

@media (max-width: 1200px) {
  .text {
    display: none;
    font-family: var(--pf-mono);
  }
}
/* No letter-spacing jump here any more: going 2px -> 4px widened the label on
   hover and shifted the line. The red rule carries the state instead. */
.item:hover {
  color: var(--pf-ink);
  border-left-color: var(--pf-hanko);
}

/* vue-router adds this class itself, so the state survives direct URL entry and
   Back/Forward. `exact-active`, never `active`: the latter matches on prefix and
   would light the "/" entry up on every page. The `.item` qualifier keeps the
   selector off the burger panel's links, which carry no `.item` class.
   Same treatment as :hover, deliberately. */
.item.router-link-exact-active {
  color: var(--pf-ink);
  border-left-color: var(--pf-hanko);
}

/* The rail's four links had NO focus indicator of their own and fell back to
   the UA ring. Home/Portfolio/Contact/About/App.vue all ship this exact idiom
   (2px --pf-ink, 3px offset, 2px radius) but each in a `scoped` block, so none
   of them reaches this component — hence the copy (WCAG 2.4.7).
   `:focus-visible`, not `:focus`: a mouse click on a rail link must not leave a
   ring behind. The outline is drawn from the BORDER edge outwards, so the 3px
   offset puts it clear of `.item`'s 3px left rule rather than on top of it;
   the two are adjacent-but-separate on the active entry. `outline` is absent
   from `.item`'s transition list on purpose, so the ring appears instantly. */
.item:focus-visible {
  outline: 2px solid var(--pf-ink);
  outline-offset: 3px;
  border-radius: 2px;
}

/* Matches `.rail .sel` in design/refonte/pages.html: the select is the only
   control in the rail, so it needs a boundary of its own — --pf-line-strong is
   3.57:1 on --pf-paper (WCAG 1.4.11). */
.custom-select {
  background-color: var(--pf-raised);
  color: var(--pf-ink);
  border: 1px solid var(--pf-line-strong);
  padding: 8px;
  font-size: 16px;
  appearance: none;
  -webkit-appearance: none;
}
</style>
<script setup>
import {ref, onMounted, onBeforeUnmount, watch} from 'vue';
import {Slide} from 'vue3-burger-menu';

const showSlide = ref(false);

const handleResize = () => {
  showSlide.value = window.innerWidth <= 1200;
};

onMounted(() => {
  handleResize(); // Call the function initially
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

// Debugging: Log showSlide changes
watch(showSlide, (newValue, oldValue) => {
  console.log('showSlide changed:', newValue);
});
</script>
<style>
.bm-burger-bars {
  background-color: white !important;
}
</style>