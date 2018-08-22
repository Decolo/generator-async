const co = require('co')
const fs = require('fs')

const readFile = function (fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (error, data) => {
      if (error) {
        return reject(error)
      }       
      resolve(data)
    })
  })
}

const gen = function* () {
  const f1 = yield readFile('./foo.json')
  console.log(f1.toString())
  const f2 = yield readFile('./bar.json')
  console.log(f2.toString())
}

// var g = gen()
// g.next().value.then(result => {
//   g.next(result).value.then(_result => {
//     g.next(_result)
//   })
// })

const autoRun = (generator) => {
  const g = generator()
  const next = data => {
    const result = g.next(data) 
    if (result.done) {
      return
    }
    result.value.then((_data) => {
      next(_data)
    })
  }

  next()
}
autoRun(gen)




// co(gen).then(() => {
//   console.log('generator 执行完成')
// })