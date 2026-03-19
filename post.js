const { execSync } = require('child_process');
const { env } = require('process');
const fs = require('fs');
const os = require('os');
const path = require('path');

// Read values written by pre.js
const stateFile = path.join(os.tmpdir(), `carbon-ci-${env['GITHUB_RUN_ID']}-${env['GITHUB_JOB']}.json`);
const { apiKey, project, pipeline, job, runner } = JSON.parse(fs.readFileSync(stateFile, 'utf8'));

console.log('Stopping Carbon CI monitoring...');
execSync(
  `carbon-ci stop --api-key "${apiKey}" --project "${project}" --pipeline "${pipeline}" --job "${job}" --runner "${runner}"`,
  { stdio: 'inherit' }
);

// Cleanup
fs.unlinkSync(stateFile);
