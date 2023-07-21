


// use local object to cache json response
charts.storage = {};
// @param callback: a function that works on k, i.e. of the form function(k) {}
d3.cachedJson = function(url, key, callback) {
	if (charts.storage[key]) {
		// data is in the storage
		callback(JSON.parse(charts.storage[key]));
	} else {
		// not cached, fetch the data from url
		d3.json(url, function(json) {
      charts.storage[key] = JSON.stringify(json);
      callback(json);
    });
	}
}