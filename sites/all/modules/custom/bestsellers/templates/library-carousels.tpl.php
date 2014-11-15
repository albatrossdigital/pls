<?php
/**
 * @file
 * AngularJS template to render a weather block.
 */
?>

<div ng-init="carouselUrl = '<?php print $feed_url; ?>'" ng-app="flightLibraryCarousels">
  <div class="tabbable row" ng-controller="carouselTabs">

    <div class="columns medium-3">
      <h3 class="topline"><a href="http://owwl.org/bestsellers/list/Hardcover%20Fiction">New York Times Lists</a></h3>
      <select ng-model="selected" ng-options="section.id as section.title for section in sections" ng-click="select(selected)" ></select>
    </div>

    <div class="columns medium-9">
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
                        <h4>{{book.safeTitle}}</h4>
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
      <h4><a href="http://owwl.org/bestsellers/list/{{activeTitle}}">{{activeTitle}}</a></h4>
    </div>

  </div>
</div>