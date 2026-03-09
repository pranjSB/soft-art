# ENGINEERING DECISIONS — SentinelCore

## Overview

This document explains the key engineering decisions behind the SentinelCore.

Traditional automation frameworks focus primarily on executing test suites.  
This framework focuses on improving **test reliability, CI stability, and debugging efficiency**.

Goals:

- Reduce flaky tests
- Improve CI pipeline reliability
- Detect automation instability early
- Provide actionable failure insights

---

## Automation Technology Selection

| Technology | Purpose | Reason |
|---|---|---|
| Playwright | Browser automation | Modern architecture with reliable multi-browser support and built-in parallel execution |
| JavaScript | Test scripting | Native ecosystem support with Playwright and flexible asynchronous execution |
| Node.js | Runtime | Efficient concurrency model and strong tooling ecosystem |

---

## Framework Architecture Decisions

| Decision | Implementation | Reason |
|---|---|---|
| Modular framework structure | Separate layers for tests, page objects, healing, and analytics | Improves maintainability and scalability |
| Page Object Model | Encapsulate UI interactions in page classes | Reduces duplication and simplifies UI updates |
| Structured failure capture | Automatic screenshots, logs, and stack traces | Improves debugging speed |
| Data-driven testing | Externalized test data | Enables scalable test scenarios |

---

## Locator Strategy

| Strategy | Implementation | Reason |
|---|---|---|
| Stable selectors | Prefer data attributes | Reduces failures caused by DOM structure changes |
| Locator abstraction | Encapsulated within Page Objects | Centralizes updates when UI changes |
| Locator healing | Fallback locator strategies | Improves resilience to minor UI changes |

---

## Flaky Test Detection Strategy

| Signal | Detection Method | Reason |
|---|---|---|
| Inconsistent results | Historical test result comparison | Identifies unstable tests |
| Timeout failures | Execution timing analysis | Detects race conditions |
| Environment failures | CI retry comparison | Distinguishes infra issues from test issues |

---

## CI Integration Strategy

| Component | Role | Reason |
|---|---|---|
| GitHub Actions | Continuous test execution | Enables automated validation |
| Test artifacts | Store reports, logs, screenshots | Improves debugging visibility |
| Metrics tracking | Persist execution results | Enables reliability analysis |

---

## Reliability Engineering Principles

| Principle | Implementation | Reason |
|---|---|---|
| Deterministic tests | Isolated browser contexts | Prevents cross-test interference |
| Fail fast | Immediate failure reporting | Reduces wasted CI time |
| Observability | Logs, metadata, artifacts | Enables faster debugging |

---

## Design Tradeoffs

| Option | Decision | Reason |
|---|---|---|
| Selenium | Not selected | Higher flakiness and slower execution |
| Cypress | Not selected | Limited multi-browser support |
| Custom runner | Avoided | Playwright runner already robust |

---

## Future Enhancements

| Area | Planned Improvement | Reason |
|---|---|---|
| Flaky test intelligence | Historical failure clustering | Detect instability patterns |
| CI analytics | Stability dashboards | Improve pipeline visibility |
| Failure classification | Automated tagging | Faster root cause analysis |
