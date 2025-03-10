using System;
using quiz_api.DTO.AnswerDTOs;
using quiz_api.Entites;

namespace quiz_api.Repositories.AnswerRepository;

public interface IAnswerRepository
{
       Task<List<Answer>> GetAllAsync();
         Task<Answer> GetByIdAsync(int id);
        Task<Answer> CreateAsync(Answer answer);
         Task<Answer> UpdateAsync(int id, CreateAnswerDTO answer);
         Task<Answer> DeleteAsync(int id);
            

        
}