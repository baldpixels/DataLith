# DataLith #
* DataLith uses the AngularJS framework to provide a web application frontend interface and the flask python framework to provide the backend functionality.
* The site can be found at: ec2-18-219-217-158.us-east-2.compute.amazonaws.com:4000/ or 18.219.217.158:4000

### Tools  ###
* The HOOK tool keeps track of and returns the mean http load times for all pages visited by the python script
* The HANDAXE tool keeps track of the number of web pages encountered while scraping that return an http status code other than 200. These could be 404 errors or access denied notices. We call these web pages "broken"
* The GRINDSTONE tool will keep track of all the images encountered while scraping and create a collage of 50 random images from the web page

### Angular Frontend ###
* DataLith is a Paleolithic-themed web scraper.
* The tool icons were custom-designed in Adobe Illustrator.
* The front end of the site is an Angular5 application. All of the site's functionality can be accessed without reloading the web page.
* Angular Components: tools.ts, url-input.ts, username-input.ts, loader.ts, visualizer.ts, collage.ts, and scoreboard.ts

### Flask Backend ###
* The backend of the site is written as a Flask application (mainFlask.py). The flask server replies to the Angular application with a json continuing the results of the scrape and results from the database
* MySql connector: the flask application interfaces with a mySql databse that keeps track of the highest scores for the Hook and Handaxe tools. The schema of the scores table can be found in the scores.sql file
* The meat of the backend is the scrape.py python script. This is the code that actually scrapes the websites given by the Angular app. The script pulls in the provided url, pulls all the links on this page and adds them to a list of urls. It then randomly selects the next url from this list, adding the links on this page to the url list. It repeats this process keeping track of the relevant metrics for the front end application for 100 pages in the domain provided. The script will all maintain a list of links to images if the Grindstone tool is being used.

## Coded by ##
* (Brenden Sweetman)[https://github.com/brenden-sweetman]
* and Connor Rudmann a.k.a. "Vlad Pixels"
