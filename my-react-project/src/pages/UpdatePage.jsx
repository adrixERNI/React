import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UpdatePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizId, question: initialQuestion } = location.state || {};

  const [quiz,setQuiz] = useState({})
  const [question, setQuestion] = useState(initialQuestion || '');
  // const [options, setOptions] = useState({ A: '', B: '', C: '', D: '' });

  const handleInputChange = (e,index) => {
    const newValue = e.target.value;
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      answers: quiz.answers.map((answer, _index) => 
        _index === index ? { ...answer, option: newValue } : answer
    )
    }));
  };
  

  const handleRadioChange = (index) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      answers: quiz.answers.map((answer, _index) => 
        _index === index ? { ...answer, is_True: true } : { ...answer, is_True: false }
    )
    }));
  };

  const {id} = useParams();


  useEffect(() => {   
    const fetchQuizAnswer = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/Quiz/${id}`);
      setQuiz(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  fetchQuizAnswer();},[id]);


  useEffect(() => {
    if (!quizId) {
      navigate('/create'); 
    }
  }, [quizId, navigate]);

  const handleUpdate = async () => {

    if (!question.trim()) {
      alert('Question cannot be empty');
      return;
    }

    
  
    // Checking lang ba
    console.log({
      question,
      quiz 
    });
  
    try {
      const response = await axios.put(`http://localhost:5001/api/Quiz/${quizId}`, 
        {
          question,
          quiz 
        }
    );
      console.log('Response from server:', response.data);  
      alert('Test update');
      navigate('/create');
    } catch (error) {
      console.error('Error updating quiz:', error.response?.data);
      alert('Failed to update quiz');
    } 
  };
  

  console.log(quiz)

  return (
    <>
    <nav className="bg-pink-400 p-9 rounded-lg shadow">
            <div className="container mx-auto flex justify-between items-center">
              <div className="text-white text-2xl font-bold">
                <a href="\">
                  <FontAwesomeIcon icon={faHouse} />
                </a>
              </div>
              <div className="space-x-6">
                <a
                  href="\create"
                  className="text-gray-300 hover:text-white text-2xl font-sans"
                >
                  <FontAwesomeIcon icon={faArrowLeftLong} />
                </a>
              </div>
            </div>
          </nav>
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-6">
      <h1 className="font-sans text-pink-500 text-5xl mb-6">Update Quiz</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <input
          type="text"
          placeholder="Updated Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border-2 border-pink-500 rounded-md p-4 w-full focus:border-pink-800 focus:outline-none mb-4"
        />
        <>
        {
       quiz?.answers?.map((a, index) => (
        <div key={index} className="flex items-center space-x-2 mb-3">

          <input
            type="text"
            id={a.option} 
            value={quiz?.answers[index]?.option} 
            onChange={(e) => handleInputChange(e,index)}
            className="border-2 border-pink-500 p-4 w-full focus:border-pink-800 focus:outline-none"
          />
          {/* {a.id} */}

          <input
            type="radio"
            name="correctAnswer"
            value={a.option } 
            checked={quiz?.answers[index].is_True} 
            onChange={() => handleRadioChange(index)} 
            className="w-5 h-5 accent-pink-500"
          />
          {/* {a.option} */}
        </div>
      ))
        }
          </>

        <button
          onClick={handleUpdate}
          className="bg-pink-400 font-serif text-white text-2xl font-bold py-4 px-8 rounded-lg shadow-xl hover:bg-pink-800 w-full mt-4"
       
        >
          Update
        </button>
      </div>
    </div>
    </>
  );
}

export default UpdatePage;
