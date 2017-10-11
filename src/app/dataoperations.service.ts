import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class DataoperationsService {

  constructor(private _http: Http) { }

  invokeEvent:Subject<any> = new Subject();

  makeRequest(param: any = '', github: boolean = false) {
		var url: string = `https://api.cdnjs.com/libraries`;
		var githubUrl: string = 'https://api.github.com/repos';
		var here = this;

		if (param === '') {
			return (this._http
  			.get(url)
  			.map((response) => response.json())
  			.toPromise())
  			.then((result) => {
	  			return result;
	  		})
	  		.catch((error) => console.error(error));
		} else {
			if (github === true) {
				return (this._http
	  			.get(`${githubUrl}/${param[0]}/${param[1]}`)
	  			.map((response) => response.json())
	  			.toPromise())
	  			.then((result) => {
		  			return result;
		  		})
		  		.catch((error) => console.error(error));
			} else {
				return (this._http
	  			.get(`${url}/${param}`)
	  			.map((response) => response.json())
	  			.toPromise())
	  			.then((result) => {	
				    here.setSecondaryRequestData(JSON.stringify(result));

				    var parameter = [];
				    var repo = here.getSecondaryRequestData().repository.url;
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
					return here.makeRequest(parameter, true)
						.then((result) => {
							return result
						})
						.catch((error) => console.error(error));
		  		})
		  		.catch((error) => console.error(error));
			}
		}
	}

	getUrlParameter() {
		return sessionStorage.getItem("urlParameter");
	}

	getInputFilter() {
		return sessionStorage.getItem("inputFilter");
	}

	getPrimaryRequestData() {
		var data = sessionStorage.getItem("primaryRequestData");
		return JSON.parse(data);
	}

	getFilteredPrimaryRequestData() {
		var data = sessionStorage.getItem("filteredPrimaryRequestData");
		return JSON.parse(data);
	}

	getSecondaryRequestData() {
		var data = sessionStorage.getItem("secondaryRequestData");
		return JSON.parse(data);
	}

	getGitHubRequestData() {
		var data = sessionStorage.getItem("gitHubRequestData");
		return JSON.parse(data);
	}

	getIfToChangeFlag() {
		return sessionStorage.getItem("ifToChangeFlag");
	}
	
	getClickedFlag() {
		return sessionStorage.getItem("clickedFlag");
	}

	setUrlParameter(data: any) {
		sessionStorage.setItem("urlParameter", data);
	}

	setInputFilter(data: any) {
		sessionStorage.setItem("inputFilter", data);
	}

	setPrimaryRequestData(data: any) {
		sessionStorage.setItem("primaryRequestData", data);
	}

	setFilteredPrimaryRequestData(data: any) {
		sessionStorage.setItem("filteredPrimaryRequestData", data);
	}

	setSecondaryRequestData(data: any) {
		sessionStorage.setItem("secondaryRequestData", data);
	}

	setGitHubRequestData(data: any) {
		sessionStorage.setItem("gitHubRequestData", data);
	}

	setIfToChangeFlag(data: string) {
		sessionStorage.setItem("ifToChangeFlag", data);
	}

	setClickedFlag(data: string) {
		sessionStorage.setItem("clickedFlag", data);
	}
}
