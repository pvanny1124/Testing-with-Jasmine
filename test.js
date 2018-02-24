/* Unit testing with Jasmine!

    -I have placed this whole tutorial under one folder for the sake of
        making you follow along and building up knowledge to bigger concepts step by step.
        
    What is jasmine?
    -Jasmine provides us methods for unit testing and a nice browser interface to check
        tests and where they are failing, along with various methods
        to test our code.
    -Jasmine does not require an additional library/modules unlike Mocha

    What is unit testing?
         Unit testing definition: Testing small units of our code for correctness

    Three main methods jasmine gives us:
        describe
        it
        expect
        
    -"it" is a spec which houses the "expect" function.
    -"expect" checks a returned object with a matcher. 
    -The matcher is a predefined method that comes with expect() that will check if a certain condition is met
        
    Different matchers we can use:

    -toBe uses a === to check a value and its type
    -toBeCloseTo is used for something similar but not the same
    -toBeDefined() is for checking variables that are
    -not defined that NEED to be defined
    -toBeFalsey/toBeTruthy
    -toBeGreaterThan/toBeLessThan
    -toContain is to check if there's at least 1 thing in an array

    Example of equality checking:
    
    running the following in the console:
        arr1 = [1,2,3]
        arr2 = [1,2,3]
        arr1 === arr2 is FALSE
    
        Why?
            because both arrays are different references in memory!!
    
    Now suppose:
        arr1 = [1,2,3]
        arr2 = arr1
        arr1 === arr2 is TRUE!
            Because arr2 is referencing arr1 in memory!
            
        To check the equality of two objects, we can use: toEqual

*/

//let's code up!

//Define an object to test
var earth = {
    isRound: true,
    numberFromSun: 3
}

//To check the type of anything, use: jasmine.any()
describe("Earth", function(){
            it("is round", function(){
                expect(earth.isRound).toBe(true);
            });
            
            it("is the third planet from the sun", function(){
                expect(earth.numberFromSun).toBe(3);
            });
})

describe("Jasmine Matchers", function() {
      it("allows for === and deep equality", function() {
        expect(1+1).toBe(2);
        expect([1,2,3]).toEqual([1,2,3]);
      });
      
      it("allows for easy precision checking", function() {
        expect(3.1415).toBeCloseTo(3.14,2);
      });
      
      it("allows for easy truthy / falsey checking", function() {
        expect(0).toBeFalsy();
        expect([]).toBeTruthy();
      });
      
      it("allows for easy type checking", function() {
        expect([]).toEqual(jasmine.any(Array));
        expect(function(){}).toEqual(jasmine.any(Function));
      });
      
      it("allows for checking contents of an object", function() {
        expect([1,2,3]).toContain(1);
        expect({name:'Elie', job:'Instructor'}).toEqual(jasmine.objectContaining({name:'Elie'}));
      });
});
    
    
/* 2) Using beforeEach to dry up code.
        We could declare a new var arr in every "it" and work with it. But
        Fortunately, beforeEach lets us declare variables that would be re-used
        before every single "it" function without
        having to manually type up all of that code within them.
*/
describe("Arrays", function(){
    
          var arr;
          
          beforeEach(function(){
            arr = [1,3,5];
          });
          
          it("adds elements to an array", function(){
            arr.push(7);
            expect(arr).toEqual([1,3,5,7]);
          });
        
          it("returns the new length of the array", function(){
            expect(arr.push(7)).toBe(4);
          });
        
          it("adds anything into the array", function(){
            expect(arr.push({})).toBe(4);
          });
});

//Just like beforeEach(), afterEach() re-declares a variable AFTER each "it" method
describe("Counting", function(){
              var count = 0;
              
              beforeEach(function(){
                count++;
              });
              
              afterEach(function(){
                count = 0;
              });
                      
                      //Here count is 1 because of beforeEach
              it("has a counter that increments", function(){
                expect(count).toBe(1);
              });
                     //Now count is 0 because of afterEach
              it("gets reset", function(){
                expect(count).toBe(1);
              });
});

//Similarly, we could declare re-used variables in tests with beforeAll/afterAll
//comment above code out and uncomment below to see how it works!
/*

var arr = [];
beforeAll(function(){
  arr = [1,2,3];
})
describe("Counting", function(){
  it("starts with an array", function(){
    arr.push(4); 
    expect(1).toBe(1);
  });
  it("keeps mutating that array", function(){
    console.log(arr); // [1,2,3,4]
    arr.push(5);
    expect(1).toBe(1);
  });
});
describe("Again", function(){
  it("keeps mutating the array...again", function(){
    console.log(arr); // [1,2,3,4,5]
    expect(1).toBe(1);
  });
});

*/

//Nested describes
describe("Array", function(){
              var arr;
              beforeEach(function(){
                arr = [1,3,5];
              });
              
              describe("#unshift", function(){
                  
                        it("adds an element to the beginning of an array", function(){
                          arr.unshift(17);
                          expect(arr[0]).toBe(17);
                        });
                        
                        it("returns the new length", function(){
                          expect(arr.unshift(1000)).toBe(4);
                        });
              });
              
              describe("#push", function(){
                  
                        it("adds elements to the end of an array", function(){
                              arr.push(7);
                              expect(arr[arr.length-1]).toBe(7);
                        });
                        
                        it("returns the new length", function(){
                                expect(arr.push(1000)).toBe(4);
                        });
              });
});
 
 
/* Three different ways to specify a pending test!
    1) xit tests are PENDING
    2) an it without a callback is a pending test
    3) an it with a pending() method inside is a pending test!

*/
describe("Pending specs", function(){
    xit("can start with an xit", function(){
        expect(true).toBe(true);
    });

      it("is a pending test if there is no callback function");
    
      it("is pending if the pending function is invoked inside the callback", function(){
        expect(2).toBe(2);
        pending();
      });

});

//Note: it is better to have much less expect methods within an "it" method

/* Using Spies
    Spies mimic other functions you want to test.
        They can track calls to it and all arguments.
        They only exist within describe/it blocks
        They are removed after each spec
        And they all have special matchers belonging to them
    
*/

//Lets create some spies!
//Lets create a real function
function add(a,b,c){
  return a+b+c;
}

//This function is in the global scope of our code.
    //Therefore, it exits in the "window" object!
        //More on this here: https://www.w3schools.com/js/js_window.asp

//Now let's write the test:
describe("add", function(){
    
          var addSpy, result;
          
          beforeEach(function(){
            //Get the "add" method from the "window" object
            addSpy = spyOn(window, 'add');
            
            //Now addSpy is a copy or "mimic" of the "add" function
            result = addSpy(1,2,3);
          })
          
          it("is can have params tested", function(){
             //toHaveBeenCalled checks whether the function is actually called
            expect(addSpy).toHaveBeenCalled();
            //toHaveBeenCalledWith tests with the parameters that we specified on line 232!
            expect(addSpy).toHaveBeenCalledWith(1, 2, 3);
          });
});


/* Using the .and.callThrough() method to get the return value 
    of a spy.
    
    This is worth doing when we can't access objects within the function,
    Or if the function takes long to return.
    
    Don't invoke functions that are dependent on other functions!
    Use dummy data to speed up the tests!
*/
function secondAdd(a,b,c){
  return a+b+c;
}

describe("secondAdd", function(){
    
              var addSpy, result;
              
              beforeEach(function(){
                  //The .and.callThrough method returns the actual value 
                  //if the function had been called with 1,2,3
                addSpy = spyOn(window, 'secondAdd').and.callThrough();
                result = addSpy(1,2,3);
              })
              
              it("can have a return value tested", function(){
                  //Since we used .and.callThrough, we can now test
                  //to see if the correct result was returned!
                expect(result).toEqual(6);
              });
});


//Testing Frequency: testing the number of times a function is called
    //Useful if we only want the function to be invoked a certain amount of times or once

function thirdAdd(a,b,c){
  return a+b+c;
}
describe("thirdAdd", function(){
    
          var addSpy, result;
          
          beforeEach(function(){
            addSpy = spyOn(window, 'thirdAdd').and.callThrough();
            result = addSpy(1,2,3);
          })
          
          //the calls object from addSpy provides us the tools we need to accomplish this.
          //calls.any() checks if the function is called at least once.
          //calles.count() returns the amount of times the function is called.
          
          it("is can have params tested", function(){
              
                //Check if the function is at least called once:
                expect(addSpy.calls.any()).toBe(true);
                
                //Check if the function is called once
                expect(addSpy.calls.count()).toBe(1);
                
                //Check result
                expect(result).toEqual(6);
          });
});

//////////////////////////////////////////////////////////////////////////////////

/* Clocks */
//Testing async code and time dependent code!

/* Jasmine Clock is available for testing time dependent code.
    Invoke jasmine.clock().install() to install it!
    NOTE: You must uninstall the clock after a spec (it) to restore its
            original functions with jasmine.clock().uninstall()!
            -This is commonly done with an afterEach callback
            
    
            Jasmine will wait 5 seconds for the done callback to run or 
            the test will timeout by default and you can 
            modify the internal timer with jasmine.DEFAULT_TIMEOUT_INTERVAL
            
*/

//Example with setTimeout
describe("a simple setTimeout", function(){
    
          var sample;
          
          beforeEach(function() {
              //jasmine.createSpy will create a dummy function that has no implementation!
            sample = jasmine.createSpy("sampleFunction");
            jasmine.clock().install();
          });
        
          afterEach(function() {
            jasmine.clock().uninstall();
          });
          
           it("is only invoked after 1000 milliseconds", function(){
                setTimeout(function() {
                  //invoke dummy function
                  sample();
                }, 1000);
                
                //When the tick has reached 999, the dummy function
                //shouldn't have been called yet
                jasmine.clock().tick(999);
                expect(sample).not.toHaveBeenCalled();
                
                //After 1 more millisecond, the function SHOULD have been called by then
                jasmine.clock().tick(1);
                expect(sample).toHaveBeenCalled();
          });
});

//Example with setInterval
describe("a simple setInterval", function(){
    
          var dummyFunction;
        
          beforeEach(function() {
            dummyFunction = jasmine.createSpy("dummyFunction");
            jasmine.clock().install();
          });
        
          afterEach(function() {
            jasmine.clock().uninstall();
          });
          
            it("checks to see the number of times the function is invoked", function(){
                setInterval(function() {
                  dummyFunction();
                }, 1000);
                
                jasmine.clock().tick(999); //Tick is 999
                expect(dummyFunction.calls.count()).toBe(0);
                jasmine.clock().tick(1000); //Tick is 1999
                expect(dummyFunction.calls.count()).toBe(1);
                jasmine.clock().tick(1); //Before this, the tick is 1999. after 1 tick, the dummy is invoked again!
                expect(dummyFunction.calls.count()).toBe(2);
  });
});


/* How to test more async code like http requests?
    Add a parameter to callback functions called "done" and invoke it when
    the test is over!
*/ 

function getUserInfo(username){
  return $.getJSON('https://api.github.com/users/' + username);
  //remember that all jquery ajax methods return a promise!
}

describe("#getUserInfo", function(){
          it("returns the correct name for the user", function(done){
            getUserInfo('elie').then(function(data){
              expect(data.name).toBe('Elie Schoppik');
              done(); //invoke to make sure the test does not timeout
            });
      });
});

//Testing methodologies 

/* TDD: Test Driven Development is the practice of testing before writing code! 
    This follows the red-green refactor
    
    1. first write tests (should fail)
    2. see them fail
    3. write code to pass tests
    4. refactor as necessary
    5. repeat
    
             red
            /    \
                green
            \   /
           refactor   
           
    BDD: Behavioral Driven Development (subset of TDD)
    -describe behavior of functionality, not just what the results should be 
    -more verbose about what we want
    -not mutually exclusive to TDD

*/

//Other types of testing!

/*
    1) Integration testing: 
    2) Acceptance testing: performing tests on the whole system
    3) Stress testing: How effective is the app under unfavorable conditions 
       like high traffic, system going down, etc
*/




  