/**
 * Events:
 * - launcher:prepare:start
 * - launcher:prepare:end
 *
 */
define(
	[
		'backbone',
		'underscore',
		'jquery'
	],
	function(
		backbone,
		underscore,
		jquery
	)
	{
		/**
		 * Event manager
		 * @constructor
		 */
		var EventManager = function()
		{
			this.events = {};
		};

		var p = EventManager.prototype;
		var i;
		var j;
		var result;
		var deferQueue;

		/**
		 * Trigger
		 * @param events
		 * @returns {*}
		 */
		p.trigger = function(events)
		{
			if (!jquery.isArray(events)) {
				events = [ events ];
			}

			var args = [];
			Array.prototype.push.apply( args, arguments );

			// Strip the event from the argument list.
			args.shift();

			// Create a chain.
			var chain = jquery.Deferred();
			var promise = chain.promise();

			deferQueue = [];

			args.unshift(null);

			for (j = 0; j < events.length; j ++) {

				var event = events[j];
				args[0] = event;

				if (typeof (this.events['*']) != 'undefined') {
					for (i = 0; i < this.events['*'].length; i++) {
						deferQueue.push (this.events['*'][i].apply (this, args));
					}
				}

				if (typeof (this.events[event]) != 'undefined') {
					for (i = 0; i < this.events[event].length; i++) {
						var er = this.events[event][i].apply (this, args);
						deferQueue.push(er);
					}
				}

			}

			if (deferQueue.length === 0) {
				chain.resolve();
			}
			else {
				jquery.when.apply(this, deferQueue).then(function() {
					chain.resolve();
				})
			}

			return promise;
		};

		/**
		 * @param event
		 * @param callback
		 */
		p.on = function(event, callback)
		{
			if (typeof (this.events[event]) === 'undefined') {
				this.events[event] = [];
			}

			this.events[event].push(callback);
		};

		return EventManager;
	}
);