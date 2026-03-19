const { execSync } = require('child_process');
const { env } = require('process');
const fs = require('fs');
const os = require('os');
const path = require('path');

// GitHub converts input name hyphens to underscores: api-key → INPUT_API_KEY
const apiKey   = env['INPUT_API_KEY'];
const project  = env['GITHUB_REPOSITORY'];
const pipeline = env['GITHUB_RUN_ID'];
const job      = env['GITHUB_JOB'];
const runner   = env['RUNNER_NAME'];

// Persist values to a temp file so post.js can read them (same runner)
const stateFile = path.join(os.tmpdir(), `carbon-ci-${env['GITHUB_RUN_ID']}-${env['GITHUB_JOB']}.json`);
fs.writeFileSync(stateFile, JSON.stringify({ apiKey, project, pipeline, job, runner }));

console.log('Starting Carbon CI monitoring...');

try {
  execSync('command -v carbon-ci', { stdio: 'ignore' });
} catch {
  console.log('Installing Carbon CI agent...');
  execSync('curl -sSL https://carbon-ci.fr/install.sh | bash', { stdio: 'inherit' });
}

execSync(
  `carbon-ci start --api-key "${apiKey}" --project "${project}" --pipeline "${pipeline}" --job "${job}" --runner "${runner}"`,
  { stdio: 'inherit' }
);
