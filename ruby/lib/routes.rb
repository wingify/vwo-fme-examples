# Copyright 2025 Wingify Software Pvt. Ltd.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

require 'sinatra'
require 'json'
require_relative 'utils/vwo_helper'
require_relative 'config'

# Serve the HTML page
get '/' do
    send_file 'public/index.html'
end

# Define a route to get flag values from VWO
# This endpoint returns:
# - Flag enabled/disabled status
# - Flag variables with their types
# - VWO campaign settings
# - VWO SDK logs
# - Specific variable values for model_name and query_answer
get '/v1/get-flag' do
  puts "get flag"
  content_type :json
  
  flag = VwoHelper.instance.get_flag(request)

  is_enabled = flag.is_enabled
  variables = flag.get_variables || {}

  variables_hash = variables.map do |key, value|
    { key: key, value: value, type: value.class.to_s }
  end

  settings = VwoHelper.instance.get_settings
  logs = VwoHelper.instance.get_logs || []

  {
    isEnabled: is_enabled,
    variables: variables_hash,
    settings: settings,
    logs: logs,
    variablekey1: flag.get_variable(CONFIG.vwo[:variable_key_1], 'GPT-4'),
    variablekey2: flag.get_variable(CONFIG.vwo[:variable_key_2], [])
  }.to_json
end

# Define a route to track events
# This endpoint logs an event to the VWO SDK
#
# @param request [Request] The web request object
# @return [Object] The response from the track_event method
get '/v1/track-event' do
    content_type :json

    track_event_response = VwoHelper.instance.track_event(request)

    track_event_response.to_json
end

# Define a route to set attributes
# This endpoint updates the user's attributes in the VWO SDK
#
# @param request [Request] The web request object
# @return [Object] The response from the set_attribute method
get '/v1/set-attribute' do
    content_type :json

    VwoHelper.instance.set_attribute(request)

    response = {
        status: "success"
    }

    response.to_json
end