import face_recognition
import numpy as np
from typing import List
from fastapi.responses import HTMLResponse
from fastapi import FastAPI, Depends, File,UploadFile, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from tortoise import fields
from tortoise.contrib.fastapi import register_tortoise
from tortoise.contrib.pydantic import pydantic_model_creator
from tortoise.models import Model
from passlib.hash import bcrypt
from starlette.middleware.cors import CORSMiddleware
import jwt
from PIL import Image
from io import BytesIO
app = FastAPI()

JWT_SECRET = "JWT"

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8000",
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class User(Model):
    id = fields.IntField(pk=True)
    email_address = fields.CharField(100, unique=True)
    password_hash = fields.CharField(128)

    @classmethod
    async def get_user(cls, email_address):
        return cls.get(email_address=email_address)

    def verify_password(self, password):
        return True


User_Pydantic = pydantic_model_creator(User, name='User')

UserIn_Pydantic = pydantic_model_creator(
    User, name="UserIn", exclude_readonly=True)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="jwt")


async def authenticate_user(email_address: str, password: str):
    user = await User.get(email_address=email_address)
    if not user:
        return False
    if not user.verify_password(password):
        return False
    return user


@app.post('/token')
async def generate_token(form_data: OAuth2PasswordRequestForm = Depends()):

    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid username or Password'
        )

    user_obj = await User_Pydantic.from_tortoise_orm(user)

    token = jwt.encode(user_obj.dict(), JWT_SECRET)
    return {"access_token": token, 'token_type': 'bearer'}


@app.post('/create/users', response_model=User_Pydantic)
async def create_user(user: UserIn_Pydantic):
    user_obj = User(email_address=user.email_address,
                    password_hash=bcrypt.hash(user.password_hash))
    await user_obj.save()
    return await User_Pydantic.from_tortoise_orm(user_obj)

register_tortoise(
    app,
    db_url='sqlite://db.sqlite3',
    modules={'models': ["app"]},
    generate_schemas=True,
    add_exception_handlers=True
)


async def get_user_current(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        user = await User.get(id=payload.get('id'))
    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid username or Password'
        )
    return await User_Pydantic.from_tortoise_orm(user)


@app.get('/user', response_model=User_Pydantic)
async def index(user: User_Pydantic = Depends(get_user_current)):
    return user


def faceRecognition(files):
    nid_img = Image.open(BytesIO(files[0]))
    usr_img = Image.open(BytesIO(files[1]))
    nid_img = nid_img.convert('RGB')
    usr_img = usr_img.convert('RGB')

    nid_image = np.array(nid_img)
    user_image = np.array(usr_img)

    nid_conding = face_recognition.face_encodings(nid_image)[0]
    user_encoding = face_recognition.face_encodings(user_image)[0]

    results = face_recognition.compare_faces(
        [nid_conding], user_encoding)
    return results


@app.post("/kyc/files/")
async def create_files(files: List[bytes] = File(...), token: str = Depends(oauth2_scheme)):

    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        user = await User.get(id=payload.get('id'))
        results = faceRecognition(files)
    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid username or Password'
        )

    return {"result": bool(results[0])}
    


