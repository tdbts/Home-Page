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

	function attachLinks(selectorsAndURLs) {
		selectorsAndURLs.forEach(function(obj) {
			
			$(obj.selector).on('click', function() {
				
				window.open(obj.url);
			});
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

	var linkData = [
	{selector: "#twitter_icon", url: "https://twitter.com/vrsanchez8717"},
	{selector: "#github_icon", url: "https://github.com/tdbts"} 
	];

	attachLinks(linkData);
	
	$(window).load(function() {
		
		$('#landing_page_elements').css('visibility', 'visible').hide().fadeIn(2000);
	});

	$('.bar-icon').tooltip();
	$('#back_to_top').tooltip();

	scrollUpToTop(500);

	$('#welcomeButton').on('click', function() {
		
		scrollDownTo('#info_plus_menu', 750);
	});


	$('#send_email_btn').popover({content: 'Thanks for reaching out!'}, 'click');

	$('#back_to_top').on('click', function() {
		
		scrollUpToTop(750);
	});

});