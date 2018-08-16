var co = require('co')
var fs = require('fs')

var readFile = function(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (error, data) => {
      if (error) return reject(error)
      setTimeout(() => {
        resolve(data)
      }, 1000)
    })
  })
}


var gen = function* () {
  var f1 = yield readFile('./foo.json')
  var f2 = yield readFile('./bar.json')
  console.log(f1.toString())
  console.log(f2.toString())
}

co(gen).then(() => {
  console.log('generator 执行完成')
})