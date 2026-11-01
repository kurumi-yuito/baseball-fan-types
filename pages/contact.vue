<script setup lang="ts">
import emailjs from '@emailjs/browser'

useSeoMeta({
  title: 'お問い合わせ | 野球民タイプ診断',
  description: '野球民タイプ診断へのご意見・不具合報告・お問い合わせはこちら。',
  ogTitle: 'お問い合わせ | 野球民タイプ診断',
  ogDescription: '野球民タイプ診断へのご意見・不具合報告をお送りください。'
})
const config = useRuntimeConfig()
const category = ref('')
const message = ref('')
const email = ref('')
const sending = ref(false)
const done = ref(false)
const error = ref('')
const categories = ['不具合・バグ', '機能の要望', '使い方・質問', 'その他']

async function submit() {
  if (sending.value) return
  error.value = ''
  if (!categories.includes(category.value) || !message.value.trim()) {
    error.value = '種別とお問い合わせ内容を入力してください。'
    return
  }
  sending.value = true
  try {
    await emailjs.send(
      config.public.emailjsServiceId,
      config.public.emailjsTemplateId,
      {
        service: 'baseball-fan-types',
        category: category.value,
        message: message.value.trim(),
        email: email.value.trim() || '未記入'
      },
      { publicKey: config.public.emailjsPublicKey }
    )
    done.value = true
  } catch {
    error.value = '送信に失敗しました。しばらく時間をおいて再度お試しください。'
  } finally {
    sending.value = false
  }
}
function resetForm() {
  category.value = ''
  message.value = ''
  email.value = ''
  error.value = ''
  done.value = false
}
</script>

<template>
  <div class="site">
    <header class="header"><NuxtLink class="brand" to="/">野球民タイプ診断</NuxtLink><NuxtLink class="header-link" to="/quiz">診断する</NuxtLink></header>
    <main class="contact-main">
      <div class="contact-heading">
        <h1>お問い合わせ</h1>
        <p>ご意見・ご要望、不具合の報告などをお送りください。<br>返信をご希望の場合は、メールアドレスをご記入ください。</p>
      </div>
      <section v-if="done" class="contact-success" role="status">
        <h2>送信しました</h2>
        <p>お問い合わせありがとうございます。</p>
        <button class="outline-button" type="button" @click="resetForm">別の内容を送る</button>
      </section>
      <form v-else class="contact-form" :aria-busy="sending" @submit.prevent="submit">
        <fieldset :disabled="sending">
          <div class="contact-field">
            <label for="contact-category">種別 <span>必須</span></label>
            <select id="contact-category" v-model="category" required>
              <option disabled value="">選択してください</option>
              <option v-for="item in categories" :key="item" :value="item">{{ item }}</option>
            </select>
          </div>
          <div class="contact-field">
            <label for="contact-message">お問い合わせ内容 <span>必須</span></label>
            <textarea id="contact-message" v-model="message" rows="8" maxlength="8000" required placeholder="できるだけ具体的にご記入ください" />
          </div>
          <div class="contact-field">
            <label for="contact-email">返信用メールアドレス <span>任意</span></label>
            <input id="contact-email" v-model="email" type="email" autocomplete="email" maxlength="254" placeholder="example@example.com">
          </div>
          <p class="note">入力内容は、お問い合わせ対応のために利用し、EmailJSを通じて送信されます。</p>
          <p v-if="error" class="error" role="alert">{{ error }}</p>
          <button class="start-button" type="submit" :disabled="sending">{{ sending ? '送信中…' : '送信する' }} <span aria-hidden="true">→</span></button>
        </fieldset>
      </form>
      <NuxtLink class="contact-home" to="/">← トップページへ戻る</NuxtLink>
    </main>
  </div>
</template>
