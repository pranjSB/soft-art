# Architecture diagram

flowchart TD

    Failure --> Classifier
    Classifier --> HealingPolicy

    HealingPolicy --> SmartRetry
    SmartRetry --> SelectorHealing

    SelectorHealing --> DOMSearch
    DOMSearch --> LLMSuggestions
    LLMSuggestions --> LearningStore

    

    A[Test Specs<br>Playwright Tests]
    B[Test Runner<br>Playwright Engine]
    C[Fixtures Layer<br>testBase.js<br>browser/context/page]
    D[Page Object Model<br>page_objects/*.js]

    E[Reporter Layer<br>customReporter.js]
    
    F[Failure Intelligence Engine<br>failureClassifier.js<br>failureTypes.js]
    
    G[Telemetry Storage<br>history.json<br>failures.json]

    H[Flaky Analyzer<br>flakyAnalyzer.js<br>statistical analysis]

    I[Healing Engine<br>healingEngine.js<br>healingLocator.js]

    J[CI Pipeline<br>GitHub Actions]

    K[Reports & Insights<br>error-analysis-report.md<br>summary.md]

    L[Developer Feedback Loop<br>Actionable Insights]



    A --> B
    B --> C
    C --> D

    B --> E

    E --> F
    F --> G

    G --> H

    F --> I

    I --> K
    H --> K

    J --> B
    J --> E

    K --> L