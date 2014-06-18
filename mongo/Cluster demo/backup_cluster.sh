#back up a sharded cluster

mongo --host some_mongos --eval "sh.stopBalancer()"

#make sure that worked!

#backup config database / a config server
mongodump --host some_mongos_or_some_confg_server --config /backups/cluster1/configdb

#back up all the shards
mongodump --host shard1_svr1 --oplog /backups/cluster1/shards1
mongodump --host shard2_svr1 --oplog /backups/cluster1/shards2
mongodump --host shard3_svr1 --oplog /backups/cluster1/shards3
mongodump --host shard4_svr1 --oplog /backups/cluster1/shards4
mongodump --host shard5_svr1 --oplog /backups/cluster1/shards5
mongodump --host shard6_svr1 --oplog /backups/cluster1/shards6

#balancer back on
mongodump --host some_mongos --eval "sh.startBalancer()"