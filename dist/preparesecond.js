define(["require", "exports", "./dataoperations", "materialize.min"], function (require, exports, dataoperations_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SecondPagePreparing = /** @class */ (function () {
        function SecondPagePreparing() {
        }
        SecondPagePreparing.setPageContent = function () {
            console.log(dataoperations_1.DataOperations.getClickedFlag());
            var data = dataoperations_1.DataOperations.getSecondaryRequestData();
            var filter = dataoperations_1.DataOperations.getInputFilter();
            var button = document.getElementById("backBtn");
            var versionLinkPrimary = "https://cdnjs.cloudflare.com/ajax/libs/";
            console.log(dataoperations_1.DataOperations.getClickedFlag());
            if (dataoperations_1.DataOperations.getClickedFlag() === "true") {
                button.innerText = "Back to " + filter;
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
            var placeForData = document.getElementById("newDataHolder");
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
                console.log(data.assets[i].version);
                /*placeForAssets.innerHTML += `
                    <div class="chip" data-id="${versionLinkPrimary}${data.name}/${data.assets[i].version}/${data.name}.js">
                        <a href='#modal'>${data.assets[i].version}</a>
                    </div>
                `;*/
                placeForAssets.innerHTML += "\n\t\t\t\t<button class='chip' data-id=\"" + versionLinkPrimary + data.name + "/" + data.assets[i].version + "/\" \n\t\t\t\tid=\"modalTrigger\">" + data.assets[i].version + "</button>\n\t\t\t";
            }
            var chips = document.getElementsByClassName('chip');
            for (var i = 0; i < chips.length; i++) {
                chips[i].addEventListener('click', function () {
                    var version = this.textContent;
                    var baseUri = this.attributes[1].value;
                    $('.the-modal-header h3').text('Version: ' + version);
                    for (var j = 0; j < data.assets.length; j++) {
                        if (data.assets[j].version === version) {
                            $('.the-modal-body ul').empty();
                            $("<li class=\"collection-header\"><h5>Links:</h4></li>").appendTo('.the-modal-body ul');
                            for (var k = 0; k < data.assets[j].files.length; k++) {
                                $("<li class=\"collection-item\">" + (baseUri + data.assets[j].files[k]) + "</li>").appendTo('.the-modal-body ul');
                            }
                        }
                    }
                    $('.the-modal-body p').text(this.attributes[1].value);
                    $('#myModal').css('display', 'block');
                });
            }
            dataoperations_1.DataOperations.setClickedFlag("false");
        };
        SecondPagePreparing.redirectToNewPage = function (id) {
            var button = document.getElementById("" + id);
            var param = button.innerText.toLowerCase();
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
