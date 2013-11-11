$s -A | grep mongod | grep 2700

$mongo --port 27000

>rs.status()
>rs.initiate()
>rs.status()

a:PRIMARY>rs.conf()
^C
bye

$mongo
mongos> sh.help()

mongos> sh.addShard("a/wbt.local:27000")
{ "shardAdded": "a", "ok" : 1 }

mongos>sh.status()
#one shard exists already

mongos> sh.help()

