import {
	DataOperations
} from './dataoperations';

export default class SecondPagePreparing {
	public static setPageContent() {
		var data: any = DataOperations.getSecondaryRequestData();
		var filter = DataOperations.getInputFilter();
		var button = <HTMLInputElement>document.getElementById("backBtn");
		var versionLinkPrimary = "https://cdnjs.cloudflare.com/ajax/libs/";

		if (DataOperations.getClickedFlag() === "true") {
			button.innerText = `Back to ${filter}`;
			button.onclick = function() {
				DataOperations.setIfToChangeFlag("true");
				location.replace("index.html");
			}
		} else {
			button.onclick = function() {
				location.replace("index.html");
			}
		}

		//verifications if there are such properties
		if (data.author !== undefined) {
			if (data.author.name === undefined) {
				var author = data.author;
			} else {
				var author = data.author.name;
			}
		} else {
			var author: any = "The author is not specified";
		}

		if (data.description !== undefined) {
			var description = data.description;
		} else {
			var description: any = "The description is not specified";
		}

		if (data.homepage !== undefined) {
			var homepage = data.homepage;
		} else {
			var homepage: any = "The homepage is not specified";
		}

		if (data.license !== undefined) {
			var license = data.license;
		} else {
			var license: any = "The license is not specified";
		}

		if (data.keywords !== undefined) {
			var keywords = data.keywords;
		} else {
			var keywords: any = "The keywords is not specified";
		}

		if (data.version !== undefined) {
			var version = data.version;
		} else {
			var version: any = "The version is not specified";
		}

		if (data.repository.url !== undefined) {
			var repository = data.repository.url;
		} else {
			var repository: any = "The repository is not specified";
		}

		var placeForData = <HTMLInputElement>document.getElementById("newDataHolder");

		placeForData.innerHTML = `
			<ul class="collection with-header">
				<li class="collection-header"><h4>${data.name}</h4></li>
				<li class="collection-item"><b>Name:</b> ${data.name}</li>
				<li class="collection-item"><b>Description:</b> <span class="items">${description}</span></li>
				<li class="collection-item"><b>Author:</b> <span class="items">${author}</span></li>
				<li class="collection-item"><b>Homepage:</b> <span class="items">${homepage}</span></li>
				<li class="collection-item"><b>License:</b> <span class="items">${license}</span></li>
				<li class="collection-item"><b>Keywords:</b> <span class="items">${keywords}</span></li>
				<li class="collection-item"><b>Version:</b> <span class="items">${version}</span></li>
				<li class="collection-item"><b>Repository:</b> <span class="items">${repository}</span></li>
				<li class="collection-item"><b>Versions list:</b><span id="versionLink"></span>
					<ul id="list"></ul>
				</li>
			</ul>
		`;

		var items = document.getElementsByClassName("items");

		for(var i = 0; i < items.length; i++) {
			var text: string = items[i].innerHTML;
			if (text.indexOf("is not specified") !== -1) {
				items[i].classList.add("not-specified");
			}
		}

		var placeForAssets = <HTMLInputElement>document.getElementById("list");

		for (var i = 0; i < data.assets.length; i++) {
			placeForAssets.innerHTML += `
				<button class='chip' data-id="${versionLinkPrimary}${data.name}/${data.assets[i].version}/" 
				id="modalTrigger">${data.assets[i].version}</button>
			`;
		}

		var chips = document.getElementsByClassName('chip');
		for(var i = 0; i < chips.length; i++) {
			chips[i].addEventListener('click', function() {
				var version = this.textContent;
				var baseUri = this.attributes[1].value;

				$('body').css('overflow-y', 'hidden');
				$('.the-modal-header h3').text('Version: ' + version);
				for (var j = 0; j < data.assets.length; j++) {
					if (data.assets[j].version === version) {
						$('.the-modal-body ul').empty();
						$(`<li class="collection-header"><h5>Links:</h4></li>`).appendTo('.the-modal-body ul');
						for (var k = 0; k < data.assets[j].files.length; k++) {
							$(`<li class="collection-item modal-collection">
									<span class="link">${baseUri + data.assets[j].files[k]}</span>
									<div>
										<span class="tooltiptext" data-tooltip="tooltip${k}">Copied!</span>
										<a class="btn btn-floating btn-copy" data-link="${baseUri + data.assets[j].files[k]}" data-tooltip="tooltip${k}">
											<i class="material-icons">content_copy</i>
										</a>
									</div>
								</li>`).appendTo('.the-modal-body ul');
						}
					}
				}

				var copyButtons = document.getElementsByClassName('btn-copy');
				for (var j = 0; j < copyButtons.length; j++) {
					copyButtons[j].addEventListener("click", function() {
						var $temp = $("<input>");
						$("body").append($temp);
						$temp.val(this.attributes[1].value).select();
						document.execCommand("copy");
						$temp.remove();

						var tooltips = $('.tooltiptext');
						for (var k = 0; k < tooltips.length; k++) {
							if (tooltips[k].attributes[1].value === this.attributes[2].value) {
								var selector = `.tooltiptext[data-tooltip='${tooltips[k].attributes[1].value}']`;
								$(selector.toString()).css('display', 'inline-block');
								$(selector.toString()).fadeTo('slow', 1);
								setTimeout(function() {
									$(selector.toString()).fadeTo('slow', 0);
								}, 2000)
							};
						};
					});
				};

				var collItems = document.getElementsByClassName('modal-collection');
				for (var j = 0; j < collItems.length; j++) {
					collItems[j].addEventListener("mouseover", function () {
						var buttonWrap = this.childNodes[3];
						var button = buttonWrap.childNodes[3];

						button.classList.add("pulse");
					})

					collItems[j].addEventListener("mouseout", function () {
						var buttonWrap = this.childNodes[3];
						var button = buttonWrap.childNodes[3];

						button.classList.remove("pulse");
					})

					var buttonWrap = collItems[j].childNodes[3];
					var button = buttonWrap.childNodes[3];

					button.addEventListener("click", function () {
						this.classList.remove("pulse");
					})
				}
				//$('.the-modal-body p').text(this.attributes[1].value);
				$('#myModal').css('display', 'block');
			});
		}

		DataOperations.setClickedFlag("false");
	}

	public static redirectToNewPage(id: string) {
		var button = <HTMLInputElement>document.getElementById(`${id}`);
		var param: string = button.innerText;

		DataOperations.setClickedFlag("true");
		var w = window.open(`newpage.html#${param}`);
	}

	public static toggleVersionLink(link: string){
		var placeForLink = <HTMLInputElement>document.getElementById("versionLink");
		placeForLink.innerHTML = link;
	}
}