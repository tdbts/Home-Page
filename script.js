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

	function clickHandler(selector, action) {

		$(selector).on('click', action);
	}

	function attachLinks(selectorsAndURLs) {

		selectorsAndURLs.forEach(function(obj) {

			clickHandler(obj.selector, function () {
				
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

	function handleEmailSubmissionRequest(event) {

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
	}

	function emailModalAJAXHandler() {

		clickHandler('#send_email_btn', handleEmailSubmissionRequest);
	}

	function activateTooltips(arrayOfSelectors) {
		
		arrayOfSelectors.forEach(function (selector) {
			
			$(selector).tooltip();
		});
	}

	function fadeInWelcomeElements() {
		
		$('#landing_page_elements').css('visibility', 'visible').hide().fadeIn(2000);
	}

	function welcomeButtonClickHandler() {

		clickHandler('#welcomeButton', function () {
			
			scrollDownTo('#info_plus_menu', 750);
		});	
	}

	function emailSubmissionHandler() {

		$('#send_email_btn').popover({content: "Thanks for reaching out!"}, 'click');
	}

	function backToTopButtonHandler() {
		
		clickHandler('#back_to_top', function () {
			
			scrollUpToTop(750);
		});
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

		welcomeButtonClickHandler();
		emailSubmissionHandler();
		backToTopButtonHandler();

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