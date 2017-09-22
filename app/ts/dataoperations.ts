import prepareSecond from './preparesecond';

export class DataOperations {
	public static makeRequest(param: any = '', github: boolean = false) {
		var url: string = `https://api.cdnjs.com/libraries`;
		var githubUrl: string = 'https://api.github.com/repos';
		var myRequest = new XMLHttpRequest();

		if (param === '') {
			myRequest.open('GET', url);
			myRequest.onload = function () {
			    var data = JSON.parse(myRequest.responseText);
			    DataOperations.setPrimaryRequestData(JSON.stringify(data));
			};
			myRequest.send();
		} else {
			if (github === true) {
				myRequest.open('GET', `${githubUrl}/${param[0]}/${param[1]}`);
				myRequest.onload = function () {
					var data = JSON.parse(myRequest.responseText);
				    DataOperations.setGitHubRequestData(JSON.stringify(data));
				    prepareSecond.setPageContent();
				};
				myRequest.send();
			} else {
				myRequest.open('GET', `${url}/${param}`);
				myRequest.onload = function () {
					var data = JSON.parse(myRequest.responseText);
				    DataOperations.setSecondaryRequestData(JSON.stringify(data));

				    var parameter = [];
				    var repo = DataOperations.getSecondaryRequestData().repository.url;
				    if (repo.indexOf('.git') === -1) {
				    	if (repo.substr(repo.length - 1) !== '/') {
				    		var repoSlice = repo.slice(repo.indexOf('github.com') + 11, );
				    	} else {
				    		var repoSlice = repo.slice(repo.indexOf('github.com') + 11, -1);
				    	}
				    } else {
				    	var repoSlice = repo.slice(repo.indexOf('github.com') + 11, repo.indexOf('.git'))
				    }
					parameter.push(repoSlice.slice(0, repoSlice.indexOf('/')));
					parameter.push(repoSlice.slice(repoSlice.indexOf('/') + 1, ));
					DataOperations.makeRequest(parameter, true);
				};
				myRequest.send();
			}
		}
		console.log('qsd');
	}
	public static getUrlParameter() {
		return sessionStorage.getItem("urlParameter");
	}

	public static getInputFilter() {
		return sessionStorage.getItem("inputFilter");
	}

	public static getPrimaryRequestData() {
		var data = sessionStorage.getItem("primaryRequestData");
		return JSON.parse(data);
	}

	public static getFilteredPrimaryRequestData() {
		var data = sessionStorage.getItem("filteredPrimaryRequestData");
		return JSON.parse(data);
	}

	public static getSecondaryRequestData() {
		var data = sessionStorage.getItem("secondaryRequestData");
		return JSON.parse(data);
	}

	public static getGitHubRequestData() {
		var data = sessionStorage.getItem("gitHubRequestData");
		return JSON.parse(data);
	}

	public static getIfToChangeFlag() {
		return sessionStorage.getItem("ifToChangeFlag");
	}
	
	public static getClickedFlag() {
		return sessionStorage.getItem("clickedFlag");
	}

	public static setUrlParameter(data: any) {
		sessionStorage.setItem("urlParameter", data);
	}

	public static setInputFilter(data: any) {
		sessionStorage.setItem("inputFilter", data);
	}

	public static setPrimaryRequestData(data: any) {
		sessionStorage.setItem("primaryRequestData", data);
	}

	public static setFilteredPrimaryRequestData(data: any) {
		sessionStorage.setItem("filteredPrimaryRequestData", data);
	}

	public static setSecondaryRequestData(data: any) {
		sessionStorage.setItem("secondaryRequestData", data);
	}

	public static setGitHubRequestData(data: any) {
		sessionStorage.setItem("gitHubRequestData", data);
	}

	public static setIfToChangeFlag(data: string) {
		sessionStorage.setItem("ifToChangeFlag", data);
	}

	public static setClickedFlag(data: string) {
		sessionStorage.setItem("clickedFlag", data);
	}
}