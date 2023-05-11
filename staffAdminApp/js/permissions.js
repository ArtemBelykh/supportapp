(() => {
	console.log('permissions');

	showSpinner();
	setTimeout(() => {
			hideSpinner();
			$('.main').append(`
				<div class="header-block header-block--wider">
					<div class="header-block__container">
						<h3 class="header-block__title">Permissions</h3>
					</div>
				</div>
				<table id="tblMain" class="table table-condensed table-striped table-hover" cellpadding="7" cellspacing="0">
				</table>
	`);
	}, 500)
			
	
		
			
	function showSpinner() {
		if (!$('.loader').length) {
			$('.main').append('<div class="loader"></div>');
		}
	}
		
	function hideSpinner() {
		$('div.loader').remove();
	}
})()