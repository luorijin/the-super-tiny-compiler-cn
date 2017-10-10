var superTinyCompiler = require('./compiler')

// #lang racket
// (define (add a b) (+ a b))
// (define (subtract a b) (- a b))
// (add 2 (subtract 4 2))


// const add = (a, b) => a + b
// const subtract = (a, b) => a - b
// add(2, subtract(4, 2))


var input = `
  (add 2 (subtract 4 2))
  (subtract 2 (subtract 55 555))
`


console.log(superTinyCompiler.compiler(input))
