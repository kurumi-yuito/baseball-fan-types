import { axes, questions, type Axis, type Pole } from '~/data/quiz'
export type Answers = Record<number, number>
export interface AxisScore { axis: Axis; left: Pole; right: Pole; leftPercent: number; winner: Pole }
export interface Result { type: string; suffix: 'C' | 'F'; scores: AxisScore[] }
export function calculate(answers: Answers): Result {
  if (questions.some(q => !Number.isInteger(answers[q.id]) || answers[q.id] < 1 || answers[q.id] > 6)) throw new Error('23問すべてに回答してください')
  const scores = axes.map(a => {
    const items = questions.filter(q => q.axis === a.id)
    const leftTotal = items.reduce((sum, q) => {
      const answer = answers[q.id]
      return sum + (q.pole === a.left ? answer : 7 - answer)
    }, 0)
    const midpoint = items.length * 3.5
    const winner = leftTotal > midpoint ? a.left : a.right
    const leftPercent = Math.round(((leftTotal - items.length) / (items.length * 5)) * 100)
    return { axis: a.id, left: a.left, right: a.right, leftPercent, winner }
  })
  return {type:scores.slice(0,4).map(s=>s.winner).join(''),suffix:scores[4].winner as 'C'|'F',scores}
}
export function encodeAnswers(answers: Answers): string { return questions.map(q=>answers[q.id]).join('') }
export function decodeAnswers(raw: unknown): Answers | null {
  if (typeof raw !== 'string' || !/^[1-6]{23}$/.test(raw)) return null
  return Object.fromEntries([...raw].map((v,i)=>[i+1,Number(v)]))
}
