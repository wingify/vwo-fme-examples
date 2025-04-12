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

/**
 * Formats and syntax highlights JSON for VWO settings display
 * Replaces special characters and adds HTML spans for syntax highlighting
 *
 * @param obj - Any object to be formatted as JSON
 * @returns HTML string with syntax highlighting markup
 */
export const formatJSONWithSyntaxHighlighting = (obj: any): string => {
  return JSON.stringify(obj, null, 2)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"([^"]+)":/g, '<span class="key">"$1"</span>:')
    .replace(/"([^"]+)"(?=,|\n|\s*\}|\s*\])/g, '<span class="string">"$1"</span>')
    .replace(/\b(true|false)\b/g, '<span class="boolean">$1</span>')
    .replace(/\b(\d+)\b(?!":)/g, '<span class="number">$1</span>')
    .replace(/\bnull\b/g, '<span class="null">null</span>');
};
