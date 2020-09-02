from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import JSON

from .database import Base


class Merchant(Base):
    __tablename__ = "merchants"

    user_id = Column(String, primary_key=True, index=True)
    list = Column(JSON)
