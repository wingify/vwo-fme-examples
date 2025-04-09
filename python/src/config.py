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
from dotenv import load_dotenv

load_dotenv()

class Config:
    ACCOUNT_ID = str(int(os.getenv("VWO_ACCOUNT_ID", 0)))
    SDK_KEY = os.getenv("VWO_SDK_KEY", "")
    FLAG_KEY = os.getenv("VWO_FLAG_KEY", "")
    EVENT_NAME = os.getenv("VWO_EVENT_NAME", "")
    ATTRIBUTES = json.loads(os.getenv("VWO_USER_ATTRIBUTES", "{}"))
    CUSTOM_VARIABLES = json.loads(os.getenv("VWO_CUSTOM_VARIABLES", "{}"))
    LOG_LEVEL = os.getenv("VWO_LOG_LEVEL", "DEBUG")
    POLL_INTERVAL = int(os.getenv("VWO_POLLING_INTERVAL"))
    VARIABLE_KEY_1 = os.getenv("VWO_FLAG_VARIABLE_1_KEY")
    VARIABLE_KEY_2 = os.getenv("VWO_FLAG_VARIABLE_2_KEY")

    @staticmethod
    def validate():
        if not Config.ACCOUNT_ID or not Config.SDK_KEY or not Config.FLAG_KEY:
            raise Exception("Missing required VWO config values")

Config.validate()
