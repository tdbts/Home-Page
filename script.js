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

	function getVal(selector) {

		return $(selector).val();
	}

	function clearField(selectors) {

		selectors.forEach(function(fieldID) {
			
			$(fieldID).val("");
		});
	}

	function emailModalAJAX() {

		$('#send_email_btn').on('click', function(event) {

			var firstName = getVal('#first_name');
			var lastName = getVal('#last_name');
			var email = getVal('#email');
			var comments = getVal('#comments');
			var url = '/shared/send_form_email.php';

			var request = $.ajax({

				type: "POST",
				url: url,
				data: {
					first_name: firstName,
					last_name: lastName,
					email: email,
					comments: comments
				}
			});

			request.done(function() {
				
				clearField(['#first_name', '#last_name', '#email', '#comments']);
				$('#send_email_btn').popover('hide');
				$('#emailModal').modal('hide');
			});

			request.fail(function() {
				
				alert('Sorry, AJAX was unable to process that request!');
			});

			event.preventDefault();
		});
	}

	emailModalAJAX();	

	$('.bar-icon').tooltip();
	$('#back_to_top').tooltip();

	scrollUpToTop(500);

	$('#welcomeButton').on('click', function() {
		
		scrollDownTo('#info_plus_menu', 750);
	});

	attachLink('#twitter_icon', 'http://www.twitter.com/VRSanchez8717');
	attachLink('#github_icon', 'http://www.github.com/tdbts');

	$('#send_email_btn').popover({content: 'Thanks for reaching out!'}, 'click');

	$('#back_to_top').on('click', function() {
		
		scrollUpToTop(750);
	});

});