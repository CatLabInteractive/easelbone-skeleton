define (
	[
		'jquery'
	],
	function (
		$
	) {
		return {
			'check' : function ()
			{
				var state = $.Deferred();

				// Remove the warning message (if it's there)
				$('.browser-not-supported').remove ();

				state.resolve();

				return state.promise();
			},

			'showErrorMessage' : function ()
			{
				var warningMessage = '<div class="browser-not-supported">' +
					'<h1>We\'re sorry, this browser is not supported</h1>' +
					'<p>' +
					'You are using an outdated browser that we don\'t support.<br />' +
					'Please upgrade your web browser and try again.' +
					'</p>' +
					'</div>';

				$('body').append (warningMessage);
			}
		}

	}
);