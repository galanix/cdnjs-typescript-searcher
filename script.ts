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
			<li class="collection-item"><b>Versions list:</b>
				<ul id="list"></ul>
			</li>
		</ul>
	`;

	var placeForAssets = <HTMLInputElement>document.getElementById("list");
	for (var i = 0; i < data.assets.length; i++) {
		if (i === data.assets.length - 1) {
			placeForAssets.innerHTML += `${data.assets[i].version}`;
		} else {
			placeForAssets.innerHTML += `${data.assets[i].version}, `;
		}
	}

	sessionStorage.setItem("clicked", "false");
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