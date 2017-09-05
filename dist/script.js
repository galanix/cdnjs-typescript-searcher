var myRequest = new XMLHttpRequest();
var myData;
myRequest.open('GET', 'https://api.cdnjs.com/libraries');
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
    var placeForData = document.getElementById("dataHolder");
    if (ifShow === true) {
        placeForData.innerHTML = "\n\t\t<tr>\n\t\t\t<th>Name</th>\n\t\t\t<th>Link</th>\n\t\t</tr>";
        for (var i = 0; i < data.length; i++) {
            placeForData.innerHTML += "\n\t\t\t\t<tr>\n\t\t\t\t\t<td>" + data[i].name + "</td>\n\t\t\t\t\t<td>" + data[i].latest + "</td>\n\t\t\t\t</tr>\n\t\t\t";
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
