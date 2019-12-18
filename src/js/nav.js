// Loading Page
const loadPage = page => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            let content = document.querySelector('#body-content');
            switch (this.status) {
                case 200:
                    switch (page) {
                        case "home":
                            getTeams();
                            break;
                        case "match":
                            getMatches();
                            break;
                        case "favorite":
                            getSavedTeams();
                            break;
                        default:
                            getTeams();
                            break;
                    }
                    content.innerHTML = xhttp.responseText;
                    break;
                case 404:
                    content.innerHTML = "<p>404! Page Not Found</p>"
                    break;
                default:
                    content.innerHTML = "<p>Oops! No page</p>";
                    break;
            }
        }
    }
    xhttp.open("GET", `../../pages/${page}.html`, true);
    xhttp.send();
}

// Loading Navigation
const loadNavigation = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status != 200) return;
    
            document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
                elm.innerHTML = xhttp.responseText;
            });

            document.querySelectorAll('.sidenav a, .topnav a').forEach(function(elm) {
                elm.addEventListener("click", event => {
                    const sidenav = document.querySelector('.sidenav');
                    M.Sidenav.getInstance(sidenav).close();
                    page = event.target.getAttribute("href").substr(1);
                    loadPage(page);
                })
            });
        }
    };
    xhttp.open("GET", "../../nav.html", true);
    xhttp.send();
}


// Main Navigation
document.addEventListener("DOMContentLoaded", () => {
    // Activate sidebar nav
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNavigation();

    let page = window.location.hash.substr(1);
    if (page == "") page="home";
    loadPage(page);
});
