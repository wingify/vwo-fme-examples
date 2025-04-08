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

require 'dotenv/load' # Load environment variables from .env

class Config
  attr_reader :vwo

  def initialize
    @vwo = {
      account_id: (ENV['VWO_ACCOUNT_ID'] || 0).to_i,
      sdk_key: ENV['VWO_SDK_KEY'] || '',
      flag_key: ENV['VWO_FLAG_KEY'] || '',
      event_name: ENV['VWO_EVENT_NAME'] || '',
      attributes: ENV['VWO_USER_ATTRIBUTES'] ? JSON.parse(ENV['VWO_USER_ATTRIBUTES']) : {},
      custom_variables: ENV['VWO_CUSTOM_VARIABLES'] ? JSON.parse(ENV['VWO_CUSTOM_VARIABLES']) : {},
      log_level: ENV['VWO_LOG_LEVEL'] || 'DEBUG',
      poll_interval: (ENV['VWO_POLLING_INTERVAL'] || '500000').to_i,
      variable_key_1: ENV['VWO_FLAG_VARIABLE_1_KEY'] || 'model_name',
      variable_key_2: ENV['VWO_FLAG_VARIABLE_2_KEY'] || 'query_answer'
    }

    validate_config
  end

  private

  def validate_config
    required_fields = %i[account_id sdk_key flag_key]
    missing_fields = required_fields.select { |field| @vwo[field].nil? || @vwo[field].to_s.empty? }

    unless missing_fields.empty?
      raise "Missing required configuration: #{missing_fields.join(', ')}"
    end
  end
end

# Create an instance of the configuration to be used throughout your app
CONFIG = Config.new
