window.Bid = function(callback , time , callEvery) {

	this.time = 200; //default time
	this.bumpCount = 0; //bumps count in case we want to call cb every n bumps
	this.callEvery = false;

	if ( typeof callback == "function" ) {
		this.callback = callback;

	} else if ( typeof time == "number" ) {
		this.time = time;
	}

	if ( typeof callEvery == "number" ) {
		this.callEvery = callEvery;
	}

	return this;
};

window.Bid.prototype = {
	//bumps bid waiting to call callback for another ammount of time
	bump : function(obj, time) {
		var _this = this;

		this.bumpCount++; //increment bump count

		//if called so many times that timeEvery is positive - call callback
		if ( this.callEvery && this.bumpCount % this.callEvery == 0 ) {
			this.finish(obj);
		}

		this._stopTimeout();

		this.timeout = setTimeout(function(){
			_this.finish(obj);
		}, time || this.time);

		return this;
	},
	//stops bid without calling callback
	stop : function(obj) {
		clearTimeout( this.timeout );

		return this;
	},
	//stops bid and calls callback immediately
	finish : function(obj) {
		if ( typeof this.callback !== "function" ) return false;
		this._stopTimeout();
		this.callback.call( obj , obj ); //call callback with obj as parameter and as 'this' inside function
		return this;
	},
	_stopTimeout : function(){
		clearTimeout( this.timeout );
		return this;
	}
};