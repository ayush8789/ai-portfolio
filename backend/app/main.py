import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Load .env file
load_dotenv()

from app.routers.chatbot import router as chatbot_router
from app.routers.metrics import router as metrics_router

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chatbot_router)
app.include_router(metrics_router)

@app.get("/")
def root():
    return {"status": "AI Backend Running"}