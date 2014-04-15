/* global CompetitorGrid */
/* global spyOn */

/**
 * TODO:
 * - check that summary was displayed (can use jQuery?)
 * - call addSort
 * - simulate a header 'click' event
 * - check that appropriate sorter was called
 * - check that the objects were reordered
 * - check that lastSort has the right value
 */

describe('CompetitorGrid', function() {
    var cg;

    // 1st load test - check for successful load/render
    it('Check successful load', function() {
        // get a grid
        cg = new CompetitorGrid('#competitor-grid', 10);

        // spy on the render function before each test
        // and do the mock successful load (which calls render)
        spyOn(cg, 'render').andCallThrough();
        cg.testLoadSuccess();

        // we don't want to check the value of any of the results fields
        // here since we're not particularly interested in whether or not
        // the API gave us good data;
        // we just want to know if we got SOME data
        expect(cg.results).not.toBe(null);
        expect(cg.minRows).toEqual(10);
        expect(cg.lastSort).toBe(null);
        expect(cg.render).toHaveBeenCalled();
    });

    // 2nd load test - check that when an error occurs, there is no render
    it('Check that render was NOT called', function() {
        // make a new one with 20 rows instead
        cg = new CompetitorGrid('#competitor-grid', 20);

        // spy on the render function before each test
        // and do the mock failed load (which does NOT call render)
        spyOn(cg, 'render').andCallThrough();
        cg.testLoadError();

        // we already have tested that the initialization worked
        expect(cg.render).not.toHaveBeenCalled();
    });
});
