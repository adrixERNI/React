using Microsoft.EntityFrameworkCore;
using quiz_api.Data;
using quiz_api.Profiles;
using quiz_api.Repositories;
using quiz_api.Repositories.AnswerRepository;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddOpenApi();

builder.Services.AddControllers()
   .AddJsonOptions(options => {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlConnection"));
});

builder.Services.AddScoped<IQuizRepository, QuizRepository>();
builder.Services.AddAutoMapper(typeof(QuizProfile).Assembly);
builder.Services.AddScoped<IAnswerRepository, AnswerRepository>();
builder.Services.AddAutoMapper(typeof(AnswerProfile).Assembly);


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5175") 
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI();
    app.UseSwagger();
}

app.UseHttpsRedirection();


app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
