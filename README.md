# Walnut - A Web Application for Efficient Course Searching

Walnut is a web application for current and future students at the University of Toronto, to efficiently search and select courses. Walnut has an intuitive user-interface, displaying helpful information and has features such as side-by-side course comparison that would aid the users to make good decisions. The primary benefits of Walnut are to provide adequate and useful information for students to make their decisions, and to improve the efficiency of the course selection process.

## Fun Fact

Walnut, a name which fits in the theme of “tree nuts” often used by the University of Toronto (Acorn and Chestnut Residence).

## Project Management

This project uses GitHub project to keep track of issues and tasks, check the Kanban board in the project tab of this repository.

## Environment Setup

This project uses [React](https://reactjs.org/) for the frontend, and [Flask](https://flask.palletsprojects.com/en/2.2.x/) for the backend.

To setup the backend development environment, it is recommanded to use a virtual environment tool such as [Conda](https://docs.conda.io/en/latest/miniconda.html). If you are using Conda, use the following command to setup:

```sh
conda create -n Walnut python=3.10
conda activate Walnut
pip install -r requirements.txt
```

To setup the frontend development environment, it is recommanded to use [node.js](https://nodejs.org/en/) and [node package manager](https://www.npmjs.com/)(`npm`). Once you have `npm` installed, use the following command:

```sh
# Assume you are in the root directory
cd Education_Pathways/frontend/
npm install
```

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

## Docker Build

This project uses [Docker](https://www.docker.com/) to build and test the application. Install docker and use the following command to build:

```sh
# Assume you are in the root directory
docker compose up --build
```

If you are using macbook, turn off airplay as it occupies the port 5000.
