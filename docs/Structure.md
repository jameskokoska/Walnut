# Project Structure

Walnut is a monolithic structured application with three components, the frontend, the backend, and the database.

## Frontend

The frontend of Walnut is built with ReactJS utilizing React Router. The frontend resides in the [frontend](/Education_Pathways/frontend/) directory. The driver is in [`index.js`](/Education_Pathways/frontend/src/index.js), the main app lives in [`App.js`](/Education_Pathways/frontend/src/App.js) where the entire app is wrapped by browser router in order to create a multi-page application.

Directories have names that indicate what resides in them, such as `pages` contains all available pages to be rendered, `components` contains all componenets to be imported and used in pages.

To develop the frontend, edit code in the [`src`](/Education_Pathways/frontend/src/) directory. The following is the general structure of the frontend source code:

- [src](/Education_Pathways/frontend/src/)
  - [index.js](/Education_Pathways/frontend/src/index.js): Frontend driver, renders the entire app to HTML
  - [App.js](/Education_Pathways/frontend/src/App.js): Walnut App, wrapped within browser router
  - [pages/](/Education_Pathways/frontend/src/pages/): All available pages including Home, Course Info, etc.
  - [components/](/Education_Pathways/frontend/src/components/): Little components to be utilized in pages, such as search bar, navigatoin bar, etc.
  - [struct/](/Education_Pathways/frontend/src/struct/): Utility components
  - [util/](/Education_Pathways/frontend/src/util/): Pages data

## Backend

The backend of Walnut is built with Flask. All backend code resides in [Education_Pathways](/Education_Pathways/) folder. The driver is in [`index.py`](/Education_Pathways/index.py) where all configuration and controllers are setup. Walnut uses Flask Restful to add API endpoints to the server and connect them to classes in the [controller](/Education_Pathways/api.py), which defines what to do and what to respond with when a GET or POST request is sent to the API endpoint.

Walnut uses Flask Mongoengine to connect the backend to the database, started the db instance in [config.py](/Education_Pathways/config.py) and stores document instances defined in [model.py](/Education_Pathways/model.py)

The following is the general structure of the backend source code:

- [Education_Pathways](/Education_Pathways/)
  - [index.py](/Education_Pathways/index.py): Backend driver, startsup the server
  - [config.py](/Education_Pathways/config.py): Configures flask app, database and CORS
  - [api.py](/Education_Pathways/api.py): Flask Restful API endpoints
  - [model.py](/Education_Pathways/model.py): Defines database documents
  - [util.py](/Education_Pathways/util.py): Helper functions for API endpoints
  - [keywords.py](/Education_Pathways/keywords.py): Utility data for thorough course searching

## Database

Walnut uses MongoDB as its database. There are two collections or two type of documents that are stored in the database, which are defined in [model.py](/Education_Pathways/model.py).

### Rating

```JSON
{
    code: string,
    difficulty: number,
    lecture: number,
    workload: number,
    tutorial: number,
    amount: array[int]
}
```

### Comment

```JSON
{
    code: string,
    name: string,
    comment: string,
    time: string
}
```
