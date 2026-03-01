from pydantic import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Portfolio API"
    VERSION: str = "1.0.0"
    MODEL_PATH: str = "app/models/sentiment_pipeline.joblib"

    class Config:
        env_file = ".env"

settings = Settings()