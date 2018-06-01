/**
 * Created by Himanshu wolf on 02/07/16.
 */

(function() {
  var domClass= 'active',
      el = {
    $tabs : $('.tab'),
    $tabContent : $('.tab-content'),
    tabContent : '.tab-content'
  }, methods = {};

  methods.showTabContent = function() {
    var $this = $(this);
    var target = $this.attr('data-target');
    el.$tabs.removeClass(domClass);
    el.$tabContent.removeClass(domClass);
    $this.addClass(domClass);
    $(el.tabContent + '#'+ target).addClass(domClass);
  };
  el.$tabs.on('click', methods.showTabContent)

})();