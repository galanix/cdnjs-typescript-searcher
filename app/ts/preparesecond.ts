import {
	DataOperations
} from './dataoperations';

export default class SecondPagePreparing {
	public static setPageContent() {
		var data: any = DataOperations.getSecondaryRequestData();
		var gitHubData: any = DataOperations.getGitHubRequestData();
		var filter = DataOperations.getInputFilter();
		var button = <HTMLInputElement>document.getElementById("backBtn");
		var versionLinkPrimary = "https://cdnjs.cloudflare.com/ajax/libs/";
		var placeForData = <HTMLInputElement>document.getElementById("newDataHolder");
		var gitHubItem;

		if (gitHubData.total_count === 0) {
			var myUrl: string = window.location.href;
			var urlArray: any = myUrl.split('#');
			var parameter = urlArray[1];
			var slicedFilter = parameter.slice((parameter.indexOf('-') + 1), );

			DataOperations.makeRequest(slicedFilter, true);
		}

		/*----------Checks if the page was loaded by click, or by manual URL entering----------*/
		if (DataOperations.getClickedFlag() === "true") {
			button.innerHTML = `Back to ${filter}`;
			button.onclick = function() {
				DataOperations.setIfToChangeFlag("true");
				location.replace("index.html");
			}
		} else {
			button.onclick = function() {
				location.replace("index.html");
			}
		}
		/*----------If the URL is incorrect----------*/
		if ($.isEmptyObject(data)) {
			placeForData.innerHTML = `
				<div class="alert-box error">
					<span>error: </span>
					The URL is incorrect.
				</div>
			`;
			return;
		}
		/*-----------------------------------Start working with secondary request data-----------------------------------*/
		//Verifications if there are such properties in data
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
		/*-----------------------------------End working with secondary request data-----------------------------------*/


		/*------------------------------------Start working with GitHub request data-----------------------------------*/
		if (gitHubData.total_count === 1) {
			gitHubItem = gitHubData.items[0];
		} else {
			for (var i = 0; i < gitHubData.items.length; i++) {
				if (gitHubData.items[i].name.toLowerCase() === data.name.toLowerCase()) {
					gitHubItem = gitHubData.items[i];
				}
			}

			if (gitHubItem === undefined) {
				for (var i = 0; i < gitHubData.items.length; i++) {
					var primaryRequestRepository = data.repository.url.slice(data.repository.url.indexOf('github.com'), );
					var currentRepository = gitHubData.items[i].git_url.slice(gitHubData.items[i].git_url.indexOf('github.com'), );

					if (primaryRequestRepository === currentRepository) {
						gitHubItem = gitHubData.items[i];
					} else if (primaryRequestRepository.slice(primaryRequestRepository.lastIndexOf('/'), ) === currentRepository.slice(currentRepository.lastIndexOf('/'), )) {
						gitHubItem = gitHubData.items[i]; //Anyway it will show different repositories, because they are different in cdnJS API and GitHub API
					}
				}
			}
		}

		if (gitHubItem.name !== undefined && gitHubItem.name !== null) {
			var name = gitHubItem.name;
		} else {
			var name: any = "The name is not specified";
		}

		if (gitHubItem.description !== undefined && gitHubItem.description !== null) {
			var description = gitHubItem.description;
		} else {
			var description: any = "The description is not specified";
		}

		if (gitHubItem.language !== undefined && gitHubItem.language !== null) {
			var language = gitHubItem.language;
		} else {
			var language: any = "The language is not specified";
		}

		if (gitHubItem.created_at !== undefined && gitHubItem.created_at !== null) {
			var created_at = gitHubItem.created_at;
		} else {
			var created_at: any = "The creation date is not specified";
		}

		if (gitHubItem.owner.login !== undefined && gitHubItem.owner.login !== null) {
			var ownerLogin = gitHubItem.owner.login;
		} else {
			var ownerLogin: any = "The description is not specified";
		}

		if (gitHubItem.owner.html_url !== undefined && gitHubItem.owner.html_url !== null) {
			var ownerHtml = gitHubItem.owner.html_url;
		} else {
			var ownerHtml: any = "The description is not specified";
		}
		/*------------------------------------End working with GitHub request data-------------------------------------*/

		placeForData.innerHTML = `
			<div class="row">
			  	<div class="col s12">
			  	  	<div class="card">
			  	  	  	<div class="card-image">
			  	  	  	  	<img src="../app/images/github.png">
			  	  	  	  	<span class="card-title">GitHub info</span>
			  	  	  	  	<a class="btn-floating halfway-fab waves-effect waves-light red" href="${gitHubItem.html_url}" target="_blank"><i class="material-icons">link</i></a>
			  	  	  	</div>
			  	  	  	<div class="card-content">
			  	  	  	  	<ul class="collection with-header github-collection">
			  	  	  	  		<li class="collection-header">
			  	  	  	  			<h5><span class="items">${name}</span></h5>
			  	  	  	  			<div>
			  	  	  	  				<span class=".views"> <i class="material-icons">remove_red_eye</i> ${gitHubItem.watchers}</span>
				  	  	  	  			<span class=".stars">  <i class="material-icons">star</i>${gitHubItem.stargazers_count}</span>
				  	  	  	  			<span class=".forks"> <i class="material-icons">device_hub</i> ${gitHubItem.forks}</span>
			  	  	  	  			</div>
			  	  	  	  		</li>
			  	  	  	  		<li class="collection-item"><b>GitHub description: </b><span class="items">${description}</span></li>
			  	  	  	  		<li class="collection-item"><b>Language: </b><span class="items">${language}</span></li>
			  	  	  	  		<li class="collection-item"><b>Created at: </b><span class="items">${created_at}</span></li>
			  	  	  	  		<li class="collection-item"><b>Creator: </b><span class="items">${ownerLogin}, ${ownerHtml}</span></li>
			  	  	  	  	</ul>
			  	  	  	</div>
			  	  	</div>
			  	</div>
			</div>

			<ul class="collection">
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
		/*----------Add versions chips----------*/
		var chips = document.getElementsByClassName('chip');
		for(var i = 0; i < chips.length; i++) {
			chips[i].addEventListener('click', function() {
				var version = this.textContent;
				var baseUri = this.attributes[1].value;

				/*----------Working with modal popup----------*/
				$('body').css('overflow-y', 'hidden');
				$('.the-modal-header h3').text('Version: ' + version);
				for (var j = 0; j < data.assets.length; j++) {
					if (data.assets[j].version === version) {
						$('.the-modal-body ul').empty();
						$(`<li class="collection-header"><h5>Links:</h5>
								<span class="question bounce quest-768px"></span>
								<div>
									<span class="tooltip-question">CLICK for the link copying or DBLCLICK for the script tag copying.</span>
									<span class="question bounce"></span>
								</div>
								<p class="tooltip-quest-768px">CLICK for the link copying or DBLCLICK for the script tag copying.</p>
							</li>`).appendTo('.the-modal-body ul');
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

				$('.question').hover(function() {
					$('.tooltip-question').fadeTo('fast', 1);
				}, function() {
					$('.tooltip-question').fadeTo('fast', 0);
				});

				$('.quest-768px').hover(function() {
					$('.tooltip-quest-768px').slideDown("slow");
				}, function() {
					$('.tooltip-quest-768px').slideUp("slow");
				});

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
								$(selector.toString()).fadeTo('slow', 1);
								setTimeout(function() {
									$(selector.toString()).fadeTo('slow', 0);
								}, 1000)
							};
						};
					});

					copyButtons[j].addEventListener("dblclick", function() {
						var $temp = $("<input>");
						var value = `<script src="${this.attributes[1].value}"></script>`;
						$("body").append($temp);
						$temp.val(value).select();
						document.execCommand("copy");
						$temp.remove();

						var tooltips = $('.tooltiptext');
						for (var k = 0; k < tooltips.length; k++) {
							if (tooltips[k].attributes[1].value === this.attributes[2].value) {
								var selector = `.tooltiptext[data-tooltip='${tooltips[k].attributes[1].value}']`;
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

				$('#myModal').css('display', 'block');
				setTimeout(function() {
					$('.bounce').css('-webkit-animation-name', 'bounce');
					$('.bounce').css('animation-name', 'bounce');
				}, 100);
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
}