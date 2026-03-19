const { execSync } = require('child_process');
const { env } = require('process');

// Read values saved by pre.js via GitHub Actions state (STATE_ prefix)
const apiKey   = env['STATE_CARBON_CI_API_KEY'];
const project  = env['STATE_CARBON_CI_PROJECT'];
const pipeline = env['STATE_CARBON_CI_PIPELINE'];
const job      = env['STATE_CARBON_CI_JOB'];
const runner   = env['STATE_CARBON_CI_RUNNER'];

console.log('Stopping Carbon CI monitoring...');
execSync(
  `carbon-ci stop --api-key "${apiKey}" --project "${project}" --pipeline "${pipeline}" --job "${job}" --runner "${runner}"`,
  { stdio: 'inherit' }
);
