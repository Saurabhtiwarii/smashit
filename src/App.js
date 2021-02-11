import './App.css';
import Footer from './Footer';
import { useState , useEffect} from 'react';
import './images/avatar1.png';
import './images/avatar2.png';


function App() {
  let [count,setCount] = useState(0);
  let [score,setScore] = useState(0);
  //* let lastHole;
  let timeUp = false;
  let timeLimit = 60000;
  let lastHole = null;
  let countdown;
  let scoreUpdate=0 ;

  const avatars =document.querySelectorAll('.avatar');
//* pick the random hole
function pickupRandomHole(){
  const holes = document.querySelectorAll('.game__ground .hole');
  const randomHole = Math.floor(Math.random()*holes.length);
  const hole = holes[randomHole];
  if (hole === lastHole){
      return pickupRandomHole(holes);
  }
  lastHole = hole;
  return hole;
}
//* popout the avatar from hole
function popoutAvatar(){
const time = 800;
const hole = pickupRandomHole();
hole.classList.add('up');
setTimeout(function(){
    if (!timeUp) popoutAvatar();
    hole.classList.remove('up');
},time)
}


 // play the game
  function playgame(){
    countdown = timeLimit/1000;
    setCount(countdown);
    timeUp = false; 
    popoutAvatar();
    setTimeout(()=>{
      timeUp = true;
  }, timeLimit);

  let startCountDown = setInterval(() => {
    countdown -= 1;
    setCount(countdown);
    if (countdown<0){
        countdown = 0;
        clearInterval(startCountDown);
        setCount('Time Up');
    }
}, 1000);
}


  function startGame(){
    const introWindow = document.querySelector('.intro-window');
    introWindow.style.transform = 'translateY(100%)';
    const readyWindow = document.querySelector('.ready-window');
    readyWindow.style.display = 'flex';
    let count = 0;

      const readyCountdown =  setInterval(()=>{
          const readyWindowText = document.querySelector('.ready-window span');
          count = count+1;
          if(count === 2){
            readyWindowText.innerText = '3';
          }
          else if(count === 3){
            readyWindowText.innerText = '2';
          }
          else if(count === 4){
            readyWindowText.innerText = '1';
          } 
          else if(count === 5){
            readyWindow.style.display = 'none';
            clearInterval(readyCountdown);
            playgame();
          }
    },1000);
  }
  function hit(){
    score = score+1;
    setScore(score)
  }

  avatars.forEach(avatar=>{
    avatar.addEventListener('click',hit);
  });
     
 
  return (
    <div className="App">
     
      <div className="game">  
            <div className="intro-window">
              <h1>Smash It</h1>
              <button className="start-btn" onClick={startGame}>START</button>
            </div>

            <div className="ready-window">
              <span>Ready ?</span>
            </div>

            <div className="game__ground">
              <div className="hole hole1">
                  <div className="avatar sm"></div>
              </div>

              <div className="hole hole2">
                  <div className="avatar sm"></div>
              </div>

              <div className="hole hole3">
                  <div className="avatar sm"></div>
              </div>

              <div className="hole hole4">
                  <div className="avatar lg"></div>
              </div>

              <div className="hole hole5">
                  <div className="avatar lg"></div>
              </div>

              <div className="hole hole6">
                  <div className="avatar lg"></div>
              </div>
        </div>

      </div>
          <Footer count = {count} score = {score}/>
          
    </div>
  );
}

export default App;
