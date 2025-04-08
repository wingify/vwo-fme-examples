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
require_relative '../config'

class CustomLogger
    attr_reader :level, :logs_data
    
    def initialize(config = {})
      @config = config
      @level = CONFIG.vwo[:log_level]
      @logs_data = []
    end
    
    def log(level, message)
      @logs_data.push({level: level, message: message})
    end
  end