import { describe, it, expect } from 'vitest'
import justify from '../../src/modules/services/justify/justify'

describe('justify()', () => {

	it('returns empty string for empty input', () => {
		expect(justify('')).toBe('')
	})

	it('does not justify a single short line', () => {
		const input = 'Hello world'
		const output = justify(input)

		expect(output).toBe('Hello world\n')
	})

	it('justifies a paragraph to 80 characters', () => {
		const input = 'This is a simple test to verify that the justification works properly.'
		const output = justify(input)

		const lines = output.trim().split('\n')
		for (const line of lines.slice(0, -1)) {
			expect(line.length).toBe(80)
		}
	})

	it('does not justify the last line of a paragraph', () => {
		const input = 'Word '.repeat(20)
		const output = justify(input)
		const lines = output.trim().split('\n')

		const lastLine = lines[lines.length - 1]
		expect(lastLine.length).toBeLessThanOrEqual(80)
	})

	it('splits words longer than LINE_LIMIT', () => {
		const longWord = 'a'.repeat(200)
		const output = justify(longWord)

		const lines = output.trim().split('\n')
		expect(lines[0].length).toBe(80)
		expect(lines[1].length).toBe(80)
		expect(lines[2].length).toBe(40)
	})

	it('handles multiple paragraphs', () => {
		const input = 'Hello world\n\nThis is another paragraph'
		const output = justify(input)

		const paragraphs = output.split('\n\n')
		expect(paragraphs.length).toBe(1)
		
		
		expect(output).toContain('Hello')
		expect(output).toContain('paragraph')
	})

})
