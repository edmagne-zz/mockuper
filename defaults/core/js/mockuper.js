$(document).ready(function() {
	if (mockuper.replaceImagePlaceHolders)
		$('img').each(function() {
			if ($(this).data('placeholder'))
				$(this).attr('src', 'http://placehold.it/' + $(this).data('placeholder'));
		});
});

mockuper = [];

mockuper.people = [];

mockuper.people.names = [];

mockuper.people.getNames = function(callback, options) {
	$.ajax({
		type: 'GET',
		dataType: 'json',
		url: 'core/json/people.json',
		success: function(content) {
			var o = mockuper.people;
			o.names = content.people;
			if (options) {
				if (options.array)
					o.names = o.subarray(options.array);
				if (options.random)
					o.names = o.shuffle();
				if (options.length > 0)
					o.names = o.subarray(options.length);
			}
			mockuper.people.names = o.names;
			callback();
		}
	});
};

mockuper.people.shuffle = function() {
	var auxNames = [];
	for (var i = 0; i < mockuper.people.names.length; i++) {
		var j = Math.floor(Math.random() * 6);
		auxNames[i] = mockuper.people.names[j];
	}
	return auxNames;
};

mockuper.people.subarray = function(n) {
	var auxNames = [];
	if (n.length)
		for(var i = 0; i < n.length; i++) 
			auxNames[i] = mockuper.people.names[n[i]];
	else
		for(var i = 0; i < n; i++)
			auxNames[i] = mockuper.people.names[i];

	return auxNames;
};

mockuper.includeTemplateInto = function(fileName, element) {
	$.ajax({
		type: 'GET',
		dataType: 'html',
		url: 'core/templates/' + fileName + '.html',
		success: function(content) {
			$(element).append($(content));
		}
	});
}

mockuper.replaceImagePlaceHolders = true;