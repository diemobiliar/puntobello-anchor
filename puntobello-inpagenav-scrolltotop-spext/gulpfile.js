'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);


const webpack = require("webpack");
const getClientEnvironment = require("./process-env");

build.configureWebpack.mergeConfig({
    additionalConfiguration: cfg => {
        let pluginDefine = null;
        for (var i = 0; i < cfg.plugins.length; i++) {
            var plugin = cfg.plugins[i];
            if (plugin.constructor.name === webpack.DefinePlugin.name) {
                pluginDefine = plugin;
            }
        }

        const currentEnv = getClientEnvironment().stringified;

        if (pluginDefine) {
            pluginDefine.definitions = { ...pluginDefine.definitions, ...currentEnv };
        } else {
            cfg.plugins.push(new webpack.DefinePlugin(currentEnv));
        }

        return cfg;
    }
});

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

build.initialize(require('gulp'));