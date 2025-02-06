"""initial

Revision ID: e1ff82e3ec69
Revises: 079218219df6
Create Date: 2025-02-05 18:24:13.208376

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e1ff82e3ec69'
down_revision: Union[str, None] = '079218219df6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('User', 'username',
               existing_type=sa.VARCHAR(length=255),
               type_=sa.String(length=50),
               existing_nullable=False)
    op.create_unique_constraint(None, 'User', ['username'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'User', type_='unique')
    op.alter_column('User', 'username',
               existing_type=sa.String(length=50),
               type_=sa.VARCHAR(length=255),
               existing_nullable=False)
    # ### end Alembic commands ###
