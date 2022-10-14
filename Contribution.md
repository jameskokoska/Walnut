# Contributing to Walnut

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## We Develop with GitHub

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## To Contribute to Walnut

To contribute, first identify what is the issue:

1. Bug report
2. New feature

Then open a new issue following the corresponding template given, document clearly following the guidelines.

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests. It is expected that the pull requests are linked to specific issues.

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Tools & Code Style

[Visual Studio Code](https://code.visualstudio.com/) is recommanded to be the default code editor. To ensure the consistency of code style, it is recommanded to use `Pylint` and `Black` as default formatters for Python development and `Prettier` VS Code plugin as the default formatter for JavaScript and JSX development.

Run the following command to install `Pylint` and `Black`:

```sh
pip install black pylint
```

In general, if you are usng VS Code, add the following snippet into `settings.json`:

```json
{
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "python.formatting.provider": "black",
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```
