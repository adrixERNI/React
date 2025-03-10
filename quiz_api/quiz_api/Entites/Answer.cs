using System;

namespace quiz_api.Entites;

public class Answer{

    public int AnswerId {get; set;}
    public string Option {get; set;}
    public bool Is_True {get; set;}

    public int QuizId {get; set;}
    public virtual Quiz Quiz {get; set;}


}
