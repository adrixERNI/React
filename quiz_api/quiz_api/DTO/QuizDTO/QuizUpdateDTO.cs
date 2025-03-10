using System;
using quiz_api.DTO.AnswerDTOs;
using quiz_api.Entites;

namespace quiz_api.DTO;

public class QuizUpdateDTO
{   
    public string question {get; set;}
    public QuizDTO quiz {get;set;}
    
}