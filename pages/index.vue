<script setup lang="ts">
useSeoMeta({ title: '野球民タイプ診断 | あなたの観戦スタイルを知ろう', description: '23の質問で、あなたの球場での観戦スタイルを見つけよう。' })
</script>
<template>
  <div class="site">
    <header class="header"><NuxtLink class="brand" to="/">野球民タイプ診断</NuxtLink><NuxtLink class="header-link" to="/quiz">診断する</NuxtLink></header>
    <main>
      <section class="landing">
        <div class="landing-copy">
          <h1>「自分の観戦スタイル、<br>これだったんだ」</h1>
          <p>球場での楽しみ方は、人それぞれ。<br>23の質問から、あなたの「野球民タイプ」を見つけよう。</p>
          <NuxtLink to="/quiz" class="start-button">無料で診断する <span aria-hidden="true">→</span></NuxtLink>
        </div>
        <div class="landing-visual" aria-hidden="true"><div class="diamond diamond-one"></div><div class="diamond diamond-two"></div><div class="diamond diamond-three"></div><div class="diamond diamond-four"></div><div class="field"><div class="field-inner"></div><div class="field-circle"></div></div></div>
      </section>
      <section class="stats" aria-label="診断について"><div><strong>23</strong><span>の質問</span></div><div><strong>16</strong><span>の基本タイプ</span></div><div><strong>6</strong><span>段階で回答</span></div></section>
    </main>

  </div>
</template>
