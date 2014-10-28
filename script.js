$(document).ready(function() {
	
	function scrollUpToTop(milliseconds) {

		$('html, body').animate({

			scrollTop: 0
		}, milliseconds);
	}	

	function scrollDownTo(elementSelector, milliseconds) {

		$('html, body').animate({

			scrollTop: $(elementSelector).offset().top
		}, milliseconds);
	}
	
	function attachLink(selector, url) {
		
		$(selector).on('click', function() {
			
			window.open(url);
		});
	}

	$('.bar-icon').tooltip();

	scrollUpToTop(500);

	$('#welcomeButton').on('click', function() {
		
		scrollDownTo('#more_info', 750);
	});

	attachLink('#twitter_icon', 'http://www.twitter.com/VRSanchez8717');
	attachLink('#github_icon', 'http://www.github.com/tdbts');

});