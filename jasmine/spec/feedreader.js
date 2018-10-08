/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* all tests are within the $() function,
 * since some of these tests may require DOM elements,so as 
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /*it test to make sure that all the URLs are the defined and it not empty */
        it('URL are defined', function(){  
        
           allFeeds.forEach(function(feed) {  //loops through allFeeds 
              expect(feed.url).toBeDefined();   // expect URL to defined
              expect(feed.url.length).not.toBe(0);  // expect the URL not to empty
          });

         });
        /*it test to make sure that all the nmaes are the defined and it not empty */
         it('name are defined', function(){
            allFeeds.forEach(function(feed) {    //loops through allFeeds 
              expect(feed.name).toBeDefined();    // expect name to defined
              expect(feed.name.length).not.toBe(0);   // expect the name not to empty
          });

         });
    });
        /*second suit, this test for all the possible outcome of the menu */
    describe('The menu', function(){
              
        const body = document.querySelector('body'); //get the body element from the DOM
        const menu = document.querySelector('.menu-icon-link');   //get the menu icon link by its class name 

        it('hidden', function(){  // checks for possible outcome when it hidden

           expect(body.classList.contains('menu-hidden')).toBe(true);  // expects the body to have class name of menu-hidden 
        });

        it('changes visibility', function(){  // what is expected when the menu is hidden or visible
            menu.click(); //clicks the menu 
            expect(body.classList.contains('menu-hidden')).toBe(false);  //when click event occurs expects the body not to have a class name of menu-hidden 
            menu.click();  //clicks the menu
            expect(body.classList.contains('menu-hidden')).toBe(true);   //when click event occurs expects the body  to have a class name of menu-hidden 
          });
    });
        // test suit name Initial Entries
         describe('Initial Entries', function(){ 

            beforeEach(function(done){   // calls the loadFeed and make sure it is done before proceeding
                loadFeed(0, done); 
            });

            it('completes its work and at least a single .entry element', function(){  // check for at least a single entry within the .feed container
                 const feed = document.querySelector('.feed');  //gets the feed using it class name .feed
                 const entry = feed.querySelectorAll('.entry');  //gets the all entry using it class name .entry
                 expect(entry.length).toBeGreaterThan(0);  //expects at least one entry
            });

         });
          //test suit named New Feed Selection
          describe('New Feed Selection',function(){   
              const feed = $('.feed');  //get the feed using the class name .feed 
              let firstFeed,
              secondFeed;

                beforeEach(function(done){
                 feed.empty();  // clear all statement
                 
                 loadFeed(0, function(){    //load the first feed
                      
                      firstFeed = feed.find(allFeeds.url);  //get the allFeeds url text

                      loadFeed(1,function(){  //load the second feed
                      secondFeed = feed.find(allFeeds.url);  //get the allFeeds url text
                
                       }); 
                      
                      done();
                 });
    
                 

            });

            it('content actually changes', function(){   //check if content chnages
                   expect(firstFeed).not.toBe(secondFeed);  //expects the feeds to be different
             });

         });

}());
