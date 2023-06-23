import Background from "./UI/Background";


const Feedback = ({children}) => {
  return (
    <Background>
      <div className="notfound">
        
      {children}
      </div>
    </Background>
  );
};

export default Feedback;
