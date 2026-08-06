<template>
  <div class="rigthPart">
    <div class="centering">
      <section class="pf-gallery" aria-labelledby="pf-gallery-title">
        <h1 id="pf-gallery-title" class="pf-gallery-title">{{ $t("message.workTitle") }}</h1>
        <!-- Decorative reinforcement of the visible 01/02/03 indices below; on its
             own a screen reader would announce "zero one slash zero three". -->
        <p class="pf-gallery-count" aria-hidden="true">01 / 03</p>

        <!-- role="list" on every list stripped of its markers: Safari/VoiceOver
             drops the implicit list role when list-style is none. -->
        <ul class="pf-list" role="list">
          <li class="pf-feature">
            <span class="pf-index">01</span>
            <h2 class="pf-feature-title">KanjiQuizz</h2>
            <p class="pf-feature-desc">{{ $t("message.quizz") }}</p>
            <router-link to="/kanjiquizz" class="pf-feature-link">
              {{ $t("kq.link") }} <span aria-hidden="true">→</span>
            </router-link>
          </li>
        </ul>

        <ul class="pf-slots" role="list">
          <li class="pf-slot">
            <span class="pf-index">02</span>
            <span class="pf-slot-label">{{ $t("message.slotEmpty") }}</span>
          </li>
          <li class="pf-slot">
            <span class="pf-index">03</span>
            <span class="pf-slot-label">{{ $t("message.slotEmpty") }}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>


<style scoped>
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

@media (max-width: 1200px) {
  .rigthPart {
    padding-left: 0px;
    width: 100%;
    min-height: 100vh;
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

@media (min-width: 1200px) {
  .centering {
    display: block;
    padding: 100px 0;
    animation: slideIn 1s ease-out;
  }
}

@media (max-width: 1200px) {
  .centering {
    display: block;
    padding: 100px 0 60px;
  }
}

.pf-gallery {
  max-width: 750px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  font-family: var(--pf-mono);
}

.pf-gallery-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--pf-ink);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 0 0 5px;
}

.pf-gallery-count {
  font-size: 13px;
  color: var(--pf-ink-soft);
  margin: 0 0 40px;
  letter-spacing: 1px;
}

.pf-list,
.pf-slots {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.pf-index {
  display: block;
  font-size: 13px;
  color: var(--pf-hanko);
  letter-spacing: 2px;
  margin-bottom: 10px;
}

.pf-feature {
  border-left: 2px solid var(--pf-hanko);
  padding: 20px 0 20px 20px;
  margin-bottom: 40px;
}

.pf-feature-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--pf-ink);
  margin: 0 0 10px;
  line-height: 1.2;
}

.pf-feature-desc {
  font-size: 16px;
  line-height: 1.5;
  color: var(--pf-ink);
  margin: 0 0 20px;
  text-align: left;
}

.pf-feature-link {
  color: var(--pf-ink);
  text-decoration: none;
  border-bottom: 1px solid var(--pf-hanko);
  padding-bottom: 2px;
  display: inline-block;
  min-height: 24px;
  transition: color .3s ease, border-color .3s ease;
}

.pf-feature-link:hover {
  color: var(--pf-ink);
  border-bottom-color: var(--pf-ink);
}

/* The border is the only thing delimiting the tile, so WCAG 1.4.11 applies and
   demands 3:1: --pf-line-strong (#6A6B73) is 3.57:1 on the --pf-paper page.
   Solid, not dashed, and --pf-raised behind it, matching `.slot` in
   design/refonte/pages.html. */
.pf-slot {
  flex: 1 1 0;
  border: 1px solid var(--pf-line-strong);
  background: var(--pf-raised);
  border-radius: 4px;
  padding: 20px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* --pf-hanko is 4.73:1 on --pf-paper but only 4.36:1 on --pf-raised, under the
   4.5 threshold. tokens.html closes the question: "le rouge est texte sur
   paper, filet ailleurs" — inside a raised panel the text goes back to an ink
   token. Scoped to .pf-slot so the featured item's .pf-index, which still sits
   on --pf-paper at 4.73:1, keeps its red. --pf-ink-soft is ~7.5:1 here. */
.pf-slot .pf-index {
  color: var(--pf-ink-soft);
}

.pf-slot-label {
  font-size: 15px;
  color: var(--pf-ink-soft);
  letter-spacing: 1px;
}

@media (min-width: 1200px) {
  .pf-slots {
    display: flex;
    gap: 20px;
  }
}

@media (max-width: 1200px) {
  .pf-slots {
    display: block;
  }

  .pf-slot {
    margin-bottom: 20px;
  }
}

a:focus-visible, button:focus-visible {
  outline: 2px solid var(--pf-ink); outline-offset: 3px; border-radius: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .centering { animation: none; }
  * { transition-duration: 0.01ms !important; }
}
</style>
<script>
export default {
  name: 'Portfolio',
}
</script>
