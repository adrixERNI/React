using System;
using AutoMapper;
using quiz_api.DTO.AnswerDTOs;
using quiz_api.Entites;

namespace quiz_api.Profiles;

public class AnswerProfile : Profile{
    public AnswerProfile(){
        CreateMap<Answer,AnswerDTO>().ReverseMap();
        CreateMap<Answer,AnswerGETDTO>().ReverseMap();
        CreateMap<Answer,CreateAnswerDTO>().ReverseMap();
        
    }
}