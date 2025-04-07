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
require_relative 'lib/routes'
require_relative 'lib/utils/vwo_helper'
require_relative 'lib/config'

# Set the public folder for static assets
set :public_folder, File.dirname(__FILE__) + '/public'

# Initialize VWO client once when the app starts
VwoHelper.instance.init_vwo_client
