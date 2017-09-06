var myRequest = new XMLHttpRequest();
var myData;
var url = "https://api.cdnjs.com/libraries";
var placeForData = document.getElementById("dataHolder");
myRequest.open('GET', url);
myRequest.onload = function () {
    myData = JSON.parse(myRequest.responseText);
};
myRequest.send();
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
function sendForFiltering() {
    var elem = document.getElementById("input");
    var value = elem.value;
    renderHTML(value);
}
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
            placeForData.innerHTML += "\n\t\t\t\t<tr>\n\t\t\t\t\t<td><button id=\"" + btnId + "\" onclick=\"redirectToNewPage(this.id)\">" + data[i].name + "</button></td>\n\t\t\t\t\t<td>" + data[i].latest + "</td>\n\t\t\t\t</tr>\n\t\t\t";
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
}
function getDataFromNewRequest(param) {
    var newUrl = url + "/" + param;
    var newRequest = new XMLHttpRequest();
    newRequest.open('GET', newUrl);
    newRequest.onload = function () {
        sendInfoToSessionStorage(param, JSON.parse(newRequest.responseText));
    };
    newRequest.send();
}
function sendInfoToSessionStorage(param, data) {
    sessionStorage.setItem('parameter', param);
    sessionStorage.setItem('data', JSON.stringify(data));
    console.log(param, data);
}
function redirectToNewPage(id) {
    var button = document.getElementById("" + id);
    var param = button.innerText;
    var w = window.open("newpage.html#" + param);
}
function workOnNewPage() {
    var myUrl = window.location.href;
    var urlArray = myUrl.split('#');
    var parameter = urlArray[1];
    getDataFromNewRequest(parameter);
    fillNewPage();
}
function fillNewPage() {
    setPageContent();
}
function setPageContent() {
    var data = JSON.parse(sessionStorage.getItem("data"));
    var placeForData = document.getElementById("newDataHolder");
    placeForData.innerHTML = "\n\t\t<ul>\n\t\t\t<li><b>Name:</b> " + data.name + "</li>\n\t\t\t<li><b>Description:</b> " + data.description + "</li>\n\t\t\t<li><b>Author:</b> " + data.author.name + "</li>\n\t\t\t<li><b>Homepage:</b> " + data.homepage + "</li>\n\t\t\t<li><b>License:</b> " + data.license + "</li>\n\t\t\t<li><b>Keywords:</b> " + data.keywords + "</li>\n\t\t\t<li><b>Version:</b> " + data.version + "</li>\n\t\t\t<li><b>Repository:</b> " + data.repository.url + "</li>\n\t\t\t<li><b>Versions list:</b>\n\t\t\t\t<ul id=\"list\"></ul>\n\t\t\t</li>\n\t\t</ul>\n\t";
    var placeForAssets = document.getElementById("list");
    for (var i = 0; i < data.assets.length; i++) {
        if (i === data.assets.length - 1) {
            placeForAssets.innerHTML += "" + data.assets[i].version;
        }
        else {
            placeForAssets.innerHTML += data.assets[i].version + ", ";
        }
    }
}
