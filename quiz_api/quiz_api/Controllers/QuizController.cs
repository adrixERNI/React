using System;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using quiz_api.DTO;
using quiz_api.Entites;
using quiz_api.Repositories;

namespace quiz_api.Controllers;

[Route("api/[Controller]")]
[ApiController]
public class QuizController : ControllerBase
{
    private readonly IQuizRepository _quizRepo;
    private readonly IMapper _mapper;

    public QuizController(IQuizRepository quizRepo, IMapper mapper){
        _quizRepo = quizRepo;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(){
        var quiz = await _quizRepo.GetAllAsync();

        var quizDTO = _mapper.Map<List<QuizDTO>>(quiz);
        return Ok(quizDTO);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult>GetById(int id){
        var quiz = await _quizRepo.GetByIdAsync(id);
        if(quiz == null){
            return NotFound(new {message = "Quiz Not Found"});
        }
        var quizDto = _mapper.Map<QuizGETDTO>(quiz);
        return Ok(quizDto);
    }

    [HttpPost]
    public async Task<IActionResult> AddQuiz([FromBody] QuizCreateDTO quizCreateDTO){
        var quiz = _mapper.Map<Quiz>(quizCreateDTO);
        var quiz_id = await _quizRepo.CreateAsync(quiz);

        return CreatedAtAction(nameof(GetById), new {id = quiz_id}, quiz);

    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateQuiz([FromRoute] int id, [FromBody] QuizUpdateDTO quizUpdateDTO){
        quizUpdateDTO.quiz.Question = quizUpdateDTO.question;
        var quiz = await _quizRepo.UpdateAsync(id, quizUpdateDTO);
        if(quiz == null){
            return NotFound(new {message = "Quiz Not Found"});
        }

        return Ok(quiz);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] int id){
        var quiz = await _quizRepo.DeleteAsync(id);

        if(quiz == null){
            return NotFound(new {message = "Quiz Not Found"});
        }

        await _quizRepo.DeleteAsync(id);
        return NoContent();
        
       
    }

    
    




    
}