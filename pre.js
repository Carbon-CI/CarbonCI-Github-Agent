const { execSync } = require('child_process');
const { env } = require('process');
const fs = require('fs');

// GitHub converts input name hyphens to underscores: api-key → INPUT_API_KEY
const apiKey   = env['INPUT_API_KEY'];
const project  = env['GITHUB_REPOSITORY'];
const pipeline = env['GITHUB_RUN_ID'];
const job      = env['GITHUB_JOB'];
const runner   = env['RUNNER_NAME'];

// Save values to GitHub Actions state so post.js can read them
if (env['GITHUB_STATE']) {
  fs.appendFileSync(env['GITHUB_STATE'],
    `CARBON_CI_API_KEY=${apiKey}\nCARBON_CI_PROJECT=${project}\nCARBON_CI_PIPELINE=${pipeline}\nCARBON_CI_JOB=${job}\nCARBON_CI_RUNNER=${runner}\n`
  );
}

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
