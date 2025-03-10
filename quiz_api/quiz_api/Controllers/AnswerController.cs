using System;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using quiz_api.DTO.AnswerDTOs;
using quiz_api.Entites;
using quiz_api.Repositories;
using quiz_api.Repositories.AnswerRepository;

namespace quiz_api.Controllers;

[Route("api/[Controller]")]
[ApiController]
public class AnswerController : ControllerBase{
    private readonly IAnswerRepository _answerRepo;
    private readonly IMapper _mapper;
    private readonly IQuizRepository _quizRepo;

    public AnswerController(IAnswerRepository answerRepo, IMapper mapper, IQuizRepository quizRepo){
        _answerRepo = answerRepo;
        _mapper = mapper;
        _quizRepo = quizRepo;
    } 

    [HttpGet]
    public async Task<IActionResult> GetAll(){
        var answer = await _answerRepo.GetAllAsync();
        var answer_dto = _mapper.Map<List<AnswerDTO>>(answer);
        return Ok(answer_dto);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetByid(int id){
        var answer = await _answerRepo.GetByIdAsync(id);
        if(answer == null){
            return NotFound(new {message = "Id Not Found"});
        }
        var answer_dto = _mapper.Map<AnswerDTO>(answer);
        return Ok(answer_dto);
    }

    [HttpPost]
    public async Task<IActionResult>  AddAnswer([FromBody] CreateAnswerDTO createAnswerDTO){
       
        if (!await _quizRepo.QuizExistsAsync(createAnswerDTO.QuizId))
        {
            return NotFound(new { message = "Quiz Not Found" });
        }


        var answer = _mapper.Map<Answer>(createAnswerDTO);
        var answer_id = await _answerRepo.CreateAsync(answer);

        return CreatedAtAction(nameof(GetByid), new {id = answer_id}, answer);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAnswer([FromRoute] int id, [FromBody] CreateAnswerDTO answerUpdateDTO)
    {

        if (!await _quizRepo.QuizExistsAsync(answerUpdateDTO.QuizId))
        {
            return NotFound(new { message = "Quiz Not Found" });
        }

        var answer = await _answerRepo.UpdateAsync(id, answerUpdateDTO);
        if (answer == null)
        {
            return NotFound(new { message = "Answer Not Found" });
        }
        return Ok(answer);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete ([FromRoute] int id){
        var answer = await _answerRepo.DeleteAsync(id);

        if(answer == null){
            return NotFound(new {message = "Answer Not Found"});
        }

        return NoContent();
    }



}