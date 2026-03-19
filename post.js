const { execSync } = require('child_process');
const { env } = require('process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const stateFile = path.join(os.tmpdir(), `carbon-ci-${env['GITHUB_RUN_ID']}-${env['GITHUB_JOB']}.json`);
console.log(`[carbon-ci] post: GITHUB_RUN_ID=${env['GITHUB_RUN_ID']} GITHUB_JOB=${env['GITHUB_JOB']}`);
console.log(`[carbon-ci] post: stateFile=${stateFile}`);
console.log(`[carbon-ci] post: stateFile exists=${fs.existsSync(stateFile)}`);

const { apiKey } = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
console.log(`[carbon-ci] post: apiKey present=${!!apiKey}`);

console.log('Stopping Carbon CI monitoring...');

execSync('carbon-ci stop', {
  stdio: 'inherit',
  env: { ...env, CARBON_CI_API_KEY: apiKey }
});

fs.unlinkSync(stateFile);
