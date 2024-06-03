import Mountain from '../../assets/mountains.png';

const Image = () => {
  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <img src={Mountain} alt="Rocky Mountains" className="img-fluid" />
      </div>
    </div>
  </div>
  );
}

export default Image;
