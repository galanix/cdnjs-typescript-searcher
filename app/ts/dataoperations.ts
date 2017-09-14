import prepareSecond from './preparesecond';

export class DataOperations {
	public static makeRequest(param: string = '') {
		var url: string = `https://api.cdnjs.com/libraries`;
		var myRequest = new XMLHttpRequest();

		if (param === '') {
			myRequest.open('GET', url);
			myRequest.onload = function () {
			    var data = JSON.parse(myRequest.responseText);
			    DataOperations.setPrimaryRequestData(JSON.stringify(data));
			};
			myRequest.send();
		} else {
			myRequest.open('GET', `${url}/${param}`);
			myRequest.onload = function () {
				var data = JSON.parse(myRequest.responseText);
			    DataOperations.setUrlParameter(param);
			    DataOperations.setSecondaryRequestData(JSON.stringify(data));
			    prepareSecond.setPageContent();
			};
			myRequest.send();
		}
		console.log('qsd');
	}

	public static setUrlParameter(data: any) {
		sessionStorage.setItem("urlParameter", data);
	}

	public static getUrlParameter() {
		return sessionStorage.getItem("urlParameter");
	}

	public static setInputFilter(data: any) {
		sessionStorage.setItem("inputFilter", data);
	}

	public static getInputFilter() {
		return sessionStorage.getItem("inputFilter");
	}

	public static setPrimaryRequestData(data: any) {
		sessionStorage.setItem("primaryRequestData", data);
	}

	public static getPrimaryRequestData() {
		var data = sessionStorage.getItem("primaryRequestData");
		return JSON.parse(data);
	}

	public static setFilteredPrimaryRequestData(data: any) {
		sessionStorage.setItem("filteredPrimaryRequestData", data);
	}

	public static getFilteredPrimaryRequestData() {
		var data = sessionStorage.getItem("filteredPrimaryRequestData");
		return JSON.parse(data);
	}

	public static setSecondaryRequestData(data: any) {
		sessionStorage.setItem("secondaryRequestData", data);
	}

	public static getSecondaryRequestData() {
		var data = sessionStorage.getItem("secondaryRequestData");
		return JSON.parse(data);
	}

	public static setIfToChangeFlag(data: string) {
		sessionStorage.setItem("ifToChangeFlag", data);
	}

	public static getIfToChangeFlag() {
		return sessionStorage.getItem("ifToChangeFlag");
	}

	public static setClickedFlag(data: string) {
		sessionStorage.setItem("clickedFlag", data);
	}

	public static getClickedFlag() {
		return sessionStorage.getItem("clickedFlag");
	}
}