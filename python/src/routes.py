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
from fastapi import APIRouter, Request # type: ignore
from src.utils import vwo_helper
from src.config import Config

router = APIRouter()

@router.get("/v1/get-flag")
def get_flag(request: Request):
    """
    Retrieves the feature flag for the given user context.
    """
    try:
        flag = vwo_helper.get_flag(request)
        return {
            "isEnabled": flag.is_enabled(),
            "variables": flag.get_variables(),
            "settings": vwo_helper.get_settings(),
            "logs": vwo_helper.get_logs(),
            "variablekey1": flag.get_variable(Config.VARIABLE_KEY_1, "GPT-4"),
            "variablekey2": flag.get_variable(Config.VARIABLE_KEY_2, []),
        }
    except Exception as e:
        print("Error in get_flag:", e)
        return {
            "isEnabled": False,
            "variables": {},
            "settings": None,
            "logs": [],
            "variablekey1": "GPT-4",
            "variablekey2": [],
        }

@router.get("/v1/track-event")
def track_event(request: Request):
    """
    Tracks an event for the given user context.
    """
    try:
        vwo_helper.track_event(request)
        return {"success": True}
    except Exception as e:
        print("Error in track_event:", e)
        return {"success": False}

@router.get("/v1/set-attribute")
def set_attribute(request: Request):
    """
    Sets custom attributes for the given user context.
    """
    try:
        vwo_helper.set_attribute(request)
        return {"success": True}
    except Exception as e:
        print("Error in set_attribute:", e)
        return {"success": False}
