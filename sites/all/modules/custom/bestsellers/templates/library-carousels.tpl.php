<?php
/**
 * @file
 * AngularJS template to render a weather block.
 */
?>

<div ng-init="carouselUrl = '<?php print $feed_url; ?>'" ng-app="flightLibraryCarousels">
  <div class="tabbable" ng-controller="carouselTabs">

    <!--
    <ul class="nav nav-tabs">
      <li ng-repeat="section in sections" ng-class="{active:section.selected}">
        <a style="cursor: pointer;" class="tab-title" ng-click="select(section)" ng-bind-html="section.safeTitle"></a>
        <div ng-show="section.selected" class="button-wrap"><a ng-href="{{section.link_url}}" class="button secondary small" ng-show="section.link_url">{{section.link_title}}</a></div>
      </li>
    </ul>
    -->

    <select ng-model="selected" ng-options="section.id as section.title for section in sections" ng-click="select(selected)" />


    <div class="nav-content" ng-class="{loaded:!loading}">
      <ul rn-carousel-swipe rn-carousel rn-carousel-index="currentBookPage" class="page-container" class="image">
        <li ng-repeat="page in pages" class="carousel-slide">
          <div class="page {{  page.class }}">
            <div class="book" ng-repeat="book in page.books">
              <div class="image">
                <a href="{{book.link}}">
                  <span class="loading" lazy-page="page.index" lazy-current="currentBookPage" lazy-background="book.cover" lazy-loading-class="loading" lazy-loaded-class="loaded"></span>
                  <div class="caption">
                    <div class="caption-inner">
                      <h5>{{book.safeTitle}}</h5>
                      {{book.safeAuthor}}
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <button class="prev" ng-click="pageCarousel(-1)" ng-disabled="currentBookPage == 0" href="#">Prev</button>
      <button class="next" ng-click="pageCarousel(1)" ng-disabled="currentBookPage == pages.length - 1" href="#">Next</button>
    </div>
  </script>
  </div>
</div>