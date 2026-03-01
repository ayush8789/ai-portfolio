from fastapi import APIRouter
from app.schemas.sentiment_schema import SentimentRequest, SentimentResponse
from app.models.sentiment_model import model

router = APIRouter()

@router.post("/predict", response_model=SentimentResponse)
def predict_sentiment(request: SentimentRequest):
    prob = model.predict_proba([request.text])[0][1]
    sentiment = "Positive" if prob > 0.5 else "Negative"

    return {
        "sentiment": sentiment,
        "probability": round(float(prob), 4)
    }