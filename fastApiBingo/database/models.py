import uuid

from pydantic import BaseModel
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, Column, Integer, UUID
from typing import Optional, Annotated


class NumberRequest(BaseModel):
    count: int

class UserCreate(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class Base(DeclarativeBase):
    pass

int_pk = Annotated[int, mapped_column(primary_key=True)]

class User(Base):
    __tablename__ = "User"

    # id: Mapped[int] = Annotated[int, mapped_column(primary_key=True, autoincrement=True)]
    # id: Mapped[int_pk]
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)

    # id = Column(UUID, primary_key=True, index=True)
    # username = Column(String, unique=True, nullable=False)
    # hashed_password = Column(String, nullable=False)