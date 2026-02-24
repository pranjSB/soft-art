# Error Analysis Report

This document classifies browser console and JavaScript runtime errors detected by automation as well as manual findings.
Each item is categorized based on ownership, business impact, and actionability.

# Console Errors 

## Category A – Product Defects (To be logged in test management system)
Real product bugs originating from the application code and must be fixed by the development team.

### A1. Frontend JS crash on invalid search

**Title:** Frontend runtime error due to null DOM reference  
**Type:** Defect (Product Bug)  
**Severity:** High  

**Description:**  
Frontend throws a runtime exception when attempting to call `querySelector` on a null object during invalid search flow.

**Root Cause:**  
Missing null checks in frontend logic. DOM element is assumed to exist when it does not.

**Impact:**  
- UI logic execution halts.  
- Error message flow becomes unreliable.  
- Can result in:
  - broken search validation  
  - partial page rendering  
  - white screens in some browsers  
- High risk of user-facing functional failure.

**Evidence:**  
Cannot read properties of null (reading ‘querySelector')

### A2. Frontend event handler crash

**Title:** Frontend runtime error due to undefined object access  
**Type:** Defect (Product Bug)  
**Severity:** High  

**Description:**  
Frontend attempts to access `.on` on an undefined object.

**Root Cause:**  
Uninitialized object or race condition in JS execution order.

**Impact:**  
- Event listeners fail to bind.  
- Interactive components may stop responding.  
- Leads to unpredictable UI behavior.  
- Potential loss of core functionality in sign-in or form flows.

**Evidence:**  
Cannot read properties of undefined (reading 'on')

## Category B – Third-Party Security/Platform Limitations  
Real but third-party issues.

### B1. Google analytics blocked by CSP

**Title:** Analytics blocked by Content Security Policy  
**Type:** QA Risk/Technical limitation/Third-party Limitation  
**Severity:** Medium  

**Description:**  
Browser blocks Google analytics request due to CSP rules.

**Root Cause:**  
CSP configuration does not allow Google telemetry domains.

**Impact:**  
- Loss of page view tracking.  
- Inaccurate marketing metrics.  
- No impact on functional user behavior.  
- Business loses visibility into usage patterns.

**Evidence:**  
Fetch API cannot load google.com... violates CSP

### B2. Third-party script blocked in sandboxed frame

**Title:** Third-party script blocked by iframe sandbox  
**Type:** QA Risk/Technical limitation/Third-party Limitation  
**Severity:** Medium  

**Description:**  
External tracking script is blocked due to sandbox restrictions.

**Root Cause:**  
Platform iframe does not allow script execution.

**Impact:**  
- Chat widgets, tracking pixels, ads may not load.  
- No effect on core product features.  
- Affects monitoring, not functionality.

**Evidence:**  
Blocked script execution... frame is sandboxed

### B3. Unsafe header blocked by browser security

**Title:** Browser blocks unsafe HTTP header  
**Type:** QA Risk/Technical limitation/Third-party Limitation  
**Severity:** Low–Medium  

**Description:**  
Browser blocks access to non-standard response header.

**Root Cause:**  
Header not allowed by browser security model.

**Impact:**  
- No user-visible impact.  
- Debug/telemetry data unavailable.  
- Does not affect workflows.

**Evidence:**  
Refused to get unsafe header "X-Request-Stats"

## Category C – Backend/Integration Failures  
SAP SuccessFactors related issues.

### C1. API returns 404

**Title:** Backend resource not found  
**Type:** Defect (Integration Bug)/Constraint  
**Severity:** High  

**Description:**  
Resource request returns 404.

**Root Cause:**  
Incorrect endpoint mapping or missing deployment.

**Impact:**  
- Data not fetched.  
- UI may show empty state.  
- Core feature could silently fail.

**Evidence:**
Failed to load resource: 404

### C2. Missing API key

**Title:** API key missing in backend configuration  
**Type:** Defect (Configuration Bug)/Constraint  
**Severity:** High  

**Description:**  
Backend fails authentication due to missing API key.

**Root Cause:**  
Secrets not configured in environment.

**Impact:**  
- Entire integration layer fails.  
- No data retrieval.  
- Production outages possible.

**Evidence:**
API Key not found

### C3. Network failure

**Title:** Network request failed  
**Type:** Defect/Environment Constraint    
**Severity:** Medium–High  

**Description:**  
Request fails with network error.

**Root Cause:**  
Could be DNS, firewall, or third-party outage.

**Impact:**  
- Feature relying on this API becomes unavailable.  
- Intermittent failures.  
- Difficult to reproduce.

**Evidence:** 
net::ERR_FAILED

# Manual Findings  

### D. Invalid email addresses (manual finding)

**Title:** Invalid Email addresses
**Type:** Defect (Product Bug)
**Severity:** Medium–High  
**Description:**
While creating a new account, system allows syntactically valid but non-existent domains, resulting in undeliverable email addresses.
Even though email addresses like aa@bb.r and aa@bb.z are syntactically valid by RFC ruleset, .r and .z are not real TLDs. 
So, no mail can actually be delivered and these types of email addresses are almost always fake. Most real systems enforce constraints like TLD length ≥ 2, domain must exist in ICANN root zone or must resolve in DNS.
To allow signup, modern systems use 3-layer validation- RFC regex (basic shape), ICANN TLD list check, and DNS MX record lookup.

**Root Cause:** Missing/incomplete requirement or logic for email address validation.

**Impact:** Even though Qualitest system checks uniqueness of an account against email and phone number, this corrupts core user data, emaild address cannot be fixed by the user later which affects authentication or identity.
This can lead to account lockouts, increase in support tickets, and poor UX. From business perspective, this can lead to dirty user database, broken communication funnel, wasted onboarding costs, etc.
Moreover, major security risks could be that it can enable bot signups, fake accounts, credential stuffing setups, abuse of referral systems, etc.

**Evidence:**
Check database for accounts created using email IDs aa@bb.r and aa@bb.z.