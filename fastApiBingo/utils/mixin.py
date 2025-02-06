import uuid
import datetime
from sqlalchemy import UUID, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column


class IDMixin:
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)


class CreatedAtMixin:
    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), default=datetime.datetime.now
    )

class UpdatedAtMixin:
    updated_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

class TimestampsMixin(CreatedAtMixin, UpdatedAtMixin):
    pass