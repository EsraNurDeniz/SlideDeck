import '../slider.module';

describe('Unit testing slide deck controller', () => {
  beforeEach(angular.mock.module('slider'));
  describe('SlideDeckController', () => {
    let ctrl;
    let interval;
    let compile;
    let $deckScope;

    // eslint-disable-next-line max-len
    beforeEach(angular.mock.inject(/* @ngInject */($rootScope, $componentController, $interval, $compile) => {
      interval = $interval;
      compile = $compile;
      $deckScope = $rootScope.$new();
      ctrl = $componentController('slideDeck', { $scope: $deckScope });
    }));

    it('expect to call next() for auto play in every 2 sec', () => {
      spyOn(ctrl, 'next');
      ctrl.playAuto();
      interval.flush(4000);
      expect(ctrl.next).toHaveBeenCalledTimes(2);
    });

    it('expect to see the content of ng-transclude', () => {
      const element = compile('<slide-deck><slide>1</slide></slide-deck>')($deckScope);
      expect(element.html()).toContain('1');
    });

    it('expect to see length of added slides', () => {
      const element = compile('<slide-deck><slide>1</slide><slide>2</slide><slide>3</slide></slide-deck>')($deckScope);
      $deckScope.$digest();
      const slides = element[0].querySelectorAll(".slideContainer");
      expect(slides.length).toBe(3);
    });

    it('expect to see length of hidden slides', () => {
      const element = compile('<slide-deck><slide>1</slide><slide>2</slide><slide>3</slide></slide-deck>')($deckScope);
      $deckScope.$digest();
      const hidden = element[0].querySelectorAll("div[class='slideContainer ng-hide']");
      expect(hidden.length).toBe(2);
    });

    it('expect to see next button and prev button changes selected property', () => {
      const element = compile('<slide-deck><slide>1</slide><slide>2</slide><slide>3</slide></slide-deck>')($deckScope);
      $deckScope.$digest();
      element[0].querySelector("[id='nextButton']").click();
      $deckScope.$digest();
      const slideDeckcont = angular.element(element[0]).controller('slide-deck');
      expect(slideDeckcont.slides[0].selected).toBe(false);
      expect(slideDeckcont.slides[1].selected).toBe(true);

      element[0].querySelector("[id='prevButton']").click();
      expect(slideDeckcont.slides[0].selected).toBe(true);
      expect(slideDeckcont.slides[1].selected).toBe(false);
    });

    it('expect to see selected property should be true just for one slide', () => {
      const element = compile('<slide-deck><slide>1</slide><slide>2</slide><slide>3</slide></slide-deck>')($deckScope);
      $deckScope.$digest();
      element[0].querySelector("[id='nextButton']").click();
      $deckScope.$digest();
      const slideDeckcont = angular.element(element[0]).controller('slide-deck');
      expect(slideDeckcont.slides[0].selected).toBe(false);
      expect(slideDeckcont.slides[1].selected).toBe(true);
      expect(slideDeckcont.slides[2].selected).toBe(false);
    });
  });
});
