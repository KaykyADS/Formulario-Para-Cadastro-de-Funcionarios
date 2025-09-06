using Microsoft.EntityFrameworkCore;
using TrilhaNetAzureDesafio.Context;

var builder = WebApplication.CreateBuilder(args);

// Serviços
builder.Services.AddControllers();
builder.Services.AddDbContext<RHContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConexaoPadrao")));
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

var app = builder.Build();

// Middleware
app.UseHttpsRedirection();
app.UseStaticFiles();   // Habilita arquivos estáticos
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

// Redireciona a raiz "/" para index.html
app.MapGet("/", async context =>
{
    context.Response.Redirect("/index.html");
});

app.Run();
