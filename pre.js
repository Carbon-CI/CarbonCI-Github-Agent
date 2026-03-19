const { execSync } = require('child_process');
const { env } = require('process');
const fs = require('fs');
const os = require('os');
const path = require('path');

// GitHub converts input name hyphens to underscores: api-key → INPUT_API_KEY
const apiKey = env['INPUT_API_KEY'];

const stateFile = path.join(os.tmpdir(), `carbon-ci-${env['GITHUB_RUN_ID']}-${env['GITHUB_JOB']}.json`);
console.log(`[carbon-ci] pre: GITHUB_RUN_ID=${env['GITHUB_RUN_ID']} GITHUB_JOB=${env['GITHUB_JOB']}`);
console.log(`[carbon-ci] pre: stateFile=${stateFile}`);
console.log(`[carbon-ci] pre: apiKey present=${!!apiKey}`);
fs.writeFileSync(stateFile, JSON.stringify({ apiKey }));

console.log('Starting Carbon CI monitoring...');

try {
  execSync('command -v carbon-ci', { stdio: 'ignore' });
} catch {
  console.log('Installing Carbon CI agent...');
  execSync('curl -sSL https://carbon-ci.fr/install.sh | bash', { stdio: 'inherit' });
}

// install.sh detects GITHUB_ACTIONS=true and reads GitHub env vars natively
execSync('carbon-ci start', {
  stdio: 'inherit',
  env: { ...env, CARBON_CI_API_KEY: apiKey }
});
