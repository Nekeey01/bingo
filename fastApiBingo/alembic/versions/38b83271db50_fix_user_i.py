"""Fix user I

Revision ID: 38b83271db50
Revises: 2f8586468a90
Create Date: 2025-02-05 03:50:08.570407

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '38b83271db50'
down_revision: Union[str, None] = '2f8586468a90'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_index(op.f('ix_User_id'), 'User', ['id'], unique=False)
    op.create_unique_constraint(None, 'User', ['username'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'User', type_='unique')
    op.drop_index(op.f('ix_User_id'), table_name='User')
    # ### end Alembic commands ###
