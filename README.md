# Learninverse Frontend Application

**Contributors**
- Signe B. Ekern
- Matthew R. Hunt
- August D. Oksavik

This repo contains the frontend part of our application. The frontend is built using React Native and
JavaScript, and it communicates with the backend via REST API calls.

## Starting the application

The frontend application is dependent on the backend REST application.
The backend application must be running for the frontend to work properly.
Go to https://github.com/NTNUFrokostklubben/IDATA2306 to find the backend application and instructions on how to run it.

It is necessary to have a .env file for proper functionality. The .env file should contain the following variables for 
development:


```
GENERATE_SOURCEMAP=false
HTTPS=true

REACT_APP_API_URL=https://localhost:8080/api
```


After cloning the repo locally, it is necessary to run `npm install` to install all the dependencies.

```bash
  npm install
```
Once the dependencies are installed, you can start the application by running:

```bash
  npm start
```
Open [https://localhost:3000/](https://localhost:3000/) to view it in your browser.

