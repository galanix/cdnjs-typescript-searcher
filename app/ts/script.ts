import * as $ from 'jquery';

import {
	DataOperations
} from './dataoperations';

import prepareFirst from './preparefirst';

var elem = <HTMLInputElement>document.getElementById("text");

class FirstPageUp {
 	public sendForFiltering() {
		var elem = <HTMLInputElement>document.getElementById("text");
		var value = elem.value;

		$('#progress').css('display', 'block');
		DataOperations.makeRequest();
		DataOperations.setInputFilter(value);
		prepareFirst.renderHTML(value);
	}
}

class SecondPageUp {
	myUrl: string = window.location.href;
	urlArray: any = this.myUrl.split('#');
	parameter = this.urlArray[1];

	public showPage() {
		console.log(location.href);
		DataOperations.makeRequest(this.parameter);
	}
}

var first = new FirstPageUp;
var second = new SecondPageUp;



$(document).ready(function() {
	if (location.href.indexOf('newpage.html') === -1) {
		elem.onkeyup = function() {
			first.sendForFiltering();
		}

		elem.onfocus = function() {
			prepareFirst.activate();
		}

		$('#text').focusout(function(){
		  	prepareFirst.deactivate();
		});

		prepareFirst.inputManipulation();
	} else {
		second.showPage();
		// Get the modal
		var modal = document.getElementById('myModal');

		// Get the <span> element that closes the modal
		var span = document.getElementById("close");

		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
		    modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		}
	}
})