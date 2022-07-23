const { functionNameRule } = require('./rules');

const eslintRuleDefinitions = {
  rules: {
    [functionNameRule.name]: {
      create: functionNameRule.create,
    },
  },
};

module.exports = eslintRuleDefinitions;
