<template>
  <div class="rigthPart">
    <div class="centering">
      <div class="container">
        <div class="home-content">
          <div class="avatar">
            <div class="photo"></div>
          </div>
          <div class=" details">
            <!-- A real heading: this page had none at all, and the source text is
                 capitalised normally — the all-caps look stays a CSS concern. -->
            <h1 class="name">Camille Lupo</h1>
            <p class="role">{{ $t("message.role") }}</p>
            <p class="presentation">{{ $t("message.details") }}</p>
            <!-- The home page used to be a dead end. These are call-to-action
                 links, not navigation entries: the rail still owns tabs 0-3. -->
            <div class="home-actions">
              <router-link to="/kanjiquizz" class="home-btn home-btn-primary">
                {{ $t("message.homeCtaProject") }}
              </router-link>
              <router-link to="/contact" class="home-btn home-btn-ghost">
                {{ $t("message.homeCtaContact") }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

.avatar {
  min-width: 300px;
  min-height: 300px;
  position: relative;
  border-radius: 100%;
}

/* Set once at the block root, the same way .pf-gallery (Portfolio.vue) and
   .pf-contact (Contact.vue) do it. App.vue's `body` declares the Twemoji stack,
   which carries emoji glyphs only, so Latin text fell through to sans-serif and
   the name/role rendered in Arial above a mono lede. Everything in the hero now
   inherits the mono stack from here. */
.details {
  font-family: var(--pf-mono);
}

@media (max-width: 1200px) {
  .avatar {
    min-width: 200px;
    min-height: 200px;
    position: relative;
    border-radius: 100%;
  }
}

@media (max-width: 1200px) {
  .details {
    padding-top: 20px;
    font-weight: 500;
    max-width: 450px;
    padding-bottom: 30px;
    color: var(--pf-ink);
  }
}


@media (min-width: 1200px) {
  .details {
    padding-left: 100px;
    font-weight: 500;
    max-width: 600px;
    margin-bottom: 30px;
    color: var(--pf-ink);
  }
}

@keyframes morph {
  0% {
    border-radius: 60% 40% 30% 70%/60% 30% 70% 40%;
    transform: scale(1);
  }
  50% {
    border-radius: 30% 60% 70% 40%/50% 60% 30% 60%;
    transform: scale(1.2);
  }
  100% {
    border-radius: 60% 40% 30% 70%/60% 30% 70% 40%;
    transform: scale(1);
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

.photo {
  background-image: url("../assets/photo_profil_500.webp");
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  -webkit-animation: morph 7s ease-in-out 1s infinite;
  animation: morph 7s ease-in-out 1s infinite;
  background-blend-mode: multiply;
  box-shadow: inset 0 0 0 9px hsla(0, 0%, 100%, .3);
  border-radius: 60% 40% 30% 70%/60% 30% 70% 40%;
  overflow: hidden;
}

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


.home-content {
  display: flex;
  align-items: center;
  justify-content: center; /* Add this line to center the content horizontally */
}

@media (max-width: 1200px) {
  .home-content {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }
}

@media (min-width: 1200px) {
  .centering {
    width: 100%;
    left: 150px;
    animation: slideIn 1s ease-out;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
}

@media (max-width: 1200px) {
  .centering {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;;
    min-height: 100vh;
    /* Same value as Portfolio.vue and Contact.vue: below 1200px .leftPart is a
       fixed ~60px top bar, and `align-items: center` on a min-height: 100vh box
       overflows both edges once the content is taller than the viewport — the
       top overflow being unreachable by scrolling. */
    padding: 100px 0 60px;
  }
}

/* 28px uppercase with interletter spacing: the same idiom .pf-gallery-title,
   .pf-contact-title and .pf-parcours-title already use. The home page was the
   only one escaping it at 35px lowercase-height.
   This is an <h1> now, so every box-model property Bootstrap's reboot would
   impose on a heading (fluid font-size, font-weight 500, margin-bottom .5rem,
   line-height 1.2 instead of the body's 1.5) is restated here, keeping the
   rendered result byte-identical to the <div> it replaced. */
.name {
  align-items: flex-end;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: .12em;
  line-height: 1.5;
  text-transform: uppercase;
  color: var(--pf-ink);
  margin: 0;
}

/* `.rl` in design/refonte/pages.html. One of the few places --pf-hanko is
   legitimately text: 4.73:1 on --pf-paper. */
.role {
  font-size: 11px;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--pf-hanko);
  /* Small top margin, larger bottom one, so the line reads as attached to the
     name above rather than to the paragraph below. */
  margin: 6px 0 18px;
}

.home-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 10px;
}

.home-btn {
  display: inline-block;
  text-decoration: none;
  font-family: var(--pf-mono);
  font-size: 13px;
  letter-spacing: .08em;
  padding: 12px 22px;
  /* WCAG 2.5.8. */
  min-height: 44px;
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color .3s ease, color .3s ease, border-color .3s ease;
}

/* --pf-on-hanko on --pf-hanko-deep is 4.58:1; the fill is 3.91:1 on the page,
   so it draws its own boundary (WCAG 1.4.11) and the border repeats it. */
.home-btn-primary {
  background: var(--pf-hanko-deep);
  color: var(--pf-on-hanko);
  border: 1px solid var(--pf-hanko-deep);
}

/* Same inversion as .custom-button:hover in Contact.vue, so the two primary
   buttons of the site hover identically. Keeping the fill red on hover would
   have put --pf-on-hanko on --pf-hanko at 3.81:1, under the 4.5 this 13px/400
   label needs; --pf-hanko on --pf-paper is 4.73:1 for both label and border. */
.home-btn-primary:hover {
  background-color: var(--pf-paper);
  color: var(--pf-hanko);
  border-color: var(--pf-hanko);
}

/* --pf-line-strong is 3.57:1 on --pf-paper: the border is the only thing
   delimiting this one, so it has to clear 3:1. */
.home-btn-ghost {
  background: transparent;
  color: var(--pf-ink);
  border: 1px solid var(--pf-line-strong);
}

.home-btn-ghost:hover {
  background: var(--pf-raised);
  border-color: var(--pf-ink);
  color: var(--pf-ink);
}

@media (max-width: 1200px) {
  /* .home-content is a centred column below this breakpoint, and .home-actions
     is a flex row: without this the buttons would sit flush left under centred
     text. They keep their intrinsic width — wrapping, never stretching. */
  .home-actions {
    justify-content: center;
  }
}

a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--pf-ink);
  outline-offset: 3px;
  border-radius: 2px;
}

/* Same guard Portfolio.vue and Contact.vue already ship, extended to .photo:
   `morph` is a continuously scaling, auto-starting animation running well past
   5s with no pause control (WCAG 2.2.2). The animation stays for everyone else
   — the mockup keeps the morphing photo on purpose. The wildcard covers the
   two button transitions as well. */
@media (prefers-reduced-motion: reduce) {
  .centering {
    animation: none;
  }

  .photo {
    -webkit-animation: none;
    animation: none;
  }

  * {
    transition-duration: 0.01ms !important;
  }
}

</style>
