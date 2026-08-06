<script setup>
// Hero of /kanjiquizz: seal, kicker, h1, lede, CTA row and the CSS device mockup.
//
// The six device tiles are data-driven so the markup stays readable. Each glyph is
// TEXT (lang="ja", aria-hidden) doubled by a readable label, per the design brief.
const deviceTiles = [
  { key: 't1', glyph: '漢', hue: 'kq-g-hanko' },
  { key: 't2', glyph: 'あ', hue: 'kq-g-matcha' },
  { key: 't3', glyph: '語', hue: 'kq-g-aizome' },
  { key: 't4', glyph: '文', hue: 'kq-g-karashi' },
  { key: 't5', glyph: '札', hue: 'kq-g-fuji' },
  { key: 't6', glyph: '書', hue: 'kq-g-asagi' },
]
</script>

<template>
  <div class="kq-hero">
    <div class="kq-hero-copy">
      <div class="kq-seal" lang="ja" aria-hidden="true">漢</div>
      <p class="kq-kicker">{{ $t('kq.hero.kicker') }}</p>
      <h1>{{ $t('kq.hero.title') }}</h1>
      <p class="kq-lede">{{ $t('kq.hero.lede') }}</p>
      <div class="kq-cta">
        <!-- No Google Play URL before the 17 Sept 2026 release.
             A native <button disabled> rather than role="button" + aria-disabled:
             `disabled` is announced consistently by every screen reader, it takes
             the control OUT of the tab order instead of leaving a widget that the
             "b" quick key surfaces but the Tab key can never reach, and it cannot
             be accidentally wired to a handler later.
             The visual treatment is deliberately INERT (see .kq-btn-inert below),
             so it no longer impersonates a live primary button; the label itself
             already says "bientôt". -->
        <button class="kq-btn kq-btn-inert" type="button" disabled>
          {{ $t('kq.hero.ctaPlay') }}
        </button>
        <span class="kq-when">{{ $t('kq.hero.ctaPlayNote') }}</span>
      </div>
    </div>

    <!-- Reconstruction of the app home screen. Exposed as a single labelled image
         node rather than aria-hidden: the screenshot carries real product
         information (what the home screen shows), so a screen reader user should
         get its description instead of nothing. role="img" prunes the subtree, so
         the loose Japanese glyphs inside are never read one by one. -->
    <div class="kq-device" role="img" :aria-label="$t('kq.hero.device.aria')">
      <div class="kq-screen">
        <div class="kq-scr-pad">
          <div class="kq-scr-hd">
            <span class="kq-scr-t">{{ $t('kq.hero.title') }}</span>
            <span class="kq-scr-av"></span>
          </div>
          <div class="kq-scr-streak">
            <span class="kq-scr-lbl">{{ $t('kq.hero.device.due') }}</span>
            <div class="kq-scr-n">
              {{ $t('kq.hero.device.count') }}<em>{{ $t('kq.hero.device.unit') }}</em>
            </div>
          </div>
          <div class="kq-scr-grid">
            <div v-for="tile in deviceTiles" :key="tile.key" class="kq-scr-tile">
              <div class="kq-scr-g" :class="tile.hue" lang="ja" aria-hidden="true">{{ tile.glyph }}</div>
              <div class="kq-scr-l">{{ $t('kq.hero.device.' + tile.key) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kq-hero {
  padding: 88px 0 76px;
  border: none;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 56px;
  align-items: center;
}

/* ---------- copy ---------- */
.kq-seal {
  width: 56px;
  height: 56px;
  border-radius: 10px;
  background: var(--kq-hanko-fill);
  color: var(--kq-on-hanko);
  display: grid;
  place-items: center;
  font-family: var(--kq-serif);
  font-size: 32px;
  line-height: 1;
  margin-bottom: 26px;
}

.kq-hero-copy .kq-kicker {
  font-family: var(--kq-mono);
  font-size: 11.5px;
  line-height: 1.65;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--kq-ink-faint);
  margin: 0 0 10px;
  font-weight: 400;
}

/* ---------- cta ---------- */
.kq-cta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 28px;
  align-items: center;
}

/* The CTA is a real <button>, which both the UA sheet and Bootstrap Reboot
   restyle (own font stack and size, `appearance: button`, a platform border
   and, on some engines, a margin). Every one of those is restated here so the
   shape stays the same whatever element carries this class. */
.kq-cta .kq-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 13px 22px;
  border-radius: 10px;
  text-decoration: none;
  font-family: var(--kq-sans);
  font-size: 14.5px;
  line-height: 1.4;
  font-weight: 600;
  border: 1px solid transparent;
  background: transparent;
  margin: 0;
  text-align: center;
  -webkit-appearance: none;
  appearance: none;
}

/* The inert Play CTA. It keeps the button SHAPE but drops the live primary
   treatment (--kq-hanko-fill + --kq-on-hanko, which sat at 4.61:1) so a sighted
   user no longer reads it as clickable: muted label on the raised surface,
   hairline outline, one notch less font-weight than the live CTA next to it.
   Contrast --kq-ink-soft (#B9B8B0) on --kq-raised (#1F2026) = 8.16:1, i.e. well
   past 4.5:1 and thicker than the live button it replaces.
   No :hover and no :focus-visible are declared for it anywhere — it is not a
   destination. */
.kq-cta .kq-btn-inert {
  background: var(--kq-raised);
  color: var(--kq-ink-soft);
  border-color: var(--kq-line-strong);
  font-weight: 500;
  cursor: default;
  user-select: none;
}

.kq-cta .kq-when {
  font-family: var(--kq-mono);
  font-size: 11.5px;
  line-height: 1.65;
  color: var(--kq-ink-faint);
  width: 100%;
  margin-top: 2px;
}

/* ---------- device ---------- */
.kq-device {
  border: 1px solid var(--kq-line-strong);
  border-radius: 26px;
  padding: 9px;
  background: var(--kq-raised);
}

.kq-screen {
  background: var(--kq-paper);
  border-radius: 18px;
  overflow: hidden;
  aspect-ratio: 9 / 19;
}

.kq-scr-pad {
  padding: 16px 13px;
}

.kq-scr-hd {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.kq-scr-hd .kq-scr-t {
  font-family: var(--kq-serif);
  font-size: 14px;
  color: var(--kq-ink);
}

.kq-scr-hd .kq-scr-av {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--kq-raised);
  border: 1px solid var(--kq-line-strong);
}

.kq-scr-streak {
  background: var(--kq-raised);
  border: 1px solid var(--kq-line-strong);
  border-radius: 10px;
  padding: 9px 11px;
  margin-bottom: 14px;
}

.kq-scr-streak .kq-scr-lbl {
  font-family: var(--kq-mono);
  font-size: 8.5px;
  color: var(--kq-ink-faint);
  letter-spacing: .08em;
  text-transform: uppercase;
  font-weight: 400;
  display: block;
  margin-bottom: 5px;
}

.kq-scr-streak .kq-scr-n {
  font-family: var(--kq-serif);
  font-size: 19px;
  line-height: 1;
  color: var(--kq-ink);
}

.kq-scr-streak .kq-scr-n em {
  font-style: normal;
  font-size: 10px;
  color: var(--kq-ink-soft);
  margin-left: 5px;
  font-family: var(--kq-sans);
}

.kq-scr-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px;
}

.kq-scr-tile {
  background: var(--kq-raised);
  border: 1px solid var(--kq-line-strong);
  border-radius: 10px;
  padding: 11px 4px;
  text-align: center;
}

.kq-scr-tile .kq-scr-g {
  font-family: var(--kq-serif);
  font-size: 21px;
  line-height: 1;
}

.kq-scr-tile .kq-scr-l {
  font-size: 7.5px;
  line-height: 1.3;
  color: var(--kq-ink-soft);
  margin-top: 5px;
  letter-spacing: .02em;
}

/* Decorative aria-hidden glyphs only — these hues are never body text.

   --kq-hanko on --kq-raised (#1F2026) is 4.07:1. Unlike the same class in
   KqModes.vue, the large-text route is NOT available here: `.kq-scr-g` is 21px
   (= 15.75pt), under the 18pt bar. What applies instead is the 1.4.3 exception
   for text that is part of a picture containing significant other visual
   content. This whole block is exactly that: the glyph is aria-hidden="true"
   inside <div class="kq-device" role="img" :aria-label="…"> (above), which
   prunes the subtree and exposes the mockup as ONE labelled image node. The
   tile is a reconstruction of the real app home screen, where that kanji is
   red, so recolouring it would misrepresent the product being pictured.
   Matches design/kanjiquizz/desktop.html line 188 (color:var(--hanko)).
   The five other hues are 5.8:1 or better on --kq-raised. */
.kq-g-hanko { color: var(--kq-hanko); }

.kq-g-matcha { color: var(--kq-matcha); }
.kq-g-aizome { color: var(--kq-aizome); }
.kq-g-karashi { color: var(--kq-karashi); }
.kq-g-fuji { color: var(--kq-fuji); }
.kq-g-asagi { color: var(--kq-asagi); }

@media (max-width: 1200px) {
  .kq-hero {
    padding: 0 0 56px;
    grid-template-columns: 1fr;
    gap: 44px;
  }

  /* The device keeps its intrinsic phone width; a full-bleed 9/19 frame would be
     ~1900px tall on a collapsed hero. */
  .kq-device {
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
