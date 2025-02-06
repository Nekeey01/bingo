import jwt
from fastapi import FastAPI, WebSocket, WebSocketException, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware import Middleware

from auth import auth_router, SECRET_KEY, ALGORITHM
from random_num import randomNum_router

# Настройка CORS через Middleware
middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Разрешаем запросы с любого домена (можно указать конкретные)
        allow_credentials=True,
        allow_methods=["*"],  # Разрешаем все методы (GET, POST, OPTIONS и т. д.)
        allow_headers=["*"],  # Разрешаем любые заголовки
    )
]

# Создаём FastAPI-приложение с middleware
app = FastAPI(middleware=middleware)
app.include_router(auth_router)
app.include_router(randomNum_router)



@app.get("/")
async def root():
    return {"message": "Hello World"}




