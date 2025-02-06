from starlette.websockets import WebSocket


class WebSocketConnectionManager:
    def __init__(self):
        self.active_connections = {}

    async def connect(self, websocket: WebSocket, user: str):
        await websocket.accept()
        self.active_connections[user] = websocket

    def disconnect(self, user: str):
        self.active_connections.pop(user, None)

    async def send_message(self, user: str, message: dict):
        if user in self.active_connections:
            await self.active_connections[user].send_json(message)


manager = WebSocketConnectionManager()
