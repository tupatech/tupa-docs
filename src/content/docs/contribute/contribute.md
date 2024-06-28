---
title: How to Contribute
description: Guide to contributing.
---
Thank you for your interest in contributing to Tupã! We welcome contributions from the community to help improve and expand the framework. This guide will help you get started with contributing.

## Getting Started

1. **Fork the repository:** Create a fork of the <a href="https://github.com/tupatech/tupa" target="_blank">Tupã repository</a>.
2. **Clone your fork:** Clone your fork to your local machine

```bash
git clone https://github.com/<your-username>/tupa.git
```

3. **Create a branch:** Create a new branch for your changes.

```bash
git checkout -b feat-brief-description-as-name
```

## Reporting Issues

If you find any bugs or have feature requests, please open an issue on the <a href="https://github.com/tupatech/tupa/issues" target="_blank">GitHub Issues page</a>. Make sure to include as much detail as possible to help us understand and address the issue.

## Contributing Code

### Forking the Repository

1. Navigate to the <a href="https://github.com/tupatech/tupa" target="_blank">Tupã repository</a> on GitHub.
2. Click the "Fork" button at the top right of the page.
3. Follow the prompts to create a fork of the repository under your GitHub account.

### Setting Up Your Development Environment

1. Clone your forked repository:

```bash
git clone https://github.com/<your-username>/tupa.git
cd tupa
```

2. Install dependencies:

```bash
go get
```

### Creating Branches and naming

When creating a branch, follow the naming convention:

- For features: **feat-<brief-description-as-name>**
- For fixes: **fix-<brief-description-as-name>**
- For other types of work: **chore-<brief-description-as-name>**, **docs-<brief-description-as-name>**, etc.

Example:

```bash
git checkout -b feat-improve-routing
```

### Making Changes

1. Make your changes in the new branch.
2. Write tests for your changes, if applicable.

### Committing Changes

1. Stage your changes:

```bash
git add .
```

2. Commit your changes with a meaningful commit message:

```bash
git commit -m "Add new routing improvements"
```

### Pushing Changes

1. Push your changes to your forked repository:

```bash
git push origin feat-improve-routing
```

### Creating Pull Request

1. Navigate to the original Tupã repository.
2. Click the "Compare & pull request" button next to your branch.
3. Fill out the pull request template, providing a clear description of your changes.
4. Submit the pull request.

By following these guidelines, you help ensure that the project remains organized and that contributions can be efficiently reviewed and merged. Thank you for contributing to Tupã!