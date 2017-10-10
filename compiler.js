const tokenizer = require('./compiler/tokenizer')
const parser = require('./compiler/decentparser')
const transformer = require('./compiler/transformer')
const codeGenerator = require('./compiler/codeGenerator')

function compiler (input) {
  var tokens = tokenizer(input)
  var ast = parser(tokens)
  var newAst = transformer(ast)
  var output = codeGenerator(newAst)
  return output
}

module.exports = {
  tokenizer: tokenizer,
  parser: parser,
  transformer: transformer,
  codeGenerator: codeGenerator,
  compiler: compiler
}
