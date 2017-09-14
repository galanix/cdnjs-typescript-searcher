define(["require", "exports", "./preparesecond"], function (require, exports, preparesecond_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                    preparesecond_1.default.setPageContent();
                };
                myRequest.send();
            }
            console.log('qsd');
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
    exports.DataOperations = DataOperations;
});
