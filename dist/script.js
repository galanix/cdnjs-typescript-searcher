var myRequest = new XMLHttpRequest();
var myData;
var url = "https://api.cdnjs.com/libraries";
var placeForData = document.getElementById("dataHolder");
myRequest.open('GET', url);
myRequest.onload = function () {
    myData = JSON.parse(myRequest.responseText);
};
myRequest.send();
// 	Manipulates the page depending on
// input field value
function renderHTML(filter) {
    var filteredData = [];
    for (var i = 0; i < myData.results.length; i++) {
        if (myData.results[i].name.indexOf(filter) !== -1) {
            filteredData.push(myData.results[i]);
        }
    }
    if (filter.length > 1) {
        showFilteredData(filteredData);
    }
    else {
        if (filter == "") {
            showFilteredData(filteredData, false, true);
        }
        else {
            showFilteredData(filteredData, false);
        }
    }
}
// 	Filters the data
function sendForFiltering() {
    var elem = document.getElementById("text");
    var value = elem.value;
    sessionStorage.setItem("filter", value);
    renderHTML(value);
}
// 	Shows filtered data on a page (index.html)
function showFilteredData(data, ifShow, isEmptyString) {
    if (ifShow === void 0) { ifShow = true; }
    if (isEmptyString === void 0) { isEmptyString = false; }
    if (ifShow === true) {
        placeForData.innerHTML = "\n\t\t<tr>\n\t\t\t<th>Name</th>\n\t\t\t<th>Link</th>\n\t\t</tr>";
        var btnNum = 0;
        var btnId;
        for (var i = 0; i < data.length; i++) {
            btnNum += 1;
            btnId = "btn" + btnNum;
            placeForData.innerHTML += "\n\t\t\t\t<tr>\n\t\t\t\t\t<td class=\"btnCol\"><button class=\"btn waves-effect table-btn\" id=\"" + btnId + "\" onclick=\"redirectToNewPage(this.id)\">" + data[i].name + "</button></td>\n\t\t\t\t\t<td id=\"cont\">" + data[i].latest + "</td>\n\t\t\t\t</tr>\n\t\t\t";
        }
    }
    else {
        if (isEmptyString === true) {
            placeForData.innerHTML = "";
            return;
        }
        else if (isEmptyString === false) {
            placeForData.innerHTML = "Please, write MORE than just one letter";
        }
    }
    sessionStorage.setItem("primaryData", JSON.stringify(data));
}
// 	Gets new-request data for newpage.html 
function getDataFromNewRequest(param) {
    var newUrl = url + "/" + param;
    var newRequest = new XMLHttpRequest();
    newRequest.open('GET', newUrl);
    newRequest.onload = function () {
        sendInfoToSessionStorage(param, JSON.parse(newRequest.responseText));
    };
    newRequest.send();
}
// 	Saves new-request data to the session storage
function sendInfoToSessionStorage(param, data) {
    sessionStorage.setItem('parameter', param);
    sessionStorage.setItem('data', JSON.stringify(data));
    setPageContent();
}
// 	Redirects to newpage.html and desides
// if it was opened by click or by link
function redirectToNewPage(id) {
    var button = document.getElementById("" + id);
    var param = button.innerText.toLowerCase();
    sessionStorage.setItem("clicked", "true");
    var w = window.open("newpage.html#" + param);
}
// 	Starts the operations with newpage.html
function workOnNewPage() {
    var myUrl = window.location.href;
    var urlArray = myUrl.split('#');
    var parameter = urlArray[1];
    getDataFromNewRequest(parameter);
}
// 	Fills the newpage.html
function setPageContent() {
    var data = JSON.parse(sessionStorage.getItem("data"));
    var filter = sessionStorage.getItem("filter");
    var button = document.getElementById("backBtn");
    var versionLinkPrimary = "https://cdnjs.cloudflare.com/ajax/libs/";
    if (sessionStorage.getItem("clicked") === "true") {
        button.innerText = "Back to " + filter;
        button.onclick = function () {
            sessionStorage.setItem("ifToChange", "true");
            location.replace("index.html");
        };
    }
    else {
        button.onclick = function () {
            location.replace("index.html");
        };
    }
    //verifications if there are such properties
    if (data.author !== undefined) {
        if (data.author.name === undefined) {
            var author = data.author;
        }
        else {
            var author = data.author.name;
        }
    }
    else {
        var author = "The author is not specified";
    }
    if (data.description !== undefined) {
        var description = data.description;
    }
    else {
        var description = "The description is not specified";
    }
    if (data.homepage !== undefined) {
        var homepage = data.homepage;
    }
    else {
        var homepage = "The homepage is not specified";
    }
    if (data.license !== undefined) {
        var license = data.license;
    }
    else {
        var license = "The license is not specified";
    }
    if (data.keywords !== undefined) {
        var keywords = data.keywords;
    }
    else {
        var keywords = "The keywords is not specified";
    }
    if (data.version !== undefined) {
        var version = data.version;
    }
    else {
        var version = "The version is not specified";
    }
    if (data.repository.url !== undefined) {
        var repository = data.repository.url;
    }
    else {
        var repository = "The repository is not specified";
    }
    var placeForData = document.getElementById("newDataHolder");
    placeForData.innerHTML = "\n\t\t<ul class=\"collection with-header\">\n\t\t\t<li class=\"collection-header\"><h4>" + data.name + "</h4></li>\n\t\t\t<li class=\"collection-item\"><b>Name:</b> " + data.name + "</li>\n\t\t\t<li class=\"collection-item\"><b>Description:</b> " + description + "</li>\n\t\t\t<li class=\"collection-item\"><b>Author:</b> " + author + "</li>\n\t\t\t<li class=\"collection-item\"><b>Homepage:</b> " + homepage + "</li>\n\t\t\t<li class=\"collection-item\"><b>License:</b> " + license + "</li>\n\t\t\t<li class=\"collection-item\"><b>Keywords:</b> " + keywords + "</li>\n\t\t\t<li class=\"collection-item\"><b>Version:</b> " + version + "</li>\n\t\t\t<li class=\"collection-item\"><b>Repository:</b> " + repository + "</li>\n\t\t\t<li class=\"collection-item\"><b>Versions list:</b><span id=\"versionLink\"></span>\n\t\t\t\t<ul id=\"list\"></ul>\n\t\t\t</li>\n\t\t</ul>\n\t";
    var placeForAssets = document.getElementById("list");
    for (var i = 0; i < data.assets.length; i++) {
        placeForAssets.innerHTML += "\n\t\t\t<div class=\"chip\" onclick=\"toggleVersionLink(' " + versionLinkPrimary + data.name + "/" + data.assets[i].version + "/" + data.name + ".js')\">\n\t\t\t\t" + data.assets[i].version + "\n\t\t\t</div>\n\t\t";
    }
    sessionStorage.setItem("clicked", "false");
}
function toggleVersionLink(link) {
    var placeForLink = document.getElementById("versionLink");
    placeForLink.innerHTML = link;
}
// 	Activates MaterializeCSS input label
function activate() {
    var label = document.getElementById("activate");
    label.classList.add("active");
}
// Deactivates MaterializeCSS input label
function deactivate() {
    var label = document.getElementById("activate");
    var input = document.getElementById("text");
    if (input.value.length > 0) {
        return;
    }
    label.classList.remove("active");
}
// 	Decides if to load content 
// (after click on "BACK TO THE SEARCH" button)
// to the main page or not to load
function inputManipulation() {
    var data = JSON.parse(sessionStorage.getItem("primaryData"));
    var label = document.getElementById("activate");
    var input = document.getElementById("text");
    if (sessionStorage.getItem("ifToChange") === "true") {
        input.value = sessionStorage.getItem("filter");
        placeForData.innerHTML = "\n\t\t<tr>\n\t\t\t<th>Name</th>\n\t\t\t<th>Link</th>\n\t\t</tr>";
        var btnNum = 0;
        var btnId;
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            btnNum += 1;
            btnId = "btn" + btnNum;
            placeForData.innerHTML += "\n\t\t\t\t<tr>\n\t\t\t\t\t<td><button class=\"btn waves-effect\" id=\"" + btnId + "\" onclick=\"redirectToNewPage(this.id)\">" + data[i].name + "</button></td>\n\t\t\t\t\t<td>" + data[i].latest + "</td>\n\t\t\t\t</tr>\n\t\t\t";
        }
    }
    else {
        input.value = "";
    }
    if (input.value.length > 0) {
        label.classList.add("active");
    }
    sessionStorage.setItem("ifToChange", "false");
}
;
