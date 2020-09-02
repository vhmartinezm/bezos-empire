import secrets
from typing import List

from fastapi import Depends, FastAPI, Request, Response, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import logic, models, schemas
from .database import SessionLocal, engine


# Create DB if not exists
# In a large app I should use migrations
models.Base.metadata.create_all(bind=engine)

app = FastAPI(docs_url=None, redoc_url=None)

origins = [
    "http://localhost",
    "http://localhost:3010",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
)


# DB connection
def get_db(request: Request):
    return request.state.db


@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal server error", status_code=500)
    try:
        request.state.db = SessionLocal()
        response = await call_next(request)
    finally:
        request.state.db.close()
    return response


@app.post(
    "/api/merchant/",
    response_model=schemas.Merchant,
    status_code=status.HTTP_201_CREATED
)
def create_factura(
    merchant: schemas.MerchantCreate,
    db: Session = Depends(get_db)
):
    return logic.create_or_update_merchant(db=db, merchant=merchant)


@app.get("/api/merchant/{user_id}", response_model=schemas.Merchant)
def read_facturas(
    user_id: str,
    db: Session = Depends(get_db)
):
    merchants = logic.get_merchants(db, user_id=user_id)
    if merchants is None:
        raise HTTPException(status_code=404, detail="Merchants not found")
    return merchants
