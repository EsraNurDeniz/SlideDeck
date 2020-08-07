/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable no-multi-assign */
import template from './slide-deck.template.html';

export default {
  template,
  transclude: true,
  controller: [
    '$interval',
    '$scope',
    function SlideDeckController($interval, $scope) {
      const that = this;
      let autoPlay;
      const slides = (that.slides = []);
      that.currentSlide = 0;

      that.select = function select(selectedSlide) {
        angular.forEach(slides, (slide) => {
          slide.selected = false;
        });
        selectedSlide.selected = true;
      };

      that.addSlide = function addSlide(slide) {
        if (slides.length === 0) {
          that.select(slide);
        }
        slides.push(slide);
      };

      that.next = function next() {
        if (that.currentSlide < that.slides.length - 1) {
          that.currentSlide += 1;
        } else {
          that.currentSlide = 0;
        }
        //  console.log(that.currentSlide);
        for (let i = 0; i < slides.length; i += 1) {
          slides[i].selected = false;
        }
        slides[that.currentSlide].selected = true;
      };

      that.prev = function prev() {
        if (that.currentSlide > 0) {
          that.currentSlide -= 1;
        } else {
          that.currentSlide = that.slides.length - 1;
        }
        //  console.log(that.currentSlide);
        for (let i = 0; i < slides.length; i += 1) {
          slides[i].selected = false;
        }
        slides[that.currentSlide].selected = true;
      };

      that.playAuto = function playAuto() {
        if (autoPlay) {
          $interval.cancel(autoPlay);
        } else {
          autoPlay = $interval(() => that.next(), 2000);
        }
      };

      $scope.next = that.next;
      $scope.autoPlay = that.autoPlay;
    },
  ],
};
