import slideDeck from './slide-deck/slide-deck.component';
import slide from './slide/slide.component';

const sliderModule = angular.module('slider', [])
angular.module('slider').component('slideDeck', slideDeck);
angular.module('slider').component('slide', slide);

export { sliderModule as default };
