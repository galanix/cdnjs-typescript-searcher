/*
var myRequest = new XMLHttpRequest();
var myData: any;
var url: string = `https://api.cdnjs.com/libraries`;
var placeForData = <HTMLInputElement>document.getElementById("dataHolder");

myRequest.open('GET', url);
myRequest.onload = function () {
    myData = JSON.parse(myRequest.responseText);
};
myRequest.send();

// 	Manipulates the page depending on
// input field value
function renderHTML(filter: any) {
    var filteredData = [];

    for (var i = 0; i < myData.results.length; i++) {
        if (myData.results[i].name.indexOf(filter) !== -1) {
            filteredData.push(myData.results[i])
        }
    }

    if (filter.length > 1) {
        showFilteredData(filteredData);
    } else {
        if (filter == "") {
            showFilteredData(filteredData, false, true)
        } else {
            showFilteredData(filteredData, false)
        }
    }
}

// 	Filters the data
function sendForFiltering() {
    var elem = <HTMLInputElement>document.getElementById("text");
    var value = elem.value;
    sessionStorage.setItem("filter", value);

    renderHTML(value);
}

// 	Shows filtered data on a page (index.html)
function showFilteredData(data: any, ifShow: boolean = true, isEmptyString: boolean = false) {
    if (ifShow === true) {
        placeForData.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Link</th>
        </tr>`;

        var btnNum: number = 0;
        var btnId: string;

        for (var i = 0; i < data.length; i++) {
            btnNum += 1;
            btnId = `btn${btnNum}`
            placeForData.innerHTML += `
                <tr>
                    <td class="btnCol"><button class="btn waves-effect table-btn" id="${btnId}" onclick="redirectToNewPage(this.id)">${data[i].name}</button></td>
                    <td id="cont">${data[i].latest}</td>
                </tr>
            `
        }
    } else {
        if (isEmptyString === true) {
            placeForData.innerHTML = ``;
            return;
        } else if (isEmptyString === false) {
            placeForData.innerHTML = `Please, write MORE than just one letter`;
        }
    }

    sessionStorage.setItem("primaryData", JSON.stringify(data));
}

// 	Gets new-request data for newpage.html
function getDataFromNewRequest(param: string): any {
    var newUrl: string = `${url}/${param}`;
    var newRequest = new XMLHttpRequest();

    newRequest.open('GET', newUrl);
    newRequest.onload = function () {
        sendInfoToSessionStorage(param, JSON.parse(newRequest.responseText));
    };
    newRequest.send();
}

// 	Saves new-request data to the session storage
function sendInfoToSessionStorage(param: string, data: any) {
    sessionStorage.setItem('parameter', param);
    sessionStorage.setItem('data', JSON.stringify(data));
    setPageContent();
}

// 	Redirects to newpage.html and desides
// if it was opened by click or by link
function redirectToNewPage(id: string) {
    var button = <HTMLInputElement>document.getElementById(`${id}`);
    var param: string = button.innerText.toLowerCase();

    sessionStorage.setItem("clicked", "true");
    var w = window.open(`newpage.html#${param}`);
}

// 	Starts the operations with newpage.html
function workOnNewPage() {
    var myUrl: string = window.location.href;
    var urlArray = myUrl.split('#');
    var parameter = urlArray[1];

    getDataFromNewRequest(parameter);
}

// 	Fills the newpage.html
function setPageContent() {
    var data: any = JSON.parse(sessionStorage.getItem("data"));
    var filter = sessionStorage.getItem("filter");
    var button = <HTMLInputElement>document.getElementById("backBtn");
    var versionLinkPrimary = "https://cdnjs.cloudflare.com/ajax/libs/"

    if (sessionStorage.getItem("clicked") === "true") {
        button.innerText = `Back to ${filter}`;
        button.onclick = function() {
            sessionStorage.setItem("ifToChange", "true");
            location.replace("index.html");
        }
    } else {
        button.onclick = function() {
            location.replace("index.html");
        }
    }

    //verifications if there are such properties
    if (data.author !== undefined) {
        if (data.author.name === undefined) {
            var author = data.author;
        } else {
            var author = data.author.name;
        }
    } else {
        var author: any = "The author is not specified";
    }

    if (data.description !== undefined) {
        var description = data.description;
    } else {
        var description: any = "The description is not specified";
    }

    if (data.homepage !== undefined) {
        var homepage = data.homepage;
    } else {
        var homepage: any = "The homepage is not specified";
    }

    if (data.license !== undefined) {
        var license = data.license;
    } else {
        var license: any = "The license is not specified";
    }

    if (data.keywords !== undefined) {
        var keywords = data.keywords;
    } else {
        var keywords: any = "The keywords is not specified";
    }

    if (data.version !== undefined) {
        var version = data.version;
    } else {
        var version: any = "The version is not specified";
    }

    if (data.repository.url !== undefined) {
        var repository = data.repository.url;
    } else {
        var repository: any = "The repository is not specified";
    }

    var placeForData = <HTMLInputElement>document.getElementById("newDataHolder");

    placeForData.innerHTML = `
        <ul class="collection with-header">
            <li class="collection-header"><h4>${data.name}</h4></li>
            <li class="collection-item"><b>Name:</b> ${data.name}</li>
            <li class="collection-item"><b>Description:</b> ${description}</li>
            <li class="collection-item"><b>Author:</b> ${author}</li>
            <li class="collection-item"><b>Homepage:</b> ${homepage}</li>
            <li class="collection-item"><b>License:</b> ${license}</li>
            <li class="collection-item"><b>Keywords:</b> ${keywords}</li>
            <li class="collection-item"><b>Version:</b> ${version}</li>
            <li class="collection-item"><b>Repository:</b> ${repository}</li>
            <li class="collection-item"><b>Versions list:</b><span id="versionLink"></span>
                <ul id="list"></ul>
            </li>
        </ul>
    `;

    var placeForAssets = <HTMLInputElement>document.getElementById("list");
    for (var i = 0; i < data.assets.length; i++) {
        placeForAssets.innerHTML += `
            <div class="chip" onclick="toggleVersionLink(' ${versionLinkPrimary}${data.name}/${data.assets[i].version}/${data.name}.js')">
                ${data.assets[i].version}
            </div>
        `;
    }

    sessionStorage.setItem("clicked", "false");
}

function toggleVersionLink(link: string){
    var placeForLink = <HTMLInputElement>document.getElementById("versionLink");
    placeForLink.innerHTML = link;
}

// 	Activates MaterializeCSS input label
function activate() {
    var label = <HTMLInputElement>document.getElementById("activate");
    label.classList.add("active");
}

// Deactivates MaterializeCSS input label
function deactivate() {
    var label = <HTMLInputElement>document.getElementById("activate");
    var input = <HTMLInputElement>document.getElementById("text");

    if (input.value.length > 0) {
        return;
    }
    label.classList.remove("active");
}

// 	Decides if to load content
// (after click on "BACK TO THE SEARCH" button)
// to the main page or not to load
function inputManipulation() {
    var data: any = JSON.parse(sessionStorage.getItem("primaryData"));
    var label = <HTMLInputElement>document.getElementById("activate");
    var input = <HTMLInputElement>document.getElementById("text");

    if (sessionStorage.getItem("ifToChange") === "true") {
        input.value = sessionStorage.getItem("filter");

        placeForData.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Link</th>
        </tr>`;

        var btnNum: number = 0;
        var btnId: string;
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            btnNum += 1;
            btnId = `btn${btnNum}`
            placeForData.innerHTML += `
                <tr>
                    <td><button class="btn waves-effect" id="${btnId}" onclick="redirectToNewPage(this.id)">${data[i].name}</button></td>
                    <td>${data[i].latest}</td>
                </tr>
            `
        }
    } else {
        input.value = "";
    }

    if (input.value.length > 0) {
        label.classList.add("active");
    }

    sessionStorage.setItem("ifToChange", "false");
};
*/
//-----------------------------------------------------------------------------------------------------------------------------------------------
var FirstPageUp = /** @class */ (function () {
    function FirstPageUp() {
    }
    FirstPageUp.prototype.sendForFiltering = function () {
        var elem = document.getElementById("text");
        var value = elem.value;
        DataOperations.makeRequest();
        DataOperations.setInputFilter(value);
        FirstPagePreparing.renderHTML(value);
    };
    return FirstPageUp;
}());
var FirstPagePreparing = /** @class */ (function () {
    function FirstPagePreparing() {
    }
    FirstPagePreparing.renderHTML = function (filter) {
        var filteredData = [];
        var myData = DataOperations.getPrimaryRequestData();
        for (var i = 0; i < myData.results.length; i++) {
            if (myData.results[i].name.indexOf(filter) !== -1) {
                filteredData.push(myData.results[i]);
            }
        }
        if (filter.length > 1) {
            FirstPagePreparing.showFilteredData(filteredData);
        }
        else {
            if (filter == "") {
                FirstPagePreparing.showFilteredData(filteredData, false, true);
            }
            else {
                FirstPagePreparing.showFilteredData(filteredData, false);
            }
        }
    };
    FirstPagePreparing.showFilteredData = function (data, ifShow, isEmptyString) {
        if (ifShow === void 0) { ifShow = true; }
        if (isEmptyString === void 0) { isEmptyString = false; }
        var placeForData = document.getElementById("dataHolder");
        if (ifShow === true) {
            placeForData.innerHTML = "\n\t\t\t<tr>\n\t\t\t\t<th>Name</th>\n\t\t\t\t<th>Link</th>\n\t\t\t</tr>";
            var btnNum = 0;
            var btnId;
            for (var i = 0; i < data.length; i++) {
                btnNum += 1;
                btnId = "btn" + btnNum;
                placeForData.innerHTML += "\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td class=\"btnCol\"><button class=\"btn waves-effect table-btn\" id=\"" + btnId + "\" onclick=\"SecondPagePreparing.redirectToNewPage(this.id)\">" + data[i].name + "</button></td>\n\t\t\t\t\t\t<td id=\"cont\">" + data[i].latest + "</td>\n\t\t\t\t\t</tr>\n\t\t\t\t";
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
        DataOperations.setFilteredPrimaryRequestData(JSON.stringify(data));
    };
    FirstPagePreparing.activate = function () {
        var label = document.getElementById("activate");
        label.classList.add("active");
    };
    FirstPagePreparing.deactivate = function () {
        var label = document.getElementById("activate");
        var input = document.getElementById("text");
        if (input.value.length > 0) {
            return;
        }
        label.classList.remove("active");
    };
    FirstPagePreparing.inputManipulation = function () {
        var placeForData = document.getElementById("dataHolder");
        var data = DataOperations.getFilteredPrimaryRequestData();
        var label = document.getElementById("activate");
        var input = document.getElementById("text");
        if (DataOperations.getIfToChangeFlag() === "true") {
            input.value = DataOperations.getInputFilter();
            placeForData.innerHTML = "\n\t\t\t<tr>\n\t\t\t\t<th>Name</th>\n\t\t\t\t<th>Link</th>\n\t\t\t</tr>";
            var btnNum = 0;
            var btnId;
            for (var i = 0; i < data.length; i++) {
                btnNum += 1;
                btnId = "btn" + btnNum;
                placeForData.innerHTML += "\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td><button class=\"btn waves-effect\" id=\"" + btnId + "\" onclick=\"SecondPagePreparing.redirectToNewPage(this.id)\">" + data[i].name + "</button></td>\n\t\t\t\t\t\t<td>" + data[i].latest + "</td>\n\t\t\t\t\t</tr>\n\t\t\t\t";
            }
        }
        else {
            input.value = "";
        }
        if (input.value.length > 0) {
            label.classList.add("active");
        }
        DataOperations.setIfToChangeFlag("false");
    };
    ;
    return FirstPagePreparing;
}());
var SecondPageUp = /** @class */ (function () {
    function SecondPageUp() {
        this.myUrl = window.location.href;
        this.urlArray = this.myUrl.split('#');
        this.parameter = this.urlArray[1];
    }
    SecondPageUp.prototype.showPage = function () {
        DataOperations.makeRequest(this.parameter);
    };
    return SecondPageUp;
}());
var SecondPagePreparing = /** @class */ (function () {
    function SecondPagePreparing() {
    }
    SecondPagePreparing.setPageContent = function () {
        console.log(DataOperations.getClickedFlag());
        var data = DataOperations.getSecondaryRequestData();
        var filter = DataOperations.getInputFilter();
        var button = document.getElementById("backBtn");
        var versionLinkPrimary = "https://cdnjs.cloudflare.com/ajax/libs/";
        console.log(DataOperations.getClickedFlag());
        if (DataOperations.getClickedFlag() === "true") {
            button.innerText = "Back to " + filter;
            button.onclick = function () {
                DataOperations.setIfToChangeFlag("true");
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
        placeForData.innerHTML = "\n\t\t\t<ul class=\"collection with-header\">\n\t\t\t\t<li class=\"collection-header\"><h4>" + data.name + "</h4></li>\n\t\t\t\t<li class=\"collection-item\"><b>Name:</b> " + data.name + "</li>\n\t\t\t\t<li class=\"collection-item\"><b>Description:</b> <span class=\"items\">" + description + "</span></li>\n\t\t\t\t<li class=\"collection-item\"><b>Author:</b> <span class=\"items\">" + author + "</span></li>\n\t\t\t\t<li class=\"collection-item\"><b>Homepage:</b> <span class=\"items\">" + homepage + "</span></li>\n\t\t\t\t<li class=\"collection-item\"><b>License:</b> <span class=\"items\">" + license + "</span></li>\n\t\t\t\t<li class=\"collection-item\"><b>Keywords:</b> <span class=\"items\">" + keywords + "</span></li>\n\t\t\t\t<li class=\"collection-item\"><b>Version:</b> <span class=\"items\">" + version + "</span></li>\n\t\t\t\t<li class=\"collection-item\"><b>Repository:</b> <span class=\"items\">" + repository + "</span></li>\n\t\t\t\t<li class=\"collection-item\"><b>Versions list:</b><span id=\"versionLink\"></span>\n\t\t\t\t\t<ul id=\"list\"></ul>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t";
        var items = document.getElementsByClassName("items");
        for (var i = 0; i < items.length; i++) {
            var text = items[i].innerHTML;
            if (text.indexOf("is not specified") !== -1) {
                items[i].classList.add("not-specified");
            }
        }
        var placeForAssets = document.getElementById("list");
        for (var i = 0; i < data.assets.length; i++) {
            placeForAssets.innerHTML += "\n\t\t\t\t<div class=\"chip\" onclick=\"SecondPagePreparing.toggleVersionLink(' " + versionLinkPrimary + data.name + "/" + data.assets[i].version + "/" + data.name + ".js')\">\n\t\t\t\t\t" + data.assets[i].version + "\n\t\t\t\t</div>\n\t\t\t";
        }
        DataOperations.setClickedFlag("false");
    };
    SecondPagePreparing.redirectToNewPage = function (id) {
        var button = document.getElementById("" + id);
        var param = button.innerText.toLowerCase();
        DataOperations.setClickedFlag("true");
        var w = window.open("newpage.html#" + param);
    };
    SecondPagePreparing.toggleVersionLink = function (link) {
        var placeForLink = document.getElementById("versionLink");
        placeForLink.innerHTML = link;
    };
    return SecondPagePreparing;
}());
var DataOperations = /** @class */ (function () {
    function DataOperations() {
    }
    DataOperations.makeRequest = function (param) {
        if (param === void 0) { param = ''; }
        var url = "https://api.cdnjs.com/libraries";
        var myRequest = new XMLHttpRequest();
        if (param === '') {
            myRequest.open('GET', url);
            myRequest.onload = function () {
                var data = JSON.parse(myRequest.responseText);
                DataOperations.setPrimaryRequestData(JSON.stringify(data));
            };
            myRequest.send();
        }
        else {
            myRequest.open('GET', url + "/" + param);
            myRequest.onload = function () {
                var data = JSON.parse(myRequest.responseText);
                DataOperations.setUrlParameter(param);
                DataOperations.setSecondaryRequestData(JSON.stringify(data));
                SecondPagePreparing.setPageContent();
            };
            myRequest.send();
        }
    };
    DataOperations.setUrlParameter = function (data) {
        sessionStorage.setItem("urlParameter", data);
    };
    DataOperations.getUrlParameter = function () {
        return sessionStorage.getItem("urlParameter");
    };
    DataOperations.setInputFilter = function (data) {
        sessionStorage.setItem("inputFilter", data);
    };
    DataOperations.getInputFilter = function () {
        return sessionStorage.getItem("inputFilter");
    };
    DataOperations.setPrimaryRequestData = function (data) {
        sessionStorage.setItem("primaryRequestData", data);
    };
    DataOperations.getPrimaryRequestData = function () {
        var data = sessionStorage.getItem("primaryRequestData");
        return JSON.parse(data);
    };
    DataOperations.setFilteredPrimaryRequestData = function (data) {
        sessionStorage.setItem("filteredPrimaryRequestData", data);
    };
    DataOperations.getFilteredPrimaryRequestData = function () {
        var data = sessionStorage.getItem("filteredPrimaryRequestData");
        return JSON.parse(data);
    };
    DataOperations.setSecondaryRequestData = function (data) {
        sessionStorage.setItem("secondaryRequestData", data);
    };
    DataOperations.getSecondaryRequestData = function () {
        var data = sessionStorage.getItem("secondaryRequestData");
        return JSON.parse(data);
    };
    DataOperations.setIfToChangeFlag = function (data) {
        sessionStorage.setItem("ifToChangeFlag", data);
    };
    DataOperations.getIfToChangeFlag = function () {
        return sessionStorage.getItem("ifToChangeFlag");
    };
    DataOperations.setClickedFlag = function (data) {
        sessionStorage.setItem("clickedFlag", data);
    };
    DataOperations.getClickedFlag = function () {
        return sessionStorage.getItem("clickedFlag");
    };
    return DataOperations;
}());
var first = new FirstPageUp;
var second = new SecondPageUp;
