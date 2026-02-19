using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateLogger();

builder.Host.UseSerilog();

var app = builder.Build();

app.MapGet("/", () => 
{
    Log.Information("GET / request received");
    return JsonConvert.SerializeObject(new 
    { 
        message = "Hello from .NET Example", 
        version = "1.0.0",
        framework = ".NET 8.0"
    });
});

app.MapGet("/health", () =>
{
    return JsonConvert.SerializeObject(new
    {
        status = "healthy"
    });
});

Log.Information(".NET Example starting...");
app.Run();
