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
	    	FirstPagePreparing.showFilteredData(filteredData);
	    } else {
	    	if (filter == "") {
	    		FirstPagePreparing.showFilteredData(filteredData, false, true)
	    	} else {
	    		FirstPagePreparing.showFilteredData(filteredData, false)
	    	}
	    }
	}

	private static showFilteredData(data: any, ifShow: boolean = true, isEmptyString: boolean = false) {
		var placeForData = <HTMLInputElement>document.getElementById("dataHolder");

		if (ifShow === true) {
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
							<td id="cont">${data[i].latest}</td>
						</tr>
					`
				}
			}, 700);
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

		$(document).ready(function(){
			var buttons = document.getElementsByClassName('to-new-page');
			for (var i = 0; i < buttons.length; i++) {
				buttons[i].addEventListener("click", function() {
					prepareSecond.redirectToNewPage(this.id);
				});
			}
		});

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