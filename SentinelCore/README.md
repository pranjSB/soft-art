# SentinelCore Reliability Intelligence Engine
This framework demonstrates **senior-level SDET** skills:

- Test intelligence engineering
- Failure classification
- Flaky detection
- Self-healing automation
- CI observability

**Autonomous Self-Healing Intelligence System, SentinelCore** is a production-grade test reliability platform built on Playwright. Unlike traditional automation frameworks that only execute tests, TestSentinel functions as a test observability and intelligence system. It continuously collects execution telemetry, classifies failures, detects flakiness, generates healing candidates, and produces reliability analytics across runs. This transforms automation from passive validation into an active reliability engineering system through:

- Failure intelligence; classification by root cause
- Historical execution telemetry
- Flaky test detection using trend analysis
- Self-updating reliability dashboards
- CI in non-blicking intelligence mode 
- Root cause analytics
- Self-healing locator intelligence
- Per-browser stability tracking
- CI dashboard
- Enterprise HTML dashboard
- Production-grade reporting

Target application: https://www.qualitestgroup.com/

Covered areas:
- **Home**: smoke tests
- **Careers**: search and apply flow with sample happy and negative paths
- **Create Account**: form validation with sample happy and negative paths
- **Sign In**: sample happy and negative paths

## What Makes This Different
Traditional frameworks answer: “Did the test pass?”

SentinelCore answers:
- **Is this test reliable?**
- **Are failures meaningful?**
- **Can failures fix themselves?**
- **Can reliability improve automatically?**
- **Where should engineers focus?**

Automation should function as an engineering intelligence layer, not just a validation tool.

## Why This Matters

Modern engineering teams require reliability intelligence, not just test execution. SentinelCore moves beyond traditional automation by providing:
- Failure explainability
- Reliability visibility
- Autonomous recovery intelligence
- Long-term stability tracking

This aligns test systems with production observability principles.

## Core Capabilities

### Test Intelligence

- Historical telemetry tracking (intelligence/history.json)
- Trend analysis across runs
- Failure classification by root cause (logs/failures.json)
- Reliability metrics generation 

### Flaky Test Detection

Statistical detection using:

**failureRate = failedRuns / totalRuns**

Only recurring failures count. Single failures are ignored.

Provides:

- Flaky classification (intelligence/flakyAnalyzer.js, logs/flaky.html and logs/flaky-report.txt)
- Stability scoring
- Investigation prioritization

### Self-Healing Intelligence

When locator failures occur, system performs:

**Failure → Classification → Healing Policy → Candidate Discovery → Ranking → Persistence**

Healing candidates stored (healCandidate.json) that creates long-term learning store.

### Root Cause Classification

Automatically categorizes failures (intelligence/failureClassifier.js) into:

- Locator failures 
- Backend failures
- Infrastructure failures
- Test data issues
- Timeouts

Removes manual triage.

### Observability and Reporting

Generates:

- Reliability dashboards
- Failure analytics
- Healing intelligence reports
- Flaky trend reports
- HTML reports

## Real defects detected by Automation

- Frontend null reference crashes
- Backend integration failures
- CSP security blocks
- Third-party integration issues

For more details, refer docs > 'error-analysis-report' and 'summary- Errors (console, JS page)'
https://github.com/pranjSB/soft-art/tree/main/SentinelCore/docs

## Architecture

SentinelCore framework follows the following pipeline:

**Test Execution → Reporter → Intelligence → Healing → Analytics → Developer Feedback**

Framework Architecture: 
https://github.com/pranjSB/soft-art/blob/main/SentinelCore/SENTINELCORE_ARCHITECTURE_DIAGRAM.md
https://github.com/pranjSB/soft-art/blob/main/SentinelCore/SENTINELCORE_SYSTEM_DESIGN.md
https://github.com/pranjSB/soft-art/blob/main/SentinelCore/SENTINELCORE_ENGINEERING_DECISIONS.md

## Upcoming Capabilities

SentinelCore is evolving into a fully autonomous reliability intelligence system with adaptive learning and recovery capabilities.

### Intelligent Retry Engine

Instead of blind retries, retry decisions will be driven by failure classification and historical reliability signals.
Flow:

**Failure → Classification → Retry Policy → Intelligent Retry Execution**

This prevents masking real defects while allowing transient infrastructure issues to recover automatically.

### Adaptive Selector Healing Engine

Automatically recovers from locator failures using multi-layer recovery strategies:
- Attribute similarity matching
- Text and semantic matching
- Structural proximity analysis
- Historical healing success signals

This transforms brittle selectors into resilient, adaptive references.

### DOM Similarity Recovery

Performs structural comparison between:
- Historical DOM state
- Current DOM state

Uses similarity scoring to identify the most probable replacement elements. Enables recovery even when identifiers change completely.

### Learning Store and Continuous Improvement Loop

Every failure and recovery attempt is stored in a persistent learning store.
System continuously improves its recovery accuracy using:
- Historical healing outcomes
- Failure pattern frequency
- Selector reliability scoring

This enables progressive reliability improvement over time.

### Human-Guided Intelligence Layer (Optional)

Engineers can approve or refine recovery suggestions. These inputs are stored and used to improve future autonomous recovery decisions. This enables safe and explainable autonomy.

### Intelligence Pipeline Vision

Final architecture:

Failure  
    ↓
Classification  
    ↓
Healing Policy  
    ↓
Intelligent Retry  
    ↓
Selector Recovery  
    ↓
DOM Similarity Analysis  
    ↓
Recovery Suggestions  
    ↓
Learning Store  
    ↓
Continuous Improvement Loop

This evolves SentinelCore into a self-improving reliability platform.

## Reporting

- Playwright HTML report
- Error logs
- Trend data
- Root cause data
- Flaky test dashboards

Together this forms a full test observability pipeline.

## CI Strategy

Runs on GitHub Actions in non-blicking intelligence mode. Uploads:
- Playwright HTML report
- Screenshots and traces
- Failure classification
- Flaky dashboards
- Self-healing intelligence report

Supports long-term reliability tracking.

## Design Principles

- Page Object Model
- No assertions in page objects
- No hard-coded waits
- CI-first stability
- Data-driven debugging

## Tech Stack

- Playwright
- Node.js
- JavaScript
- GitHub Actions
- CI/CD telemetry pipelines

## Installation

Project dependencies and browsers:

- npm ci
- npx playwright install@latest
- npm i @faker-js/faker
- npm i dotenv

## Running Tests

Recommended (direct Playwright):
- Run all tests: npx playwright test
- Run in headed mode: npx playwright test --headed
- Run a specific test: npx playwright test tests/careers.spec.js

Shortcut:
- Run all tests: npm test

## Environment Variables

The framework relies on environment variables. In CI, the same variable are injected via GitHub Actions secrets.

- BASE_URL=https://www.qualitestgroup.com/
- SIGNIN_URL=https://career44.sapsf.com/career?career_company=qualitesti&lang=en_GB&company=qualitesti&site=&loginFlowRequired=true&_s.crb=Qa7wkHKgdQf4uQCBt3WVYqRHdc8lyVqoIimFt0NSOUs%3d
- CREATE_ACCOUNT_URL=https://career44.sapsf.com/career?company=qualitesti&site=&lang=en_GB&requestParams=E0eNWwaFD5kRepSAngGBYRP1tlN42m1Ry0pDMRAd%2b7Av0RbBnb9QsJa24EKr0lpQEEQ3Lq7T3LFN%0aicltMtdWBL9IP0L8Al36A%2bLCfzCtgq0aSCBzTs6cM7n%2fgLSzUBrgNZZjlqp8gK5%2fhFE68%2fr4tHbx%0anIREC%2fLKYNhCwcZ2IMd9S65vVDiOtndgspZGWX8W%2fS4wpJxkii2snh9OVRXqXvmErdS9rYeXs7f3%0a9dt2AmAcefoCAzBkhZKkuRPGQ7iD5Fc9OzBdVxlRl6Ek0BLZwFcCS8NAzhFTjUa1wlBwRkhUzShS%0aN7Nw%2bhKVI4%2f718cyIiU1zeKL%2b9KSYIZlYawlhSyNDua95Ou1jUatsVmvVj1Puo5mshrVqSP7X6%2bM%0aMFcR6h8fCa8xjFH5yTiWvy6573jazWqtTNKiTyPF1JIPOpnkXDvSQXuXoeh%2fY9RUZHnPEjKFfz2N%0aPwFqBowO&login_ns=register&career_ns=job%5fapplication&career_job_req_id=8842&jobPipeline=Direct&clientId=jobs2web&_s.crb=Qa7wkHKgdQf4uQCBt3WVYqRHdc8lyVqoIimFt0NSOUs%3d
- SIGNIN_EMAIL= user-email
- SIGNIN_PASSWORD= user-password
- FIRST_NAME= user-first-name
- LAST_NAME= user-last-name
- PHONE= user-phone

## Project Structure

- page_objects/       Page Object classes  
- tests/              Test specifications, fixtures
- utils/              Data generator for creating account + timeout logic for extreme cases
- searchData/         Search inputs for keyword search on careers page
- logs/               Error logs; console and JS page errors              
- config.js           Global configuration  
- .github/workflows   CI structure
- analysis            Test intelligence reporter; failure classification engine, time-series test telemetry, trend analysis, flakiness detection, auto-reporting, self-updating dashboards

Logs are in the format used by Datadog agents, Elastic shippers, OpenTelemetry, and CloudWatch ingestion. 

## Known Constraints

- Pages are heavy and slow to fully load
- Tests wait for readiness signals, not full page load
- CAPTCHA needs to be disabled in test environments
- SAP blocks headers
- Third-party scripts sandboxed
- CSP forbids tracking
- SSO redirects

## Known Limitations

- Careers search is slow and flaky under high load
- Some animations cause delayed element rendering

## Author

Pranjal Bhanap

## License

MIT
