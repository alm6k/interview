[![Build Status](https://travis-ci.org/jmcriffey/interview.png)](https://travis-ci.org/jmcriffey/interview)

Front End Interview Project
==================

Setup
-----
To setup this project, you'll need the following installed on your system:

1. node
2. npm

To install this project, run the following commands:

```bash
git clone git@github.com:jmcriffey/interview.git
cd interview
npm install
```

To run the server, run the following command in the interview directory:

```bash
npm start
```

To make sure your project passes code quality standards, run the following command in the interview directory:

```bash
npm test
```

Once installed, run the test server and go to http://127.0.0.1:8080/
to make sure you see 'Hello World!' inside the green div.


Project Notes
-------------
* Feel free to edit or add any files as needed
* Do not use any other JS library/framework other than [jQuery v2.0.3](static/lib/js/jquery-2.0.3.min.js)
* Add any HTML to: [index.html](index.html)
* Add all grid code to: [static/ambition/js/CompetitorGrid.js](static/ambition/js/CompetitorGrid.js)
* Add all grid tests to: [static/ambition/js/test/CompetitorGrid.js](static/ambition/js/test/CompetitorGrid.js)
* Add all CSS to: [static/ambition/resources/css/ambition-all.css](static/ambition/css/ambition-all.css)
* If you use a CSS preprocessor, make sure it compiles to: [static/ambition/css/ambition-all.css](static/ambition/css/ambition-all.css)
* The design image to implement: [table-design.png](table-design.png)
* If you need to run the server on a port other than 8080, change the port variable in [server.js](server.js)
* http://127.0.0.1:8080/ will serve [index.html](index.html)
* http://127.0.0.1:8080/index.html will serve [index.html](index.html)
* http://127.0.0.1:8080/api/competitor/ will serve JSON from the competitor database
* The competitor API can be queried for:
    * firstName
    * lastName
    * user.email
    * teamName
    * score


Project Parameters
------------------
* Make an ajax call to the [competitor API](http://127.0.0.1:8080/api/competitor/) with the following parameters:
    * firstName=Steve
* The API returns an object with a 'meta' and 'objects' key. Both will be needed.
* Edit [index.html](index.html) to display the results in a grid-like container
* Style the container to reflect the [design](table-design.png)
    * Use Helvetica for all fonts
    * The showing text at the bottom needs to reflect the number of competitors being shown and the total
        * This can be figured out with the 'count' and 'total' values in the meta object returned by the api
    * Center the container in the middle of the page
* Use onclick handlers for column headers to allow local sorting on each column
    * The name column should be sorted on the 'lastName' parameter
* Write some useful tests using [Jasmine](http://pivotal.github.io/jasmine/)
    * The test file is at: [test file](static/ambition/js/test/CompetitorGrid.js)
* Make sure your code passes the test suite and linting by running the 'npm test' command.
