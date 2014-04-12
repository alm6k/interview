var express = require('express'),
    nedb = require('nedb'),
    path = require('path'),
    server = express(),
    db = new nedb(),
    port = 8080,
    data = [{
        firstName: 'Steve',
        lastName: 'Martin',
        user: {
            email: 'steve.martin@tryambition.com'
        },
        teamName: 'The Jerks',
        score: 97
    }, {
        firstName: 'Linus',
        lastName: 'Torvalds',
        user: {
            email: 'linus.torvalds@tryambition.com'
        },
        teamName: 'The Penguins',
        score: 87
    }, {
        firstName: 'Steve',
        lastName: 'Jobs',
        user: {
            email: 'steve.jobs@tryambition.com'
        },
        teamName: 'The Apples',
        score: 82
    }, {
        firstName: 'Steve',
        lastName: 'Wozniak',
        user: {
            email: 'steve.wozniak@tryambition.com'
        },
        teamName: 'The Apples',
        score: 94
    }, {
        firstName: 'Steve',
        lastName: 'Spielberg',
        user: {
            email: 'steve.spielberg@tryambition.com'
        },
        teamName: 'The Close Encounters',
        score: 63
    }];

//add data to the db
db.insert(data);

//configure to serve static files
server.configure(function() {
    server.use('/static', express.static(__dirname + '/static'));
});

//start listening
server.listen(port);
console.log('Listening on port', port);

//serve index.html
server.get('/', function(req, res) {
    console.log(req.route.method.toUpperCase() + ':', req.route.path);
    res.sendfile('index.html');
});

server.get('/index.html', function(req, res) {
    console.log(req.route.method.toUpperCase() + ':', req.route.path);
    res.sendfile('index.html');
});

//serve image
server.get('/design', function(req, res) {
    console.log(req.route.method.toUpperCase() + ':', req.route.path);
    res.sendfile('table-design.png');
});

//serve competitor api
server.get('/api/competitor', function(req, res) {
    console.log(req.route.method.toUpperCase() + ':', req.route.path);
    db.count({}, function(err, total) {
        db.find(req.query, function(err, docs) {
            res.json({
                meta: {
                    total: total,
                    count: docs.length
                },
                objects: docs
            });
        });
    });
});
