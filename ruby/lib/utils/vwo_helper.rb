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

require 'vwo'
require 'singleton'
require_relative '../config'
require_relative 'custom_logger'

class VwoHelper
  include Singleton

  # Returns the initialized VWO client instance
  attr_reader :vwo_client
  
  def initialize
    @custom_logger = CustomLogger.new
  end

  # Initializes the VWO client with configuration from the CONFIG object
  # Sets up the SDK with account ID, SDK key, custom logger, and polling interval
  # This method should be called before attempting to use any VWO functionality
  def init_vwo_client
    sdk_config = {
      account_id: CONFIG.vwo[:account_id],
      sdk_key: CONFIG.vwo[:sdk_key],
      logger: {transport: @custom_logger},
      poll_interval: CONFIG.vwo[:poll_interval]
    }
    @vwo_client = VWO.init(sdk_config)
  end

  # Creates a user context object from the request parameters
  # This context is used for feature flag evaluation and targeting
  #
  # @param request [Request] The web request object containing user information
  # @return [Hash] A hash containing user ID, custom variables, user agent, and IP address
  def create_user_context(request)
    {
      id: request.params['userId'] || 'defaultUser',
      custom_variables: CONFIG.vwo[:custom_variables],
      user_agent: request.user_agent,
      ip_address: request.ip
    }
  end

  # Retrieves a feature flag value for the given user context
  # This method evaluates the flag based on the user's context and campaign settings
  #
  # @param request [Request] The web request object
  # @return [Object] The value of the feature flag for the given user context
  def get_flag(request)
    user_context = create_user_context(request)
    flag = @vwo_client.get_flag(CONFIG.vwo[:flag_key], user_context)
    flag
  end

  # Tracks an event for the given user context
  # This method logs the event to the VWO SDK
  #
  # @param request [Request] The web request object
  # @return [Object] The response from the track_event method
  def track_event(request)
    user_context = create_user_context(request)
    track_event_response = @vwo_client.track_event(CONFIG.vwo[:event_name], user_context)
    track_event_response
  end

  # Sets an attribute for the given user context
  # This method updates the user's attributes in the VWO SDK
  #
  # @param request [Request] The web request object
  # @return [Object] The response from the set_attribute method
  def set_attribute(request)
    user_context = create_user_context(request)
    @vwo_client.set_attribute(CONFIG.vwo[:attributes], user_context)
  end

  # Returns the original settings from the VWO client
  # This can be useful for debugging or understanding the current configuration
  #
  # @return [Hash] The original settings from the VWO client
  def get_settings
    @vwo_client.original_settings
  end

  # Retrieves the logs collected by the custom logger
  # This is useful for debugging and monitoring VWO operations
  #
  # @return [Array] An array of log entries from the custom logger
  def get_logs
    @custom_logger.logs_data
  end
  
end
