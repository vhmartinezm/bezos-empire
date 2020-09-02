from sqlalchemy.orm import Session

from . import models, schemas


def get_merchants(db: Session, user_id: str):
    return db.query(models.Merchant).get(user_id)


def create_or_update_merchant(db: Session, merchant: schemas.MerchantCreate):
    curr_merchant = db.query(models.Merchant).get(merchant.user_id)

    if not curr_merchant:
        mechant = models.Merchant(**merchant.dict())
        db.add(mechant)
        db.commit()
        db.refresh(merchant)
    else:
        curr_merchant.list = merchant.list
        db.merge(curr_merchant)
        db.commit()
        db.refresh(curr_merchant)

    return merchant
