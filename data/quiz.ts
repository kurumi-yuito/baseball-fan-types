
export type Axis = 'S/G' | 'M/E' | 'R/T' | 'A/P' | 'C/F'
export type Pole = 'S' | 'G' | 'M' | 'E' | 'R' | 'T' | 'A' | 'P' | 'C' | 'F'

export interface Question {
  id: number
  axis: Axis
  pole: Pole
  text: string
}

export const axes: {
  id: Axis
  left: Pole
  right: Pole
  leftLabel: string
  rightLabel: string
}[] = [
  { id: 'S/G', left: 'S', right: 'G', leftLabel: 'ソロ', rightLabel: 'グループ' },
  { id: 'M/E', left: 'M', right: 'E', leftLabel: 'マイペース', rightLabel: '熱烈応援' },
  { id: 'R/T', left: 'R', right: 'T', leftLabel: 'リスペクト', rightLabel: 'プロレス許容' },
  { id: 'A/P', left: 'A', right: 'P', leftLabel: '球場まるごと', rightLabel: '試合中心' },
  { id: 'C/F', left: 'C', right: 'F', leftLabel: '文脈重視', rightLabel: '自由柔軟' }
]

export const questions: Question[] = [
  { id: 1, axis: 'S/G', pole: 'S', text: '連番相手がいなくても特に気にならない' },
  { id: 2, axis: 'S/G', pole: 'S', text: '突発的にチケットを取って観に行くことがある' },
  { id: 3, axis: 'S/G', pole: 'S', text: '近くの席の人と意気投合して仲良くなることがある' },
  { id: 4, axis: 'S/G', pole: 'G', text: '試合を観ながらいろいろ語りたい' },
  { id: 5, axis: 'S/G', pole: 'G', text: 'ボックスシートで仲間と観るのがすき' },
  { id: 6, axis: 'M/E', pole: 'M', text: 'ホーム球場でも近くにビジターファンがいると気になる' },
  { id: 7, axis: 'M/E', pole: 'M', text: '大型ビハインドの展開になった場合は途中でも帰る' },
  { id: 8, axis: 'M/E', pole: 'E', text: '点が入ったら周りとハイタッチしたい' },
  { id: 9, axis: 'M/E', pole: 'E', text: '飲食等はイニング間や守備のタイミングで買いに行きたい' },
  { id: 10, axis: 'M/E', pole: 'E', text: '攻撃中は応援歌やチャンステーマを大声で歌う' },
  { id: 11, axis: 'R/T', pole: 'R', text: '負けても相手チームのインタビューまで見る' },
  { id: 12, axis: 'R/T', pole: 'R', text: '死球が当たってしまった際に選手がフォローに入るのは大事だ' },
  { id: 13, axis: 'R/T', pole: 'T', text: '「あと1球」コールは特に気にならない' },
  { id: 14, axis: 'R/T', pole: 'T', text: '「商魂込めて」はただのプロレスだと思う' },
  { id: 15, axis: 'R/T', pole: 'T', text: '野次も野球の華だ' },
  { id: 16, axis: 'A/P', pole: 'A', text: '売り子やチアにも推しがいる' },
  { id: 17, axis: 'A/P', pole: 'A', text: 'イニング間イベントも楽しみたい' },
  { id: 18, axis: 'A/P', pole: 'A', text: 'グルメは事前に気になるものを調べる' },
  { id: 19, axis: 'A/P', pole: 'P', text: '一球ごとに次の配球を予想してしまう' },
  { id: 20, axis: 'A/P', pole: 'P', text: '選手のグラウンド外の様子にはあまり関心がない' },
  { id: 21, axis: 'C/F', pole: 'C', text: 'ビジター観戦の際にはビジターユニフォームを着ていく' },
  { id: 22, axis: 'C/F', pole: 'C', text: '負けた日はユニフォームを脱いで帰る' },
  { id: 23, axis: 'C/F', pole: 'F', text: '移籍または引退した選手のユニフォームも着る' }
]

export interface TypeInfo {
  name: string
  tagline: string
  description: string
  habit: string
  good: string
  clash: string
}

export const types: Record<string, TypeInfo> = {
  SMRA: {
    name: '気ままな球場探訪家',
    tagline: '自分のペースで球場の魅力を発見する。',
    description: '誰かに合わせるより、自分なりの観戦スタイルを大切にするタイプ。勝敗だけでなく球場で過ごす時間にも価値を見いだし、対戦相手への敬意を重んじる傾向がある。',
    habit: '',
    good: 'GMRA',
    clash: 'SETP'
  },
  SMRP: {
    name: '静かなる観戦職人',
    tagline: '自分のペースで、野球の奥深さを味わう。',
    description: '自分のペースを守りながら、グラウンドで繰り広げられる勝負を味わうタイプ。周囲のにぎわいに流されず、プレーそのものを楽しむ姿勢と相手への敬意を併せ持つ。',
    habit: '',
    good: 'GMRP',
    clash: 'GETA'
  },
  SMTA: {
    name: '自由奔放な野球通',
    tagline: '球場の個性も因縁も、気ままに楽しむ。',
    description: '観戦の楽しみ方を自分で決めたい自由派。試合だけにとどまらない球場の魅力に関心を持ち、球団同士の因縁や応援文化の違いにも比較的寛容なタイプ。',
    habit: '',
    good: 'GMTA',
    clash: 'GERP'
  },
  SMTP: {
    name: '辛口の野球評論家',
    tagline: '勝負の機微を、自分の目で見極める。',
    description: '周囲の評価より自分の見方を大切にする、試合中心の観戦派。勝負の内容に関心が強く、球団同士の対立や挑発的な応援も野球文化として受け止めやすい。',
    habit: '',
    good: 'GMTP',
    clash: 'GERA'
  },
  SERA: {
    name: '情熱の球場愛好家',
    tagline: '一人でも、球場の楽しさを全力で。',
    description: '自分のペースを保ちながら、球場の熱気も楽しみたいタイプ。試合だけでなく球場での体験全体にも関心があり、対戦相手への敬意を大切にする。',
    habit: '',
    good: 'GERA',
    clash: 'GMTP'
  },
  SERP: {
    name: '一途な応援戦士',
    tagline: '一球一打に、まっすぐ声を届ける。',
    description: '自分なりの方法でチームを熱く応援する、試合中心の観戦派。グラウンドの勝負に強い関心を向けながら、選手や対戦相手への敬意も大切にする。',
    habit: '',
    good: 'GERP',
    clash: 'GMTA'
  },
  SETA: {
    name: '球場の自由人',
    tagline: '応援もイベントも、好きなだけ楽しむ。',
    description: '自分の好きなスタイルで観戦を満喫したいタイプ。応援の熱気と球場全体の楽しさをどちらも重視し、ライバルとの因縁や応援文化にも比較的寛容。',
    habit: '',
    good: 'GETA',
    clash: 'GMRP'
  },
  SETP: {
    name: '孤高の応援闘士',
    tagline: '一人でも、勝負の熱狂の中心へ。',
    description: '周囲に合わせず、自分なりに熱くチームを応援する勝負重視派。試合の行方に強い関心を持ち、ライバルとの対立や挑発的な応援も比較的受け入れやすい。',
    habit: '',
    good: 'GETP',
    clash: 'GMRA'
  },
  GMRA: {
    name: '球場の社交家',
    tagline: '仲間と分かち合う、球場の楽しさ。',
    description: '野球観戦を通じて人と楽しさを共有したいタイプ。試合だけでなく球場で過ごす時間全体に魅力を感じ、対戦相手への敬意も大切にする。',
    habit: '',
    good: 'SMRA',
    clash: 'SETP'
  },
  GMRP: {
    name: '理知的な観戦仲間',
    tagline: '野球の面白さを、仲間と深く語る。',
    description: '仲間と野球の面白さを共有したい、試合中心の観戦派。勝負の内容について語り合うことを好み、相手チームのプレーにも敬意を向ける傾向がある。',
    habit: '',
    good: 'SMRP',
    clash: 'SETA'
  },
  GMTA: {
    name: '陽気な野球遊覧家',
    tagline: '仲間と巡る、にぎやかな球場体験。',
    description: '仲間と球場で過ごす時間を楽しみたいタイプ。試合以外の球場の魅力にも関心があり、球団ごとの応援文化やライバル関係にも面白さを見いだしやすい。',
    habit: '',
    good: 'SMTA',
    clash: 'SERP'
  },
  GMTP: {
    name: '毒舌の野球談義家',
    tagline: '辛口トークも、仲間との観戦の醍醐味。',
    description: '仲間と試合について語り合うことを好む、勝負重視のタイプ。意見の違いも野球談議の面白さとして楽しみ、球団同士の対立や煽り合いにも比較的寛容。',
    habit: '',
    good: 'SMTP',
    clash: 'SERA'
  },
  GERA: {
    name: '球場のムードメーカー',
    tagline: '仲間と一緒に、球場をもっと楽しく。',
    description: '仲間と球場の熱気や楽しさを共有したいタイプ。応援だけでなく球場での体験全体にも関心があり、対戦相手への敬意を大切にする。',
    habit: '',
    good: 'SERA',
    clash: 'SMTP'
  },
  GERP: {
    name: '熱血応援リーダー',
    tagline: '仲間と声を合わせ、勝負の瞬間へ。',
    description: '仲間とチームを応援する一体感を重視する、試合中心の観戦派。勝負の行方に熱くなりながらも、選手や対戦相手への敬意を大切にする。',
    habit: '',
    good: 'SERP',
    clash: 'SMTA'
  },
  GETA: {
    name: 'お祭り応援団長',
    tagline: '球場の熱気も楽しさも、全部まとめて。',
    description: '仲間と球場の熱気を共有し、試合以外の楽しさも満喫したいタイプ。ライバルとの因縁や応援文化も、野球ならではの醍醐味として受け止めやすい。',
    habit: '',
    good: 'SETA',
    clash: 'SMRP'
  },
  GETP: {
    name: '闘魂の応援隊長',
    tagline: '仲間と燃える、勝負の最前線。',
    description: '仲間と熱い応援を共有したい、試合中心の観戦派。ライバルとの対決や因縁にも関心が強く、グラウンドの勝負を重視する。',
    habit: '',
    good: 'SETP',
    clash: 'SMRA'
  }
}
