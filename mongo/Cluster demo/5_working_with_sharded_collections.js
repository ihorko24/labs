mongos>t.find({}),{longer:0}

mongos> t.insert({x:-1})
mongos> db.getLastErrorObj()

mongos> t.getIndexes()

mongos> t.ensureIndex({x:1})

mongos> db.getLastErrorObj()
//all shards
mongos> t.getIndexes()

mongos> t.find({_id:xxxxxxx}).explain()
//single shard

mongos> t.find({x:-1}).explain()
//each shard - search over non shard key



