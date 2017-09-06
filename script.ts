var myRequest = new XMLHttpRequest();
var myData: any;
var url: string = `https://api.cdnjs.com/libraries`;
var placeForData = <HTMLInputElement>document.getElementById("dataHolder");



myRequest.open('GET', url);
myRequest.onload = function () {
    myData = JSON.parse(myRequest.responseText);
};
myRequest.send();

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

function sendForFiltering() {
	var elem = <HTMLInputElement>document.getElementById("input");
	var value = elem.value;

    renderHTML(value);
}

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
					<td><button id="${btnId}" onclick="redirectToNewPage(this.id)">${data[i].name}</button></td>
					<td>${data[i].latest}</td>
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
}

function getDataFromNewRequest(param: string): any {
	var newUrl: string = `${url}/${param}`;
	var newRequest = new XMLHttpRequest();

	newRequest.open('GET', newUrl);
	newRequest.onload = function () {
	    sendInfoToSessionStorage(param, JSON.parse(newRequest.responseText));
	};
	newRequest.send();
}

function sendInfoToSessionStorage(param: string, data: any) {
	sessionStorage.setItem('parameter', param);
	sessionStorage.setItem('data', JSON.stringify(data));
	console.log(param, data);
}

function redirectToNewPage(id: string) {
	var button = <HTMLInputElement>document.getElementById(`${id}`);
	var param: string = button.innerText;

	var w = window.open(`newpage.html#${param}`);
}

function workOnNewPage() {
	var myUrl: string = window.location.href;
	var urlArray = myUrl.split('#');
	var parameter = urlArray[1];

	getDataFromNewRequest(parameter);
	fillNewPage();
}

function fillNewPage() {
	setPageContent();
}

function setPageContent() {
	var data: any = JSON.parse(sessionStorage.getItem("data"));
	var placeForData = <HTMLInputElement>document.getElementById("newDataHolder");

	placeForData.innerHTML = `
		<ul>
			<li><b>Name:</b> ${data.name}</li>
			<li><b>Description:</b> ${data.description}</li>
			<li><b>Author:</b> ${data.author.name}</li>
			<li><b>Homepage:</b> ${data.homepage}</li>
			<li><b>License:</b> ${data.license}</li>
			<li><b>Keywords:</b> ${data.keywords}</li>
			<li><b>Version:</b> ${data.version}</li>
			<li><b>Repository:</b> ${data.repository.url}</li>
			<li><b>Versions list:</b>
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
}