# 野球民タイプ診断 — 新規再構築版

Nuxt 3 + TypeScript。23問・6段階・16基本タイプとC/F補助軸。

## 起動

```bash
npm install
npm run dev
```

## 構成

- `pages/index.vue`：トップ（メインコピー・説明・開始ボタン・非人物の幾何学装飾・基本数値）
- `pages/quiz.vue`：5問ずつ回答、進捗、戻る、6段階選択
- `pages/result/[type].vue`：タイプ解説、傾向、相性、共有
- `data/quiz.ts`：23問と16タイプの文面
- `utils/scoring.ts`：軸ごとの賛否多数決、回答強度、URL符号化
- `assets/css/site.css`：新規単一スタイルシート

## 制約・注意

- 16Personalitiesのページを参考に、ファーストビュー中心の構成と円形回答UIを実装。元サイトのHTML/CSS/イラストを複製したものではありません。
- イラストは使用せず、抽象図形のみ。
- 架空の診断実績や精度数値は掲載していません。
- 共有URLには23問の回答値が含まれます。
- タイプ判定は各設問の賛否多数決、割合は回答強度の平均なので優勢側が異なることがあります。


## 変更内容
- 結果URLに正しい23問の回答パラメータがある場合のみ「あなたの診断結果」と表示。タイプ紹介URLは「野球民タイプ紹介」と表示。
- 設問は固定の交互配置で表示。設問IDと採点、回答URLエンコード順は元のまま。
- 日本語フォントのウェイトを整理し、過度な字間・太字・立体的なボタン装飾を削減。
# baseball-fan-types
# baseball-fan-types

## フッター・お問い合わせ

- 共通フッターは `components/SiteFooter.vue`、お問い合わせは `/contact`。
- EmailJS は npb-diary と同じサービス・テンプレートを使用し、`service: baseball-fan-types` で送信元を識別します。
- 必要に応じて `NUXT_PUBLIC_EMAILJS_PUBLIC_KEY`、`NUXT_PUBLIC_EMAILJS_SERVICE_ID`、`NUXT_PUBLIC_EMAILJS_TEMPLATE_ID` で設定を上書きできます。
