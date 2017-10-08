/**
 * ============================================================================
 *                               ヾ（〃＾∇＾）ﾉ♪
 *                                代码生成器!!!!
 * ============================================================================
 */

/**
 * 现在只剩最后一步啦：代码生成器。
 *
 * 我们的代码生成器会递归地调用它自己，把 AST 中的每个结点打印到一个很大的字符串中。
 */

function codeGenerator (node) {
  // 对于不同 `type` 的结点分开处理。
  switch (node.type) {
    // 如果是 `Program` 结点，那么我们会遍历它的 `body` 属性中的每一个结点，并且递归地
    // 对这些结点再次调用 codeGenerator，再把结果打印进入新的一行中。
    case 'Program':
      return node.body.map(codeGenerator).join('\n')
    // 对于 `ExpressionStatements`,我们对它的 expression 属性递归调用，同时加入一个
    // 分号。
    case 'ExpressionStatement':
      return (
        codeGenerator(node.expression) + ';' // << (...因为我们喜欢用*正确*的方式写代码)
      )
    // 对于 `CallExpressions`，我们会打印出 `callee`，接着是一个左圆括号，然后对
    // arguments 递归调用 codeGenerator，并且在它们之间加一个逗号，最后加上右圆括号。
    case 'CallExpression':
      return (
        codeGenerator(node.callee) +
        '(' +
        node.arguments.map(codeGenerator).join(', ') +
        ')'
      )
    // 对于 `Identifiers` 我们只是返回 `node` 的 name。
    case 'Identifier':
      return node.name
    // 对于 `NumberLiterals` 我们只是返回 `node` 的 value
    case 'NumberLiteral':
      return node.value
    // 如果我们不能识别这个结点，那么抛出一个错误。
    default:
      throw new TypeError(node.type)
  }
}

module.exports = codeGenerator
