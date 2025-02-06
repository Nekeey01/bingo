import random

from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.websockets import WebSocket, WebSocketDisconnect

from auth import get_current_user
from database.models import NumberRequest
from web_socket import manager

randomNum_router = APIRouter()

@randomNum_router.post("/random_numbers")
async def get_random_numbers(request: NumberRequest, token: str = Depends(get_current_user)):
    print(f"request - {request}")
    print(f"token - {token}")
    if not (1 <= request.count <= 10):
        raise HTTPException(status_code=400, detail="Count must be between 1 and 10")
    numbers = [random.randint(1, 100) for _ in range(request.count)]
    return {"numbers": numbers}


@randomNum_router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, token: str):
    user = await get_current_user(token)
    print(f"request - {websocket}")
    print(f"token - {token}")
    await manager.connect(websocket, user)

    try:
        while True:
            data = await websocket.receive_json()
            count = int(data.get("count", 1))
            numbers = [random.randint(1, 100) for _ in range(count)]
            await manager.send_message(user, {"numbers": numbers})
    except WebSocketDisconnect:
        manager.disconnect(user)
    except Exception as e:
        print(f"Ошибка какаята - {e}")





