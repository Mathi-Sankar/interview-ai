# Contributing to InterviewEdge

Welcome to the InterviewEdge project! This document outlines our standard development lifecycle, branch policies, and continuous integration workflows. We adhere to enterprise-grade standards, focusing on modularity, scalability, observability, and robust automated testing.

## Agile Methodology
Our team follows an Agile/Scrum framework to iteratively deliver value.
- **Sprints:** 2-week iterations.
- **Daily Standups:** Brief syncs to track progress and unblock tasks.
- **Sprint Planning & Retrospectives:** Planning for the upcoming iteration and continuous process improvement.
- **Ticket Tracking:** All work must be tied to a Jira/Azure DevOps ticket (or equivalent tracking ID).

## Gitflow Branching Strategy
We use Gitflow to manage our source control lifecycle effectively:

- `main`: The production-ready state. Deployments to production happen strictly from this branch.
- `develop`: The active development branch. Features are merged here before being prepped for release.
- `feature/*`: Branch off of `develop` for new features (e.g., `feature/JD-123-playwright-setup`).
- `release/*`: Cut from `develop` when preparing for production deployment. Allows for final testing and bug fixes before merging into `main` and back into `develop`.
- `hotfix/*`: Branch off of `main` to address critical production bugs. Merges back into `main` and `develop`.

## Continuous Integration & Continuous Deployment (CI/CD)
Our repository leverages automated pipelines (via GitHub Actions / Azure DevOps) to maintain code quality:
1. **Linting & Formatting:** ESLint and Prettier enforce code style on every PR.
2. **Build Verification:** Next.js application builds are verified to catch type errors.
3. **End-to-End Testing:** Playwright E2E tests are executed to validate core application workflows (Onboarding, Booking, Call Integration).
4. **Code Coverage:** Minimum code coverage standards are enforced.

## Testing Standards
- **Unit Tests:** Maintain comprehensive unit tests for reusable components and helper functions.
- **E2E Tests:** All new core workflows must be accompanied by a Playwright end-to-end test.
- Tests should be isolated, self-contained, and deterministic. Mock external API calls (e.g., Clerk Auth, Stream Video) where necessary in the testing suite.

## Pull Request Policy
1. All PRs must target the `develop` branch (unless a `hotfix/*` or `release/*`).
2. PR titles should be descriptive and reference the ticket ID.
3. PRs require approval from at least one senior developer before merging.
4. All CI/CD checks (Lint, Build, E2E Tests) must pass successfully before a merge is allowed.

By following these standards, we ensure high quality, stability, and rapid delivery for InterviewEdge.
