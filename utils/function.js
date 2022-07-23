const { programming: verbs } = require('verb-corpus');

const whitelist = [
  'did',
  'on',
  'off',
  'next',
  'noop',
  'is',
  'are',

  'should',
  'has',
  'can',
  'could',
  'may',
  'will',
  'would',
  'shall',
  'might',
  'must',

  'to',
  'from',
  'over',

  'error',
  'info',

  // abbreviation
  'gen',
  'init',
  'gte',
  'lte',
  'eq',
];

const blacklist = ['file', 'string'];

/**
 * Checks if a function prefix is verb and returns the prefix as well.
 *
 * Implementation from - https://github.com/legend80s/eslint-plugin-function-name/blob/master/lib/utils/startsWithVerb.js
 *
 * @param {*} fnName
 * @param {*} extraWhitelist
 * @param {*} extraBlacklist
 * @returns
 */
const validateVerbPrefix = (fnName, extraWhitelist, extraBlacklist) => {
  const prefix = fnName.split(/[A-Z]/)[0].trim();

  if (prefix === '') {
    return {
      isVerb: true,
      prefix,
    };
  }

  const blocklist = blacklist.concat(extraBlacklist);

  return {
    isVerb: verbs
      .concat(whitelist, extraWhitelist)
      .filter((verb) => !blocklist.includes(verb))
      .includes(prefix),
    prefix,
  };
};

const isReactComponentType = (fnBody) => {
  const returnStatement = fnBody.filter((item) => item.type === 'ReturnStatement');
  if (!returnStatement.length) {
    return false;
  }

  return returnStatement[0].argument.type === 'JSXElement';
};

module.exports = {
  isReactComponentType,
  validateVerbPrefix,
};
