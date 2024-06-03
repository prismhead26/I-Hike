import { useNavigate, useLocation } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    if (location.key) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <button onClick={goBack} className="btn btn-dark mb-4" >
      Back
    </button>
  );
};

export default BackButton;