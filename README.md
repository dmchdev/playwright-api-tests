# playwright-api-tests

This is a simple backend and Playwright API tests to test it. 

## Prerequisites
1. Python 3 is installed
2. `pip` tool is installed for Python
3. Node.js, playwright along with ajv and nock installed

## Alternative backend
If Python is not your language, I have added a node.js based backend writeen in Express.js. It's the same as the Flask. All you have to do is issue "node app.js" and it will stand up a server on local port 3000 instead of Flask's port 5000. 

## IMPORTANT NOTE

I have not yet finished setting up Docker Compose for running on CircleCI, so this system only works without Docker at this time. Launch Flask server (backend) locally directly and then run tests.
