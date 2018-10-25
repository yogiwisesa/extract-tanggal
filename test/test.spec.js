import test from 'ava';
import extractYu from '../src/app'


test('return extracted date and original word, given English string', t => {
	const text = "tomorrow is 20 october '18"
	const expect = {
		DateWord: "20 october '18",
    DateExtracted: '2018-10-20'
	}
	const result = extractYu(text)

	t.deepEqual(result, expect)
})

test('return extracted date and original word, given English string with month in short', t => {
	const text = 'tomorrow is 20 oct 2018'
	const expect = {
		DateWord: '20 oct 2018',
    DateExtracted: '2018-10-20'
	}
	const result = extractYu(text)

	t.deepEqual(result, expect)
})

test('return extracted date and original word, given Indonesian string', t => {
	const text = '20 oktober 2018 itu kemarin'
	const expect = {
		DateWord: '20 oktober 2018',
    DateExtracted: '2018-10-20'
	}
	const result = extractYu(text)

	t.deepEqual(result, expect)
})

test('return extracted date and original word, given Indonesian string with month in short', t => {
	const text = 'besok 20 agu 2018'
	const expect = {
		DateWord: '20 agu 2018',
    DateExtracted: '2018-08-20'
	}
	const result = extractYu(text)

	t.deepEqual(result, expect)
})

test('return extracted date and original word, given Indonesian string with year in short', t => {
	const text = "20 mei '18 adalah hari yang menyenangkan"
	const expect = {
		DateWord: "20 mei '18",
    DateExtracted: '2018-05-20'
	}
	const result = extractYu(text)

	t.deepEqual(result, expect)
})