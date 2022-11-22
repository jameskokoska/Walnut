# Local Development

Walnut uses Flask as the backend and React as the frontend. To run this project locally, both the backend and the frontend have to be initiated. Here's the detailed instruction for running and developing Walnut locally:

Make sure you have all the requirements installed in your virtual environment, if not, please follow the instructions in [Environment Setup](/docs/Environment.md).

To run the Flask backend, go into `./Education_Pathways` directory and run the following command

```sh
flask --app index --debug run
```

To start the frontend, go into `./Education_Pathways/frontend` directory and run the following command:

```
npm install
npm start
```

## Sass Specification

The frontend development uses Sass instead of CSS, which has better readability and maintainability. Use VS Code [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass) extension to convert Sass to CSS locally since the browser can only understand CSS, Sass is for developers to read.

## Deploy

Walnut has been deployed to heroku at https://walnut-uoft.herokuapp.com/. If there is further development, and want to be deployed, remember to set `api.js` baseURL to deployed URL instead of localhost, turn off development mode in `index.py`. Run `npm build` in the `frontend` directory. Lastly, use `git push heroku main` to deploy to heroku.
