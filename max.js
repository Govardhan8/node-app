// const os = require('os')

// console.log(os.hostname())

// // console.log(typeof process.argv)
// // arr = JSON.parse(process.argv[2])
// // arr.sort((a, b) => a - b)
// // console.log(arr[arr.length - 1])
// console.log('hey')
const fs = require('fs')

fs.writeFile('./awesome.txt', "let's gooo!!!", () => {
	console.log('done')
})
const quote = 'Do more,worry less'
const number = process.argv[2]

for (let i = 1; i <= number; i++) {
	fs.unlink(`./backup/text_${i}.txt`, () => {
		console.log('done')
	})
}
