#run processes for the cluster
#running on the single dev machine as demo...

#Recommendatins:
#run mongos on the standard mngodb tcp port 27017
#do not run shard server mongod's nor config servers on that default port
mkdir a0
mkdir a1
mkdir a2
mkdir b0
mkdir b1
mkdir b2
mkdir c0
mkdir c1
mkdir c2
mkdir d0
mkdir d1
mkdir d2

mkdir cfg0
mkdir cfg1
mkdir cfg2

#config servers
mongod --configsrv --dbpath cfg0 --port 26050 --logpath log.cfg0 --logappend --fork
mongod --configsrv --dbpath cfg1 --port 26051 --logpath log.cfg1 --logappend --fork
mongod --configsrv --dbpath cfg2 --port 26052 --logpath log.cfg2 --logappend --fork

#"shard servers" - mongod data servers
# note: don't use smallfiles nor such small oplogSize in production; this are here running on one demo machine

mongod --shardsvr --replSet a --dbpath a0 --logpath log.a0 --port 27000 --logappend --smallfiles --oplogSize 50 --fork
mongod --shardsvr --replSet a --dbpath a1 --logpath log.a1 --port 27001 --logappend --smallfiles --oplogSize 50 --fork
mongod --shardsvr --replSet a --dbpath a2 --logpath log.a2 --port 27002 --logappend --smallfiles --oplogSize 50 --fork

mongod --shardsvr --replSet b --dbpath b0 --logpath log.b0 --port 27100 --logappend --smallfiles --oplogSize 50 --fork
mongod --shardsvr --replSet b --dbpath b1 --logpath log.b1 --port 27101 --logappend --smallfiles --oplogSize 50 --fork
mongod --shardsvr --replSet b --dbpath b2 --logpath log.b2 --port 27102 --logappend --smallfiles --oplogSize 50 --fork

mongod --shardsvr --replSet c --dbpath c0 --logpath log.c0 --port 27200 --logappend --smallfiles --oplogSize 50 --fork
mongod --shardsvr --replSet c --dbpath c1 --logpath log.c1 --port 27201 --logappend --smallfiles --oplogSize 50 --fork
mongod --shardsvr --replSet c --dbpath c2 --logpath log.c2 --port 27202 --logappend --smallfiles --oplogSize 50 --fork

mongod --shardsvr --replSet d --dbpath d0 --logpath log.d0 --port 27300 --logappend --smallfiles --oplogSize 50 --fork
mongod --shardsvr --replSet d --dbpath d1 --logpath log.d1 --port 27301 --logappend --smallfiles --oplogSize 50 --fork
mongod --shardsvr --replSet d --dbpath d2 --logpath log.d2 --port 27302 --logappend --smallfiles --oplogSize 50 --fork

#mongos processes
# the first mongos port is 27017 (default mongodb port)
mongos --configdb wbt.local:26050,wbt.local:26051,wbt.local:26052 --logappend --logpath log.mongos0 --fork
mongos --configdb wbt.local:26050,wbt.local:26051,wbt.local:26052 --logappend --logpath log.mongos1 --port 26061 --fork
mongos --configdb wbt.local:26050,wbt.local:26051,wbt.local:26052 --logappend --logpath log.mongos2 --port 26062 --fork
mongos --configdb wbt.local:26050,wbt.local:26051,wbt.local:26052 --logappend --logpath log.mongos3 --port 26063 --fork

echo
ps -A | grep mongo

echo
tail -n 1 log.cfg0
tail -n 1 log.cfg1
tail -n 1 log.cfg2

echo
tail -n 1 log.a0
tail -n 1 log.a1
tail -n 1 log.a2
tail -n 1 log.b0
tail -n 1 log.b1
tail -n 1 log.b2
tail -n 1 log.c0
tail -n 1 log.c1
tail -n 1 log.c2
tail -n 1 log.d0
tail -n 1 log.d1
tail -n 1 log.d2

echo
tail -n 1 log.mongos0
tail -n 1 log.mongos1
tail -n 1 log.mongos2
tail -n 1 log.mongos3

