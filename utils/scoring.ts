import { axes, questions, type Axis, type Pole } from '~/data/quiz'
export type Answers = Record<number, number>
export interface AxisScore { axis: Axis; left: Pole; right: Pole; leftVotes: number; rightVotes: number; leftPercent: number; winner: Pole }
export interface Result { type: string; suffix: 'C' | 'F'; scores: AxisScore[] }
export function calculate(answers: Answers): Result {
  if (questions.some(q => !Number.isInteger(answers[q.id]) || answers[q.id] < 1 || answers[q.id] > 6)) throw new Error('23問すべてに回答してください')
  const scores = axes.map(a => {
    const items = questions.filter(q => q.axis === a.id)
    let leftVotes = 0, leftStrength = 0
    for (const q of items) {
      const answer = answers[q.id]
      const leftOriented = q.pole === a.left ? answer : 7 - answer
      if (leftOriented >= 4) leftVotes++
      leftStrength += leftOriented - 1
    }
    const rightVotes = items.length - leftVotes
    return {axis:a.id,left:a.left,right:a.right,leftVotes,rightVotes,leftPercent:Math.round(leftStrength / (items.length * 5) * 100),winner:leftVotes > rightVotes ? a.left : a.right}
  })
  return {type:scores.slice(0,4).map(s=>s.winner).join(''),suffix:scores[4].winner as 'C'|'F',scores}
}
export function encodeAnswers(answers: Answers): string { return questions.map(q=>answers[q.id]).join('') }
export function decodeAnswers(raw: unknown): Answers | null {
  if (typeof raw !== 'string' || !/^[1-6]{23}$/.test(raw)) return null
  return Object.fromEntries([...raw].map((v,i)=>[i+1,Number(v)]))
}
