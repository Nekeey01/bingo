from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Загружаем конфиг из .env
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Создаем асинхронный движок
engine = create_async_engine(DATABASE_URL, echo=True)
async_session_maker = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession,)


# async def init_db():
#     async with engine.begin() as conn:
#         # await conn.run_sync(SQLModel.metadata.drop_all)
#         await conn.run_sync(SQLModel.metadata.create_all)

# Функция для создания сессии
async def get_db():
    async with async_session_maker() as session:
        yield session
