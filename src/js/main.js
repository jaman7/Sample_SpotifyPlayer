'use strict';
require.config({
	baseUrl: 'js/',
	paths: {
		jquery: [
			'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min',
			'jsvendor/jquery.min'
		],
		spotifyplayer: 'spotifyplayer'
	}
});

define(['jquery', 'spotifyplayer'], function ($) {
	'use strict';
	var $scrollContent = '.scroll';
	var $scrollContent2 = '.scroll-2';

	function projimg($scroll) {
		var windowHeight = $(window).height(),
			logoheader = $('.header').outerHeight(true),
			sectionTitle = $('.section-title').outerHeight(true),
			mainHeader = $('.main-header').outerHeight(true),
			footer = $('.footer').outerHeight(true);

		// console.log(windowHeight - logoheader - sectionTitle - mainHeader - footer - 5 + 'px');

		if ($($scroll).length) {
			$($scroll).css(
				'max-height',
				windowHeight - logoheader - sectionTitle - mainHeader - footer - 5 + 'px'
			);
		}
	}

	$('body').bind('DOMSubtreeModified', function () {
		if ($($scrollContent).length > 0) {
			projimg($scrollContent);
		}

		if ($($scrollContent2).length > 0) {
			projimg($scrollContent2);
		}
	});
});
