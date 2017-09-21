define(["require", "exports", "./dataoperations"], function (require, exports, dataoperations_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SecondPagePreparing = /** @class */ (function () {
        function SecondPagePreparing() {
        }
        SecondPagePreparing.setPageContent = function () {
            var data = dataoperations_1.DataOperations.getSecondaryRequestData();
            var filter = dataoperations_1.DataOperations.getInputFilter();
            var button = document.getElementById("backBtn");
            var versionLinkPrimary = "https://cdnjs.cloudflare.com/ajax/libs/";
            var placeForData = document.getElementById("newDataHolder");
            if (dataoperations_1.DataOperations.getClickedFlag() === "true") {
                button.innerHTML = "Back to " + filter;
                button.onclick = function () {
                    dataoperations_1.DataOperations.setIfToChangeFlag("true");
                    location.replace("index.html");
                };
            }
            else {
                button.onclick = function () {
                    location.replace("index.html");
                };
            }
            if ($.isEmptyObject(data)) {
                placeForData.innerHTML = "\n\t\t\t\t<div class=\"alert-box error\">\n\t\t\t\t\t<span>error: </span>\n\t\t\t\t\tThe URL is incorrect.\n\t\t\t\t</div>\n\t\t\t";
                return;
            }
            //verifications if there are such properties
            if (data.author !== undefined) {
                if (data.author.name === undefined) {
                    var author = data.author;
                }
                else {
                    var author = data.author.name;
                }
            }
            else {
                var author = "The author is not specified";
            }
            if (data.description !== undefined) {
                var description = data.description;
            }
            else {
                var description = "The description is not specified";
            }
            if (data.homepage !== undefined) {
                var homepage = data.homepage;
            }
            else {
                var homepage = "The homepage is not specified";
            }
            if (data.license !== undefined) {
                var license = data.license;
            }
            else {
                var license = "The license is not specified";
            }
            if (data.keywords !== undefined) {
                var keywords = data.keywords;
            }
            else {
                var keywords = "The keywords is not specified";
            }
            if (data.version !== undefined) {
                var version = data.version;
            }
            else {
                var version = "The version is not specified";
            }
            if (data.repository.url !== undefined) {
                var repository = data.repository.url;
            }
            else {
                var repository = "The repository is not specified";
            }
            placeForData.innerHTML = "\n\t\t\t<ul class=\"collection with-header\">\n\t\t\t\t<li class=\"collection-header\"><h4>" + data.name + "</h4></li>\n\t\t\t\t<li class=\"collection-item\"><b>Name:</b> " + data.name + "</li>\n\t\t\t\t<li class=\"collection-item\"><b>Description:</b> <span class=\"items\">" + description + "</span></li>\n\t\t\t\t<li class=\"collection-item\"><b>Author:</b> <span class=\"items\">" + author + "</span></li>\n\t\t\t\t<li class=\"collection-item\"><b>Homepage:</b> <span class=\"items\">" + homepage + "</span></li>\n\t\t\t\t<li class=\"collection-item\"><b>License:</b> <span class=\"items\">" + license + "</span></li>\n\t\t\t\t<li class=\"collection-item\"><b>Keywords:</b> <span class=\"items\">" + keywords + "</span></li>\n\t\t\t\t<li class=\"collection-item\"><b>Version:</b> <span class=\"items\">" + version + "</span></li>\n\t\t\t\t<li class=\"collection-item\"><b>Repository:</b> <span class=\"items\">" + repository + "</span></li>\n\t\t\t\t<li class=\"collection-item\"><b>Versions list:</b><span id=\"versionLink\"></span>\n\t\t\t\t\t<ul id=\"list\"></ul>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t";
            var items = document.getElementsByClassName("items");
            for (var i = 0; i < items.length; i++) {
                var text = items[i].innerHTML;
                if (text.indexOf("is not specified") !== -1) {
                    items[i].classList.add("not-specified");
                }
            }
            var placeForAssets = document.getElementById("list");
            for (var i = 0; i < data.assets.length; i++) {
                placeForAssets.innerHTML += "\n\t\t\t\t<button class='chip' data-id=\"" + versionLinkPrimary + data.name + "/" + data.assets[i].version + "/\" \n\t\t\t\tid=\"modalTrigger\">" + data.assets[i].version + "</button>\n\t\t\t";
            }
            var chips = document.getElementsByClassName('chip');
            for (var i = 0; i < chips.length; i++) {
                chips[i].addEventListener('click', function () {
                    var version = this.textContent;
                    var baseUri = this.attributes[1].value;
                    $('body').css('overflow-y', 'hidden');
                    $('.the-modal-header h3').text('Version: ' + version);
                    for (var j = 0; j < data.assets.length; j++) {
                        if (data.assets[j].version === version) {
                            $('.the-modal-body ul').empty();
                            $("<li class=\"collection-header\"><h5>Links:</h5>\n\t\t\t\t\t\t\t\t<span class=\"question bounce quest-768px\"></span>\n\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t<span class=\"tooltip-question\">CLICK for the link copying or DBLCLICK for the script tag copying.</span>\n\t\t\t\t\t\t\t\t\t<span class=\"question bounce\"></span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<p class=\"tooltip-quest-768px\">CLICK for the link copying or DBLCLICK for the script tag copying.</p>\n\t\t\t\t\t\t\t</li>").appendTo('.the-modal-body ul');
                            for (var k = 0; k < data.assets[j].files.length; k++) {
                                $("<li class=\"collection-item modal-collection\">\n\t\t\t\t\t\t\t\t\t<span class=\"link\">" + (baseUri + data.assets[j].files[k]) + "</span>\n\t\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t\t<span class=\"tooltiptext\" data-tooltip=\"tooltip" + k + "\">Copied!</span>\n\t\t\t\t\t\t\t\t\t\t<a class=\"btn btn-floating btn-copy\" data-link=\"" + (baseUri + data.assets[j].files[k]) + "\" data-tooltip=\"tooltip" + k + "\">\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">content_copy</i>\n\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</li>").appendTo('.the-modal-body ul');
                            }
                        }
                    }
                    $('.question').hover(function () {
                        $('.tooltip-question').fadeTo('fast', 1);
                    }, function () {
                        $('.tooltip-question').fadeTo('fast', 0);
                    });
                    $('.quest-768px').hover(function () {
                        $('.tooltip-quest-768px').slideDown("slow");
                    }, function () {
                        $('.tooltip-quest-768px').slideUp("slow");
                    });
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
                                    $(selector.toString()).fadeTo('slow', 1);
                                    setTimeout(function () {
                                        $(selector.toString()).fadeTo('slow', 0);
                                    }, 1000);
                                }
                                ;
                            }
                            ;
                        });
                        copyButtons[j].addEventListener("dblclick", function () {
                            var $temp = $("<input>");
                            var value = "<script src=\"" + this.attributes[1].value + "\"></script>";
                            $("body").append($temp);
                            $temp.val(value).select();
                            document.execCommand("copy");
                            $temp.remove();
                            var tooltips = $('.tooltiptext');
                            for (var k = 0; k < tooltips.length; k++) {
                                if (tooltips[k].attributes[1].value === this.attributes[2].value) {
                                    var selector = ".tooltiptext[data-tooltip='" + tooltips[k].attributes[1].value + "']";
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
                    var collItems = document.getElementsByClassName('modal-collection');
                    for (var j = 0; j < collItems.length; j++) {
                        collItems[j].addEventListener("mouseover", function () {
                            var buttonWrap = this.childNodes[3];
                            var button = buttonWrap.childNodes[3];
                            button.classList.add("pulse");
                        });
                        collItems[j].addEventListener("mouseout", function () {
                            var buttonWrap = this.childNodes[3];
                            var button = buttonWrap.childNodes[3];
                            button.classList.remove("pulse");
                        });
                        var buttonWrap = collItems[j].childNodes[3];
                        var button = buttonWrap.childNodes[3];
                        button.addEventListener("click", function () {
                            this.classList.remove("pulse");
                        });
                    }
                    //$('.the-modal-body p').text(this.attributes[1].value);
                    $('#myModal').css('display', 'block');
                    setTimeout(function () {
                        $('.bounce').css('-webkit-animation-name', 'bounce');
                        $('.bounce').css('animation-name', 'bounce');
                    }, 100);
                });
            }
            dataoperations_1.DataOperations.setClickedFlag("false");
        };
        SecondPagePreparing.redirectToNewPage = function (id) {
            var button = document.getElementById("" + id);
            var param = button.innerText;
            dataoperations_1.DataOperations.setClickedFlag("true");
            var w = window.open("newpage.html#" + param);
        };
        SecondPagePreparing.toggleVersionLink = function (link) {
            var placeForLink = document.getElementById("versionLink");
            placeForLink.innerHTML = link;
        };
        return SecondPagePreparing;
    }());
    exports.default = SecondPagePreparing;
});
