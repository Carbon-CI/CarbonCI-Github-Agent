const { execSync } = require('child_process');
const { env } = require('process');
const fs = require('fs');
const os = require('os');
const path = require('path');

// Read api-key written by pre.js
const stateFile = path.join(os.tmpdir(), `carbon-ci-${env['GITHUB_RUN_ID']}-${env['GITHUB_JOB']}.json`);
const { apiKey } = JSON.parse(fs.readFileSync(stateFile, 'utf8'));

console.log('Stopping Carbon CI monitoring...');

// install.sh stop reads CARBON_CI_API_KEY env var
execSync('carbon-ci stop', {
  stdio: 'inherit',
  env: { ...env, CARBON_CI_API_KEY: apiKey }
});

// Cleanup
fs.unlinkSync(stateFile);
