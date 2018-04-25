# Author: Brenden Sweetman and Connor Rudmann
# Title: mainFlask.py
# Purpose: Create main web server for creative project serve up all web pages
#   and json files to forntside javascript

# import scrape.py
from scrape import traverse
import json
import re
from mysql import connector
# import flask resources
from flask import Flask, abort, redirect, url_for, request, render_template , jsonify
app = Flask(__name__)

# this is the meat of the python interface
# A GET call to the /getJson route will call the scrape.py javascript
# The GET arguments are as follows:
#   username: username for the requests
#   url: url for the page to Scrape
#   type: one of: img, broken or, time
# the methods checks input agains regex for the username and urllib
# then calls the traverse methods
# a json will be returned with the relevant data
@app.route("/getJson",methods=["GET"])
def getJson():
    dataJson={}
    url = request.args['url']
    # remove http:// and https:// from url
    url = url.replace("http://","")
    url = url.replace("https://","")
    tool = request.args['type']
    username = request.args['username']
    if re.match('\w+\.\w+\.\w+[\/\w\-\.]+',url) is not None and re.match('\w+',username) is not None:
        try:
            if tool == "Hook":
                dataJson = traverse(url,time=True)
                databaseInsert(username,dataJson["meanTime"],url,tool)
                dataJson["top5"] = databaseGet(tool)
            elif tool == "Grindstone":
                dataJson = traverse(url,img=True)
            elif tool == "Handaxe" :
                dataJson = traverse(url,broken=True)
                databaseInsert(username,dataJson["brokenRatio"],url,tool)
                dataJson["top5"] = databaseGet(tool)
            else : dataJson["error"] = "Urecognized tool type"
        except:
            dataJson["error"] = "There was a problem processing your request please try again"
    else: dataJson["error"] = "Unrecognized username or URL please try again"
    response = jsonify(dataJson)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

def databaseInsert(username, score, url, tool):
    dbCon = connector.connect(user="scrape", password="vNg&.+4]6h2nuR00", host='localhost', database="scrapeScore")
    cursor = dbCon.cursor()
    insertData = (username, score, url,tool)
    cursor.execute("INSERT INTO scores (username,score,url,tool) VALUES (%s,%s,%s,%s)",insertData)
    dbCon.commit()
    cursor.close()
    dbCon.close()
def databaseGet(tool):
    top=[]
    dbCon = connector.connect(user="scrape", password="vNg&.+4]6h2nuR00", host='localhost', database="scrapeScore")
    cursor = dbCon.cursor()
    cursor.execute("SELECT username, score, url  FROM scores WHERE tool='{:s}' ORDER BY score DESC LIMIT 5".format(tool))
    for (username, score, url) in cursor:
        top.append([username, score, url])
    cursor.close()
    dbCon.close()
    return top
    
if __name__=="__main__":
    app.run(debug=True, port=3134, host='0.0.0.0') 
