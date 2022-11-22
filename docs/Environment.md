# Environment Setup

This project uses [React](https://reactjs.org/) for the frontend, and [Flask](https://flask.palletsprojects.com/en/2.2.x/) for the backend.

To setup the backend development environment, it is recommanded to use a virtual environment tool such as [Conda](https://docs.conda.io/en/latest/miniconda.html). If you are using Conda, use the following command to setup:

```sh
conda create -n Walnut python=3.10
conda activate Walnut

# Ensure you are in the root directory
pip install -r requirements.txt
```

To setup the frontend development environment, it is recommanded to use [node.js](https://nodejs.org/en/) and [node package manager](https://www.npmjs.com/)(`npm`). Once you have `npm` installed, use the following command:

```sh
# Ensure you are in the root directory
cd Education_Pathways/frontend/
npm install
```
