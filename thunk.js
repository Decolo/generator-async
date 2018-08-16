const fs = require('fs')
const Thunk = function(fn) {
  return (...args) => {
    return callback => {
      return fn.call(this, ...args, callback)
    }
  }
}

const readFileThunk = Thunk(fs.readFile)

function* generator() {
  const r1 = yield readFileThunk('./foo.json')
  console.log(r1.toString())
  const r2 = yield readFileThunk('./bar.json')
  console.log(r2.toString())
}


// normal
// const g = generator()
// const r1 = g.next()

// r1.value((err, data) => {
//   if (err) throw err;

//   const r2 = g.next(data)

//   r2.value((err, data) => {
//     if(err) throw err
//     g.next(data)
//   })
// })

// resusive
function run(generator) {
  var g = generator()
  const next = (err, data) => {
    const result = g.next(data)
    console.log('callback' + data)
    if (result.done) return
    result.value(next)
  }

  next()
}

run(generator)

