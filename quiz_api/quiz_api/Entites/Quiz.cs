using System;

namespace quiz_api.Entites;

public class Quiz
{
    public int QuizId {get; set;}
    public string Question {get; set;}

    public virtual ICollection<Answer> Answers {get; set;}

}
