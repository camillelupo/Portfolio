<template>
  <div class="rigthPart">
    <div class="centering">
      <div class="about-content">
        <section class="pf-contact" aria-labelledby="pf-contact-title">
          <h1 id="pf-contact-title" class="pf-contact-title">{{ $t("message.contactTitle") }}</h1>
          <p class="pf-contact-intro">{{ $t("message.contactIntro") }}</p>

          <!-- <dl>, not <ul>: these are label/value pairs (Email -> address,
               GitHub -> profile), which is exactly what a description list is for.
               Both values stay selectable text, never an icon or an image. -->
          <dl class="pf-contact-list">
            <dt class="pf-contact-label">{{ $t("message.contactEmailLabel") }}</dt>
            <dd class="pf-contact-value">
              <a class="pf-link" href="mailto:camille.lupo@hotmail.fr">camille.lupo@hotmail.fr</a>
            </dd>
            <dt class="pf-contact-label">{{ $t("message.contactGithubLabel") }}</dt>
            <dd class="pf-contact-value">
              <a class="pf-link" href="https://github.com/camillelupo" target="_blank" rel="noopener noreferrer">github.com/camillelupo</a>
            </dd>
          </dl>

          <button class="custom-button" @click="handleSendEmail">{{ $t("message.contactButton") }}</button>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleSendEmail() {
      // Canonical address, the same one About.vue publishes. The historical
      // `hotmail.com` here was wrong and the trailing `?` opened an empty query
      // string for nothing.
      window.location.href = 'mailto:camille.lupo@hotmail.fr';
    },
  },
};
</script>

<style scoped>

@media (max-width: 1200px) {
  .rigthPart {
    padding-left: 0px;
    min-height: 100vh;
    width: 100%;
    float: left;
    position: relative;
    background-color: var(--pf-paper);
  }
}

@media (min-width: 1200px) {
  .rigthPart {
    padding-left: 300px;
    width: 100%;
    min-height: 100vh;
    float: left;
    position: relative;
    background-color: var(--pf-paper);
  }
}

/* Direct child of .centering, which is flex above 1200px and block below: the
   old `float: left; clear: both; width: 100%` were inert in both cases. Its old
   `padding: 100px 0` is gone too — .centering now carries the page padding. */
.about-content {
  /* Kept on purpose: nothing inherits it today (every descendant sets its own
     colour), it is the defensive default for any future text added here. */
  color: var(--pf-ink);
}

@media (min-width: 1200px) {
  .centering {
    padding: 100px 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    animation: slideIn 1s ease-out;
  }
}

@media (max-width: 1200px) {
  .centering {
    padding: 100px 0 60px;
    display: block;
  }
}

/* ---------------------------------------------------------------------------
   Contact block
   Every rule below is explicit: Bootstrap 5 makes a bare h1 fluid (~40px) and
   gives dd `margin-left: 0; margin-bottom: .5rem`, so defaults would drift.
   Colours come from the design tokens (src/assets/tokens.css).
   Contrast on --pf-paper (#111111): --pf-ink (#F8F8F8) 17.78:1,
   --pf-ink-soft (#AAAAAA) 8.13:1, --pf-hanko (#D4574A) 4.73:1
   (underline rule only, never body copy).
   --------------------------------------------------------------------------- */
.pf-contact {
  max-width: 750px;
  padding: 0 20px;
  width: 100%;
  /* Matches .pf-gallery in Portfolio.vue: .centering is a flex row above 1200px
     with no justify-content, so without this the column sits flush left while
     every sibling page centres its own. */
  margin: 0 auto;
  /* Restated on purpose: index.html only sets the mono body font below 1200px. */
  font-family: var(--pf-mono);
}

.pf-contact-title {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 2px;
  /* Same idiom as .pf-gallery-title and .pf-parcours-title. */
  text-transform: uppercase;
  color: var(--pf-ink);
  margin: 0 0 10px;
}

.pf-contact-intro {
  font-size: 16px;
  line-height: 1.5;
  color: var(--pf-ink-soft);
  margin: 0 0 40px;
}

.pf-contact-list {
  margin: 0 0 40px;
}

.pf-contact-label {
  font-size: 13px;
  /* Bootstrap sets `dt { font-weight: 700 }`; every other 13px --pf-ink-soft
     secondary label on the site is 400. */
  font-weight: 400;
  color: var(--pf-ink-soft);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.pf-contact-value {
  font-size: 16px;
  color: var(--pf-ink);
  margin: 0 0 20px;
  margin-left: 0;
}

.pf-link {
  color: var(--pf-ink);
  text-decoration: none;
  border-bottom: 1px solid var(--pf-hanko);
  padding-bottom: 2px;
  display: inline-block;
  min-height: 24px;
  /* `anywhere`, not `break-all`: the browser breaks at @ or / first and only
     splits mid-word when nothing else fits. */
  overflow-wrap: anywhere;
  /* Same idiom as .pf-feature-link in Portfolio.vue. */
  transition: color .3s ease, border-color .3s ease;
}

.pf-link:hover {
  color: var(--pf-ink);
  border-bottom-color: var(--pf-ink);
}

/* Filled control, same idiom as `.btn-p` in design/refonte/pages.html.
   --pf-on-hanko (#FDF9F3) on --pf-hanko-deep (#C24A3E) is 4.58:1, so the label
   clears WCAG 1.4.3. The border repeats the fill colour: the fill itself is
   3.91:1 against the --pf-paper page behind it, well above the 3:1 WCAG 1.4.11
   asks of a control boundary, so no separate boundary colour is needed. */
.custom-button {
  background-color: var(--pf-hanko-deep);
  color: var(--pf-on-hanko); /* Foreground text colour */
  padding: 10px 20px; /* Padding for better appearance */
  font-size: 16px; /* Font size */
  border: 1px solid var(--pf-hanko-deep);
  border-radius: 5px; /* Rounded corners */
  /* WCAG 2.5.8: the padding alone yields ~40px. */
  min-height: 44px;
  cursor: pointer; /* Cursor on hover */
  /* All three properties the hover state changes, not just the background:
     enumerated so nothing snaps while the rest fades. */
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

/* The mockup is silent on hover, so the state is an inversion built from the
   same tokens rather than a new colour: --pf-hanko (#D4574A) is 4.73:1 on
   --pf-paper for both the label and the border, so nothing is lost. */
.custom-button:hover {
  background-color: var(--pf-paper);
  color: var(--pf-hanko);
  border-color: var(--pf-hanko);
}

a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--pf-ink);
  outline-offset: 3px;
  border-radius: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .centering {
    animation: none;
  }

  * {
    transition-duration: 0.01ms !important;
  }
}

@keyframes slideIn {
  0% {
    margin-left: 100px;
    opacity: 0.2;
  }
  100% {
    margin-left: 0px;
    opacity: 1;
  }

}
</style>
