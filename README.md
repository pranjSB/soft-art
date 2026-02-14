# Autonomous Test Intelligence Platform

Automation framework built on Playwright that functions as a test observability and reliability system, not just a test runner. This framework includes a custom test intelligence layer that automatically collects test execution data, analyzes trends over time, detects flaky tests, and generates self-updating reports on every run. It includes a self-healing intelligence layer that automatically analyzes locator failures and generates ranked alternative selectors at runtime. It is a monitoring system that is equipped with: 

- Failure classification by root cause
- Historical execution telemetry
- Flaky test detection using trend analysis
- Self-updating reliability dashboards
- CI debugging artifacts
- Root cause analytics
- Self-healing locator intelligence

Target application: https://www.qualitestgroup.com/

Covered areas:
- Home page smoke tests
- Careers search and apply flow with sample happy and negative paths
- Create account form validation with sample happy and negative paths
- Sign in sample happy and negative paths

## What Makes This Different

Traditional frameworks answer: “Did the test pass?”

This system answers:
- Is this test stable?
- Is it degrading over time?
- Is this a real bug or infrastructure noise?
- Where should engineers focus?

It applies production observability concepts to test automation.

## Why This Matters

This system moves beyond traditional automation by providing:
- Trend analysis instead of single-run results
- Test reliability metrics instead of pass/fail only
- Self-updating dashboards instead of static reports
- Root cause visibility instead of raw errors
- Explainable intelligence generation for failing locators 

It mimics how modern engineering teams track system health, but applied to test frameworks.

# Test Intelligence Pipeline: Core features

### 1.  Metric pipeline: Historical Telemetry: intelligence/history.json

Every test run is logged with timestamp and status. Enables trend analysis and regression detection.

### 2. Incident logging: Failure Classification: logs/failures.json

Failed tests are automatically categorized into:
- Locator drift
- Backend failures
- Test data issues
- Infrastructure problems
- Timeouts

Removes manual log inspection.

### 3. Stability analysis: Flaky Test Detection: intelligence/flakyAnalyzer.js

Flakiness is calculated using: failureRate = failedRuns / totalRuns

- Statistical flaky detection
- Multi-run aggregation
- Threshold-based classification
- Human + machine readable outputs

Only recurring failures count. Single failures are ignored.

### 4. Self-Updating Dashboards: analysis/flaky.html and logs/flaky-report.txt

Generated automatically after every run; shows reliability trends across executions. Classifies tests into three categories instead of using a single threshold:
- New unstable: failed once, need investigation; possibly broken test/s or new regression
- Flaky: fails intermittently, need stabilization
- Stable: rare or zero failures; ignore
 
This allows prioritizing investigation of new failures separately from long-term flaky tests.

### 5. Root-cause classification: Automated RCA: intelligence/failureClassifier.js

- Pattern-based classification
- Infra vs product vs test noise

### 6.
Instead of blindly retrying tests or hardcoding fallback locators, the system captures failure context and builds a growing knowledge base of potential recovery paths. When a test fails due to a broken locator:
- The failure is classified as a LOCATOR_NOT_FOUND error
- The healing engine scans the live DOM of the failing page
- Semantic signals (text, id, name, ARIA) are extracted
- Candidate elements are scored and ranked
- Results are persisted to a healing memory store

This file acts as a growing knowledge base of recovery suggestions across executions and CI runs. The system focuses on explainable intelligence generation before auto-fixing, providing a foundation for future autonomous test recovery.

## Defects Detected by Automation

- ## Console Error Summary

During automated runs, the following categories of console errors were observed:

## Category A – Product Defects (To be logged in test management system)
These represent real product defects and should be fixed.

### A1. Frontend JS crash on invalid search
Frontend runtime error due to null DOM reference. 

Examples:
- Cannot read properties of null (reading 'querySelector')

Severity: High

### A2. Frontend event handler crash
Frontend runtime error due to undefined object access

Examples:
- Cannot read properties of undefined (reading 'on')

Severity: High

## Category B – Third-Party Security/Platform Limitations  
Real but third-party issues.

### B1. Google analytics blocked by CSP
Analytics blocked by Content Security Policy  

Examples:
- Fetch API cannot load google.com... violates CSP

Severity: Medium

### B2. Third-party script blocked in sandboxed frame
Third-party script blocked by iframe sandbox  

Examples:
- Blocked script execution... frame is sandboxed

Severity: Medium

### B3. Unsafe header blocked by browser security
Browser blocks unsafe HTTP header 

Examples:
- Refused to get unsafe header "X-Request-Stats"

Severity: Medium

## Category C – Backend/Integration Failures  
SAP SuccessFactors related issues.

### C1. API returns 404
Backend resource not found  
 
Examples:
- Failed to load resource: 404

Severity: High  

### C2. Missing API key
API key missing in backend configuration  

Example:
-API Key not found

Severity: High  

### C3. Network failure
Network request failed  

Example:
- net::ERR_FAILED

Severity: Medium–High  

## Manual Findings (Not Automated)

- Email address accepted while creating a new account is not as per ICANN regulations

For more details, refer docs > 'error-analysis-report' and 'summary- Errors (console, JS page)' 
https://github.com/pranjSB/soft-art/tree/main/docs

## Reporting

- Playwright HTML report
- Error logs
- Trend data
- Root cause data
- Flaky test dashboards

Together this forms a full test observability pipeline.

## CI Strategy

Runs on GitHub Actions. Uploads:
- Playwright HTML report
- Screenshots and traces
- Failure classification
- Flaky dashboards

Supports long-term reliability tracking.

## Design Principles
- Page Object Model
- No assertions in page objects
- No hard-coded waits
- CI-first stability
- Data-driven debugging

## Tech Stack

- Playwright
- JavaScript
- Node.js
- GitHub Actions

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
- SIGNIN_EMAIL=<user-email>
- SIGNIN_PASSWORD=<user-password>
- FIRST_NAME=<user-first-name>
- LAST_NAME=<user-last-name>
- PHONE=<user-phone>

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
