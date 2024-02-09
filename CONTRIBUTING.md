# How to contribute

Big Calendar warmly welcomes your contributions. There are several ways to help out:

- Create an [issue](https://github.com/jquense/react-big-calendar/issues) on GitHub, if you have found a bug
- Write test cases or provide examples for open bug issues. You can fork our [Issue Template](https://codesandbox.io/s/react-big-calendar-example-v9wdyd) in CodeSandbox.
- Write patches for open bug/feature issues

To ensure efficiency and organization, we ask all contributors to follow a few guidelines.

## Getting Started

- **Create a GitHub Account**: Sign up at [GitHub](https://github.com/signup/free) if you don't already have an account.
- **Report Issues**: Before submitting a new issue, check if it already exists [here](https://github.com/jquense/react-big-calendar/issues).
  - Describe the issue in detail, including steps to reproduce if it's a bug.
  - Include the earliest version that you know has the issue.
- **Fork the Repository**: Make a personal fork of the repository on GitHub to start your work.

## Making Changes

- **Create a Topic Branch**: Base your work on the master branch. Create a new branch for your changes with `git branch feat/my_contribution master`, then switch to it with `git checkout feat/my_contribution`. It's best to avoid working directly on the master branch.
- **Commit Logical Units**:
  - Add or update `stories` to demonstrate new features or properties.
  - Ensure your changes are compatible with existing `stories`.
- **Commit Messages**: Follow the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) format for your commit messages and include the issue number.

## Submitting Changes

- **Push Changes**: Push your changes to your topic branch in your fork.
- **Create a Pull Request (PR)**: Submit a PR to the main repository. Be sure to:
  - Write a clear PR title and description detailing what your changes do and why they're needed.
  - Link your PR to any relevant issues it addresses using phrases like "closes #issue_number".
