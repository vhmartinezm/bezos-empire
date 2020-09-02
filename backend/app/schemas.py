from datetime import date

from typing import List
from pydantic import BaseModel


class MerchantBase(BaseModel):
    user_id: str
    list: List[str]


class MerchantCreate(MerchantBase):
    pass


class Merchant(MerchantBase):
    class Config:
        orm_mode = True
