# Carbon CI — GitHub Actions Agent

Monitor the carbon emissions of your GitHub Actions pipelines automatically.

## Usage

Add a single step at the beginning of your job:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: Carbon-CI/CarbonCI-Github-Agent@v1
        with:
          api-key: ${{ secrets.CARBON_CI_API_KEY }}

      # Your usual steps below
      - run: npm ci
      - run: npm test
```

That's it. Carbon CI automatically starts monitoring **before** your steps run and sends the report **after** they complete — even if the job fails.

## Setup

1. Go to your repository **Settings → Secrets and variables → Actions**
2. Add a secret named `CARBON_CI_API_KEY` with your Carbon CI API key
3. Add the `uses:` line above to any job you want to monitor

## How it works

This action uses the composite `pre`/`post` mechanism:

- **`pre`**: installs the Carbon CI agent (if needed) and starts monitoring
- **`post`**: stops monitoring and sends the emissions report to Carbon CI

## Variables sent to Carbon CI

| Variable | GitHub context |
|---|---|
| Project | `github.repository` |
| Pipeline ID | `github.run_id` |
| Job name | `github.job` |
