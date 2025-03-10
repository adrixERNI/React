
using System;
using quiz_api.Entites;

namespace quiz_api.DTO.AnswerDTOs;

public class AnswerGETDTO{

    public string Option {get; set;}
    public bool Is_True {get; set;}

    public int QuizId {get; set;}
}
