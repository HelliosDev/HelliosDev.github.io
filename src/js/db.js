const database = idb.open("football_db", 1, upgradeDb => {
    if (!upgradeDb.objectStoreNames.contains("fav_teams")) {
        const teamsObjectStore = upgradeDb.createObjectStore("fav_teams", {
            keyPath: "id"
        });
        teamsObjectStore.createIndex("team_name", "name", {
            unique: false
        });
    }
});

const checkFavorite = id => {
    return new Promise((resolve, reject) => {
        database.then(db => {
            const tx = db.transaction('fav_teams', 'readonly');
            const store = tx.objectStore('fav_teams'); 
            return store.get(parseInt(id));
        }).then(data => {
            (data !== undefined) ? resolve("favorite") : reject("favorite_border");
        });
    });
}

const storeTeam = data => {
    database.then(db => {
        const tx = db.transaction('fav_teams', 'readwrite');
        const store = tx.objectStore('fav_teams');
        const item = {
            id: data.id,
            name: data.name,
            area: data.area,
            crestUrl: data.crestUrl,
            address: data.address,
            phone: data.phone,
            email: data.email,
            founded: data.founded,
            venue: data.venue,
            squad: data.squad
        };
        store.add(item);
        return tx.complete;
    }).then(() => {
        console.log("Data has been saved");
    }).catch(() => {
        console.log("Data has failed");
    });
}

const getAllTeams = () => {
    return new Promise((resolve, reject) => {
        database.then(db => {
            const tx = db.transaction('fav_teams', 'readonly');
            const store = tx.objectStore('fav_teams');
            return store.getAll();
        }).then(teams => {
            resolve(teams);
        });
    });
}

const getSavedTeamDetail = id => {
    return new Promise(function(resolve, reject) {
        database
            .then(db => {
                var tx = db.transaction("fav_teams", "readonly");
                var store = tx.objectStore("fav_teams");
                return store.get(parseInt(id));
            })
            .then(team => {
                resolve(team);
            });
    });
}

const destroyTeam = id => {
    database.then(db => {
        const tx = db.transaction('fav_teams', 'readwrite');
        const store = tx.objectStore('fav_teams');
        store.delete(parseInt(id))
        return tx.complete;
    }).then(() => {
        console.log('Item has been deleted');
    });
}