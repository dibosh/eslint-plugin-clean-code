const { isReactComponentType, validateVerbPrefix } = require('../utils/function');

function checkRule(context, node, fnName, fnBody) {
  if (!isReactComponentType(fnBody)) {
    const { isVerb, prefix } = validateVerbPrefix(fnName);

    if (!isVerb) {
      context.report({
        node,
        message: `Function or method name must begin with a verb but "${prefix}" is not.`,
      });
    }
  }
}

const name = 'no-func-name-without-verb';

const create = function (context) {
  /**
   * Different AST structures can be checked at https://astexplorer.net/
   */
  return {
    MethodDefinition(node) {
      if (node.kind === 'method') {
        checkRule(context, node, node.key.name, node.value.body.body);
      }
    },
    FunctionDeclaration(node) {
      if (node.type === 'FunctionDeclaration') {
        checkRule(context, node, node.id.name, node.body.body);
      }
    },
    VariableDeclarator(node) {
      if (node.init && ['FunctionExpression', 'ArrowFunctionExpression'].includes(node.init.type)) {
        checkRule(context, node, node.id.name, node.init.body.body);
      }
    },
    PropertyDefinition(node) {
      if (['FunctionExpression', 'ArrowFunctionExpression'].includes(node.value.type)) {
        checkRule(context, node, node.key.name, node.value.body.body);
      }
    },
  };
};

module.exports = {
  name,
  create,
};
