/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {


        it('feeds are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it('urls are defined', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });


        it('names are defined', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */


    describe('The Menu', function () {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('menu element is hidden', function () {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('working toggle on click event', function () {

            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });



    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {

        // Calls a function to do an asynchronous request 
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('define if feed has at least a single entry', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });




    /* TODO: Write a new test suite named "New Feed Selection" */


    describe('New Feed Selection', function () {
        var firstFeed, secondFeed;

        /* TODO: Write a test that ensures when a new feed is loaded
          * by the loadFeed function that the content actually changes.
          * Remember, loadFeed() is asynchronous.
          
          */
        beforeEach(function (done) {
            loadFeed(1, function () {

                // Tests if first feed is loaded
                console.log('First feed loaded')

                // Loads first entry and checks
                firstFeed = $('.feed').html();
                loadFeed(2, function () {

                    // Tests if second feed is loaded
                    console.log('Second feed loaded')
                    done();
                });
            });
        });

        afterEach(function () {
            loadFeed(0);
        });

        // Tests to see if two entries are not equal
        it('checks if two feeds are not same', function () {

            // Checks second feed
            secondFeed = $('.feed').html();
            expect(firstFeed).not.toEqual(secondFeed);
        });
    });



});
