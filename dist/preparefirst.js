define(["require", "exports", "./dataoperations", "./preparesecond"], function (require, exports, dataoperations_1, preparesecond_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FirstPagePreparing = /** @class */ (function () {
        function FirstPagePreparing() {
        }
        FirstPagePreparing.renderHTML = function (filter) {
            var filteredData = [];
            var recommendedData = [];
            var myData = dataoperations_1.DataOperations.getPrimaryRequestData();
            for (var i = 0; i < myData.results.length; i++) {
                if (myData.results[i].name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
                    filteredData.push(myData.results[i]);
                }
            }
            if (filter.length > 1) {
                if (filteredData.length !== 0) {
                    FirstPagePreparing.showFilteredData(filteredData);
                }
                else {
                    for (var i = 0; i < filter.length; i++) {
                        var slicedFilter = filter.slice(0, i + 1);
                        var buffer = [];
                        for (var j = 0; j < myData.results.length; j++) {
                            if (myData.results[j].name.toLowerCase().indexOf(slicedFilter.toLowerCase()) !== -1) {
                                buffer.push(myData.results[j]);
                            }
                        }
                        if (buffer.length !== 0) {
                            recommendedData = buffer;
                        }
                    }
                    FirstPagePreparing.showFilteredData(myData, true, false, false, recommendedData);
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
        FirstPagePreparing.showFilteredData = function (data, ifShow, isEmptyString, areThereAnyResults, recommended) {
            if (ifShow === void 0) { ifShow = true; }
            if (isEmptyString === void 0) { isEmptyString = false; }
            if (areThereAnyResults === void 0) { areThereAnyResults = true; }
            if (recommended === void 0) { recommended = []; }
            var placeForData = document.getElementById("dataHolder");
            var placeForMessage = document.getElementById("message");
            if (ifShow === true) {
                if (areThereAnyResults === true) {
                    placeForMessage.innerHTML = '';
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
                    if (recommended.length === 0) {
                        var recommendedItem = data.results[Math.floor(Math.random() * data.total)];
                        $('#progress').css('display', 'none');
                        placeForData.innerHTML = '';
                        placeForMessage.innerHTML = "The input is incorrect. Try: <a id=\"recommend\">" + recommendedItem.name + "</a>.";
                        $('#recommend').click(function () {
                            var input = document.getElementById("text");
                            $('#progress').css('display', 'block');
                            dataoperations_1.DataOperations.setInputFilter(recommendedItem.name);
                            input.value = recommendedItem.name;
                            FirstPagePreparing.renderHTML(recommendedItem.name);
                        });
                    }
                    else {
                        var recommendedItem = recommended[Math.floor(Math.random() * recommended.length)];
                        $('#progress').css('display', 'none');
                        placeForData.innerHTML = '';
                        placeForMessage.innerHTML = "There is no such library. Maybe you meant: <a id=\"recommend\">" + recommendedItem.name + "</a>.";
                        $('#recommend').click(function () {
                            var input = document.getElementById("text");
                            $('#progress').css('display', 'block');
                            dataoperations_1.DataOperations.setInputFilter(recommendedItem.name);
                            input.value = recommendedItem.name;
                            FirstPagePreparing.renderHTML(recommendedItem.name);
                        });
                    }
                }
            }
            else {
                if (isEmptyString === true) {
                    $('#progress').css('display', 'none');
                    placeForMessage.innerHTML = "";
                    return;
                }
                else if (isEmptyString === false) {
                    $('#progress').css('display', 'none');
                    placeForData.innerHTML = '';
                    placeForMessage.innerHTML = "Please, write MORE than just one letter";
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
