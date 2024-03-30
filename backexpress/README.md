# Install all packages
```
npm install
```
# To start the backend server
```
node app.js
```

Note: 
- it starts on port 8080
- All the relevant code is in algos/controller.js 
- create a .env file with your github token

# Deployment
```
gcloud auth login
gcloud config set project <Project Name>
gcloud run deploy
```

Everything else is included in the dockerfile, no need to set up anything