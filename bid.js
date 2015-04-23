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
	bump : function() {
		var _this = this;
		var args = arguments;

		this.bumpCount++; //increment bump count

		//if called so many times that timeEvery is positive - call callback
		if ( this.callEvery && this.bumpCount % this.callEvery == 0 ) {
			this.finish(obj);
		}

		this._stopTimeout();

		this.timeout = setTimeout(function(){
			_this.finish.apply( _this , args );
		}, this.time);

		return this;
	},
	//stops bid without calling callback
	stop : function() {
		clearTimeout( this.timeout );

		return this;
	},
	//stops bid and calls callback immediately
	finish : function() {
		if ( typeof this.callback !== "function" ) return false;
		this._stopTimeout();
		this.callback.apply( typeof arguments[0] !== "undefined" ? arguments[0] : this , arguments ); //call callback with passed parameters and as 'this' as first parameter if exists
		return this;
	},
	_stopTimeout : function(){
		clearTimeout( this.timeout );
		return this;
	}
};