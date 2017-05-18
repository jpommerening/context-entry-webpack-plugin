'use strict';

const ContextDependency = require('webpack/lib/dependencies/ContextDependency');
const ContextModuleFactory = require('webpack/lib/ContextModuleFactory');

class ContextEntryDependency extends ContextDependency {
  constructor(request, recursive, regExp, name) {
    super(request, recursive, regExp);
    this.name = name;
  }

  get type() {
    return 'context entry';
  }
}

module.exports = class ContextEntryPlugin {
  constructor(context, request, recursive, regExp, name) {
    this.context = context;
    this.request = request;
    this.recursive = recursive;
    this.regExp = regExp;
    this.name = name;
  }
  apply(compiler) {
    compiler.plugin("compilation", (compilation, params) => {
      const contextModuleFactory = new ContextModuleFactory(compiler.resolvers);
      compilation.dependencyFactories.set(ContextEntryDependency, contextModuleFactory);
    });

    compiler.plugin("make", (compilation, callback) => {
      const dep = ContextEntryPlugin.createDependency(this.request, this.recursive, this.regExp, this.name);
      compilation.addEntry(this.context, dep, this.name, callback);
    });
  }

  static createDependency(request, recursive, regExp, name) {
    return new ContextEntryDependency(request, recursive, regExp, name);
  }
};
