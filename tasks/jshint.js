module.exports = {
  options:{
    jshintrc: '.jshintrc',
    reporter: require('jshint-stylish')
  },
  app:{
    src: [
      'app/src/**/*.js',
      '!app/src/common/vendors/**'
    ]
  },
  test: {
    src:[
      'tests/**/*.js'
    ]
  }
};
