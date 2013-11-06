var MongoClient = require('mongodb').MongoClient
    , request = require('request');

MongoClient.connect('mongodb://localhost:27017/angel_dop', function (err, db) {
    if (err) throw err;
    //synchronous requests
    var page = 1,
        last_page = 0,
        importedNum = 0,
        lastID = -1,
        exists = false, //flag to indicate if job already exists in database
        options = {
            'limit': 1,
            'sort': [
                ['id', -1]
            ]
        };

    var jobsRequest = function (page) {
        var url = 'https://api.angel.co/1/jobs?page=' + page;
        console.dir('Page url: ' + url);

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var obj = JSON.parse(body);
                if (page == 1) {
                    last_page = obj.last_page;
                }
                obj.jobs.some(function (value) {
                    if (lastID >= value.id) {
                        exists = true;
                        return true;

                    } else {
                        value._id = value.id;
                        value.updated_at = new Date(value.updated_at);
                        value.created_at = new Date(value.created_at);

                        db.collection('jobs').save(value,{safe:true}, function (err, data) {
                            if (err) throw err;
                            importedNum++;
                        });
                    }
                });
                if (!exists && page < last_page) {
                    page++;
                    jobsRequest(page);
                }
                //if last page
                else {
                    console.dir('Number of imported: ' + importedNum);

                    db.collection("jobs").findOne({}, {id: 1, title: 1, created_at: 1}, options, function (err, doc) {
                        console.dir('Current max job: ' + JSON.stringify(doc));
                        db.close();
                    });
                }
            }
        });
    };

    db.collection("jobs").findOne({}, {id: 1, title: 1, created_at: 1}, options, function (err, doc) {
        if (err) throw err;
        console.log();
        console.log('Date: ' + new Date());
        if (doc == null) {
            doc={id:0};
        }
        console.dir('Previoys max job: ' + JSON.stringify(doc));
        lastID = doc.id;

        jobsRequest(1);
    });

});
