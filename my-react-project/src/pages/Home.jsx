import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const goToCreate = () => {
    navigate('/create');
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100">
      <button
        onClick={goToCreate}
        className="bg-pink-400  font-serif  text-white text-3xl font-bold  py-5 px-10 rounded-lg shadow-2xl shadow-pink-500/50 hover:bg-pink-800"
      >
        Start
      </button>
    </div>
  );
}

export default Home;
