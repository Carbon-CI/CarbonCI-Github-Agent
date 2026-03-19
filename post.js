const { execSync } = require('child_process');

console.log('Stopping Carbon CI monitoring...');
execSync('carbon-ci stop', { stdio: 'inherit' });
