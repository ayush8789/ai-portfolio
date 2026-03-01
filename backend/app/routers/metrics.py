from fastapi import APIRouter, WebSocket
import random
import asyncio

router = APIRouter()

@router.websocket("/ws/metrics")
async def metrics_ws(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = {
            "cpu": random.randint(20, 60),
            "latency": random.randint(20, 50)
        }
        await websocket.send_json(data)
        await asyncio.sleep(2)