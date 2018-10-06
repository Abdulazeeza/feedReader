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
                
            const firstClass = body.classList;  // the class name of the body before click event on the menu icon
            let newClasses;

            menu.click( function(){  //when menu icon is clicked
                newClasses = body.classList;     // get the class name of the body 
            });

             expect(firstClass).not.toEqual(newClasses);  // expects the class name of the body before click event to different after click event
            });

          });
        /* test suit name Initial Entries*/
         describe('Initial Entries', function(){ 

            beforeEach(function(done){   // calls the loadFeed and make sure it is done before proceeding
                loadFeed(0, done);  //load the first feed
            });

            it('completes its work', function(){  // check for at least a single entry within the .feed container
                 const feed = document.querySelector('.feed');  //gets the .feed element using it class name
                 expect(feed.children.length > 0).toBe(true);  //expects the children of .feed to be at least 1
            });

         });
          /*test suit named New Feed Selection*/
           describe('New Feed Selection',function(){   
              const feed = document.querySelector('.feed');  //get the feed using the class name .feed 
              const childrenFeed = [];  //creates an array 

            beforeEach(function(done){
                loadFeed(0); //load the first feed
                
                Array.from(feed.children).forEach(function(feedsChildern){ //convert children element of the feed to an array the loop through
                    childrenFeed.push(feedsChildern.innerText); //adds the children element text into the array childrenFeed
                 });

                loadFeed(1, done); // load the first feed
            });

            it('content actually changes', function(){   //check if content chnages
                 
                 Array.from(feed.children).forEach(function(feedsChildern, position){  //convert children element of the feed to an array the loop through
                    childrenFeed.push(feedsChildern.innerText);  //adds the children element text into the array childrenFeed
                    expect(feedsChildern.innerText).not.toEqual(childrenFeed[position]);  //expects the feeds to be different
                 });
             });

         });

}());
