<script setup lang="ts">
import { questions, type Question } from '~/data/quiz'
import { calculate, encodeAnswers, type Answers } from '~/utils/scoring'
const router = useRouter()
const page = ref(0)
const pageSize = 5
const answers = reactive<Answers>({})
// 表示順だけを固定シャッフル。設問IDと採点キーは変更しない。
const displayOrder = [1,8,16,11,21,4,6,19,13,22,2,9,17,14,23,5,7,20,12,3,10,18,15]
const orderedQuestions = displayOrder.map(id => { const q = questions.find(item => item.id === id); if (!q) throw new Error(`設問ID ${id} がありません`); return q })
const visible = computed(() => orderedQuestions.slice(page.value * pageSize, (page.value + 1) * pageSize))
const pages = Math.ceil(orderedQuestions.length / pageSize)
const answered = computed(() => questions.filter(q => answers[q.id] !== undefined).length)
const progress = computed(() => Math.round(answered.value / questions.length * 100))
const canNext = computed(() => visible.value.every((q: Question) => answers[q.id] !== undefined))
const error = ref('')
const scale = [6,5,4,3,2,1]
const labels: Record<number,string> = {6:'強く同意する',5:'同意する',4:'やや同意する',3:'やや同意しない',2:'同意しない',1:'まったく同意しない'}
function choose(id: number, value: number) { answers[id] = value; error.value = '' }
function next() {
  if (!canNext.value) return
  if (page.value < pages - 1) { page.value++; if (import.meta.client) window.scrollTo({top:0,behavior:'smooth'}); return }
  try { const result = calculate(answers); router.push({ path: `/result/${result.type}`, query: { a: encodeAnswers(answers) } }) }
  catch(e) { error.value = e instanceof Error ? e.message : '診断結果を計算できませんでした' }
}
function back() { if (page.value > 0) { page.value--; if (import.meta.client) window.scrollTo({top:0,behavior:'smooth'}) } }
useSeoMeta({ title: '無料診断 | 野球民タイプ診断' })
</script>
<template>
  <div class="site"><header class="header"><NuxtLink class="brand" to="/">野球民タイプ診断</NuxtLink><span class="header-muted">無料診断テスト</span></header>
  <main class="quiz-main"><div class="quiz-wrap">
    <div class="progress-label"><span>あなたの観戦スタイルを診断</span><strong>{{ progress }}%</strong></div>
    <div class="progress-track"><div :style="{width:progress+'%'}"></div></div>
    <p class="quiz-instruction">それぞれの文章に、どの程度同意しますか？</p>
    <div v-for="q in visible" :key="q.id" class="question">
      <div class="question-number">{{ page * pageSize + visible.indexOf(q) + 1 }} / {{ questions.length }}</div>
      <h2>{{ q.text }}</h2>
      <div class="scale-row"><span class="agree-label">同意する</span>
        <div class="scale-options" role="radiogroup" :aria-label="q.text">
          <button v-for="n in scale" :key="n" type="button" role="radio" :aria-checked="answers[q.id] === n" :aria-label="labels[n]" :title="labels[n]" class="scale-button" :class="[n >= 4 ? 'agree' : 'disagree', 'size-'+(4-Math.min(n,7-n)), { selected: answers[q.id] === n }]" @click="choose(q.id,n)"><span v-if="answers[q.id] === n" aria-hidden="true">✓</span></button>
        </div><span class="disagree-label">同意しない</span>
      </div>
    </div>
    <p v-if="error" role="alert" class="error">{{ error }}</p>
    <div class="quiz-actions"><button type="button" class="back-button" :disabled="page===0" @click="back">← 戻る</button><button type="button" class="start-button" :disabled="!canNext" @click="next">{{ page === pages-1 ? '結果を見る' : '次へ進む' }} →</button></div>
    <p class="privacy">回答はサーバーに保存しません。共有URLには回答データが含まれます。</p>
  </div></main></div>
</template>
