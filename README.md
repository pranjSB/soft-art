# Qualitest UI Automation Framework

UI automation framework built using Playwright (JavaScript) following the Page Object Model (POM) design pattern. This automation framework is not just a test runner its is a monitoring system that is equipped with: 
- Full system observability
- Zero test flakiness
- Historical logs
- Emitting tememetry events
- CI debugging
- Root cause analysis
- No copy-paste in tests

This project automates key user journeys on the Qualitest website:
https://www.qualitestgroup.com/

Covered areas:
- Home page
- Careers page
- Create account page
- Sign in page

## Purpose

This framework exists to demonstrate a real-world, CI-stable UI automation setup using modern Playwright practices.

It focuses on:
- Reliability in CI
- Maintainable test architecture
- Clean separation of concerns
- Practical locator strategy

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

- Run all tests: npx playwright test
- Run in headed mode: npx playwright test --headed
- Run a specific test: npx playwright test tests/careers.spec.js

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
- tests/              Test specifications  
- utils/              Data generator for creating account + timeout logic for extreme cases
- searchData/         Search inputs for keyword search on careers page
- logs/               Error logs; console and JS page errors              
- config.js           Global configuration  
- .github/workflows   CI structure

## Test Coverage

- Home page smoke tests
- Careers search and apply flow with sample happy and negative paths
- Create account form validation with sample happy and negative paths
- Sign in sample happy and negative paths

## Logging 

Error logs are enabled for engineering telemetry data for real observability pipelines. It is built:

- Structured
- Human readable
- Machine readable
- CI artifacts enabled
- Perfect for pushing to S3/ELK/Datadog/Splunk
- Trend analysis ready
- Alerting-ready

- Error count: cat logs/console-errors.json | wc -l
- Filter by severity: jq 'select(.severity=="severe")' logs/console-errors.json
- Group by test: jq '.test' logs/console-errors.json | sort | uniq -c 

Logs are in the format used by Datadog agents, Elastic shippers, OpenTelemetry, and CloudWatch ingestion. 

# Reporting

Playwright generates an HTML report after each execution.

The report contains:
- Test status
- Failure screenshots, videos
- Execution traces

## CI Strategy

Tests run automatically on GitHub Actions for:
- Pull requests
- Main branch updates

CI uploads:
- HTML report
- Trace files
- Screenshots, videos on failure

## Design Principles

- Page Object Model
- No assertions inside page objects
- Preference to ARIA role based locators
- No hard-coded waits
- CI-first test stability
- Produces engineering-grade signals, not just QA output

## Defects Detected by Automation

- ## Console Error Summary

During automated runs, the following categories of severe console errors were observed:

### 1. Frontend Runtime Errors
JavaScript errors caused by null or undefined references.
These represent real product defects and should be fixed.

Examples:
- Cannot read properties of null (reading 'querySelector')
- Cannot read properties of undefined (reading 'on')

Severity: High

### 2. Security Policy Violations
Third-party scripts blocked due to Content Security Policy or sandbox restrictions.

Examples:
- Refused to connect due to CSP
- Blocked script execution in sandboxed iframe

Severity: Medium

### 3. Backend / Integration Failures
Network requests failing due to missing endpoints or configuration.

Examples:
- Failed to load resource (404)
- API Key not found

Severity: High

### 4. CORS / HTTP Header Violations
Cross-origin and unsafe header access issues.

Examples:
- Blocked by CORS policy
- Refused to get unsafe header

Severity: Medium–High

For more details, refer 'Bug report- Severe errors' and 'Summary- SEVERE errors (Console, JS page)'.

## Manual Findings (Not Automated)

- Email address accepted while creating a new account is not as per ICANN regulations

# The framework fails tests if:

- Browser console has SEVERE errors
- Critical API calls return non-200 responses

## Known Constraints

- Pages are heavy and slow to fully load
- Tests wait for readiness signals, not full page load
- CAPTCHA needs to be disabled in test environments

## Known Limitations

- Careers search is slow and flaky under high load
- Some animations cause delayed element rendering

## Author

Pranjal Bhanap

## License

MIT