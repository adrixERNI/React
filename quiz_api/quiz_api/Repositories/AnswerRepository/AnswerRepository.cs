using System;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using quiz_api.Data;
using quiz_api.DTO.AnswerDTOs;
using quiz_api.Entites;

namespace quiz_api.Repositories.AnswerRepository;

public class AnswerRepository : IAnswerRepository{

    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public AnswerRepository(ApplicationDbContext context, IMapper mapper){
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<Answer>> GetAllAsync()
    {
        return await _context.Answers.ToListAsync();
    }

    public async Task<Answer> GetByIdAsync(int id)
    {
        return await _context.Answers.FindAsync(id);
    }   

    public async Task<Answer> CreateAsync (Answer answer){
        await _context.Answers.AddAsync(answer);
        await _context.SaveChangesAsync();
        return answer;
    }

    public async Task<Answer> UpdateAsync (int id, CreateAnswerDTO answer){
        var existingAnswer = await _context.Answers.FindAsync(id);
        if(existingAnswer == null){
            return null;
        }

        _mapper.Map(answer, existingAnswer);
        await _context.SaveChangesAsync();
        return existingAnswer;
    }


    public async Task<Answer> DeleteAsync(int id){
        var existingAnswer = await _context.Answers.FirstOrDefaultAsync(x=> x.AnswerId==id);
        if(existingAnswer == null){
            return null;
        }
        _context.Answers.Remove(existingAnswer);
        await _context.SaveChangesAsync();
        return existingAnswer;
    }


    
}