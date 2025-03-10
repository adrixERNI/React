using System;
using Microsoft.EntityFrameworkCore;
using quiz_api.Entites;

namespace quiz_api.Data;

public class ApplicationDbContext : DbContext{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options){
     
    }
   public DbSet<Quiz> Quizzes { get; set; }
   public DbSet<Answer> Answers {get; set;}
}
