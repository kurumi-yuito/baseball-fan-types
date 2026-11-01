<script setup lang="ts">
import { types, axes } from '~/data/quiz'
import { calculate, decodeAnswers } from '~/utils/scoring'
const route = useRoute()
const code = computed(() => String(route.params.type || '').toUpperCase())
const info = computed(() => types[code.value])
const result = computed(() => { const answers = decodeAnswers(route.query.a); if (!answers) return null; const calculated = calculate(answers); return calculated.type === code.value ? calculated : null })
const isOwnResult = computed(() => Boolean(result.value))
const fullCode = computed(() => code.value + (result.value ? '-' + result.value.suffix : ''))
const shareText = computed(() => info.value ? `${isOwnResult.value ? '私の野球民タイプは' : '野球民タイプ紹介：'}「${info.value.name}」（${fullCode.value}） #野球民タイプ診断` : '')
const shareUrl = computed(() => import.meta.client ? window.location.href : '')
const tweetUrl = computed(() => `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText.value)}&url=${encodeURIComponent(shareUrl.value)}`)
const copied = ref(false)
async function copy() { if (!import.meta.client) return; try { await navigator.clipboard.writeText(shareUrl.value); copied.value = true } catch { copied.value = false } }
useSeoMeta({
  title: () => info.value ? `${info.value.name} | 野球民タイプ診断` : 'タイプが見つかりません',
  description: () => info.value?.description || '野球民タイプ診断',
  ogTitle: () => info.value ? `${info.value.name} | 野球民タイプ診断` : '野球民タイプ診断',
  ogDescription: () => info.value?.tagline || '野球観戦スタイル診断',
  twitterTitle: () => info.value ? `${info.value.name} | 野球民タイプ診断` : '野球民タイプ診断',
  twitterDescription: () => info.value?.tagline || '野球観戦スタイル診断'
})
</script>
<template>
<div class="site"><header class="header"><NuxtLink to="/" class="brand">野球民タイプ診断</NuxtLink><NuxtLink to="/quiz" class="header-link">もう一度診断</NuxtLink></header>
<main v-if="info">
  <section class="result-hero"><div class="result-hero-inner"><p class="result-overline">{{ isOwnResult ? 'あなたの診断結果' : '野球民タイプ紹介' }}</p><p class="result-code">{{fullCode}}</p><h1>{{info.name}}</h1><p class="result-tagline">{{info.tagline}}</p><div class="result-graphic" aria-hidden="true"><div class="result-graphic-circle"></div><span>{{code}}</span></div><a v-if="result" class="start-button" :href="tweetUrl" target="_blank" rel="noopener noreferrer">結果をシェア →</a><NuxtLink v-else class="start-button" to="/quiz">診断してみる →</NuxtLink></div></section>
  <div class="result-body"><section class="result-section"><p class="section-kicker">YOUR STYLE</p><h2>{{ isOwnResult ? 'あなたの観戦スタイル' : `${info.name}の観戦スタイル` }}</h2><p class="result-paragraph">{{info.description}}</p><div class="habit"><strong>観戦あるある</strong><p>{{info.habit}}</p></div></section>
    <section v-if="result" class="result-section"><p class="section-kicker">YOUR TRAITS</p><h2>5つの観戦傾向</h2><div class="traits"><div v-for="(score,i) in result.scores" :key="score.axis" class="trait"><div class="trait-top"><strong>{{axes[i].leftLabel}} / {{axes[i].rightLabel}}</strong><span>{{score.winner === score.left ? axes[i].leftLabel : axes[i].rightLabel}}寄り</span></div><div class="trait-bar"><div :style="{width:score.leftPercent+'%'}"></div></div><div class="trait-bottom"><span>{{axes[i].leftLabel}} {{score.leftPercent}}%</span><span>{{axes[i].rightLabel}} {{100-score.leftPercent}}%</span></div></div></div><p class="note">タイプは設問ごとの賛否の多数決で判定しています。割合は回答の強さを集計した参考値で、確率ではありません。多数決と割合の優勢側が異なる場合があります。</p></section>
    <section v-if="result" class="result-section"><p class="section-kicker">ADDITIONAL TRAIT</p><h2>もうひとつの観戦傾向</h2><div class="additional"><strong>{{result.suffix}} — {{result.suffix === 'C' ? '文脈重視' : '自由柔軟'}}</strong><p>{{result.suffix === 'C' ? '球場や対戦カード、選手の所属など、その場の文脈に合わせた選択を好む傾向があります。' : '現役・引退、ホーム・ビジターといった区分にあまり縛られず、好きなものを自由に選ぶ傾向があります。'}}</p></div></section>
    <section class="result-section"><p class="section-kicker">COMPATIBILITY</p><h2>ほかの野球民との相性</h2><div class="compat"><NuxtLink :to="`/result/${info.good}`"><small>{{ isOwnResult ? '気が合いそう' : '相性がよさそうなタイプ' }}</small><strong>{{types[info.good].name}}</strong><span>{{info.good}} →</span></NuxtLink><NuxtLink :to="`/result/${info.clash}`"><small>{{ isOwnResult ? '観戦スタイルが異なりそう' : '観戦スタイルが異なるタイプ' }}</small><strong>{{types[info.clash].name}}</strong><span>{{info.clash}} →</span></NuxtLink></div><p class="note">相性はキャラクター設定に基づくエンタメ上の表現です。</p></section>
    <div class="result-actions"><button v-if="result" class="outline-button" @click="copy">{{copied?'URLをコピーしました':'結果URLをコピー'}}</button><NuxtLink class="outline-button" to="/quiz">もう一度診断する</NuxtLink></div>
  </div>
</main><main v-else class="not-found"><h1>タイプが見つかりません</h1><NuxtLink class="start-button" to="/quiz">診断する →</NuxtLink></main></div>
</template>
