const BASE_URL = "https://api.football-data.org/v2";
const API_KEY = "f716891a47964c68a5b16d8d519bb29a";

const status = response => response.status!== 200 ? Promise.reject(new Error(response.status)) : Promise.resolve(response);
const json = response => response.json();
const error = error => console.log(`Error: ${error}`);
const getData = url => {
    return fetch(url, {
        headers:{
                "X-Auth-Token": API_KEY
            }
        })
        .then(status)
        .then(json)
}


function getStandings() {
    const leagueId = 2021;
    if ("caches" in window) {
        caches.match(`${BASE_URL}/competitions/${leagueId}/standings`).then(response => {
            if (response) {
                response.json().then(data => {
                    let standingHtml = "";
                    const filteredStandings = data.standings.filter(standing => standing.type === "TOTAL");
                    filteredStandings[0].table.forEach(standing => {
                        standingHtml += `
                            <div class="col s12">
                                <div class="card center-align">
                                    <div class="card-content">
                                        <h5 class="teal white-text">${standing.position}</h5>
                                        <h5>${standing.team.name}</h5>
                                        <div class="row">
                                            <div class="col s4">
                                                <p>
                                                    <strong class="truncate">Won: ${standing.won}</strong>
                                                </p>
                                            </div>
                                            <div class="col s4">
                                                <p>
                                                    <strong class="truncate">Draw: ${standing.draw}</strong>
                                                </p>
                                            </div>
                                            <div class="col s4">
                                                <p>
                                                    <strong class="truncate">Lost: ${standing.lost}</strong>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                    document.getElementById("standings").innerHTML = standingHtml;
                })
            }
        });
    }
    getData(`${BASE_URL}/competitions/${leagueId}/standings`)
        .then(data => {
            let standingHtml = "";
            const filteredStandings = data.standings.filter(standing => standing.type === "TOTAL");
            filteredStandings[0].table.forEach(standing => {
                standingHtml += `
                    <div class="col s12">
                        <div class="card center-align">
                            <div class="card-content">
                                <h5 class="teal white-text">${standing.position}</h5>
                                <h5>${standing.team.name}</h5>
                                <div class="row">
                                    <div class="col s4">
                                        <p>
                                            <strong class="truncate">Won: ${standing.won}</strong>
                                        </p>
                                    </div>
                                    <div class="col s4">
                                        <p>
                                            <strong class="truncate">Draw: ${standing.draw}</strong>
                                        </p>
                                    </div>
                                    <div class="col s4">
                                        <p>
                                            <strong class="truncate">Lost: ${standing.lost}</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            document.getElementById("standings").innerHTML = standingHtml;
        })
        .catch(error);
}

function getTeams() {
    const leagueId = 2021;
    if ("caches" in window) {
        caches.match(`${BASE_URL}/competitions/${leagueId}/teams`).then(response => {
            if (response) {
                response.json().then(data => {
                    let teamHtml = "";
                    data.teams.forEach(team => {
                        let imageUrl = team.crestUrl;
                        imageUrl = imageUrl.replace(/^http:\/\//i, 'https://');
                        teamHtml += `
                            <div class="col s6 m12">
                                <a href="../../team.html?id=${team.id}">
                                    <div class="card center-align">
                                        <div class="card-image waves-effect waves-block waves-light">
                                            <img src="${imageUrl}" style="width:150px; height:150px;margin:auto;"/>
                                        </div>
                                        <div class="card-content">
                                            <span class="card-title truncate">${team.name}</span>
                                            <p class="teal white-text">${team.founded != null ? team.founded : "No Year"}</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        `;
                    });
                    document.getElementById("competitions").innerHTML = teamHtml;
                })
            }
        });
    }
    getData(`${BASE_URL}/competitions/${leagueId}/teams`)
        .then(data => {
            let teamHtml = "";
            data.teams.forEach(team => {
                let imageUrl = team.crestUrl;
                imageUrl = imageUrl.replace(/^http:\/\//i, 'https://');
                teamHtml += `
                    <div class="col s6 m12">
                        <a href="../../team.html?id=${team.id}">
                            <div class="card center-align">
                                <div class="card-image waves-effect waves-block waves-light">
                                    <img src="${imageUrl}" style="width:150px; height:150px;margin:auto;"/>
                                </div>
                                <div class="card-content">
                                    <span class="card-title truncate">${team.name}</span>
                                    <p class="teal white-text">${team.founded != null ? team.founded : "No Year"}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                `;
            });
            document.getElementById("competitions").innerHTML = teamHtml;
        })
        .catch(error);
}

function getTeamDetail() {
    return new Promise((resolve, reject) => {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");
        try {
            if ("caches" in window) {
                caches.match(`${BASE_URL}/teams/${idParam}`).then(response => {
                    if (response) {
                        response.json().then(data => {
                            let overviewHtml = "";
                            let playerHtml = "";
    
                            let imageUrl = data.crestUrl;
                            imageUrl = imageUrl.replace(/^http:\/\//i, 'https://');
    
                            overviewHtml += `
                            <div class="col s12">
                                <div class="center-align">
                                    <img src="${imageUrl}" style="width:300px; height:300px;"/>
                                    <h3>${data.name}</h3>
                                    <h5>${data.founded}</h5>
                                </div>
                                <div class="card">
                                    <div class="card-content">
                                        <span class="card-title"><strong>Venue</strong></span>
                                        <h5>${data.venue}</h5>
                                    </div>
                                </div>
                                <blockquote>
                                    <h5><em>${data.area.name}</em></h5>
                                    <p>
                                        <strong>Address</strong>
                                        <em>${data.address}</em>
                                    </p>
                                    <p>
                                        <strong>Email</strong>
                                        <em>${data.email}</em>
                                    </p>
                                    <p>
                                        <strong>Contact</strong>
                                        <em>${data.phone}</em>
                                    </p>
                                </blockquote>
                            </div>
                            `;
    
                            document.getElementById("tab-overview").innerHTML = overviewHtml;
    
                            data.squad
                                .filter(item => item.role === "PLAYER")
                                .forEach(player => {
                                playerHtml += `
                                    <li class="collection-item">
                                        <p class="teal white-text center-align">${player.position}</p>
                                        <h5 class="title">${player.name}</h5>
                                        <h6>${player.nationality}</h6>
                                        <p><strong>Shirt Number</strong> ${player.shirtNumber !== null ? player.shirtNumber : "No Number"}</p>
                                    </li>
                                        
                                `;
                            });
                            document.getElementById("squad-content").innerHTML = playerHtml;
                            resolve(data);
                        });
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
        getData(`${BASE_URL}/teams/${idParam}`)
            .then(data => {
                let overviewHtml = "";
                let playerHtml = "";

                let imageUrl = data.crestUrl;
                imageUrl = imageUrl.replace(/^http:\/\//i, 'https://');

                overviewHtml += `
                <div class="col s12">
                    <div class="center-align">
                        <img src="${imageUrl}" style="width:300px; height:300px;"/>
                        <h3>${data.name}</h3>
                        <h5>${data.founded}</h5>
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title"><strong>Venue</strong></span>
                            <h5>${data.venue}</h5>
                        </div>
                    </div>
                    <blockquote>
                        <h5><em>${data.area.name}</em></h5>
                        <p>
                            <strong>Address</strong>
                            <em>${data.address}</em>
                        </p>
                        <p>
                            <strong>Email</strong>
                            <em>${data.email}</em>
                        </p>
                        <p>
                            <strong>Contact</strong>
                            <em>${data.phone}</em>
                        </p>
                    </blockquote>
                </div>
                `;

                document.getElementById("tab-overview").innerHTML = overviewHtml;


                data.squad
                    .filter(item => item.role === "PLAYER")
                    .forEach(player => {
                    playerHtml += `
                        <li class="collection-item">
                            <p class="teal white-text center-align">${player.position}</p>
                            <h5 class="title">${player.name}</h5>
                            <h6>${player.nationality}</h6>
                            <p><strong>Shirt Number</strong> ${player.shirtNumber !== null ? player.shirtNumber : "No Number"}</p>
                        </li>
                            
                    `;
                });
                document.getElementById("squad-content").innerHTML = playerHtml;
                resolve(data);
            })
            .catch(error);
    });
}

function getSavedTeams() {
    getAllTeams().then(data => {
            let teamHtml = "";
            data.forEach(team => {
                let imageUrl = team.crestUrl;
                imageUrl = imageUrl.replace(/^http:\/\//i, 'https://');
                teamHtml += `
                    <div class="col s6 m12">
                        <a href="../../team.html?id=${team.id}">
                            <div class="card center-align">
                                <div class="card-image waves-effect waves-block waves-light">
                                    <img src="${imageUrl}" style="width:150px; height:150px;"/>
                                </div>
                                <div class="card-content">
                                    <span class="card-title truncate">${team.name}</span>
                                    <p class="teal white-text">${team.founded != null ? team.founded : "No Year"}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                `;
            });
            document.getElementById("fav-teams").innerHTML = teamHtml;
        })
        .catch(error);
}

