# Copyright 2025 Wingify Software Pvt. Ltd.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
import os
import json
from dotenv import load_dotenv  # type: ignore
from fastapi import FastAPI  # type: ignore
from fastapi.staticfiles import StaticFiles  # type: ignore
from fastapi.responses import FileResponse  # type: ignore
from src.routes import router
from src.utils.vwo_helper import init_vwo_client
from src.config import Config  # Import the Config class from config.py

# Load environment variables
load_dotenv()

app = FastAPI()

@app.on_event("startup")
def startup_event():
    init_vwo_client()

# Serve static HTML from 'public' folder
app.mount("/static", StaticFiles(directory="public"), name="static")

@app.get("/")
def root():
    return FileResponse("public/index.html")

app.include_router(router)
