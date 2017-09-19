define(["require", "exports", "./dataoperations", "./preparesecond"], function (require, exports, dataoperations_1, preparesecond_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FirstPagePreparing = /** @class */ (function () {
        function FirstPagePreparing() {
        }
        FirstPagePreparing.renderHTML = function (filter) {
            var filteredData = [];
            var myData = dataoperations_1.DataOperations.getPrimaryRequestData();
            for (var i = 0; i < myData.results.length; i++) {
                if (myData.results[i].name.indexOf(filter) !== -1) {
                    filteredData.push(myData.results[i]);
                }
            }
            if (filter.length > 1) {
                if (filteredData.length !== 0) {
                    FirstPagePreparing.showFilteredData(filteredData);
                }
                else {
                    FirstPagePreparing.showFilteredData(filteredData, true, false, false);
                }
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
        FirstPagePreparing.showFilteredData = function (data, ifShow, isEmptyString, areThereAnyResults) {
            if (ifShow === void 0) { ifShow = true; }
            if (isEmptyString === void 0) { isEmptyString = false; }
            if (areThereAnyResults === void 0) { areThereAnyResults = true; }
            var placeForData = document.getElementById("dataHolder");
            if (ifShow === true) {
                if (areThereAnyResults === true) {
                    placeForData.innerHTML = '';
                    setTimeout(function () {
                        $('#progress').css('display', 'none');
                        placeForData.innerHTML = "\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<th>Name</th>\n\t\t\t\t\t\t\t<th>Link</th>\n\t\t\t\t\t\t</tr>";
                        var btnNum = 0;
                        var btnId;
                        for (var i = 0; i < data.length; i++) {
                            btnNum += 1;
                            btnId = "btn" + btnNum;
                            placeForData.innerHTML += "\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td class=\"btnCol\"><button class=\"btn waves-effect table-btn to-new-page\" id=\"" + btnId + "\">" + data[i].name + "</button></td>\n\t\t\t\t\t\t\t\t<td class=\"content\">" + data[i].latest + "</td>\n\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t\t<span class=\"tooltiptext\" data-tooltip=\"tooltip" + i + "\">Copied!</span>\n\t\t\t\t\t\t\t\t\t\t<a class=\"btn btn-floating btn-copy\" data-link=\"" + data[i].latest + "\" data-tooltip=\"tooltip" + i + "\"><i class=\"material-icons\">content_copy</i></a>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t";
                        }
                        var copyButtons = document.getElementsByClassName('btn-copy');
                        for (var j = 0; j < copyButtons.length; j++) {
                            copyButtons[j].addEventListener("click", function () {
                                var $temp = $("<input>");
                                $("body").append($temp);
                                $temp.val(this.attributes[1].value).select();
                                document.execCommand("copy");
                                $temp.remove();
                                var tooltips = $('.tooltiptext');
                                for (var k = 0; k < tooltips.length; k++) {
                                    if (tooltips[k].attributes[1].value === this.attributes[2].value) {
                                        var selector = ".tooltiptext[data-tooltip='" + tooltips[k].attributes[1].value + "']";
                                        $(selector.toString()).css('display', 'inline');
                                        $(selector.toString()).fadeTo('slow', 1);
                                        setTimeout(function () {
                                            $(selector.toString()).fadeTo('slow', 0);
                                        }, 2000);
                                    }
                                    ;
                                }
                                ;
                            });
                        }
                        ;
                        $(document).ready(function () {
                            var buttons = document.getElementsByClassName('to-new-page');
                            for (var i = 0; i < buttons.length; i++) {
                                buttons[i].addEventListener("click", function () {
                                    preparesecond_1.default.redirectToNewPage(this.id);
                                });
                            }
                        });
                    }, 500);
                }
                else {
                    $('#progress').css('display', 'none');
                    placeForData.innerHTML = 'Nothing found';
                }
            }
            else {
                if (isEmptyString === true) {
                    $('#progress').css('display', 'none');
                    placeForData.innerHTML = "";
                    return;
                }
                else if (isEmptyString === false) {
                    $('#progress').css('display', 'none');
                    placeForData.innerHTML = "Please, write MORE than just one letter";
                }
            }
            dataoperations_1.DataOperations.setFilteredPrimaryRequestData(JSON.stringify(data));
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
            var data = dataoperations_1.DataOperations.getFilteredPrimaryRequestData();
            var label = document.getElementById("activate");
            var input = document.getElementById("text");
            if (dataoperations_1.DataOperations.getIfToChangeFlag() === "true") {
                input.value = dataoperations_1.DataOperations.getInputFilter();
                placeForData.innerHTML = "\n\t\t\t<tr>\n\t\t\t\t<th>Name</th>\n\t\t\t\t<th>Link</th>\n\t\t\t</tr>";
                var btnNum = 0;
                var btnId;
                for (var i = 0; i < data.length; i++) {
                    btnNum += 1;
                    btnId = "btn" + btnNum;
                    placeForData.innerHTML += "\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td class=\"btnCol\"><button class=\"btn waves-effect table-btn to-new-page\" id=\"" + btnId + "\">" + data[i].name + "</button></td>\n\t\t\t\t\t\t<td class=\"content\">" + data[i].latest + "</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<span class=\"tooltiptext\" data-tooltip=\"tooltip" + i + "\">Copied!</span>\n\t\t\t\t\t\t\t\t<a class=\"btn btn-floating btn-copy\" data-link=\"" + data[i].latest + "\" data-tooltip=\"tooltip" + i + "\"><i class=\"material-icons\">content_copy</i></a>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t";
                }
                var copyButtons = document.getElementsByClassName('btn-copy');
                for (var j = 0; j < copyButtons.length; j++) {
                    copyButtons[j].addEventListener("click", function () {
                        var $temp = $("<input>");
                        $("body").append($temp);
                        $temp.val(this.attributes[1].value).select();
                        document.execCommand("copy");
                        $temp.remove();
                        var tooltips = $('.tooltiptext');
                        for (var k = 0; k < tooltips.length; k++) {
                            if (tooltips[k].attributes[1].value === this.attributes[2].value) {
                                var selector = ".tooltiptext[data-tooltip='" + tooltips[k].attributes[1].value + "']";
                                $(selector.toString()).css('display', 'inline');
                                $(selector.toString()).fadeTo('slow', 1);
                                setTimeout(function () {
                                    $(selector.toString()).fadeTo('slow', 0);
                                }, 2000);
                            }
                            ;
                        }
                        ;
                    });
                }
                ;
                $(document).ready(function () {
                    var buttons = document.getElementsByClassName('to-new-page');
                    for (var i = 0; i < buttons.length; i++) {
                        buttons[i].addEventListener("click", function () {
                            preparesecond_1.default.redirectToNewPage(this.id);
                        });
                    }
                });
            }
            else {
                input.value = "";
            }
            if (input.value.length > 0) {
                label.classList.add("active");
            }
            dataoperations_1.DataOperations.setIfToChangeFlag("false");
        };
        ;
        return FirstPagePreparing;
    }());
    exports.default = FirstPagePreparing;
});
