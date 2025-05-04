using ChatApp.API.DataService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSignalR();
builder.Services.AddControllers();
builder.Services.AddOpenApi();

const string CORS_POLICY_NAME = "chat-app-web";
builder.Services.AddCors(options =>
{
    options.AddPolicy(CORS_POLICY_NAME, builder =>
    {
        builder.AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            .WithOrigins("http://localhost:5173");
    });
});

builder.Services.AddSingleton<DbService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.Use(async (context, next) =>
    {
        Console.WriteLine("Request:");
        Console.WriteLine($"{context.Request.Method} {context.Request.Path}");
        foreach (var header in context.Request.Headers)
        {
            Console.WriteLine($"{header.Key}: {header.Value}");
        }

        await next();

        Console.WriteLine("Response:");
        foreach (var header in context.Response.Headers)
        {
            Console.WriteLine($"{header.Key}: {header.Value}");
        }
    });

}

app.UseCors(CORS_POLICY_NAME);
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.MapHub<ChatApp.API.Hubs.ChatHub>("/ws/chat");

app.Run();
