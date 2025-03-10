using System;
using quiz_api.DTO;
using quiz_api.Entites;

namespace quiz_api.Repositories;

public interface IQuizRepository
{
    Task<List<Quiz>> GetAllAsync();

    Task<Quiz> GetByIdAsync(int id);

    Task<Quiz> CreateAsync(Quiz quiz);

    Task<Quiz> UpdateAsync(int id, QuizUpdateDTO quiz);

    Task<Quiz> DeleteAsync(int id); 

  Task<bool> QuizExistsAsync(int quizId);

}