import {
	DataOperations
} from './dataoperations';
import 'materialize.min';

export default class SecondPagePreparing {
	public static setPageContent() {
		console.log(DataOperations.getClickedFlag());
		var data: any = DataOperations.getSecondaryRequestData();
		var filter = DataOperations.getInputFilter();
		var button = <HTMLInputElement>document.getElementById("backBtn");
		var versionLinkPrimary = "https://cdnjs.cloudflare.com/ajax/libs/";
		console.log(DataOperations.getClickedFlag());

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
			console.log(data.assets[i].version);
			/*placeForAssets.innerHTML += `
				<div class="chip" data-id="${versionLinkPrimary}${data.name}/${data.assets[i].version}/${data.name}.js">
					<a href='#modal'>${data.assets[i].version}</a>
				</div>
			`;*/
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
				$('.the-modal-header h3').text('Version: ' + version);
				for (var j = 0; j < data.assets.length; j++) {
					if (data.assets[j].version === version) {
						$('.the-modal-body ul').empty();
						$(`<li class="collection-header"><h5>Links:</h4></li>`).appendTo('.the-modal-body ul');
						for (var k = 0; k < data.assets[j].files.length; k++) {
							$(`<li class="collection-item">${baseUri + data.assets[j].files[k]}</li>`).appendTo('.the-modal-body ul');
						}
					}
				}
				$('.the-modal-body p').text(this.attributes[1].value);
				$('#myModal').css('display', 'block');
			});
		}

		DataOperations.setClickedFlag("false");
	}

	public static redirectToNewPage(id: string) {
		var button = <HTMLInputElement>document.getElementById(`${id}`);
		var param: string = button.innerText.toLowerCase();

		DataOperations.setClickedFlag("true");
		var w = window.open(`newpage.html#${param}`);
	}

	public static toggleVersionLink(link: string){
		var placeForLink = <HTMLInputElement>document.getElementById("versionLink");
		placeForLink.innerHTML = link;
	}
}