import assert from 'node:assert/strict'
import { test } from 'node:test'
import { axes, questions, types } from '../data/quiz'
import { calculate, decodeAnswers, encodeAnswers, type Answers } from '../utils/scoring'

const filled = (value: number): Answers => Object.fromEntries(questions.map(q => [q.id, value]))

for (const [index, axis] of axes.entries()) {
  test(`${axis.id}: exhaustive oriented scores, winners, percentages and URL round trips`, () => {
    const items = questions.filter(q => q.axis === axis.id)
    assert.equal(items.length, index === 4 ? 3 : 5)
    const answers = filled(4)
    for (let pattern = 0; pattern < 6 ** items.length; pattern++) {
      let digits = pattern
      let centeredTotal = 0
      for (const q of items) {
        const answer = digits % 6 + 1
        digits = Math.floor(digits / 6)
        answers[q.id] = answer
        centeredTotal += (q.pole === axis.left ? 1 : -1) * (2 * answer - 7)
      }
      assert.notEqual(centeredTotal, 0)
      const expectedWinner = centeredTotal > 0 ? axis.left : axis.right
      const expectedPercent = Math.round(50 + centeredTotal * 10 / items.length)
      const result = calculate(answers)
      const score = result.scores[index]
      assert.equal(score.winner, expectedWinner)
      assert.equal(score.leftPercent, expectedPercent)
      assert.equal(score.leftPercent > 50, score.winner === axis.left)
      assert.equal(index < 4 ? result.type[index] : result.suffix, expectedWinner)
      assert.ok(Object.hasOwn(types, result.type))
      const url = new URL(`/result/${result.type}?a=${encodeAnswers(answers)}`, 'https://example.com')
      const decoded = decodeAnswers(url.searchParams.get('a'))
      assert.deepEqual(decoded, answers)
      assert.equal(url.pathname, `/result/${calculate(decoded!).type}`)
    }
  })
}

test('all 16 types and both suffixes are reachable with oriented extremes', () => {
  for (const type of Object.keys(types)) {
    for (const suffix of ['C', 'F']) {
      const poles = type + suffix
      const answers = Object.fromEntries(questions.map(q => {
        const index = axes.findIndex(a => a.id === q.axis)
        return [q.id, q.pole === poles[index] ? 6 : 1]
      }))
      const result = calculate(answers)
      assert.equal(result.type, type)
      assert.equal(result.suffix, suffix)
      assert.deepEqual(result.scores.map(s => s.leftPercent), axes.map((a, i) => poles[i] === a.left ? 100 : 0))
    }
  }
})

test('uniform answers 1, 6, 3, 4 have the expected type, suffix and percentages', () => {
  const cases = [
    [1, 'GMRP', 'F', [40, 60, 60, 40, 33]],
    [6, 'SETA', 'C', [60, 40, 40, 60, 67]],
    [3, 'GMRP', 'F', [48, 52, 52, 48, 47]],
    [4, 'SETA', 'C', [52, 48, 48, 52, 53]]
  ] as const
  for (const [value, type, suffix, percentages] of cases) {
    const result = calculate(filled(value))
    assert.equal(result.type, type)
    assert.equal(result.suffix, suffix)
    assert.deepEqual(result.scores.map(s => s.leftPercent), percentages)
  }
})

test('reported reversals use response strength for both type and tendency', () => {
  for (const [index, values, percent, winner] of [
    [2, [4, 4, 2, 6, 6], 40, 'T'],
    [0, [6, 4, 3, 4, 4], 56, 'S']
  ] as const) {
    const answers = filled(4)
    questions.filter(q => q.axis === axes[index].id).forEach((q, i) => { answers[q.id] = values[i] })
    const result = calculate(answers)
    assert.equal(result.scores[index].winner, winner)
    assert.equal(result.scores[index].leftPercent, percent)
    assert.equal(result.type[index], winner)
  }
})

test('answer encoding remains 23 digits in question ID order; invalid answers are rejected', () => {
  const answers = Object.fromEntries(questions.map((q, i) => [q.id, i % 6 + 1]))
  assert.equal(encodeAnswers(answers), '12345612345612345612345')
  assert.deepEqual(decodeAnswers(encodeAnswers(answers)), answers)
  for (const raw of [null, undefined, [], '1'.repeat(22), '1'.repeat(24), '0'.repeat(23), '7'.repeat(23)]) {
    assert.equal(decodeAnswers(raw), null)
  }
  for (const value of [undefined, 0, 7, 3.5, NaN]) {
    assert.throws(() => calculate({ ...filled(4), 1: value } as Answers))
  }
})
