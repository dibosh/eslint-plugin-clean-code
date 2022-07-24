const { isReactComponentType, validateVerbPrefix } = require('../utils/function');

function checkRule(context, node, fnName, fnBody) {
  if (!isReactComponentType(fnBody)) {
    const { whitelist = [], blacklist = [] } = context.options[0] || {};
    const { isVerb, prefix } = validateVerbPrefix(fnName, whitelist, blacklist);

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
        checkRule(context, node, node.key.name, node.value.body);
      }
    },
    FunctionDeclaration(node) {
      if (node.type === 'FunctionDeclaration') {
        checkRule(context, node, node.id.name, node.body);
      }
    },
    VariableDeclarator(node) {
      if (node.init && ['FunctionExpression', 'ArrowFunctionExpression'].includes(node.init.type)) {
        checkRule(context, node, node.id.name, node.init.body);
      }
    },
    PropertyDefinition(node) {
      if (node.value && node.value.type && ['FunctionExpression', 'ArrowFunctionExpression'].includes(node.value.type)) {
        checkRule(context, node, node.key.name, node.value.body);
      }
    },
  };
};

module.exports = {
  name,
  create,
};
