'use strict';

function includeContextModules(context) {
  context.keys().forEach(context);
}

// true - include recursive
includeContextModules(require.context('./project', true, /\.(css)$/));