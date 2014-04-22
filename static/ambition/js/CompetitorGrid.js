/**
 * Write some JS here.
 * CompetitorGrid should be an object that can render a sortable grid.
 */

// constructor for the CompetitorGrid object
// parameters:
// targetSelector => jQuery selector referring to the container for the grid
//    minRowCount => the minimum number of rows that are rendered in the grid
function CompetitorGrid(targetSelector, minRowCount) {
    this.container = $(targetSelector);
    this.minRows = minRowCount;
    this.results = null;
    this.lastSort = null;
    this.addSort();
}

// define the properties of the grid 
CompetitorGrid.prototype = {
    // load the grid with API data
    load: function() {
        var self = this; // preserve scope

        $.ajax({
            url: '/api/competitor/',
            data: {'firstName': 'Steve'},
            dataType: 'json',
            success: function(data) {
                self.results = data;
                self.render();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('CompetitorGrid load: ', textStatus, '//', errorThrown);
            }
        });
    },

    // render the grid with the loaded data
    render: function() {
        var self = this; // preserve scope

        // only render the grid if there were objects in the results
        if (self.results) {
            var count = self.results.meta.count,
                total = self.results.meta.total,
                tableItems = '';

            // add rows
            $.each(self.results.objects, function(index, item) {
                tableItems += '<tr id="' + item._id + '">';
                tableItems += '<td>' + item.user.email + '</td>';
                tableItems += '<td>' + item.firstName + ' ' + item.lastName + '</td>';
                tableItems += '<td>' + item.teamName + '</td>';
                tableItems += '<td>' + item.score + '</td>';
            });

            // add enough rows to get up to 10 rows total
            for (var i = count; i < self.minRows; i++) {
                tableItems += '<tr><td></td><td></td><td></td><td></td></tr>';
            }

            // and change the summary text
            tableItems += '<tr><td class="grid-summary" colspan="4">';
            tableItems += 'Showing ' + count + ' of ' + total;
            tableItems += '</td></tr>';

            // render it to the grid body
            self.container.find('.grid-body').html(tableItems);
        }
    },

    // add the sort handlers to the table headings
    addSort: function() {
        var self = this; // preserve scope

        // add a handler for each heading based on its index;
        // this way allows the position of the heading to correspond to
        // a comparison function in the CG.sorters table
        self.container.find('.grid-heading > th').each(function(index) {
            $(this).on('click', function() {
                if (self.lastSort === index) {
                    // if we've already sorted on this column, then reverse it
                    self.results.objects.reverse();
                } else {
                    // otherwise, do a new sort
                    var key = $(this).attr('data-sortkey');
                    self.results.objects.sort(self.sorters[key]);
                }

                // remember the last heading that we sorted on
                self.lastSort = index;

                // rerender the grid 
                self.render();
            });
        });
    },

    // return a sort function based on an object property
    // based on an idea from:
    // http://stackoverflow.com/questions/2466356/javascript-object-list-sorting-by-object-property 
    sorters: {
        'email': function(a,b) {
            return ((a.user.email < b.user.email) ? -1 : ((a.user.email > b.user.email) ? 1 : 0));
        },
        'name': function(a,b) {
            return ((a.lastName < b.lastName) ? -1 : ((a.lastName > b.lastName) ? 1 : 0));
        },
        'team': function(a,b) {
            return ((a.teamName < b.teamName) ? -1 : ((a.teamName > b.teamName) ? 1 : 0));
        },
        'score': function(a,b) {
            return (a.score - b.score);
        }
    }
};
