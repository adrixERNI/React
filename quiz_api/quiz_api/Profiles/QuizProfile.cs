using System;
using AutoMapper;
using quiz_api.DTO;
using quiz_api.Entites;

namespace quiz_api.Profiles;

public class QuizProfile : Profile
{
    public QuizProfile(){
        CreateMap<Quiz,QuizDTO>().ReverseMap()
            .ForMember(dest => dest.Answers, opt => opt.MapFrom(src => src.Answers));
        CreateMap<Quiz,QuizGETDTO>().ReverseMap();
        CreateMap<Quiz,QuizCreateDTO>().ReverseMap();
        CreateMap<Quiz,QuizUpdateDTO>().ReverseMap();
    }
}