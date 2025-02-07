from pydantic import BaseModel
import uuid
import datetime
from sqlalchemy import Integer, String, Text, Boolean, DateTime, ForeignKey, func, UUID, Table, Column
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, DeclarativeBase, Mapped, mapped_column, declared_attr, WriteOnlyMapped
from utils.mixin import IDMixin, TimestampsMixin, CreatedAtMixin, UpdatedAtMixin

class NumberRequest(BaseModel):
    count: int

class UserAuth(BaseModel):
    username: str
    password: str
    remember: bool

class UserCreate(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class Base(DeclarativeBase):
    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__


class User(IDMixin, TimestampsMixin, Base):
    username: Mapped[str] = mapped_column(String(60), unique=True, nullable=False)
    first_name: Mapped[str] = mapped_column(String(30), nullable=True)
    second_name: Mapped[str] = mapped_column(String(30), nullable=True)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    password_reset_token: Mapped[str] = mapped_column(String(255), nullable=True) ### TODO: Поменять на nullable=False
    email: Mapped[str] = mapped_column(Text, unique=True, nullable=True) ### TODO: Поменять на nullable=False
    avatar_path: Mapped[str] = mapped_column(Text, unique=True, nullable=True) ### TODO: Мб поменять способ хранения все же

    # Relationships
    bingos = relationship("Bingo", back_populates="user")
    comments = relationship("Comment", back_populates="user")
    reactions = relationship("BingoReaction", back_populates="user_reactions")
    notifications = relationship("Notification", back_populates="user")
    # rooms = relationship("Room", back_populates="owner")
    roles = relationship("UserRole", back_populates="user")
    temp_bingo = relationship("TemporalBingo", back_populates="user")

    # TODO: Проверить, как работает
    subscriptions = relationship('Subscription', foreign_keys='Subscription.subscriber_id', back_populates='subscriber') # На кого подписан
    subscribers = relationship('Subscription', foreign_keys='Subscription.author_id', back_populates='author') # Кто подписан


class Role(IDMixin, Base):
    description: Mapped[str] = mapped_column(Text, nullable=False)

    # Relationships
    users = relationship("UserRole", back_populates="role")


class UserRole(IDMixin, TimestampsMixin,  Base):
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("User.id"), nullable=False)
    role_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("Role.id"), nullable=False)

    # Relationships
    user = relationship("User", back_populates="roles")
    role = relationship("Role", back_populates="users")


class Bingo(IDMixin, TimestampsMixin, Base):
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("User.id"), nullable=False)
    title: Mapped[str] = mapped_column(Text, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    preview_path: Mapped[str] = mapped_column(String(100), nullable=False) # Превью бинго для отображения в поиске
    size_x: Mapped[int] = mapped_column(Integer, nullable=False)
    size_y: Mapped[int] = mapped_column(Integer, nullable=False)
    is_public: Mapped[bool] = mapped_column(Boolean, nullable=False)

    # Relationships
    user = relationship("User", back_populates="bingos")
    cells = relationship("BingoCell", back_populates="bingo")
    temp_bingo = relationship("TemporalBingo", back_populates="bingo")
    comments = relationship("Comment", back_populates="bingo")
    reactions = relationship("BingoReaction", back_populates="bingo_reactions")
    # rooms = relationship("Room", back_populates="bingo")
    tags = relationship("BingoTag", back_populates="bingo")
    counters = relationship("BingoCounter", back_populates="bingo")
    customization = relationship("BingoCustomization", back_populates="bingo")

# тут хранится временная таблица, которую заполняют пользователи
class TemporalBingo(IDMixin,Base):
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("User.id"), nullable=False)
    bingo_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("Bingo.id"), nullable=False)
    bingo_cell_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("BingoCell.id"), nullable=False)

    is_filled: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    filled_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), default=datetime.datetime.now
    )

    user = relationship("User", back_populates="temp_bingo")
    bingo = relationship("Bingo", back_populates="temp_bingo")
    cells = relationship("BingoCell", back_populates="temp_bingo")


class BingoCell(IDMixin, CreatedAtMixin, Base):
    bingo_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("Bingo.id"), nullable=False)
    position: Mapped[int] = mapped_column(Integer, nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    file_path: Mapped[str] = mapped_column(Text, nullable=False)

    # Relationships
    bingo = relationship("Bingo", back_populates="cells")
    temp_bingo = relationship("TemporalBingo", back_populates="cells")
    customization = relationship("CellCustomization", back_populates="cell")


class CellCustomization(IDMixin, Base):
    cell_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("BingoCell.id"), nullable=False)
    background_color: Mapped[str] = mapped_column(String(30), nullable=True)
    filled_color: Mapped[str] = mapped_column(String(30), nullable=True)
    text_color: Mapped[str] = mapped_column(String(30), nullable=True)
    text_align: Mapped[str] = mapped_column(String(30), nullable=True)

    # Relationships
    cell = relationship("BingoCell", back_populates="customization")


class BingoCustomization(IDMixin, Base):
    bingo_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("Bingo.id"), nullable=False)
    background_color: Mapped[str] = mapped_column(String(30), nullable=True)
    background_image_path: Mapped[str] = mapped_column(Text, nullable=True)
    image_scale: Mapped[str] = mapped_column(Boolean, nullable=True)
    border_color: Mapped[str] = mapped_column(String(30), nullable=True)

    # Relationships
    bingo = relationship("Bingo", back_populates="customization")

#Для получения количества конкретных реакций по типу использовать это таблицу  - selct count(*) where bingo_id = id, type = <тип реакции>
class BingoReaction(IDMixin, Base):
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("User.id"), nullable=False)
    bingo_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("Bingo.id"), nullable=False)
    type: Mapped[str] = mapped_column(String(255), nullable=False)

    # Relationships
    user_reactions = relationship("User", back_populates="reactions") # Реакции пользователя (TODO: поиск по поставленным реакциям)
    bingo_reactions = relationship("Bingo", back_populates="reactions")  # Реакции, которые поставили бинго (TODO: поиск по поставленным реакциям)


class BingoCounter(IDMixin, Base):
    bingo_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("Bingo.id"), nullable=False)
    reaction_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    message_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    favorite_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)

    # Relationships
    bingo = relationship("Bingo", back_populates="counters")


class BingoTag(IDMixin, Base):
    bingo_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("Bingo.id"), nullable=False)
    tag_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("Tag.id"), nullable=False)

    # Relationships
    bingo = relationship("Bingo", back_populates="tags")
    tag = relationship("Tag", back_populates="bingos")


class Tag(IDMixin, Base):
    name: Mapped[str] = mapped_column(String(255), nullable=False)

    bingos = relationship("BingoTag", back_populates="tag")


class Comment(IDMixin, TimestampsMixin, Base):
    content: Mapped[str] = mapped_column(Text, nullable=False)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("User.id"), nullable=False)
    bingo_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("Bingo.id"), nullable=False)

    # Relationships
    user = relationship("User", back_populates="comments")
    bingo = relationship("Bingo", back_populates="comments")


class Notification(IDMixin, CreatedAtMixin, Base):

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("User.id"), nullable=False)
    reference_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False) # id объекта вызвавшего реакцию

    type: Mapped[str] = mapped_column(String(100), nullable=False) # лайк, коммент, подписка, тдтп. Готовый инструментарий
    is_read: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    # Relationships
    user = relationship("User", back_populates="notifications")


class Subscription(IDMixin, CreatedAtMixin, Base):
    subscriber_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("User.id"), nullable=False) # Кто подписался
    author_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("User.id"), nullable=False) # На кого подписались

    # Relationships TODO: Проверить, как работает
    subscriber = relationship('User', foreign_keys=[subscriber_id], back_populates='subscriptions')
    author = relationship('User', foreign_keys=[author_id], back_populates='subscribers')

