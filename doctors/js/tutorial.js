$(function () {



	$('.app-block__btn').on('click', handleBtnMenuClick);

	$('.tutorialVideo-block').append(`
		<video class="video" controls>
			<source src="assets/video/Physician Portal Tutorial.mp4" type="video/mp4">
		</video>
	`);

	// window.onorientationchange = function (event) {
	// 	console.log("the orientation of the device is now ", event.target.screen);
	// 	const { orientation: { type } } = event.target.screen;
	// 	const elem = document.querySelector('.video');
	// 	if (type.startsWith('landscape')) {
	// 		console.log('landscape')
	// 		if (!document.fullscreenElement && elem.requestFullscreen) {
	// 			elem.requestFullscreen();
	// 		} else if (!document.fullscreenElement && elem.mozRequestFullScreen) {
	// 			elem.mozRequestFullScreen();
	// 		} else if (!document.fullscreenElement && elem.webkitRequestFullscreen) {
	// 			elem.webkitRequestFullscreen();
	// 		} else if (!document.fullscreenElement && elem.msRequestFullscreen) {
	// 			elem.msRequestFullscreen();
	// 		}
	// 	} else {
	// 		console.log('other')
	// 		if (document.mozCancelFullScreen) {
	// 			document.mozCancelFullScreen();
	// 		} else if (document.webkitExitFullscreen) {
	// 			document.webkitExitFullscreen();
	// 		} else if (document.msExitFullscreen) {
	// 			document.msExitFullscreen();
	// 		}
	// 	}

	// };

	function handleBtnMenuClick(e) {
		$('.app-block__menu').slideToggle(300);
	}
})