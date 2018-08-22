const co = require('co');
const fs = require('fs');
const iconv = require('iconv-lite');

const stream = fs.createReadStream('./test.txt');


let data = []
let size = 0
stream.once('data', chunk => {
  data.push(chunk)
  size += chunk.length
})
   
stream.once('end', () => {
  const buf = Buffer.concat(data, size)
  const str = iconv.decode(buf, 'utf8')
  console.log(str)
})