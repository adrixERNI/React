using System;
using quiz_api.DTO.AnswerDTOs;

namespace quiz_api.DTO;

public class QuizGETDTO{

    public int QuizId {get; set;}
    public string Question {get; set;}
      public ICollection<AnswerDTO> Answers { get; set; } 
    


}