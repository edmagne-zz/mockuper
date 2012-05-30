$(document).ready(function() {
	if (mockuper.replaceImagePlaceHolders)
		$('img').each(function() {
			if ($(this).data('placeholder'))
				$(this).attr('src', 'http://placehold.it/' + $(this).data('placeholder'));
		});
});

mockuper = [];

mockuper.replaceImagePlaceHolders = true;

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
					o.names = utils.subarray(o.names, options.array);
				if (options.random)
					o.names = o.shuffle();
				if (options.length > 0)
					o.names = utils.subarray(o.names, options.length);
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

mockuper.text = [];

mockuper.text.lorem = [];

mockuper.text.getLorem = function(callback, options) {
	$.ajax({
		type: 'GET',
		dataType: 'json',
		url: 'core/json/lorem.json',
		success: function(content) {
			mockuper.text.lorem = content.paragraph;
			if (options) {
				if (options.paragraphs)
					mockuper.text.lorem = utils.subarray(mockuper.text.lorem, options.paragraphs);
			}

			callback();
		}
	});
};

utils = [];

utils.subarray = function (array, n) {
	var aux = [];

	if (n.length)
		for(var i = 0; i < n.length; i++) 
			aux[i] = array[n[i]];
	else
		for(var i = 0; i < n; i++)
			aux[i] = array[i];

	return aux;
}