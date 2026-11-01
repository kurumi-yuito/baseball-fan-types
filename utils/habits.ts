
import type { Answers } from '~/utils/scoring'

interface HabitRule {
  id: string
  conditions: Array<{
    questionId: number
    direction: 'agree' | 'disagree'
  }>
  text: string
}

const rules: HabitRule[] = [
  {
    id: 'spontaneous-food',
    conditions: [
      { questionId: 1, direction: 'agree' },
      { questionId: 2, direction: 'agree' },
      { questionId: 18, direction: 'agree' }
    ],
    text: '突然思い立ってチケットを取ったはずなのに、球場に着く頃には食べたいグルメまで決まっている。'
  },
  {
    id: 'solo-social',
    conditions: [
      { questionId: 1, direction: 'agree' },
      { questionId: 3, direction: 'agree' },
      { questionId: 4, direction: 'agree' }
    ],
    text: '一人で来たはずなのに、試合が終わる頃には隣の席の人と今日の采配を語り合っている。'
  },
  {
    id: 'solo-no-touch',
    conditions: [
      { questionId: 1, direction: 'agree' },
      { questionId: 8, direction: 'disagree' },
      { questionId: 10, direction: 'agree' }
    ],
    text: '応援歌は全力で歌うけど、得点後のハイタッチとなると急に自分の世界に戻る。'
  },
  {
    id: 'touch-and-talk',
    conditions: [
      { questionId: 4, direction: 'agree' },
      { questionId: 8, direction: 'agree' },
      { questionId: 10, direction: 'agree' }
    ],
    text: '得点した瞬間は周囲とハイタッチ。その直後には、さっきの打席について語り始めている。'
  },
  {
    id: 'sing-until-end',
    conditions: [
      { questionId: 7, direction: 'disagree' },
      { questionId: 9, direction: 'agree' },
      { questionId: 10, direction: 'agree' }
    ],
    text: '大差で負けていても応援は続行。売店へ行くタイミングだけは最後まで慎重に考えている。'
  },
  {
    id: 'early-exit',
    conditions: [
      { questionId: 7, direction: 'agree' },
      { questionId: 18, direction: 'agree' }
    ],
    text: '球場グルメはしっかり予習してきたのに、試合展開によっては予定より早く球場をあとにする。'
  },
  {
    id: 'food-and-events',
    conditions: [
      { questionId: 16, direction: 'agree' },
      { questionId: 17, direction: 'agree' },
      { questionId: 18, direction: 'agree' }
    ],
    text: '試合の日はグルメの下調べに推しの出演確認まで。球場に着く前から予定がいっぱい。'
  },
  {
    id: 'food-and-pitch',
    conditions: [
      { questionId: 18, direction: 'agree' },
      { questionId: 19, direction: 'agree' },
      { questionId: 9, direction: 'agree' }
    ],
    text: '食べたい球場グルメは決まっている。でも配球を追っているうちに、買いに行くタイミングを逃しがち。'
  },
  {
    id: 'game-and-talk',
    conditions: [
      { questionId: 4, direction: 'agree' },
      { questionId: 19, direction: 'agree' },
      { questionId: 20, direction: 'agree' }
    ],
    text: '観戦仲間との話題は、選手の私生活よりも次の配球や今日の采配で尽きない。'
  },
  {
    id: 'rival-respect',
    conditions: [
      { questionId: 11, direction: 'agree' },
      { questionId: 14, direction: 'agree' },
      { questionId: 15, direction: 'agree' }
    ],
    text: '球場の煽りや野次も含めて楽しむけど、負けたら相手のヒーローインタビューまで見届ける。'
  },
  {
    id: 'rival-sensitive',
    conditions: [
      { questionId: 6, direction: 'agree' },
      { questionId: 13, direction: 'disagree' },
      { questionId: 15, direction: 'disagree' }
    ],
    text: 'ホーム球場でビジターの歓声が気になっていたところに「あと1球」コール。試合以外の音まで気になってしまう。'
  },
  {
    id: 'uniform-freedom',
    conditions: [
      { questionId: 21, direction: 'disagree' },
      { questionId: 22, direction: 'disagree' },
      { questionId: 23, direction: 'agree' }
    ],
    text: 'ビジターでも負け試合の帰りでも、好きな選手のユニフォームは好きなように着ていたい。'
  },
  {
    id: 'uniform-context',
    conditions: [
      { questionId: 21, direction: 'agree' },
      { questionId: 22, direction: 'agree' }
    ],
    text: 'ビジター観戦ではユニフォームをきっちり選ぶのに、負けた帰り道ではさっさと脱いでいる。'
  },
  {
    id: 'talk-and-food',
    conditions: [
      { questionId: 4, direction: 'agree' },
      { questionId: 5, direction: 'agree' },
      { questionId: 18, direction: 'agree' }
    ],
    text: '仲間との観戦予定が決まると、試合の話をする前から座席や球場グルメの話で盛り上がる。'
  },
  {
    id: 'event-vs-game',
    conditions: [
      { questionId: 17, direction: 'agree' },
      { questionId: 19, direction: 'agree' }
    ],
    text: 'イニング間イベントも楽しみたいのに、次の回の配球まで気になって休む暇がない。'
  },
  {
    id: 'solo-and-pitch',
    conditions: [
      { questionId: 1, direction: 'agree' },
      { questionId: 19, direction: 'agree' }
    ],
    text: '一人観戦でも退屈とは無縁。次の一球を予想しているだけで、いつの間にか試合が進んでいる。'
  }
]

function matches(
  answer: number | undefined,
  direction: 'agree' | 'disagree',
  strict: boolean
): boolean {
  if (!Number.isInteger(answer) || answer === undefined) {
    return false
  }

  if (strict) {
    return direction === 'agree' ? answer >= 5 : answer <= 2
  }

  return direction === 'agree' ? answer >= 4 : answer <= 3
}

export function selectHabit(answers: Answers): string {
  // 強い賛否が一致する複合条件を優先。
  for (const rule of rules) {
    if (rule.conditions.every(condition =>
      matches(
        answers[condition.questionId],
        condition.direction,
        true
      )
    )) {
      return rule.text
    }
  }

  // 該当しなければ、通常の賛否でも複合条件を探す。
  for (const rule of rules) {
    if (rule.conditions.every(condition =>
      matches(
        answers[condition.questionId],
        condition.direction,
        false
      )
    )) {
      return rule.text
    }
  }

  // 最終候補も設問1と17の組み合わせで選択。
  const solo = matches(answers[1], 'agree', false)
  const events = matches(answers[17], 'agree', false)

  if (solo && events) {
    return '連番相手が見つからなくても観戦計画は止まらない。イニング間の楽しみまで含めて、自分の予定を組み立てる。'
  }

  if (solo && !events) {
    return '一人で行くかどうかはチケット購入の障害にならない。球場ではイニング間イベントより、自分なりの過ごし方を優先する。'
  }

  if (!solo && events) {
    return '一緒に行く人の予定を気にしつつ、球場に着けばイニング間イベントも楽しみたい。'
  }

  return '観戦相手との予定も気になるし、イニング間イベントは必須ではない。試合の日は自分たちなりの楽しみ方で過ごしたい。'
}
