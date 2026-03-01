from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.services.chatbot_service import stream_response

router = APIRouter()

@router.post("/api/chat/stream")
async def chat_stream(data: dict):
    message = data.get("message")

    def generator():
        for token in stream_response(message):
            yield token

    return StreamingResponse(generator(), media_type="text/plain")