mycluster$ mongo

mongos> use config;
switched to db config

mongos>show collections
chunks
databases
lockpings
locks
mongos
settings
shards
system.indexes
version

#automatically created

mongos>db.chunks.find()

mongos>db.databases.find()
{ "_id" : "admin", "partitioned" : false, "primary" : "config" }

mongos>db.shards.find()