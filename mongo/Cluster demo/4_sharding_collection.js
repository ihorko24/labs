mongos>sh.enableSharding("week6");
mongos> sh.shardCollection("week6.foo",{_id:1}, true);
mongos>sh.status()
mongos> var i= 0, t=db.foo; for(i=0;i<20000;i++){t.insert({x:i,y:3,z:"test         test"});}

mongos>t.status()

mongos> for(i=0;i<200000;i++){t.insert({x:i,y:3,z:"test         test"});}
mongos>t.status()
//size, nchunks

mongos>sh.status()


