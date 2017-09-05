var myRequest = new XMLHttpRequest();
var myData: any;

myRequest.open('GET', 'https://api.cdnjs.com/libraries');
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
	var placeForData = <HTMLInputElement>document.getElementById("dataHolder");

	if (ifShow === true) {
		placeForData.innerHTML = `
		<tr>
			<th>Name</th>
			<th>Link</th>
		</tr>`;
		for (var i = 0; i < data.length; i++) {
			placeForData.innerHTML += `
				<tr>
					<td>${data[i].name}</td>
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