import { Component, OnInit } from '@angular/core';
import { DataoperationsService } from './../dataoperations.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  	constructor(private data: DataoperationsService) { }

  	filter: string;
  	tableData: any = [];

  	sendForFiltering() {
  		var here = this;
		var elem = <HTMLInputElement>document.getElementById("text");
		var value = elem.value;
		here.data.setInputFilter(value);

		$('#progress').css('display', 'block');
		here.data.makeRequest()
			.then(
				result => {
					here.data.setPrimaryRequestData(JSON.stringify(result));
	  				here.renderHTML(here.data.getInputFilter());
				}
			).catch((error) => console.error(error));
	}

	renderHTML(filter: any) {
		var here = this;
		if (<HTMLInputElement>document.getElementById("tHeader") !== null) {
			let tHeader = <HTMLInputElement>document.getElementById("tHeader");
			tHeader.remove();
		}
		var filteredData = [];
		var recommendedData = [];
		var myData: any = here.data.getPrimaryRequestData();

		for (var i = 0; i < myData.results.length; i++) {
	 		if (myData.results[i].name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
				filteredData.push(myData.results[i])
			}
		}

	    if (filter.length > 1) {
	    	if (filteredData.length !== 0) {
	    		here.showFilteredData(filteredData);
	    	} else {
	    		//If there is necessity to recommend something (there are no items in result)
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
	    		here.showFilteredData(myData, true, false, false, recommendedData);
	    	}
	    } else {
	    	if (filter == "") {
	    		//If input field is empty:
	    		here.showFilteredData(filteredData, false, true)
	    	} else {
	    		//If there is only one letter:
	    		here.showFilteredData(filteredData, false)
	    	}
	    }
	}

	showFilteredData(data: any, ifShow: boolean = true, isEmptyString: boolean = false, areThereAnyResults: boolean = true, recommended: any = []) {
		var placeForMessage = <HTMLInputElement>document.getElementById("message");
		var here = this;
		here.tableData = data;


		if (ifShow === true) {
			//If result consists of at least one item: 
			if (areThereAnyResults === true) {
				$('#progress').css('display', 'none');
				placeForMessage.innerHTML = '';

				var btnNum: number = 0;
				var btnId: string;

				//Adding events to and working on a copy buttons
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

				/*
					Sets the 'clicked' flag to true, which means that results will be saved
					if user comes back here from a new page using 'back' button:
				*/ 
				$(document).ready(function(){
					var buttons = document.getElementsByClassName('table-btn');
					for (var i = 0; i < buttons.length; i++) {
						buttons[i].addEventListener("click", function() {
							here.data.setClickedFlag("true");
						});
					}
				});
			} else {
				//Recommending a random item:
				if (recommended.length === 0) {
					var recommendedItem = data.results[Math.floor(Math.random()*data.total)];

					$('#progress').css('display', 'none');
					here.tableData = [];
					placeForMessage.innerHTML = `The input is incorrect. Try: <a id="recommend">${recommendedItem.name}</a>.`;
					$('#recommend').click(function() {
						var input = <HTMLInputElement>document.getElementById("text");
						$('#progress').css('display', 'block');
						here.data.setInputFilter(recommendedItem.name);
						input.value = recommendedItem.name;
						here.renderHTML(recommendedItem.name);
					});
				} else {
					//Recomending an item which is similar to entered text:
					var recommendedItem = recommended[Math.floor(Math.random()*recommended.length)];
					here.tableData = [];
					$('#progress').css('display', 'none');
					here.tableData = [];
					placeForMessage.innerHTML = `There is no such library. Maybe you meant: <a id="recommend">${recommendedItem.name}</a>.`;
					$('#recommend').click(function() {
						var input = <HTMLInputElement>document.getElementById("text");
						$('#progress').css('display', 'block');
						here.data.setInputFilter(recommendedItem.name);
						input.value = recommendedItem.name;
						here.renderHTML(recommendedItem.name);
					});
				}
			}
			
		} else {
			if (isEmptyString === true) {
				//If input field is empty:
				$('#progress').css('display', 'none');
				placeForMessage.innerHTML = ``;
				here.tableData = [];
				return;
			} else if (isEmptyString === false) {
				//If there is only one letter:
				$('#progress').css('display', 'none');
				here.tableData = [];
				placeForMessage.innerHTML = `Please, write MORE than just one letter`;
			}
		}

		here.data.setFilteredPrimaryRequestData(JSON.stringify(data));
	}

	copyBtnLink(i, link) {
		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val(link).select();
		document.execCommand("copy");
		$temp.remove();

		var tooltips = $('.tooltiptext');
		for (var k = 0; k < tooltips.length; k++) {
			if (tooltips[k].attributes[2].value === link) {
				var selector = `.tooltiptext[data-link='${tooltips[k].attributes[2].value}']`;
				$(selector.toString()).css('display', 'inline');
				$(selector.toString()).fadeTo('slow', 1);
				setTimeout(function() {
					$(selector.toString()).fadeTo('slow', 0);
				}, 2000)
			};
		};
	}

	inputManipulation() {
		var here = this;
		var placeForData = <HTMLInputElement>document.getElementById("dataHolder");
		var data: any = here.data.getFilteredPrimaryRequestData();
		var label = <HTMLInputElement>document.getElementById("activate");
		var input = <HTMLInputElement>document.getElementById("text");

		//It will add first-request data to the page if the getIfToChangeFlag() === true:
		if (here.data.getIfToChangeFlag() === "true") {
			input.value = here.data.getInputFilter();
			here.tableData = data;

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
				$('table-btn').on('click', function() {
					here.data.setClickedFlag("true");
					$('#btn-ul').css('display', 'block');
				})
			});
		} else {
			input.value = "";
		}

		if (input.value.length > 0) {
			label.classList.add("active");
		}

		here.data.setIfToChangeFlag("false");
	};

  	ngOnInit() {
  		var elem = <HTMLInputElement>document.getElementById("text");
  		var here = this;

  		//Manage navigation classes for adaptability adding
  		$('body').removeClass();
  		$('body').addClass("index");
  		$('nav').removeClass();
  		$('nav').addClass("index");

  		/*-----Nav height toggling-----*/
  		if (here.data.getIfToChangeFlag() === 'true') {
  			$('nav').addClass('responsive');
  		}

  		$('#text').bind("click", function() {
  			if ($('#activate').hasClass('active')) {
  				$('nav').addClass('responsive');
  			}
  		});

  		$('#text').bind("blur", function() {
  			if ($('#activate').hasClass('active') === false) {
  				if (here.tableData.length == 0) {
  					$('nav').removeClass('responsive');
  				}
  			}
  		})
		
		here.inputManipulation();
  	}

}
