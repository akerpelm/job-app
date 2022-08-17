
To Run:

`git clone https://github.com/akerpelm/job-app.git`

From root directory:

ensure presence of npm with `npm -v`

`npm install-client` OR `npm i` > `cd client` > `npm i`

navigate to `localhost:3000`

Recommend loging in as `demo user` as there is plenty of data to play around with. 

Known issue:
I attempted to implement API debouncing when making register/login requests. When you click register/login, the buttons become greyed out until the request/response cycle is complete. It appears as though occasionally the buttons are greyed out off the bat. Current resolution is refreshing the page.
