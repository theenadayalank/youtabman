const zipFolder = require('zip-folder');

zipFolder('dist', 'YouTabMan.zip', function(err) {
  if(err) {
    console.error('oh no!', err); //eslint-disable-line
  } else {
    console.log('EXCELLENT'); //eslint-disable-line
  }
});
