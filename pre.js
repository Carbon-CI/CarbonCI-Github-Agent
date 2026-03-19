const { execSync } = require('child_process');
const { env } = require('process');

// GitHub converts input name hyphens to underscores: api-key → INPUT_API_KEY
const apiKey   = env['INPUT_API_KEY'];
const project  = env['GITHUB_REPOSITORY'];
const pipeline = env['GITHUB_RUN_ID'];
const job      = env['GITHUB_JOB'];
const runner   = env['RUNNER_NAME'];

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
