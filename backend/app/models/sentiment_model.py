import joblib
import os
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

MODEL_PATH = "app/models/sentiment_pipeline.joblib"

def train_and_save_model():
    texts = [
        "I love this product",
        "This is amazing",
        "I hate this",
        "Very bad experience",
        "Fantastic work",
        "Terrible service"
    ]
    labels = [1, 1, 0, 0, 1, 0]

    pipeline = Pipeline([
        ("tfidf", TfidfVectorizer()),
        ("clf", LogisticRegression())
    ])

    pipeline.fit(texts, labels)
    joblib.dump(pipeline, MODEL_PATH)

if not os.path.exists(MODEL_PATH):
    train_and_save_model()

model = joblib.load(MODEL_PATH)