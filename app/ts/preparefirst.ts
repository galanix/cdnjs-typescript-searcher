import {
	DataOperations
} from './dataoperations';
import prepareSecond from './preparesecond';

export default class FirstPagePreparing {
	public static renderHTML(filter: any) {
		var filteredData = [];
		var recommendedData = [];
		var myData: any = DataOperations.getPrimaryRequestData();

		for (var i = 0; i < myData.results.length; i++) {
	 		if (myData.results[i].name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
				filteredData.push(myData.results[i])
			}
		}

	    if (filter.length > 1) {
	    	if (filteredData.length !== 0) {
	    		FirstPagePreparing.showFilteredData(filteredData);
	    	} else {
	    		for (var i = 0; i < filter.length; i++) {
					var slicedFilter = filter.slice(0, i+1);
					var buffer = [];

					for (var j = 0; j < myData.results.length; j++) {
				 		if (myData.results[j].name.toLowerCase().indexOf(slicedFilter.toLowerCase()) !== -1) {
							buffer.push(myData.results[j])
						}
					}
					if (buffer.length !== 0) {
						recommendedData = buffer;
					}
				}
	    		FirstPagePreparing.showFilteredData(myData, true, false, false, recommendedData);
	    	}
	    } else {
	    	if (filter == "") {
	    		FirstPagePreparing.showFilteredData(filteredData, false, true)
	    	} else {
	    		FirstPagePreparing.showFilteredData(filteredData, false)
	    	}
	    }
	}

	private static showFilteredData(data: any, ifShow: boolean = true, isEmptyString: boolean = false, areThereAnyResults: boolean = true, recommended: any = []) {
		var placeForData = <HTMLInputElement>document.getElementById("dataHolder");
		var placeForMessage = <HTMLInputElement>document.getElementById("message");

		if (ifShow === true) {
			if (areThereAnyResults === true) {
				placeForMessage.innerHTML = '';
				placeForData.innerHTML = '';
				setTimeout(function(){
				    $('#progress').css('display', 'none');
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
				}, 400);
			} else {
				if (recommended.length === 0) {
					var recommendedItem = data.results[Math.floor(Math.random()*data.total)];

					$('#progress').css('display', 'none');
					placeForData.innerHTML = '';
					placeForMessage.innerHTML = `The input is incorrect. Try: <a id="recommend">${recommendedItem.name}</a>.`;
					$('#recommend').click(function() {
						var input = <HTMLInputElement>document.getElementById("text");
						$('#progress').css('display', 'block');
						DataOperations.setInputFilter(recommendedItem.name);
						input.value = recommendedItem.name;
						FirstPagePreparing.renderHTML(recommendedItem.name);
					});
				} else {
					var recommendedItem = recommended[Math.floor(Math.random()*recommended.length)];

					$('#progress').css('display', 'none');
					placeForData.innerHTML = '';
					placeForMessage.innerHTML = `There is no such library. Maybe you meant: <a id="recommend">${recommendedItem.name}</a>.`;
					$('#recommend').click(function() {
						var input = <HTMLInputElement>document.getElementById("text");
						$('#progress').css('display', 'block');
						DataOperations.setInputFilter(recommendedItem.name);
						input.value = recommendedItem.name;
						FirstPagePreparing.renderHTML(recommendedItem.name);
					});
				}
			}
			
		} else {
			if (isEmptyString === true) {
				$('#progress').css('display', 'none');
				placeForMessage.innerHTML = ``;
				return;
			} else if (isEmptyString === false) {
				$('#progress').css('display', 'none');
				placeForData.innerHTML = '';
				placeForMessage.innerHTML = `Please, write MORE than just one letter`;
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
		} else {
			input.value = "";
		}

		if (input.value.length > 0) {
			label.classList.add("active");
		}

		DataOperations.setIfToChangeFlag("false");
	};
}