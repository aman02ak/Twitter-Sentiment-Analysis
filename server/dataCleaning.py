import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import re
import nltk
from nltk.tokenize import TweetTokenizer
from nltk import FreqDist
import string

from sklearn.preprocessing import LabelEncoder

def cleanDataFrame(df):
    df_clean = df

    # changin to lower case texts
    df_clean.tweet_text = df_clean.tweet_text.str.lower()

    # remove url links with the help of Regular Expression
    df_clean.tweet_text = df_clean.tweet_text.apply(lambda x: re.sub(r'https?:\/\/\S+', '', x))
    # remove url/website that didn't use http, is only checking for .com websites 
    df_clean.tweet_text = df_clean.tweet_text.apply(lambda x: re.sub(r"www\.[a-z]?\.?(com)+|[a-z]+\.(com)", '', x))

    # remove @mention
    df_clean.tweet_text = df_clean.tweet_text.apply(lambda x: re.sub(r'@mention', '', x))

    # remove {link}
    df_clean.tweet_text = df_clean.tweet_text.apply(lambda x: re.sub(r'{link}', '', x))

    # remove &text; html chars
    df_clean.tweet_text = df_clean.tweet_text.apply(lambda x: re.sub(r'&[a-z]+;', '', x))

    # [video]
    df_clean.tweet_text = df_clean.tweet_text.apply(lambda x: re.sub(r"\[video\]", '', x))

    # remove all remaining characters that aren't letters, white space, or 
    # the following #:)(/\='] that are used in emojis or hashtags
    df_clean.tweet_text = df_clean.tweet_text.apply(lambda x: re.sub(r"[^a-z\s\(\-:\)\\\/\];='#]", '', x))

    return df_clean

def tokenizeDataFrame(df):
    df_clean = df
    tknzr = TweetTokenizer()
    df_clean['tokens'] = df_clean['tweet_text'].apply(tknzr.tokenize)

    return df_clean

def remove_punctuation(word_list):
    PUNCUATION_LIST = list(string.punctuation)
    return [w for w in word_list if w not in PUNCUATION_LIST]

def removePunctuationDataFrame(df):
    df_clean = df
    df_clean['tokens'] = df_clean['tokens'].apply(remove_punctuation)

    return df_clean

def encodeLebels(df):
    le = LabelEncoder()
    return le.fit_transform(df)