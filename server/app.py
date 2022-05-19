import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import re
import dataCleaning
import pickle
import json

from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import SGDClassifier

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer

from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, plot_confusion_matrix
import matplotlib.pyplot as plt
from sklearn.metrics import precision_recall_curve, auc
from sklearn.preprocessing import LabelBinarizer
from sklearn.metrics import accuracy_score, f1_score, recall_score



from sklearn.pipeline import Pipeline
from imblearn.pipeline import Pipeline
from imblearn.over_sampling import SMOTE
from nltk import word_tokenize          
from nltk.stem import WordNetLemmatizer
import nltk
nltk.download('wordnet')
############################################################################################
############################################################################################


class LemmaTokenizer:
    def __init__(self):
         self.wnl = WordNetLemmatizer()
    def __call__(self, doc):
        return [self.wnl.lemmatize(t) for t in doc]
############################################################################################
############################################################################################

def passthrough(doc):
    return doc
############################################################################################
############################################################################################

def dataOperation(filePath):
    # reading dataset
    df = pd.read_csv(filePath)

    # dropping Null Tweet Text
    df = df.dropna(subset = ['tweet_text'])
    # clean DataFrame
    df = dataCleaning.cleanDataFrame(df)
    # Tokenize DataFrame
    df = dataCleaning.tokenizeDataFrame(df)
    # Remove Punctuation
    df = dataCleaning.removePunctuationDataFrame(df)

    # Predicting over dataset
    data_x = df.tokens
    data_y = df.is_there_an_emotion_directed_at_a_brand_or_product
    # # Encode Lebels
    data_y = dataCleaning.encodeLebels(data_y)
    
    return data_x
############################################################################################
############################################################################################

class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)

############################################################################################
############################################################################################

def predictLabels(data, modelOpt):
    # default model
    with open('pkl_file/multinomialNaiveBayes_pkl', 'rb') as files:
        model_test = pickle.load(files)
    
    # other models
    if modelOpt == 2:
        with open('pkl_file/multinomialNaiveBayesTF_IDF_pkl', 'rb') as files:
            model_test = pickle.load(files)
    
    if modelOpt == 3:
        with open('pkl_file/multinomialNaiveBayesTF_IDF_SMOTE_pkl', 'rb') as files:
            model_test = pickle.load(files)
    
    if modelOpt == 4:
        with open('pkl_file/multinomialNaiveBayesTF_IDF_SMOTEOversampling_Lemmatizer_pkl', 'rb') as files:
            model_test = pickle.load(files)
    
    if modelOpt == 5:
        with open('pkl_file/SVM_TF_IDF_SMOTEOversampling_Lemmatizer_pkl', 'rb') as files:
            model_test = pickle.load(files)
    
    res = model_test.predict(data)
    res = np.array(np.unique(res, return_counts=True)).T
    # plt.figure(figsize=(8,6))
    # df_clean.is_there_an_emotion_directed_at_a_brand_or_product.hist(xlabelsize=14)
    # plt.title('Is There An Emotion In The Tweet?', fontsize=20)
    # plt.ylabel('# of tweets', fontsize=16)
    # plt.show()

    print(type(res))

    return (res)
############################################################################################
############################################################################################




if __name__ == '__main__':
    # Dataset File Path
    DATA_FILE_PATH = './dataFile/'
    DATA_FILE_NAME = 'judge-1377884607_tweet_product_company.csv'

    data = dataOperation(DATA_FILE_PATH + DATA_FILE_NAME)

    print("--------------")
    print("Prediction Sample")
    print("--------------")
    print(data.head(n = 5))
    print("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")

    
    print("--------------")
    print("Prediction Using Multinomial Naive Bayes")
    print("--------------")
    print(predictLabels(data, 1))
    print("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    
    print("--------------")
    print("Prediction Using Multinomial Naive Bayes TF/IDF")
    print("--------------")
    print(predictLabels(data, 2))
    print("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    
    print("--------------")
    print("Prediction Using Multinomial Naive Bayes TF/IDF SMOTE")
    print("--------------")
    print(predictLabels(data, 3))
    print("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")

    print("--------------")
    print("Prediction Using Multinomial Naive Bayes TF/IDF SMOTE Oversampling & Lemmatization")
    print("--------------")
    print(predictLabels(data, 4))
    print("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")

    print("--------------")
    print("Prediction Using SVM TF/IDF SMOTE Oversampling & Lemmatization")
    print("--------------")
    print(predictLabels(data, 5))
    print("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")

