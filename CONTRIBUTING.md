# How to contribute

Big Calendar loves to welcome your contributions. There are several ways to help out:

- Create an [issue](https://github.com/jquense/react-big-calendar/issues) on GitHub, if you have found a bug
- Write test cases or provide examples for open bug issues. You can fork our [Issue Template](https://codesandbox.io/s/react-big-calendar-example-v9wdyd) in codesandbox to get start.
- Write patches for open bug/feature issues

There are a few guidelines that we need contributors to follow so that we have a
chance of keeping on top of things.

## Getting Started

- Make sure you have a [GitHub account](https://github.com/signup/free).
- Submit an [issue](https://github.com/jquense/react-big-calendar/issues), assuming one does not already exist.
  - Clearly describe the issue including steps to reproduce when it is a bug.
  - Make sure you fill in the earliest version that you know has the issue.
- Fork the repository on GitHub.

## Making Changes

- Create a topic branch from where you want to base your work.
  - This is usually the master branch.
  - To quickly create a topic branch based on master; `git branch feat/my_contribution master` then checkout the new branch with `git checkout feat/my_contribution`. Better avoid working directly on the
    `master` branch, to avoid conflicts if you pull in updates from origin.
- Make commits of logical units.
  - Write/change `stories` that showcase new features or props
  - Verify your changes against existing `stories` when necessary
- Use descriptive commit messages following the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) format and reference the #issue number.

## Submitting Changes

- Push your changes to a topic branch in your fork of the repository.
- Submit a pull request to the repository
