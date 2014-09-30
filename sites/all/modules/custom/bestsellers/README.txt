New York Time Bestsellers Module for Drupal 6
Created by Bob Wicksall (bwicksall@pls-net.org)
Contains book cover code from the vufind project (vufind.org)

Overview
=======================

This module fetches the bestsellers lists from the New York Times 
and exposes them as pages and blocks in a Drupal site.  This module
has been built with the Evergreen ILS in mind but there is no reason
it couldn't be modified to support others.

  * Gets the lists from the NYT
  * Fetches book covers from Amazon, Open Library and LibraryThing.
  * Provides a link to you library catalog
  * Exposes 2 Blocks
    * Hardcover Fiction top 5
    * List of all Lists

Example Site: www.owwl.org

Many thanks go out to the vufind (vufind.org) project.  The code
for fetching book covers was borrowed and modified for this module. 
 
Requirements
=======================

  * Drupal 6.X
  * New York Times API Key (http://developer.nytimes.com/apps/register) 
    * The registration site only works with Internet Explorer
  * At least one API Key for book covers.  Amazon is the most reliable.
    * Amazon http://aws.amazon.com/   (Key and Secret)
    * Open Library http://openlibrary.org/dev/docs/api/covers (No Key Required)
    * LibraryThing http://www.librarything.com/services/keys.php
  * Read Write access to your files directory in Drupal

*** Note about Amazon ***

As of 11/1/2011 Amazon has an additional requirement.  You now need a 
AssociateTag to send with every request.  To sign up as an associate go to:

    https://affiliate-program.amazon.com/

After signing up you will get a message like:

    Your unique Associates ID is blabla-20

More Info here:

    http://docs.amazonwebservices.com/AWSECommerceService/latest/DG/index.html?CommonRequestParameters.html=

    
Installation
=======================
      
  1) Install like any other Drupal module
  2) Configure 
     a) Admin -> Site Configuration -> Bestsellers
     b) Enter the NYT API Key
     c) Enter the url for and ISBN search in your ILS:
    
        example:
        http://evergreen.owwl.org/opac/en-US/skin/owwl/xml/rresult.xml?tp=&t=&rt=isbn&d=0&adv=

     d) Turn on at least Open Library book covers
  3) Fetch the lists and covers

     http://your.drupal.site/bestsellers/fetch

  4) View the lists at http://your.drupal.site/bestsellers

Optional:

  5) Setup a cron job to fetch the list weekly.  I do it on Sundays.

     example:
     10 12 * * 7 /usr/bin/wget -O - -q -t 1 http://your.drupal.site/bestsellers/fetch

    
     
Notes
=======================

  * It's been a long time since I signed up for an Amazon AWS account.
    From what I remember I signed up for an account and got the API 
    key.  Later on I had to go into my account and get the "Secret".

  * Bookcovers are currently kept indefinately.  This is a waste of 
    space and not entirely in line with Amazon policies.  This needs
    review.

  * I'm currently fetching covers with the 10 digit ISBN.  Amazon
    returns almost nothing using 13 digit ISBN's.

  * Library Thing doesn't seem to be timely enough.  Very often new
    titles do not have images.  At least with 10 digit ISBN's.



