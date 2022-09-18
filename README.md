# Assignment 1: Education Pathway

This repository host the source code for Education Pathway project. You can view the online deployed version [here](https://assignment-1-starter-template.herokuapp.com/). We are using this repo as a starting point for assignment 1.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) for frontend, and [Flask-tdd](https://github.com/mjhea0/flaskr-tdd) for backend.


## 0. Before the project

Make sure you have all the prerequisites installed
* [Git](https://git-scm.com/downloads)
* [Python](https://www.python.org/downloads/) (python-3.10.6)
* nodejs

To install nodejs, go to [nodejs download]( https://nodejs.org/en/download/). Add `npm` to `PATH` as global variable.
 
## 1. Clone the repository to your local machine
```sh
$ git clone https://github.com/ECE444-2022Fall/Assignment_1_starter_template.git
```
## 2. To run the app in development

First, go to the `frontend` directory 
```sh
$ cd .\Education_Pathways\frontend\
```

to install the nodejs modules needed, run
```sh
$ npm install
```
then to start the app in development mode
```sh
$ npm start
```
## 3. To build the app for production to the `build` folder. Under the same `frontend` directory, run
```sh
$ npm run build
```
## 4. Deploy the project
   
We use Heroku to deploy the project online. To do this, first [sign up](https://signup.heroku.com/) for a Heroku account,  and then install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli). The following steps are the complete guide for deploying to Heroku. But for deploying this project, some steps are optional (marked as `optional`), as the required files are already provided in the repo. 

4.1 If you are currently under the `frontend` directory, go back to the root directory
```sh
$ cd ..\..
```

4.2 Next, install a production-grade WSGI web server called [Gunicorn](http://gunicorn.org/):

```sh
$ pip install gunicorn==20.0.4
```

4.3 (`optional`) Create a [Procfile](https://devcenter.heroku.com/articles/procfile) in the project root:

```sh
$ touch Procfile
```

4.4 (`optional`) And add the following code:

```sh
web: gunicorn --chdir Education_Pathways index:app
```

4.5 (`optional`) Create a *requirements.txt* file to specify the external dependencies that need to be installed for the app to work:

```sh
$ touch requirements.txt
```

4.6 (`optional`) Add the requirements:

```
Flask==2.1.1
gunicorn==20.0.4
pytest==7.1.2
```

4.7 (`optional`) Create a *.gitignore* file in the project root:

```sh
$ touch .gitignore
```

4.8 (`optional`) And include the following files and folders (so they are not included in version control):

```sh
env
*.pyc
*.DS_Store
__pycache__
test.db
```

4.9 (`optional`) To specify the correct Python runtime, add a new file to the project root called *runtime.txt*:

```
python-3.10.4
```

4.10 (`optional`) Add a local Git repo:

```sh
$ git init
$ git add -A
$ git commit -m "initial"
```

4.11 Login to your Heroku account

```sh
$ heroku login
```

4.12 Deploy to Heroku, give your application a name on Heroku, for example, we name it `myapp-unique-name` here:

```sh
$ heroku create myapp-unique-name
```
4.13 Then set your heroku remote to the application you just created
```sh
$ heroku git:remote -a myapp-unique-name
```
4.14 Commit your local repo to Heroku remote
```sh
$ git add .
$ git commit -am "inital commit to heroku remote"
$ git push heroku main
```

4.15 Then to view the deployed app online, run the following command to open the webpage in your default browser.

```sh
$ heroku open
```
or go to your [Heroku account](https://dashboard.heroku.com/apps) and check your the url of your deployed app. (`https://myapp-unique-name.herokuapp.com/`)