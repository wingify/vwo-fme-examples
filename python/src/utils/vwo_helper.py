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
from src.config import Config
from typing import Dict, Any, List
from fastapi import Request
from vwo import init

logs = []
vwo_client = None

def init_vwo_client():
    """
    Initialize the VWO client with the configuration settings.
    """
    global vwo_client
    vwo_client = init({
        "account_id": Config.ACCOUNT_ID,
        "sdk_key": Config.SDK_KEY,
        "poll_interval": Config.POLL_INTERVAL,
        "logger": {
            "level": Config.LOG_LEVEL
        },
        
    })

def create_user_context(request: Request) -> Dict[str, Any]:
    """
    Create a user context dictionary from the request.

    Args:
        request (Request): The incoming request object.

    Returns:
        Dict[str, Any]: A dictionary containing user context information.
    """
    return {
        "id": request.query_params.get("userId", "defaultUser"),
        "customVariables": Config.CUSTOM_VARIABLES,
        "userAgent": request.headers.get("user-agent"),
        "ipAddress": request.client.host
    }

def get_flag(request: Request):
    """
    Retrieve the feature flag for the given user context.

    Args:
        request (Request): The incoming request object.

    Returns:
        The feature flag object.
    """
    user_context = create_user_context(request)
    return vwo_client.get_flag(Config.FLAG_KEY, user_context)

def track_event(request: Request):
    """
    Track an event for the given user context.

    Args:
        request (Request): The incoming request object.

    Returns:
        The result of the event tracking.
    """
    user_context = create_user_context(request)
    return vwo_client.track_event(Config.EVENT_NAME, user_context)

def set_attribute(request: Request):
    """
    Set custom attributes for the given user context.

    Args:
        request (Request): The incoming request object.

    Returns:
        The result of setting the attributes.
    """
    user_context = create_user_context(request)
    return vwo_client.set_attribute(Config.ATTRIBUTES, user_context)

def get_settings():
    """
    Retrieve the current SDK settings.

    Returns:
        The current SDK settings if the VWO client is initialized, otherwise an empty dictionary.
    """
    return vwo_client.original_settings if vwo_client else {}

def get_logs() -> List[Dict[str, str]]:
    """
    Retrieve the logs.

    Returns:
        List[Dict[str, str]]: A list of log entries.
    """
    return logs
