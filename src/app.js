const DateFormat = require('./date-format')
const moment = require('moment')
function getMonthsRegex() {
  let months = ''

  let i = 0
  DateFormat.forEach(item => {
    i += 1
    months = months + item.key.join(`\\s|`) + '\\s|'
  })

  // replace | in the last character
  months = months.replace(/.$/, '')
  // replace /
  months = months.replace(/.$/, '')
  // replace s
  months = months.replace(/.$/, '')

  // console.log(months)
  return months
}

function extractTanggal(text){
  const monthsRegex = getMonthsRegex()

  // REGEX:
  // 12 jan 2018: [0-9]{1,2}.(des|jan|feb).[2][0][0-9]{2}
  // Dapet wordnya, hilangin spasi, replace bulan nnya -1-, format pake moment
  // 12 jan '18: [0-9]{1,2}.(des|jan|feb).['][0-9]{2}
  // dapet wordnya, replace bulannya jadi -1-20
  // 12 jan: [[1-9]{1,2}.(des|jan|feb)
  // dapet wordnya, replace bulannya jadi -1-, tambahin tahun selanjutnya

  let wordDate = undefined
  try {
    wordDate = text.match(new RegExp(`[0-9]{1,2}.(${monthsRegex})[2][0][0-9]{2}`))[0]
    wordOriginal = wordDate
  } catch (error) {
    wordDate = undefined
  }

  if (wordDate === undefined) {
    try {
      wordDate = text.match(new RegExp(`[0-9]{1,2}.(${monthsRegex})['][0-9]{2}`))[0]
      wordOriginal = wordDate
    } catch (error) {
      wordDate = undefined
    }
  }


  if (wordDate === undefined) {
    try {
      wordDate = text.match(new RegExp(`[0-9]{1,2}.(${monthsRegex})`))[0]
      wordOriginal = wordDate
    } catch (error) {
      wordDate = undefined
    }
  }

  if (wordDate !== undefined) {
    // console.log(`xxx` + wordDate)

    wordDate = wordDate.split(' ')

    let replace = undefined
    for (let i in wordDate) {
      for (let j in DateFormat) {
        if (DateFormat[j].key.includes(wordDate[i])) {
          replace = {
            word: wordDate[i],
            replaceWith: DateFormat[j].replaceWith
          }
          break;
        }
        if (replace != undefined) break;
      }
    }

    wordDate = wordDate.join('')
    wordDate = wordDate.replace(replace.word, replace.replaceWith)
    wordDate = wordDate.replace(`'`, '20')

    wordDate = wordDate.split('-').reverse().join('-')
    // console.log('ori:', wordDate)
    wordDate = moment(new Date(wordDate)).format('YYYY-MM-DD')
    // console.log('format', wordDate);
  } else {
    wordDate = moment().format('YYYY-MM-DD')
    wordOriginal = ''
  }

  return {
    DateWord: wordOriginal,
    DateExtracted: wordDate
  }
}



module.exports = extractTanggal