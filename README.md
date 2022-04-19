# SmartChef

[![codecov](https://codecov.io/gh/Flusinerd/SmartChef/branch/main/graph/badge.svg?token=hP3zCCDx8G)](https://codecov.io/gh/Flusinerd/SmartChef)

- [SmartChef](#smartchef)
  - [API](#api)
    - [Setting up a venv for the api](#setting-up-a-venv-for-the-api)
      - [Creating a venv](#creating-a-venv)
      - [Activating a venv](#activating-a-venv)
    - [Installing Python dependencies](#installing-python-dependencies)
    - [Starting the API](#starting-the-api)
  - [UI](#ui)
    - [Installing dependencies](#installing-dependencies)
    - [Running the UI](#running-the-ui)

## API

### Setting up a venv for the api

#### Creating a venv

To create a venv use:

```
cd smart-chef-api && python3 -m venv env
```

#### Activating a venv

To activate a venv run the appropiate script

For Powershell:

```
./smart-chef-api/env/Scripts/Activate.ps1
```

For Linux:

```
source ./smart-chef-api/env/Scripts/activate
```

### Installing Python dependencies

A requirements.txt is included with the project.  
You can install the required packages using pip:

Its recommended to do this inside a venv

```
pip install -r smart-chef-api/requirements.txt
```

### Starting the API

To start the API you can use this command:

```
python smart-chef-api/src/manage.py runserver
```

## UI

### Installing dependencies

To install the dependencies use the following command

```
cd smart-chef-ui && yarn
```

### Running the UI

To run the UI use the following command

```
cd smart-chef-ui && yarn start
```
