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
	$('#back_to_top').tooltip();

	scrollUpToTop(500);

	$('#welcomeButton').on('click', function() {
		
		scrollDownTo('#more_info', 750);
	});

	attachLink('#twitter_icon', 'http://www.twitter.com/VRSanchez8717');
	attachLink('#github_icon', 'http://www.github.com/tdbts');

	$('#send_email_btn').popover({content: 'Thanks for reaching out!'}, 'click');

	$('#back_to_top').on('click', function() {
		
		scrollUpToTop(750);
	});

});