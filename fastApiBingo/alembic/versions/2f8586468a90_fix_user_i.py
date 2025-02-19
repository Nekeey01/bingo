"""Fix user I

Revision ID: 2f8586468a90
Revises: 12060be47d01
Create Date: 2025-02-05 03:49:18.536971

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2f8586468a90'
down_revision: Union[str, None] = '12060be47d01'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('User', 'id',
               existing_type=sa.UUID(),
               type_=sa.Integer(),
               existing_nullable=False,
               autoincrement=True,
               existing_server_default=sa.text('gen_random_uuid()'))
    op.create_index(op.f('ix_User_id'), 'User', ['id'], unique=False)
    op.create_unique_constraint(None, 'User', ['username'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'User', type_='unique')
    op.drop_index(op.f('ix_User_id'), table_name='User')
    op.alter_column('User', 'id',
               existing_type=sa.Integer(),
               type_=sa.UUID(),
               existing_nullable=False,
               autoincrement=True,
               existing_server_default=sa.text('gen_random_uuid()'))
    # ### end Alembic commands ###
