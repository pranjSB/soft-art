# SentinelCore Architecture

```mermaid
flowchart TD

A[Developer Commit] --> B[GitHub Repository]

B --> C[CI Pipeline]
C --> D[Test Execution Engine]

D --> E[Test Intelligence Layer]
E --> F[Failure Classification]

F --> G[Flaky Test Detection]
F --> H[Root Cause Signals]

G --> I[Stability Metrics]
H --> I

I --> J[Engineering Insights Dashboard]
