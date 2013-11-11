$mongo --shell setup_scrit.js

mongos>ourAddShard("b",27100);

mongos>ourAddShard("c",27200);

mongos>ourAddShard("d",27300);

mongos>sh.status();

//#mongo cluster is running

mongos>db.shards.find();