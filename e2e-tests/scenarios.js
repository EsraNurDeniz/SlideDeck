'use strict';

// AngularJS E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('PhoneCat Application', function() {

  beforeEach(function() {
    browser.get('');
  });

  it('should ', function() {
    let nextSlide = element(by.buttonText('Next'));
    console.log(nextSlide);
    nextSlide.click();
    expect(1).toEqual(1);
  });
});
