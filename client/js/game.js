requirejs.config({
  paths: {
    'underscore': 'lib/underscore',
    'backbone': 'lib/backbone',
    'three': 'lib/three',
    'jquery': 'lib/jquery',
    'text': 'require.text'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'three': {
      exports: function () {
        return THREE;
      }
    }
  }
});

require(['three', 'underscore'], function(THREE, _) {
  console.log(THREE);
});