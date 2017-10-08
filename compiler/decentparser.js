/**
 * ============================================================================
 *                                 ヽ/❀o ل͜ o\ﾉ
 *                             语法分析器（Parser）!!!
 * ============================================================================
 */

/**
 *  语法分析器接受 token 数组，然后把它转化为 AST
 *
 *   [{ type: 'paren', value: '(' }, ...]   =>   { type: 'Program', body: [...] }
 */

// 现在我们定义 parser 函数，接受 `tokens` 数组
function parser (tokens) {

  var current = 0

  function walkProgram () {
    var ast = {
      type: 'Program',
      body: []
    }
    while (current < tokens.length) {
      ast.body.push(walkCallExpression())
    }
    return ast
  }

  function walkCallExpression () {
    var token = tokens[current]
    var node = {
      type: 'CallExpression',
      name: '',
      params: []
    }

    if (token.type === 'paren' && token.value === '(') {
      // 跳过左括号
      current++
      // 运算符
      node.name = walkOP()
      // 参数一
      node.params.push(walkParam())
      // 参数二
      node.params.push(walkParam())
      // 跳过右括号
      current++

      return node
    }

    throw new TypeError(token.type)
  }

  function walkOP () {
    var token = tokens[current]
    if (token.type === 'name') {
      current++
      return token.value
    }
    throw new TypeError(token.type)
  }

  function walkParam () {
    var token = tokens[current]
    // 检查是不是 `number` 类型
    if (token.type === 'number') {
      // 如果是，`current` 自增。
      return walkNumber()
    }

    if (token.type === 'paren' && token.value === '(') {
      return walkCallExpression()
    }

    throw new TypeError(token.type)
  }

  function walkNumber () {
    var token = tokens[current]
    current++
    return {
      type: 'NumberLiteral',
      value: token.value
    }
  }

  // 最后我们的语法分析器返回 AST
  return walkProgram()
}

module.exports = parser
