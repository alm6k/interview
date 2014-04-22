/* global CompetitorGrid */

describe('CompetitorGrid', function() {
    var cg, markup, sampleData;

    // get some baseline HTML
    markup =  '<div id="competitor-grid" class="grid-container">';
    markup += '<table>';
    markup += '<thead>';
    markup += '<tr>';
    markup += '<th class="grid-title" colspan="4">Competitors</th>';
    markup += '</tr>';
    markup += '<tr class="grid-heading">';
    markup += '<th data-sortkey="email">Email</th>';
    markup += '<th data-sortkey="name">Name</th>';
    markup += '<th data-sortkey="team">Team Name</th>';
    markup += '<th data-sortkey="score">Ambition Score</th>';
    markup += '</tr>';
    markup += '</thead>';
    markup += '<tbody class="grid-body">';
    markup += '</tbody>';
    markup += '</table>';
    markup += '</div>';

    // sample data
    sampleData = {
        'meta': {
            'count': 4,
            'total': 5
        },
        'objects': [{
            firstName: 'Steve',
            lastName: 'Martin',
            user: {
                email: 'steve.martin@tryambition.com'
            },
            teamName: 'The Jerks',
            score: 97
        }, {
            firstName: 'Steve',
            lastName: 'Jobs',
            user: {
                email: 'steve.jobs@tryambition.com'
            },
            teamName: 'The Apples',
            score: 82
        }, {
            firstName: 'Steve',
            lastName: 'Wozniak',
            user: {
                email: 'steve.wozniak@tryambition.com'
            },
            teamName: 'The Apples',
            score: 94
        }, {
            firstName: 'Steve',
            lastName: 'Spielberg',
            user: {
                email: 'steve.spielberg@tryambition.com'
            },
            teamName: 'The Close Encounters',
            score: 63
        }]
    }; // end sample data

    // 1st test - check for successful load/render
    it('Check successful load', function() {
        // reset the DOM
        $('body').html(markup);

        // save and override $.ajax
        var realAjax = $.ajax;
        $.ajax = function(config) {
            // check that the right information is in the config
            expect(config.url).toBe('/api/competitor/');
            expect(config.data.firstName).toBe('Steve');
            expect(config.dataType).toBe('json');

            // call the success method
            config.success(sampleData);
        };

        // get a grid
        cg = new CompetitorGrid('#competitor-grid', 10);

        // spy on the render function before we load
        // and do the mock successful load (which calls render)
        spyOn(cg, 'render').andCallThrough();
        cg.load();

        // we don't want to check the value of any of the results fields
        // here since we're not particularly interested in whether or not
        // the API gave us good data; we just want to know if we got SOME data
        expect(cg.results).not.toBe(null);

        // if I recall correctly, this toBe/'===' check is valid because
        // ajax.success does a direct assignment, so it should be the 
        // same object in memory
        expect(cg.results).toBe(sampleData);
        expect(cg.minRows).toEqual(10);
        expect(cg.lastSort).toBe(null);
        expect(cg.render).toHaveBeenCalled();

        // check that DOM was rendered by checking for the grid summary
        var summary = $('.grid-summary').text();
        expect(summary).toBe('Showing 4 of 5');

        // fix the patch to $.ajax
        $.ajax = realAjax;
    });

    // 2nd test - check that when an error occurs, there is no render
    // this test uses most of the same setup
    it('Check erroneous load', function() {
        // reset the DOM
        $('body').html(markup);

        // save and override $.ajax
        var realAjax = $.ajax;
        $.ajax = function(config) {
            // check that the right information is in the config
            expect(config.url).toBe('/api/competitor/');
            expect(config.data.firstName).toBe('Steve');
            expect(config.dataType).toBe('json');

            // call the error method
            config.error();
        };

        // get a grid with 20 rows instead now
        cg = new CompetitorGrid('#competitor-grid', 20);

        // spy on the render function before we load
        // and do the mock erroneous load (which does NOT render)
        spyOn(cg, 'render').andCallThrough();
        cg.load();

        // we already have tested that the initialization worked
        // so we only need to test that render hasn't been called
        // and that results was not populated
        expect(cg.render).not.toHaveBeenCalled();
        expect(cg.results).toBe(null);

        // fix the patch to $.ajax
        $.ajax = realAjax;
    });

    // 3rd test - check that sort functions properly
    it('Sorting test', function() {
        // reset the DOM
        $('body').html(markup);

        // save and override $.ajax
        var realAjax = $.ajax;
        $.ajax = function(config) {
            // call the error method with sample data
            config.success(sampleData);
        };

        // get a grid
        cg = new CompetitorGrid('#competitor-grid', 10);
        cg.load();

        // spy on the sorting methods
        spyOn(cg.sorters, 'score').andCallThrough();

        // test that sorting on score works here
        var sel = $('.grid-heading > th:nth-child(4)'),
            heading = sel.text();
        expect(heading).toBe('Ambition Score');

        // click on the heading
        sel.click();

        // ensure that the right sorter was called at least once
        expect(cg.sorters.score).toHaveBeenCalled();

        // ensure that the items were sorted in ascending order by score
        // since that's the heading we clicked above
        var isSortedAsc = cg.results.objects.every(function(item, index, arr) {
            if (index !== 0) {
                var prev = arr[index - 1].score,
                    cur = item.score;

                // if the previous item's score exceeds the current score
                // then the list is not sorted by score
                if (prev > cur) {
                    return false;
                }
            }
            return true;
        });
        expect(isSortedAsc).toBe(true);

        // make sure that the last sort was on column 3 (0-indexed)
        expect(cg.lastSort).toBe(3);

        // fix the patch to $.ajax
        $.ajax = realAjax;
    });
});
