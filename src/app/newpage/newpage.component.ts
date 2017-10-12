import { Component, OnInit } from '@angular/core';
import { DataoperationsService } from './../dataoperations.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';


@Component({
  	selector: 'app-newpage',
  	templateUrl: './newpage.component.html',
  	styleUrls: ['./newpage.component.css']
})
export class NewpageComponent implements OnInit {

  	constructor(
  		private data: DataoperationsService,
  		private route: ActivatedRoute,
    	private router: Router
    ) { }

  	sub: any;
	name: any;

  	showPage(parameter: string) {
		var here = this;
		here.data.makeRequest(parameter)
			.then(
				result => {
					here.data.setGitHubRequestData(JSON.stringify(result));
					here.setPageContent();
				}
			)
			.catch((error) => console.error(error));
	}

  	setPageContent() {
  		var here = this;
		var data: any = here.data.getSecondaryRequestData();
		var filter = here.data.getInputFilter();
		var versionLinkPrimary = "https://cdnjs.cloudflare.com/ajax/libs/";
		var placeForData = <HTMLInputElement>document.getElementById("newDataHolder");
		var parameter = [];
		var gitHubData = here.data.getGitHubRequestData();
		var nav = <HTMLInputElement>document.getElementById("nav");
		var button = <HTMLInputElement>document.getElementById("backBtn");

		/*----------Checks if the page was loaded by click, or by manual URL entering----------*/
		if (here.data.getClickedFlag() === "true") {
			button.innerHTML = `Back to ${filter}`;
			button.onclick = function() {
				here.data.setIfToChangeFlag("true");
				here.router.navigate(['/index']);
			}
		} else {
			button.onclick = function() {
				here.router.navigate(['/index']);
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
		if (gitHubData.message === "Not Found") {
			placeForData.innerHTML = `
				<div class="row">
				  	<div class="col s12">
				  	  	<div class="card">
				  	  	  	<div class="card-image">
				  	  	  	  	<img src="../assets/images/githubMessage.png">
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
		} else {
			if (gitHubData.name !== undefined && gitHubData.name !== null) {
				var name = gitHubData.name;
			} else {
				var name: any = "The name is not specified";
			}

			if (gitHubData.description !== undefined && gitHubData.description !== null) {
				var description = gitHubData.description;
			} else {
				var description: any = "The description is not specified";
			}

			if (gitHubData.language !== undefined && gitHubData.language !== null) {
				var language = gitHubData.language;
			} else {
				var language: any = "The language is not specified";
			}

			if (gitHubData.created_at !== undefined && gitHubData.created_at !== null) {
				var date = gitHubData.created_at.slice(0, gitHubData.created_at.indexOf('T'));
				var reversedDate = date.split('-').reverse().join('-');
				var time = gitHubData.created_at.slice(gitHubData.created_at.indexOf('T') + 1, gitHubData.created_at.indexOf('Z'));
				var created_at = `${reversedDate}, ${time}`;
			} else {
				var created_at: string = "The date of creation is not specified";
			}

			if (gitHubData.pushed_at !== undefined && gitHubData.pushed_at !== null) {
				var commitDate = gitHubData.pushed_at.slice(0, gitHubData.pushed_at.indexOf('T'));
				var commitReversedDate = commitDate.split('-').reverse().join('-');
				var commitTime = gitHubData.pushed_at.slice(gitHubData.pushed_at.indexOf('T') + 1, gitHubData.pushed_at.indexOf('Z'));
				var lastCommit_at = `${commitReversedDate}, ${commitTime}`;
			} else {
				var created_at: string = "The date of last commit is not specified";
			}

			if (gitHubData.owner.login !== undefined && gitHubData.owner.login !== null) {
				var ownerLogin = gitHubData.owner.login;
				if (gitHubData.owner.html_url !== undefined && gitHubData.owner.html_url !== null) {
					var ownerHtml = gitHubData.owner.html_url;
				} else {
					var owner: any = ownerLogin;
				}
			} else {
				var owner: any = "The owner is not specified";
			}

			var owner: any = `<a href="${ownerHtml}" target="_blank">${ownerLogin}</a>`

			placeForData.innerHTML = `
				<div class="row">
				  	<div class="col s12">
				  	  	<div class="card">
				  	  	  	<div class="card-image">
				  	  	  	  	<img src="../assets/images/github.png">
				  	  	  	  	<span class="card-title">GitHub info</span>
				  	  	  	  	<a class="btn-floating halfway-fab waves-effect waves-light red" href="${gitHubData.html_url}" target="_blank" title="Visit this repo on a GitHub!"><i class="material-icons">link</i></a>
				  	  	  	</div>
				  	  	  	<div class="card-content">
				  	  	  	  	<ul class="collection with-header github-collection">
				  	  	  	  		<li class="collection-header">
				  	  	  	  			<h5><span class="items">${name}</span></h5>
				  	  	  	  			<div>
				  	  	  	  				<span class=".views"> <i class="material-icons">remove_red_eye</i> ${gitHubData.watchers}</span>
					  	  	  	  			<span class=".stars">  <i class="material-icons">star</i>${gitHubData.stargazers_count}</span>
					  	  	  	  			<span class=".forks"> <i class="material-icons">device_hub</i> ${gitHubData.forks}</span>
				  	  	  	  			</div>
				  	  	  	  		</li>
				  	  	  	  		<li class="collection-item"><b>GitHub description: </b><span class="items">${description}</span></li>
				  	  	  	  		<li class="collection-item"><b>Language: </b><span class="items">${language}</span></li>
				  	  	  	  		<li class="collection-item"><b>Created at: </b><span class="items">${created_at}</span></li>
				  	  	  	  		<li class="collection-item"><b>Last commit: </b><span class="items">${lastCommit_at}</span></li>
				  	  	  	  		<li class="collection-item"><b>Creator: </b><span class="items">${owner}</span></li>
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
		}

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
				<button class='chip grey darken-2' data-id="${versionLinkPrimary}${data.name}/${data.assets[i].version}/" 
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
										<a class="btn btn-floating btn-copy green darken-2" data-link="${baseUri + data.assets[j].files[k]}" data-tooltip="tooltip${k}">
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

		here.data.setClickedFlag("false");
	}

  	ngOnInit() {
  		var here = this;
  		var parameter: string;

		here.sub = here.route
	      	.params
	      	.subscribe(params => {
	      	  	// Defaults to 0 if no query param provided.
	      	  	parameter = params.name || 0;
	      	});

	    $('body').removeClass();
		$('body').addClass(`newpage ${parameter}`);
		$('nav').removeClass();
		$('nav').addClass(`newpage`);

		here.showPage(parameter);

		var modal = document.getElementById('myModal');

		// Get the <span> element that closes the modal
		var span = document.getElementById("close");

		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
		    $('#myModal').fadeOut('slow', function() {
		    	$('body').css('overflow-y', 'auto');
		    });
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
		    if (event.target == modal) {
		        $('#myModal').fadeOut('slow', function() {
			    	$('body').css('overflow-y', 'auto');
			    });
		    }
		}
  	}

  	ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
