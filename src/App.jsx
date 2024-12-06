import { useState, useEffect } from "react";

function App() {
  const [grid, setGrid] = useState(Array(9).fill(null));
  const [score, setScore] = useState(0);

  const [activeIndex, setActiveIndex] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  let keyword = "HIT";

  const handleClick = (index)=>{
    if (timeLeft === 0) return;
    if(index === activeIndex){
      setScore(prev=>prev+5);
    }else{
      setScore(prev=>prev-2.5);
    }
  }
 
  // To set random activeIndex to showHIT
  useEffect(() => {
   
    let timer;
   if(timeLeft){
   timer =  setInterval(() => {
    let index = Math.floor(Math.random() * 9);
      setActiveIndex(index);
    }, 1000);
   }
    
    return () => {
      clearInterval(timer)
    }
  }, [timeLeft])
  


  //For 1minute Game Play
  useEffect(() => {
    let timer;
    if(timeLeft > 0){
    timer = setTimeout(() => {
        setTimeLeft(prev=>prev-1)
      },1000);
    }
    return () => {
      clearTimeout(timer)
    };
  }, [timeLeft]);

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center align-items-center">
          <h2 className="text-center" style={{ color: "#36454F" }}>
            Click the Box Game
          </h2>
          <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-evenly align-items-center">
            <h4 className="p-2" style={{ color: "#555D50" }}>
              Time Left: {timeLeft} secs
            </h4>
            <h4 className="p-2" style={{ color: "#555D50" }}>
              Score: {score}
            </h4>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-6 gridStyle d-grid gap-0">
            {grid.map((_, index) => (
              <div
                className="col-12 d-flex justify-content-center align-items-center"
                key={index}
                onClick={() => handleClick(index)}
                style={{
                  height: "100px",
                  border: "2px solid purple",
                  backgroundColor: "#f0f0f0",
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: activeIndex === index ? "red" : "black",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease-in-out",
                  textAlign: "center",
                }}>
                {index === activeIndex ? keyword : ""}
              </div>
            ))}
          </div>
          {/* Display game over message when time is up */}
          {timeLeft === 0 && (
            <div style={{ marginTop: "20px" }}>
              <h2 className="text-center" style={{ color: "#36454F" }}>Game Over!</h2>
              <h3 className="text-center" style={{ color: "#36454F" }}>Your Final Score: {score}</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
