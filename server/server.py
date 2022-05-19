from asyncore import read
import json
from flask import Flask, request
import app as mlModel
import numpy as np
import pandas as pd

import os
from flask import Flask, flash, request, redirect, url_for, session
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('HELLO WORLD')

UPLOAD_FOLDER = './dataFile/uploadedTestData'
ALLOWED_EXTENSIONS = set(['csv', 'xlsx'])

app = Flask(__name__)

@app.route('/api', methods=['GET'])
def index():
    print("--------------")
    print("API Called")
    print("--------------")
    return {
        'name': ['Hello, world!', 'Orange', 'Apple']
    }
############################################################################################
############################################################################################
def passthrough(doc):
    return doc

class LemmaTokenizer:
    def __init__(self):
         self.wnl = WordNetLemmatizer()
    def __call__(self, doc):
        return [self.wnl.lemmatize(t) for t in doc]

@app.route('/api/perfeededData', methods=['GET', 'POST'])
def prefeededData():
    print("--------------")
    print("Prefeeded Data API Called")
    print("--------------")
    
    DATA_FILE_PATH = './dataFile/'
    DATA_FILE_NAME = 'judge-1377884607_tweet_product_company.csv'

    if request.method == 'POST':
        target=os.path.join(UPLOAD_FOLDER,'test_docs')
        if not os.path.isdir(target):
            os.mkdir(target)
        logger.info("welcome to upload`")
        # fileU = request.files['file_from_ui']
        print(request.files)
        # filename = secure_filename(fileU.filename)
        # destination="/".join([target, filename])
        # try:
        #     fileU.save(destination)
        #     session['uploadFilePath'] = destination
        # except Exception:
        #     print('Exception')
            
        FILE_PATH = DATA_FILE_PATH + DATA_FILE_NAME

    else:
        FILE_PATH = DATA_FILE_PATH + DATA_FILE_NAME

    data = mlModel.dataOperation(FILE_PATH)
    retObjMLNaiveByes = mlModel.predictLabels(data, 1)
    retObjMLNaiveByesTFIDF = mlModel.predictLabels(data, 2)
    retObjMLNaiveByesTFIDFSmote = mlModel.predictLabels(data, 3)
    retObjMLNaiveByesTFIDFSmoteLemma = mlModel.predictLabels(data, 4)
    retObjMLSVMTFIDFSmoteLemma = mlModel.predictLabels(data, 5)
    
    print("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    
    return {
        "retObjMLNaiveByes" : [str(retObjMLNaiveByes[0][1]), str(retObjMLNaiveByes[1][1]), str(retObjMLNaiveByes[2][1])],
        "retObjMLNaiveByesTFIDF" : [str(retObjMLNaiveByesTFIDF[0][1]), str(retObjMLNaiveByesTFIDF[1][1]), str(retObjMLNaiveByesTFIDF[2][1])],
        "retObjMLNaiveByesTFIDFSmote" : [str(retObjMLNaiveByesTFIDFSmote[0][1]), str(retObjMLNaiveByesTFIDFSmote[1][1]), str(retObjMLNaiveByesTFIDFSmote[2][1])],
        "retObjMLNaiveByesTFIDFSmoteLemma" : [str(retObjMLNaiveByesTFIDFSmoteLemma[0][1]), str(retObjMLNaiveByesTFIDFSmoteLemma[1][1]), str(retObjMLNaiveByesTFIDFSmoteLemma[2][1])],
        "retObjMLSVMTFIDFSmoteLemma" : [str(retObjMLSVMTFIDFSmoteLemma[0][1]), str(retObjMLSVMTFIDFSmoteLemma[1][1]), str(retObjMLSVMTFIDFSmoteLemma[2][1])]
        # 'name' : 'Aman'
    }
############################################################################################
############################################################################################


# @app.route('/api/testDataReport', methods=['GET', 'POST'])
# def testDataReport():
#     print("--------------")
#     print("Prefeeded Data API Called")
#     print("--------------")

#     DATA_FILE_PATH = './dataFile/'
#     DATA_FILE_NAME = 'judge-1377884607_tweet_product_company.csv'

#     data = mlModel.dataOperation(DATA_FILE_PATH + DATA_FILE_NAME)
#     retObjMLNaiveByes = mlModel.predictLabels(data, 1)
#     retObjMLNaiveByesTFIDF = mlModel.predictLabels(data, 2)
#     retObjMLNaiveByesTFIDFSmote = mlModel.predictLabels(data, 3)
#     retObjMLNaiveByesTFIDFSmoteLemma = mlModel.predictLabels(data, 4)
#     retObjMLSVMTFIDFSmoteLemma = mlModel.predictLabels(data, 5)
    
#     print("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    
#     return {
#         "retObjMLNaiveByes" : [str(retObjMLNaiveByes[0][1]), str(retObjMLNaiveByes[1][1]), str(retObjMLNaiveByes[2][1])],
#         "retObjMLNaiveByesTFIDF" : [str(retObjMLNaiveByesTFIDF[0][1]), str(retObjMLNaiveByesTFIDF[1][1]), str(retObjMLNaiveByesTFIDF[2][1])],
#         "retObjMLNaiveByesTFIDFSmote" : [str(retObjMLNaiveByesTFIDFSmote[0][1]), str(retObjMLNaiveByesTFIDFSmote[1][1]), str(retObjMLNaiveByesTFIDFSmote[2][1])],
#         "retObjMLNaiveByesTFIDFSmoteLemma" : [str(retObjMLNaiveByesTFIDFSmoteLemma[0][1]), str(retObjMLNaiveByesTFIDFSmoteLemma[1][1]), str(retObjMLNaiveByesTFIDFSmoteLemma[2][1])],
#         "retObjMLSVMTFIDFSmoteLemma" : [str(retObjMLSVMTFIDFSmoteLemma[0][1]), str(retObjMLSVMTFIDFSmoteLemma[1][1]), str(retObjMLSVMTFIDFSmoteLemma[2][1])]
#         # 'name' : 'Aman'
#     }

if __name__ == "__main__":
    app.run(debug=True, port=5000)