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

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace VWOFmeExampleApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();  // Add controllers for API routes
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();  // Add Swagger support for API documentation

            // Create the app
            var app = builder.Build();

            // Use middleware to serve Swagger UI (optional)
            app.UseSwagger();
            app.UseSwaggerUI();  // Swagger UI for API documentation

            // Serve static files from the 'public' folder
            app.UseStaticFiles();  // By default, serves from 'wwwroot', but we'll configure it to serve from 'public'

            // Serve the index.html from the root path
            app.MapGet("/", async (HttpContext context) =>
            {
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "public", "index.html");

                if (File.Exists(filePath))
                {
                    await context.Response.SendFileAsync(filePath);  // Serve the index.html
                }
                else
                {
                    context.Response.StatusCode = 404;
                    await context.Response.WriteAsync("File not found");  // Return 404 if file not found
                }
            });

            // Map API controllers
            app.MapControllers();

            // Run the application
            app.Run();
        }
    }
}
