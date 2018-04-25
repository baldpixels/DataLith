#!/usr/bin/env python3
#Author: Brenden Sweetman brenden.sweetman@wustl.edu and Connor Rudmann
#Title: scrape.py
#Purpose: Scrape a domain for information and save output to mysql database

import requests
import sys, os
import re
import time
from mysql import connector
from random import randint
from urllib import robotparser
from urllib.parse import urlparse
from bs4 import BeautifulSoup

def traverse (urlString,img=False,time=False,broken=False):
    baseUrl = urlparse("//" + urlString).netloc
    print ("Traversing: " + urlString)
    # set up robot parser to obey by robots.txt file
    robot = True
    rp = robotparser.RobotFileParser()
    rp.set_url("http://" + baseUrl+ "/robots.txt")
    try:
        rp.read()
    except:
        robot = False;
        print("No robots.txt file found")
    pageQueue = [urlString]
    visited = []
    images = []
    totalTime = 0
    count = 0
    brokenPageCount = 0
    while len(pageQueue) > 0 and count < 100:
        currentUrl= pageQueue.pop(randint(0,len(pageQueue)-1))
        # do not visit url if we have in the past
        if currentUrl in visited:
            continue
        # add url to visited list
        visited.append(currentUrl)
        # check to see if webpage is allowed by robots.txt if not skip page
        if robot:
            if not rp.can_fetch("*", "currentUrl"):
                continue
        # do not request webpage if it has a file extension other than .html, .php, .aspx, .htm, .js, .jsp, or .xhtml
        if "/" in currentUrl:
            if "." in currentUrl.split("/",1)[1] and currentUrl.split("/",1)[1].split(".")[1] not in ["html","php","aspx","htm","js","jsp","xhtml"]:
                continue
        # send request to server
        response, httpTime, error = getUrl(currentUrl)
        # do not use url if there is an error
        if error:
            print("Connection error continuing")
            continue
        # add a visit to the count list
        count = count + 1
        totalTime = totalTime + httpTime
        # If link gives some other status code than 200 break
        if response.status_code != 200:
            print ("Broken page continuing")
            brokenPageCount = brokenPageCount + 1;
            continue
        print ("Visiting: " + currentUrl)
        soup = BeautifulSoup(response.text,'html.parser')
        if img:
            for image in soup.find_all("img"):
                imgUrl = image.get("src")
                # skip image if no link
                if imgUrl == None: continue
                imgUrl = imgUrl.replace("//","http://")
                # add img minks to list if they haven't already have an absolute
                # link and are from the base domain
                if imgUrl not in images and "http" in imgUrl:
                     images.append(imgUrl)
        for a in soup.find_all('a'):
            pageUrl = a.get('href')
            # skip a tag if no href included
            if pageUrl == None : continue
            # add base domain for relative links
            if "//" not in pageUrl:
                pageUrl = baseUrl + pageUrl;
            #remove http:// and https:// from url
            pageUrl = pageUrl.replace("http://","")
            pageUrl = pageUrl.replace("https://","")
            # do not include links with get parameters ("?")
            # do not include local links ("#")
            # only visit pages within base domain
            if baseUrl in pageUrl and "#" not in pageUrl and "?" not in pageUrl:
                pageQueue.append(pageUrl)
        #create and return dictionary for json data
    jsonData = {"url":urlString}
    if count==0:
        jsonData["error"] = "Webpage does not exist or is not recognized"
        return jsonData
    if img:
        print(len(images))
        if len(images)>50:
            randomStart = randint(0,len(images)-51)
            jsonData["images"] = images[randomStart:randomStart+50]
        elif len(images)>0:
            jsonData["images"] = images
        else:
            jsonData["error"] = "No images found on this webpage"
    if time:
        jsonData["meanTime"] = "{0:3.3f}".format(totalTime/count)
    if broken:
        jsonData["brokenRatio"] = str(brokenPageCount/count)
    return jsonData

def getUrl(url):
    error= False
    httpTime = None
    response = None
    try:
        httpStart = time.time()
        response = requests.get("https://"+url)
        httpTime= (time.time()-httpStart) * 1000
    except:
        try:
            httpStart = time.time()
            response = requests.get("http://"+url)
            httpTime = (time.time() - httpStart) * 1000
        except:
            error= True
    return response, httpTime, error
