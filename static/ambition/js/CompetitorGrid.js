/**
 * Write some JS here.
 * CompetitorGrid should be an object that can render a sortable grid.
 */

var CompetitorGrid = {};

// load the grid with API data
CompetitorGrid.load = function() {
	var _this = this; // preserve scope
	_this.results = {};

	$.ajax({
		url: 'api/competitor',
		data: {'firstName': 'Steve'},
		dataType: 'json',
		success: function(data) {
			_this.results = data;
			_this.lastSort = -1;
			_this.render();
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('CompetitorGrid load: ', textStatus, '//', errorThrown);
		}
	});
};

// render the grid with the loaded data
CompetitorGrid.render = function() {
	var _this = this; // preserve scope

	// only render things if there were objects in the list
	if (this.results !== {}) {
		var count = _this.results.meta.count,
			total = _this.results.meta.total,
			tableItems = '';

		// add rows
		$.each(_this.results.objects, function(index, item) {
			tableItems += '<tr><td>' + item.user.email + '</td>';
			tableItems += '<td>' + item.firstName + ' ' + item.lastName + '</td>';
			tableItems += '<td>' + item.teamName + '</td>';
			tableItems += '<td>' + item.score + '</td>';
		});

		// add enough rows to get up to 10 rows total
		for (var i = count; i < 10; i++) {
			tableItems += '<tr><td></td><td></td><td></td><td></td></tr>';
		}

		// and change the summary text
		tableItems += '<tr><td id=\'competitor-table-summary\' colspan=\'4\'>';
		tableItems += 'Showing ' + count + ' of ' + total;
		tableItems += '</td></tr>';

		// render it
		$('#competitor-table-body').html(tableItems);
	}
};

// add the sort handlers to the table headings
CompetitorGrid.addSort = function() {
	var _this = this; // preserve scope

	// add a handler for each heading based on its index;
	// this way allows the position of the heading to correspond to
	// a comparison function in the CG.sorters table
	$('#competitor-table-heading th').each(function(index) {
		$(this).on('click', function() {
			if (_this.lastSort == index) {
				// if we've already sorted on this column, then reverse it
				_this.results.objects.reverse();
			} else {
				// otherwise, do a new sort
				_this.results.objects.sort(_this.sorters[index]);
			}

			// remember the last sort
			_this.lastSort = index;

			// rerender the table
			_this.render();
		});
	});
};

// return a sort function based on an object property
// source: http://stackoverflow.com/questions/2466356/javascript-object-list-sorting-by-object-property 
// array corresponds to the headings layout
// [email, name, team, score]
CompetitorGrid.sorters = [
	function(a,b) {
		return ((a.user.email < b.user.email) ? -1 : ((a.user.email > b.user.email) ? 1 : 0));
	},
	function(a,b) {
		return ((a.lastName < b.lastName) ? -1 : ((a.lastName > b.lastName) ? 1 : 0));
	},
	function(a,b) {
		return ((a.teamName < b.teamName) ? -1 : ((a.teamName > b.teamName) ? 1 : 0));
	},
	function(a,b) {
		return (a.score - b.score);
	}
];

// ready function -- execute when page loads
$(function() {
	CompetitorGrid.load(); // this will do the render
	CompetitorGrid.addSort();
});
