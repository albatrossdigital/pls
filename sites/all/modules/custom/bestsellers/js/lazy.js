angular.module('angular-lazy', []).
directive('lazyBackground', ['$document', '$parse', function($document, $parse) {
  return {
    restrict: 'A',
    link: function(scope, iElement, iAttrs) {
      var bgModel = $parse(iAttrs.lazyBackground);
      var currentPage = $parse(iAttrs.lazyCurrent);
      var pageIndex = $parse(iAttrs.lazyPage);
      scope.$watch(currentPage, function(newValue, oldValue) {
        var current = currentPage(scope);
        var index = pageIndex(scope);
        if((current === index || (current + 1) === index)  && iElement.hasClass(iAttrs.lazyLoadingClass)) {
          var src = bgModel(scope);
          var img = document.createElement('img');
          img.onload = function() {
            if (angular.isDefined(iAttrs.lazyLoadingClass)) {
                iElement.removeClass(iAttrs.lazyLoadingClass);
            }
            if (angular.isDefined(iAttrs.lazyLoadedClass)) {
                iElement.addClass(iAttrs.lazyLoadedClass);
            }
            
            iElement.append(img);
          };
          img.onerror= function() {
            console.log('error loading book');
          };
          img.src = src;
        }
      });
    }
  };
}]);