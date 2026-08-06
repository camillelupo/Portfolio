<template>
  <div class="rigthPart">
    <div class="centering">
      <div class="about-content">
        <div class="tab-content">
          <div class="description">
            {{ $t("message.about") }}
          </div>

          <!-- <dl>, not <ul>: these are label/value pairs (Lieu -> city,
               E-mail -> address...), which is exactly what a description list
               is for. The classes and their rules are the ones Contact.vue
               already uses, so both pages render these details identically.
               The rules are duplicated in this file on purpose: both stylesheets
               are `scoped`, so neither can reach the other's markup. -->
          <dl class="pf-contact-list">
            <dt class="pf-contact-label">{{ $t("message.aboutLocationLabel") }}</dt>
            <dd class="pf-contact-value">Rouen (76000)</dd>

            <dt class="pf-contact-label">{{ $t("message.contactEmailLabel") }}</dt>
            <dd class="pf-contact-value">
              <a class="pf-link" href="mailto:camille.lupo@hotmail.fr">camille.lupo@hotmail.fr</a>
            </dd>

            <dt class="pf-contact-label">{{ $t("message.contactGithubLabel") }}</dt>
            <dd class="pf-contact-value">
              <a class="pf-link" href="https://github.com/camillelupo" target="_blank" rel="noopener noreferrer">github.com/camillelupo</a>
            </dd>

            <dt class="pf-contact-label">{{ $t("message.aboutFreelanceLabel") }}</dt>
            <dd class="pf-contact-value">{{ $t("message.aboutFreelanceValue") }}</dd>
          </dl>
        </div>

        <!-- Career history. Sibling of .tab-content, and capped at the same
             640px with the same 20px inset, so both blocks share one left edge. -->
        <section class="pf-parcours" aria-labelledby="pf-parcours-title">
          <!-- <h1>, not <h2>: this is the page's title and its only top-level
               landmark, so the outline starts here. Contact.vue does the same
               with .pf-contact-title, so both pages agree on outline depth. -->
          <h1 id="pf-parcours-title" class="pf-parcours-title">{{ $t("message.parcoursTitle") }}</h1>

          <h2 class="pf-block-title">{{ $t("message.blockExperience") }}</h2>
          <!-- role="list" on every list stripped of its markers: Safari/VoiceOver
               drops the implicit list role when list-style is none. -->
          <ol class="pf-jobs" role="list">
            <li v-for="job in jobs" :key="job.key" class="pf-job">
              <p class="pf-job-date">
                <time :datetime="job.datetime">{{ $t("message.jobs." + job.key + ".date") }}</time>
              </p>
              <h3 class="pf-job-role">{{ $t("message.jobs." + job.key + ".role") }}</h3>
              <p class="pf-job-company">{{ $t("message.jobs." + job.key + ".company") }}</p>
              <ul class="pf-job-list" role="list">
                <li v-for="bullet in job.bullets" :key="bullet">
                  {{ $t("message.jobs." + job.key + "." + bullet) }}
                </li>
              </ul>
            </li>
          </ol>

          <h2 class="pf-block-title">{{ $t("message.blockEducation") }}</h2>
          <p class="pf-edu">{{ $t("message.education") }}</p>

          <h2 class="pf-block-title">{{ $t("message.blockSkills") }}</h2>
          <ul class="pf-taglist" role="list">
            <li v-for="(skill, index) in $tm('message.skills')" :key="index" class="pf-tag">{{ $rt(skill) }}</li>
          </ul>

          <h2 class="pf-block-title">{{ $t("message.blockLanguages") }}</h2>
          <ul class="pf-taglist" role="list">
            <li v-for="(language, index) in $tm('message.languages')" :key="index" class="pf-tag">{{ $rt(language) }}</li>
          </ul>
        </section>
      </div>
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

/* width: 100% is load-bearing: .centering is a flex row above 1200px, so
   .about-content used to be a shrink-to-fit item sized by whatever the widest
   row below it happened to be (~1170px). Filling the line instead gives its
   children a stable box to centre themselves in. */
.about-content {
  color: var(--pf-ink);
  background-color: var(--pf-paper);
  width: 100%;
}


/* `padding: 100px 0` is the page inset, and it is not optional: `align-items:
   center` only centres while the content is shorter than the 100vh line box.
   This page is ~1400-1600px tall, so the line grows to content height, the
   centring becomes a no-op and the first character would otherwise sit flush
   against the top edge of the window. Same value and same reason as
   Contact.vue's .centering at this breakpoint. */
@media (min-width: 1200px) {
  .centering {
    left: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 100px 0;
    min-height: 100vh;
    animation: slideIn 1s ease-out;
  }
}

@media (max-width: 1200px) {
  .centering {
    padding-top: 100px;
    width: 100%;
    align-items: center;
  }
}

/* ---------------------------------------------------------------------------
   One single column, 640px, at every breakpoint.
   .tab-content used to be flex-direction: row above 1200px, which spread the
   intro and the contact details over ~1170px while everything below sat in
   750px: the page started wide then narrowed for no reason. It is a column
   now at every breakpoint, and .tab-content, .description and .pf-parcours all
   cap at the same 640px with the same 20px inset, so they share one left edge.
   640px and not 750px: in a fixed-pitch face at 15-16px, 750px yields ~78
   characters per line, 640px yields ~66.
   --------------------------------------------------------------------------- */
.tab-content {
  display: flex;
  flex-direction: column;
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
  /* The 20px inset lives here rather than on each child, so it cannot drift
     from the identical inset on .pf-parcours below. */
  padding: 0 20px;
  /* Bootstrap 5 already sets border-box globally; restated so the 640px cap
     stays a box width, padding included, whatever the reset does. */
  box-sizing: border-box;
  /* Restated on purpose: index.html only sets the mono body font below 1200px. */
  font-family: var(--pf-mono);
}

/* Left-aligned, never justified: justified monospace opens visible vertical
   rivers. This block is now the page's only introduction — the parcours intro
   below it repeated the very same paragraph 150px further down and has been
   merged into message.about, so .description inherits its 16px/1.6.
   Its 40px bottom margin is the page's baseline block gap. */
.description {
  max-width: 640px;
  width: 100%;
  margin: 0 auto 40px;
  box-sizing: border-box;
  font-family: var(--pf-mono);
  font-size: 16px;
  line-height: 1.6;
  text-align: left;
  color: var(--pf-ink);
}

/* ---------------------------------------------------------------------------
   Contact details
   Copied verbatim from Contact.vue so the two pages render these pairs
   identically. Both stylesheets are scoped, so the duplication is required —
   do not try to share them by de-scoping either file.
   Bootstrap 5 gives dd `margin-left: 0; margin-bottom: .5rem` and dt
   `font-weight: 700`, so every value below is stated explicitly.
   --------------------------------------------------------------------------- */
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

/* ---------------------------------------------------------------------------
   Parcours (career history)
   Every heading and list below carries an explicit class with explicit
   font-size / margin / padding-left: Bootstrap 5 restyles bare h1-h4 (fluid
   sizes, font-weight 500), ul/ol (padding-left: 2rem, margin-bottom: 1rem)
   and dd, so relying on defaults would drift.
   Colours come from the design tokens (src/assets/tokens.css), which are the
   page's own dark theme. Contrast on --pf-paper (#111111):
   --pf-ink (#F8F8F8) 17.78:1, --pf-ink-soft (#AAAAAA) 8.13:1,
   --pf-hanko (#D4574A) 4.73:1 (markers/rules only, never body copy),
   --pf-line-strong (#6A6B73) 3.56:1, --pf-line (#2A2B30) 1.34:1 (decorative
   rules only).
   --------------------------------------------------------------------------- */
.pf-parcours {
  max-width: 640px;
  /* Centred like .tab-content above it, and with the same 20px inset: the two
     blocks are now the same column, so they must resolve to the same edges.
     32px, not the old 60px: that 60px was sized to clear a carousel that no
     longer exists. .tab-content is a flex container, so the 40px bottom margin
     of .pf-contact-list above cannot collapse into it — the seam is the sum.
     32 + 40 = 72px keeps this the page's largest boundary without making it
     2.5x the 40px baseline, which read as two stacked blocks. */
  margin: 32px auto 0;
  padding: 0 20px 100px;
  width: 100%;
  box-sizing: border-box;
  /* Restated on purpose: index.html only sets the mono body font below 1200px. */
  font-family: var(--pf-mono);
}

.pf-parcours-title {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--pf-ink);
  margin: 0 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--pf-line);
}

/* 18px/700/.04em is the "Section" row of design/refonte/tokens.html. It is set
   once, for every breakpoint, and must stay above .pf-job-role (h3, 15px): at
   the old 20px/700 these two were pixel-identical, so EXPÉRIENCE (h2) and the
   job titles under it (h3) read as three peers instead of a heading and its
   children. Do not raise either one back without moving the other. */
.pf-block-title {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: .04em;
  color: var(--pf-ink);
  margin: 40px 0 20px;
}

.pf-jobs {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.pf-job {
  border-left: 1px solid var(--pf-line);
  padding-left: 20px;
  margin-bottom: 30px;
  position: relative;
}

.pf-job::before {
  content: '';
  position: absolute;
  left: -3px;
  top: 6px;
  width: 5px;
  height: 5px;
  background: var(--pf-hanko);
  border-radius: 50%;
}

/* Kept inline in normal flow at every breakpoint. */
.pf-job-date {
  font-size: 13px;
  color: var(--pf-ink-soft);
  letter-spacing: 1px;
  margin: 0 0 5px;
}

/* 15px/700, matching `.job .r` in design/refonte/apropos.html, at every
   breakpoint. Sits below .pf-block-title (h2, 18px) — see the note there. */
.pf-job-role {
  font-size: 15px;
  font-weight: 700;
  color: var(--pf-ink);
  margin: 0 0 5px;
  line-height: 1.2;
}

.pf-job-company {
  font-size: 15px;
  color: var(--pf-ink-soft);
  margin: 0 0 10px;
}

.pf-job-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: var(--pf-ink);
}

/* ~12px is about half a 25.6px line box: bullets run 150-218 characters in
   French and wrap to 3-4 lines, so a smaller gap merges them into one block. */
.pf-job-list li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 12px;
}

.pf-job-list li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--pf-hanko);
}

.pf-edu {
  font-size: 16px;
  line-height: 1.6;
  color: var(--pf-ink);
  margin: 0;
}

.pf-taglist {
  list-style: none;
  padding-left: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* --pf-line-strong (#6A6B73) is 3.56:1 and meets WCAG 1.4.11: these borders are
   the only thing delimiting each tag, so they are meaningful non-text content.
   Do not darken — --pf-line (#2A2B30) is 1.34:1 and would fail here. */
.pf-tag {
  font-size: 13px;
  color: var(--pf-ink);
  border: 1px solid var(--pf-line-strong);
  border-radius: 3px;
  padding: 5px 10px;
  letter-spacing: 1px;
}

@media (min-width: 1200px) {
  .pf-parcours {
    margin-top: 32px;
  }
}

@media (max-width: 1200px) {
  .pf-parcours {
    margin-top: 32px;
    padding-bottom: 60px;
  }

  .pf-parcours-title {
    font-size: 20px;
  }

  /* No .pf-block-title / .pf-job-role override here on purpose: 18px and 15px
     now hold at every breakpoint, so the h2/h3 hierarchy no longer needs to be
     repaired per-viewport.
     No body-copy override either: the column caps at 640px, so shrinking the
     type would only raise the characters-per-line count. Letting the viewport
     narrow the column keeps the measure sane. */
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
</style>
<script setup>
// Career history, source: Camille Lupo's CV. Reverse-chronological order is
// meaningful here (REDLAB first), hence the <ol> in the template.
// `datetime` carries the start date only; TROP-PLUS is known to the year alone,
// which is a valid HTML date string. Bullet counts differ per job, so each job
// lists its own keys rather than deriving them from a shared count.
const jobs = [
  { key: 'redlab', datetime: '2025-10', bullets: ['b1', 'b2', 'b3'] },
  { key: 'tropplus', datetime: '2020', bullets: ['b1', 'b2', 'b3', 'b4'] },
]
</script>
