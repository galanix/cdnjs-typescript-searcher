import {
	DataOperations
} from './dataoperations';
import prepareSecond from './preparesecond';

export default class FirstPagePreparing {
	public static renderHTML(filter: any) {
		var filteredData = [];

		var myData: any = DataOperations.getPrimaryRequestData();

	    for (var i = 0; i < myData.results.length; i++) {
	 		if (myData.results[i].name.indexOf(filter) !== -1) {
				filteredData.push(myData.results[i])
			}
		}

	    if (filter.length > 1) {
	    	if (filteredData.length !== 0) {
	    		FirstPagePreparing.showFilteredData(filteredData);
	    	} else {
	    		FirstPagePreparing.showFilteredData(filteredData, true, false, false);
	    	}
	    } else {
	    	if (filter == "") {
	    		FirstPagePreparing.showFilteredData(filteredData, false, true)
	    	} else {
	    		FirstPagePreparing.showFilteredData(filteredData, false)
	    	}
	    }
	}

	private static showFilteredData(data: any, ifShow: boolean = true, isEmptyString: boolean = false, areThereAnyResults: boolean = true) {
		var placeForData = <HTMLInputElement>document.getElementById("dataHolder");

		if (ifShow === true) {
			if (areThereAnyResults === true) {
				placeForData.innerHTML = '';
				setTimeout(function(){
				    $('#progress').css('display', 'none')
				    placeForData.innerHTML = `
						<tr>
							<th>Name</th>
							<th>Link</th>
						</tr>`;

					var btnNum: number = 0;
					var btnId: string;

					for (var i = 0; i < data.length; i++) {
						btnNum += 1;
						btnId = `btn${btnNum}`
						placeForData.innerHTML += `
							<tr>
								<td class="btnCol"><button class="btn waves-effect table-btn to-new-page" id="${btnId}">${data[i].name}</button></td>
								<td class="content">${data[i].latest}</td>
								<td>
									<div>
										<span class="tooltiptext" data-tooltip="tooltip${i}">Copied!</span>
										<a class="btn btn-floating btn-copy" data-link="${data[i].latest}" data-tooltip="tooltip${i}"><i class="material-icons">content_copy</i></a>
									</div>
								</td>
							</tr>
						`
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
									$(selector.toString()).css('display', 'inline');
									$(selector.toString()).fadeTo('slow', 1);
									setTimeout(function() {
										$(selector.toString()).fadeTo('slow', 0);
									}, 2000)
								};
							};
						});
					};

					$(document).ready(function(){
						var buttons = document.getElementsByClassName('to-new-page');
						for (var i = 0; i < buttons.length; i++) {
							buttons[i].addEventListener("click", function() {
								prepareSecond.redirectToNewPage(this.id);
							});
						}
					});
				}, 500);
			} else {
				$('#progress').css('display', 'none');
				placeForData.innerHTML = 'Nothing found';
			}
			
		} else {
			if (isEmptyString === true) {
				$('#progress').css('display', 'none');
				placeForData.innerHTML = ``;
				return;
			} else if (isEmptyString === false) {
				$('#progress').css('display', 'none');
				placeForData.innerHTML = `Please, write MORE than just one letter`;
			}
		}

		DataOperations.setFilteredPrimaryRequestData(JSON.stringify(data));
	}

	public static activate() {
		var label = <HTMLInputElement>document.getElementById("activate");
		label.classList.add("active");
	}

	public static deactivate() {
		var label = <HTMLInputElement>document.getElementById("activate");
		var input = <HTMLInputElement>document.getElementById("text");

		if (input.value.length > 0) {
			return;
		}
		label.classList.remove("active");
	}

	public static inputManipulation() {
		var placeForData = <HTMLInputElement>document.getElementById("dataHolder");
		var data: any = DataOperations.getFilteredPrimaryRequestData();
		var label = <HTMLInputElement>document.getElementById("activate");
		var input = <HTMLInputElement>document.getElementById("text");

		if (DataOperations.getIfToChangeFlag() === "true") {
			input.value = DataOperations.getInputFilter();

			placeForData.innerHTML = `
			<tr>
				<th>Name</th>
				<th>Link</th>
			</tr>`;

			var btnNum: number = 0;
			var btnId: string;

			for (var i = 0; i < data.length; i++) {
				btnNum += 1;
				btnId = `btn${btnNum}`
				placeForData.innerHTML += `
					<tr>
						<td><button class="btn waves-effect to-new-page" id="${btnId}">${data[i].name}</button></td>
						<td>${data[i].latest}</td>
					</tr>
				`
			}
			
			$(document).ready(function(){
				var buttons = document.getElementsByClassName('to-new-page');
				for (var i = 0; i < buttons.length; i++) {
					buttons[i].addEventListener("click", function() {
						prepareSecond.redirectToNewPage(this.id);
					});
				}
			});
		} else {
			input.value = "";
		}

		if (input.value.length > 0) {
			label.classList.add("active");
		}

		DataOperations.setIfToChangeFlag("false");
	};
}