const presetEnv = require('@babel/preset-env');
const presetReact = require('@babel/preset-react');
const styledComponentsPlugin = require('babel-plugin-styled-components');
const runtimePlugin = require('@babel/plugin-transform-runtime');
const exportDefaultPlugin = require('@babel/plugin-proposal-export-default-from');
const logicalPlugin = require('@babel/plugin-proposal-logical-assignment-operators');
const optionalChainingPlugin = require('@babel/plugin-proposal-optional-chaining');
const pipelineOperatorPlugin = require('@babel/plugin-proposal-pipeline-operator');
const coalescingOperatorPlugin = require('@babel/plugin-proposal-nullish-coalescing-operator');
const proposalDoExpressionsPlugin = require('@babel/plugin-proposal-do-expressions');
const proposalDecoratorsPlugin = require('@babel/plugin-proposal-decorators');
const proposalFunctionSent = require('@babel/plugin-proposal-function-sent');
const proposalExportNamespaceFrom = require('@babel/plugin-proposal-export-namespace-from');
const proposalNumericSeparator = require('@babel/plugin-proposal-numeric-separator');
const proposalThrowExpressions = require('@babel/plugin-proposal-throw-expressions');
const syntaxDynamicImport = require('@babel/plugin-syntax-dynamic-import');
const syntaxImportMeta = require('@babel/plugin-syntax-import-meta');
const proposalClassProperties = require('@babel/plugin-proposal-class-properties');
const proposalJsonStrings = require('@babel/plugin-proposal-json-strings');
const removePropTypes = require('babel-plugin-transform-react-remove-prop-types');
const {pkgPath, isProduction} = require('./utils');

const pkg = require(pkgPath);

const isStyleComponent = (pkg.dependencies && pkg.dependencies['styled-components'])
  || (pkg.devDependencies && pkg.devDependencies['styled-components']);

const createBabelPresets = (api, opts = {}) => {
  const presetEnvConfig = {
    ...opts['preset-env'],
    modules: false,
    useBuiltIns: false,
    ignoreBrowserslistConfig: true,
    exclude: ['transform-typeof-symbol']
  };
  const presetReactConfig = {
    ...opts['preset-react'],
    useBuiltIns: true
  };
  const runtimePluginConfig = {
    ...opts['transform-runtime'],
    useESModules: true
  };

  return {
    presets: [
      [
        presetEnv,
        presetEnvConfig
      ],
      [
        presetReact,
        presetReactConfig
      ]
    ],
    plugins: [
      isStyleComponent && [
        styledComponentsPlugin,
        {
          pure: true
        }
      ],
      [
        runtimePlugin,
        runtimePluginConfig
      ],
      exportDefaultPlugin,
      logicalPlugin,
      optionalChainingPlugin,
      [
        pipelineOperatorPlugin,
        {
          proposal: 'minimal'
        }
      ],
      coalescingOperatorPlugin,
      proposalDoExpressionsPlugin,
      [
        proposalDecoratorsPlugin,
        {
          legacy: true
        }
      ],
      proposalFunctionSent,
      proposalExportNamespaceFrom,
      proposalNumericSeparator,
      proposalThrowExpressions,
      syntaxDynamicImport,
      syntaxImportMeta,
      [
        proposalClassProperties,
        {
          loose: true
        }
      ],
      proposalJsonStrings,
      isProduction && [
        removePropTypes,
        {
          removeImport: true
        }
      ]
    ].filter(Boolean)
  }
};

module.exports = createBabelPresets;
