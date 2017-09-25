define(["require", "exports", "./preparesecond", "./preparefirst"], function (require, exports, preparesecond_1, preparefirst_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataOperations = /** @class */ (function () {
        function DataOperations() {
        }
        DataOperations.makeRequest = function (param, github) {
            if (param === void 0) { param = ''; }
            if (github === void 0) { github = false; }
            var url = "https://api.cdnjs.com/libraries";
            var githubUrl = 'https://api.github.com/repos';
            var myRequest = new XMLHttpRequest();
            if (param === '') {
                myRequest.open('GET', url);
                myRequest.onload = function () {
                    var data = JSON.parse(myRequest.responseText);
                    DataOperations.setPrimaryRequestData(JSON.stringify(data));
                    preparefirst_1.default.renderHTML(DataOperations.getInputFilter());
                };
                myRequest.send();
            }
            else {
                if (github === true) {
                    myRequest.open('GET', githubUrl + "/" + param[0] + "/" + param[1]);
                    myRequest.onload = function () {
                        var data = JSON.parse(myRequest.responseText);
                        DataOperations.setGitHubRequestData(JSON.stringify(data));
                        preparesecond_1.default.setPageContent();
                    };
                    myRequest.send();
                }
                else {
                    myRequest.open('GET', url + "/" + param);
                    myRequest.onload = function () {
                        var data = JSON.parse(myRequest.responseText);
                        DataOperations.setSecondaryRequestData(JSON.stringify(data));
                        var parameter = [];
                        var repo = DataOperations.getSecondaryRequestData().repository.url;
                        if (repo.indexOf('.git') === -1) {
                            if (repo.substr(repo.length - 1) !== '/') {
                                var repoSlice = repo.slice(repo.indexOf('github.com') + 11);
                            }
                            else {
                                var repoSlice = repo.slice(repo.indexOf('github.com') + 11, -1);
                            }
                        }
                        else {
                            var repoSlice = repo.slice(repo.indexOf('github.com') + 11, repo.indexOf('.git'));
                        }
                        parameter.push(repoSlice.slice(0, repoSlice.indexOf('/')));
                        parameter.push(repoSlice.slice(repoSlice.indexOf('/') + 1));
                        DataOperations.makeRequest(parameter, true);
                    };
                    myRequest.send();
                }
            }
            console.log('qsd');
        };
        DataOperations.getUrlParameter = function () {
            return sessionStorage.getItem("urlParameter");
        };
        DataOperations.getInputFilter = function () {
            return sessionStorage.getItem("inputFilter");
        };
        DataOperations.getPrimaryRequestData = function () {
            var data = sessionStorage.getItem("primaryRequestData");
            return JSON.parse(data);
        };
        DataOperations.getFilteredPrimaryRequestData = function () {
            var data = sessionStorage.getItem("filteredPrimaryRequestData");
            return JSON.parse(data);
        };
        DataOperations.getSecondaryRequestData = function () {
            var data = sessionStorage.getItem("secondaryRequestData");
            return JSON.parse(data);
        };
        DataOperations.getGitHubRequestData = function () {
            var data = sessionStorage.getItem("gitHubRequestData");
            return JSON.parse(data);
        };
        DataOperations.getIfToChangeFlag = function () {
            return sessionStorage.getItem("ifToChangeFlag");
        };
        DataOperations.getClickedFlag = function () {
            return sessionStorage.getItem("clickedFlag");
        };
        DataOperations.setUrlParameter = function (data) {
            sessionStorage.setItem("urlParameter", data);
        };
        DataOperations.setInputFilter = function (data) {
            sessionStorage.setItem("inputFilter", data);
        };
        DataOperations.setPrimaryRequestData = function (data) {
            sessionStorage.setItem("primaryRequestData", data);
        };
        DataOperations.setFilteredPrimaryRequestData = function (data) {
            sessionStorage.setItem("filteredPrimaryRequestData", data);
        };
        DataOperations.setSecondaryRequestData = function (data) {
            sessionStorage.setItem("secondaryRequestData", data);
        };
        DataOperations.setGitHubRequestData = function (data) {
            sessionStorage.setItem("gitHubRequestData", data);
        };
        DataOperations.setIfToChangeFlag = function (data) {
            sessionStorage.setItem("ifToChangeFlag", data);
        };
        DataOperations.setClickedFlag = function (data) {
            sessionStorage.setItem("clickedFlag", data);
        };
        return DataOperations;
    }());
    exports.DataOperations = DataOperations;
});
