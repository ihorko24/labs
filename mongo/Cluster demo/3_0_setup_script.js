db = db.getSisterDB("config");

// assume we connected to a mongos to get going
var mongosConn = db,
    res = null;

function check() {
    printjson(res);
    if (!res || !res.ok) {
        throw "check: not ok, stopping";
    }
}

function waitForSetHealthy() {
    print("waiting for repl set initiate to comlete...");
    while (true) {
        sleep(250);
        var res = rs.status();
        if (!res.ok)
            continue;
        var bad = false;
        for (var i = 0; i < res.members.length; i++) {
            var state = res.members[i].state;
            if (state != 1 && state != 2) {
                bad = true;
            }
        }
        if (!bad) {
            break;
        }
    }
}

function ourAddShard(setname, port) {
    db = connect("localhost:" + port + "/test");
    print(db.isMaster().me);
    res = rs.initiate(
        {
            "_id": setname,
            "members": [
                {_id: 0, host: "wbt.local:" + port},
                {_id: 1, host: "wbt.local:" + (port + 1)},
                {_id: 2, host: "wbt.local:" + (port + 2)}
            ]}
    );
    check();
    waitForSetHealthy();

    print("adding shard...");
    db = mongosConn;
    res = sh.addShard(setname + "/wbt.local:" + port);
    check();
    print("done;run sh.status()");
}

print("setup_script.js loaded");
print("list of existing shards before doing anything:");
print();
print("You can invoke:");
print("ourAddShard(setname, port)");
print();


