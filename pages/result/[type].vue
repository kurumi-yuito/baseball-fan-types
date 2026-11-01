
<script setup lang="ts">
import { types, axes } from '~/data/quiz'
import { calculate, decodeAnswers } from '~/utils/scoring'
import { selectHabit } from '~/utils/habits'

const route = useRoute()
const code = computed(() => String(route.params.type || '').toUpperCase())
const info = computed(() => types[code.value])

const answers = computed(() => decodeAnswers(route.query.a))

const result = computed(() => {
  if (!answers.value) return null

  try {
    const calculated = calculate(answers.value)
    return calculated.type === code.value ? calculated : null
  } catch {
    return null
  }
})

const isOwnResult = computed(() => Boolean(result.value))

const habit = computed(() => {
  if (!result.value || !answers.value) return null
  return selectHabit(answers.value)
})

const fullCode = computed(() =>
  code.value + (result.value ? '-' + result.value.suffix : '')
)

const shareText = computed(() =>
  info.value
    ? `${isOwnResult.value ? '私の野球民タイプは' : '野球民タイプ紹介：'}「${info.value.name}」（${fullCode.value}） #野球民タイプ診断`
    : ''
)

const shareUrl = computed(() =>
  import.meta.client ? window.location.href : ''
)

const tweetUrl = computed(() =>
  `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText.value)}&url=${encodeURIComponent(shareUrl.value)}`
)

const copied = ref(false)

async function copy() {
  if (!import.meta.client) return

  try {
    await navigator.clipboard.writeText(shareUrl.value)
    copied.value = true
  } catch {
    copied.value = false
  }
}

const additionalDescription = computed(() => {
  if (!result.value) return ''

  return result.value.suffix === 'C'
    ? 'ユニフォームの選び方などで、その場の状況や意味合いを意識する傾向があります。具体的なこだわり方は回答によって異なります。'
    : 'ユニフォームの選び方などで、状況に縛られず自分の好みを優先する傾向があります。具体的な楽しみ方は回答によって異なります。'
})

useSeoMeta({
  title: () => info.value
    ? `${info.value.name} | 野球民タイプ診断`
    : 'タイプが見つかりません',
  description: () => info.value?.description || '野球民タイプ診断',
  ogTitle: () => info.value
    ? `${info.value.name} | 野球民タイプ診断`
    : '野球民タイプ診断',
  ogDescription: () => info.value?.tagline || '野球観戦スタイル診断',
  twitterTitle: () => info.value
    ? `${info.value.name} | 野球民タイプ診断`
    : '野球民タイプ診断',
  twitterDescription: () => info.value?.tagline || '野球観戦スタイル診断'
})
</script>

<template>
  <div class="site">
    <header class="header">
      <NuxtLink to="/" class="brand">野球民タイプ診断</NuxtLink>
      <NuxtLink to="/quiz" class="header-link">もう一度診断</NuxtLink>
    </header>

    <main v-if="info">
      <section class="result-hero">
        <div class="result-hero-inner">
          <p class="result-overline">
            {{ isOwnResult ? 'あなたの診断結果' : '野球民タイプ紹介' }}
          </p>
          <p class="result-code">{{ fullCode }}</p>
          <h1>{{ info.name }}</h1>
          <p class="result-tagline">{{ info.tagline }}</p>

          <div class="result-graphic" aria-hidden="true">
            <div class="result-graphic-circle"></div>
            <span>{{ code }}</span>
          </div>

          <a
            v-if="result"
            class="start-button"
            :href="tweetUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            結果をシェア →
          </a>

          <NuxtLink v-else class="start-button" to="/quiz">
            診断してみる →
          </NuxtLink>
        </div>
      </section>

      <div class="result-body">
        <section class="result-section">
          <p class="section-kicker">YOUR STYLE</p>
          <h2>
            {{
              isOwnResult
                ? 'あなたの観戦スタイル'
                : `${info.name}の観戦スタイル`
            }}
          </h2>

          <p class="result-paragraph">{{ info.description }}</p>

          <div v-if="habit" class="habit">
            <strong>観戦あるある</strong>
            <p>{{ habit }}</p>
          </div>
        </section>

        <section v-if="result" class="result-section">
          <p class="section-kicker">YOUR TRAITS</p>
          <h2>5つの観戦傾向</h2>

          <div class="traits">
            <div
              v-for="(score, i) in result.scores"
              :key="score.axis"
              class="trait"
            >
              <div class="trait-top">
                <strong>
                  {{ axes[i].leftLabel }} / {{ axes[i].rightLabel }}
                </strong>
                <span>
                  {{
                    score.winner === score.left
                      ? axes[i].leftLabel
                      : axes[i].rightLabel
                  }}寄り
                </span>
              </div>

              <div class="trait-bar">
                <div :style="{ width: score.leftPercent + '%' }"></div>
              </div>

              <div class="trait-bottom">
                <span>
                  {{ axes[i].leftLabel }} {{ score.leftPercent }}%
                </span>
                <span>
                  {{ axes[i].rightLabel }} {{ 100 - score.leftPercent }}%
                </span>
              </div>
            </div>
          </div>

        </section>

        <section v-if="result" class="result-section">
          <p class="section-kicker">ADDITIONAL TRAIT</p>
          <h2>もうひとつの観戦傾向</h2>

          <div class="additional">
            <strong>
              {{ result.suffix }} —
              {{ result.suffix === 'C' ? '文脈重視' : '自由柔軟' }}
            </strong>
            <p>{{ additionalDescription }}</p>
          </div>
        </section>

        <section class="result-section">
          <p class="section-kicker">COMPATIBILITY</p>
          <h2>ほかの野球民との相性</h2>

          <div class="compat">
            <NuxtLink :to="`/result/${info.good}`">
              <small>
                {{
                  isOwnResult
                    ? '気が合いそう'
                    : '相性がよさそうなタイプ'
                }}
              </small>
              <strong>{{ types[info.good].name }}</strong>
              <span>{{ info.good }} →</span>
            </NuxtLink>

            <NuxtLink :to="`/result/${info.clash}`">
              <small>
                {{
                  isOwnResult
                    ? '観戦スタイルが異なりそう'
                    : '観戦スタイルが異なるタイプ'
                }}
              </small>
              <strong>{{ types[info.clash].name }}</strong>
              <span>{{ info.clash }} →</span>
            </NuxtLink>
          </div>

          <p class="note">
            相性はキャラクター設定に基づくエンタメ上の表現です。
          </p>
        </section>

        <div class="result-actions">
          <button
            v-if="result"
            class="outline-button"
            @click="copy"
          >
            {{
              copied
                ? 'URLをコピーしました'
                : '結果URLをコピー'
            }}
          </button>
          <NuxtLink class="outline-button" to="/quiz">
            もう一度診断する
          </NuxtLink>
        </div>
      </div>
    </main>

    <main v-else class="not-found">
      <h1>タイプが見つかりません</h1>
      <NuxtLink class="start-button" to="/quiz">
        診断する →
      </NuxtLink>
    </main>
  </div>
</template>
