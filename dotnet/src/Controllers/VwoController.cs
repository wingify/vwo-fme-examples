#pragma warning disable 1587
/**
 * Copyright 2025 Wingify Software Pvt. Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
#pragma warning restore 1587

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using VWOFmeExampleApp;
using Newtonsoft.Json;

namespace VWOFmeExampleApp.Controllers
{
    [Route("v1")]
    [ApiController]
    public class VWOController : ControllerBase
    {
        // Get flag values
        [HttpGet("get-flag")]
        public IActionResult GetFlag([FromQuery] string userId)
        {
            try
            {
                var flag = VWOHelper.GetFlag(userId);
                var response = new
                {
                    IsEnabled = flag.IsEnabled(),
                    Variables = flag.GetVariables(),
                    Settings = VWOHelper.GetSettings(),
                    Logs = VWOHelper.GetLogs(),
                    VariableKey1 = flag.GetVariable(Config.VariableKey1, "GPT-4"),
                    // stringify the variableKey2
                    VariableKey2 = JsonConvert.SerializeObject(flag.GetVariable(Config.VariableKey2, new string[] { }))
                };
                // print variableKey1 and variableKey2
                Console.WriteLine("variableKey2: " + response.VariableKey2);
                return Ok(response);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine("Error in getFlag route: " + ex.Message);
                return StatusCode(500, new
                {
                    IsEnabled = false,
                    Variables = new object(),
                    Settings = (object)null,
                    Logs = new object[] { },
                    VariableKey1 = "GPT-4",
                    VariableKey2 = new object[] { }
                });
            }
        }

        // Track event
        [HttpGet("track-event")]
        public IActionResult TrackEvent([FromQuery] string userId)
        {
            try
            {
                // TrackEvent now returns a dictionary, so we need to handle that accordingly
                var eventResult = VWOHelper.TrackEvent(userId);

                // Check if the event was tracked successfully
                bool success = eventResult.ContainsKey("success") && eventResult["success"];
                return Ok(new { success });
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine("Error in trackEvent route: " + ex.Message);
                return StatusCode(500, new { success = false });
            }
        }

        // Set attribute
        [HttpGet("set-attribute")]
        public IActionResult SetAttribute([FromQuery] string userId)
        {
            try
            {
                // SetAttribute now returns a boolean, so we directly handle that
                bool success = VWOHelper.SetAttribute(userId);
                return Ok(new { success });
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine("Error in setAttribute route: " + ex.Message);
                return StatusCode(500, new { success = false });
            }
        }
    }
}
