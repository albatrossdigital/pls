
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

/**
 * App
 */
var app = angular.module('flightLibraryCarousels', ['angular-carousel', 'angular-lazy']);

app.controller('carouselTabs', ['$scope', '$cacheFactory', '$sce', '$q', '$http', '$timeout', function($scope, $cacheFactory, $sce, $q, $http, $timeout) {
  var carouselUrl = $scope.$parent.carouselUrl,
    sectionCount = 0,
    sections = $scope.sections = [],
    currentBookPage = $scope.currentBookPage = 0;
    bookLimit = 4,
    self = this;

  // setup cache
  var requestCache = $cacheFactory('requestCache', { capacity: 20 });

    // cleans html
  var htmlSafe = function(text) {
    return $sce.trustAsHtml(text);;
  }

  // returns a promise of results
  var getData = function(getUrl) {
    var deferred = $q.defer();
    if (getUrl.indexOf('?callback') != -1) {
      var method = 'JSONP';
    }
    else {
      var method = 'GET';
    }
    $http({method: method, url: getUrl, cache: requestCache}).success(function(result){
      result = result.data != undefined ? result.data : result;
      deferred.resolve(result);
    });

    return deferred.promise;
  }

  // grab books
  var getContent = function(endpoint) {
    // get carousel content promise
    var carouselPromise = getData(endpoint);
    carouselPromise.then(function(books) {

      // try to grab pages from cache
      var tmpPages = requestCache.get(endpoint + 'books');
      // no cache, so process
      if(!tmpPages) {
        var currentBooks = [],
          pageCount = 0,
          booksAdded = 0,
          bookCount = bookLimit,
          curCount = 0;

        tmpPages = [];

        books = shuffleArray(books);

        // run through books and place them into pages
        angular.forEach(books, function(book) {
          book.safeTitle = htmlSafe(book.title);
          book.safeAuthor = htmlSafe(book.author);
          currentBooks.push(book);
          booksAdded++;
          // hit the page limit
          if(curCount == (bookCount - 1) || booksAdded == books.length) {
            tmpPages.push({
              index: pageCount,
              class: "book-page-" + (pageCount + 1),
              books: currentBooks
            });
            pageCount++;
            curCount = 0;
            currentBooks = [];
          }
          else {
            curCount++;
          }
        });
        // add pages to cache
        requestCache.put(endpoint + 'books', tmpPages);
      }
      $scope.currentBookPage = 0;
      $scope.pages = tmpPages;
      $scope.loading = false;
    });
  }

  // changes visible
  $scope.select = function(section) {
    $scope.loading = true;
    console.log(typeof section);
    var id = typeof section !== 'object' ? parseInt(section) : false;
    angular.forEach(sections, function(item) {
      if (id && id == item.id) {
        item.selected = true;
        section = item;
      }
      else {
        item.selected = false;
      }
    });
    if (!id) {
      section.selected = true;
    }
    console.log(section);
    getContent(section.endpoint);
  };

  // changes visible
  $scope.pageCarousel = function(val) {
    $scope.currentBookPage = $scope.currentBookPage + val;
  };

  self.addSection = function(section) {
    section.index = sectionCount;
    section.safeTitle = htmlSafe(section.title);
    if (sections.length == 0) {
      $scope.select(section);
    }
    sections.push(section);
    sectionCount++;
  };

  // Only init load once
  if(carouselUrl) {
    var sectionPromise = getData(carouselUrl);
    // we have our promise
    sectionPromise.then(function(result) {
       //console.log("data.name"+$scope.data.name);
       angular.forEach(result, function (section, key) {
        self.addSection(section);
      });
           console.log(sections);

    });
  }
}]);