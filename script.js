$(document).ready(function() {
	function scrollPageAnimation(selector, scrollTopValue, milliseconds) {
		
		$(selector).animate({
			
			scrollTop: scrollTopValue
		}, milliseconds);
	}

	function scrollUpToTop(milliseconds) {

		return scrollPageAnimation('html, body', 0, milliseconds);
	}	

	function scrollDownTo(elementSelector, milliseconds) {

		return scrollPageAnimation('html, body', $(elementSelector).offset().top, milliseconds);
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

	function emailModalAJAXHandler() {

		$('#send_email_btn').on('click', function(event) {

			event.preventDefault();

			var firstName = getVal('#first_name'),
				lastName = getVal('#last_name'),
				email = getVal('#email'),
				comments = getVal('#comments'),
				url = '/shared/send_form_email.php';

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

		});
	}

	function activateTooltips(arrayOfSelectors) {
		arrayOfSelectors.forEach(function (selector) {
			$(selector).tooltip();
		});
	}

	function fadeInWelcomeElements() {
		$('#landing_page_elements').css('visibility', 'visible').hide().fadeIn(2000);
	}

	function attachEventHandlers() {
		
		var toolTipSelectors = ['.bar-icon', '#back_to_top'], 
			linkData = [
				{selector: '#twitter_icon', url: "https://twitter.com/vrsanchez8717"},
				{selector: '#github_icon', url: "https://github.com/tdbts"} 
			];

		activateTooltips(toolTipSelectors);
		attachLinks(linkData);

		emailModalAJAXHandler();

		$('#welcomeButton').on('click', function() {
			
			scrollDownTo('#info_plus_menu', 750);
		});

		$('#send_email_btn').popover({content: "Thanks for reaching out!"}, 'click');

		$('#back_to_top').on('click', function() {
			
			scrollUpToTop(750);
		});
	}

	function init() {
		
		scrollUpToTop(500);
		
		attachEventHandlers();
		
		$(window).load(function() {
			
			fadeInWelcomeElements();
		});
	}

	init();

});