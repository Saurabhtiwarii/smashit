import './App.css';
import Footer from './Footer';
import { useState } from 'react';
import avatar1 from './images/avatar1.png';
import avatar2 from './images/avatar2.png';
import avatar3 from './images/avatar3.png';


function App() {
  let [count,setCount] = useState(0);
  let [score,setScore] = useState(0);
  let [avatar, setAvatar] = useState(avatar1);
  //* let lastHole;
  let timeUp = false;
  let timeLimit = 60000;
  let lastHole = null;
  let countdown;


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
const time = Math.random() * (700 - 400) + 400;
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
    const selection_screen = document.querySelector('.players');
    selection_screen.style.display = 'none';
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
  

function selectionScreen(){
  const introWindow = document.querySelector('.intro-window');
  const selection_screen = document.querySelector('.players');
  introWindow.style.transform = 'translateY(100%)';
  selection_screen.style.display = 'flex';

}

function avatarSelection(n){
  const avatar_options = document.querySelectorAll('.players .players__list li');
  avatar_options.forEach(avatar_option=>{
      avatar_option.style.border = 'none';
   })
 
  avatar_options.forEach(avatar_option=>{
   
   if(avatar_option.getAttribute('data-select') == n) {
     avatar_option.style.border = '5px solid rgb(196, 235, 179)';
   }
  })
  
  if(n===2){
    setAvatar(avatar2);
  }
  else if(n===3){
    setAvatar(avatar3);
  }
  else{
    setAvatar(avatar1);
  }
  
}



 
  return (
    <div className="App">

           

 <div className="players">
              <h1>Select Avatar</h1>
                  <ul className="players__list">
                    <li  onClick={()=> avatarSelection(1)} data-select = '1'>
                        <img src={avatar1} alt=""/>
                    </li>
             
                      <li  onClick={()=>avatarSelection(2)} data-select = '2'>
                          <img src={avatar2} alt=""/>
                      </li>
               
           
                      <li  onClick={()=>avatarSelection(3)} data-select = '3'>
                         <img src={avatar3} alt=""/>
                      </li>
                  
                  
                     <li></li>
                    
                      
                  </ul>
                  <button className="continue-btn" onClick={startGame}>Continue</button>
            </div>
  
      <div className="game">  
           
      <div className="intro-window">
              <h1>Smash It</h1>
              <button className="start-btn" onClick={selectionScreen}>START</button>
            </div>

            <div className="ready-window">
              <span>Ready ?</span>
            </div>

            <div className="game__ground">
              <div className="hole hole1">
                  <div className="avatar sm">
                    <img src={avatar} alt=""/>
                  </div>
              </div>

              <div className="hole hole2">
                  <div className="avatar sm">
                  <img src={avatar} alt=""/>
                  </div>
              </div>

              <div className="hole hole3">
                  <div className="avatar sm">
                  <img src={avatar} alt=""/>
                  </div>
              </div>

              <div className="hole hole4">
                  <div className="avatar lg">
                  <img src={avatar} alt=""/>
                  </div>
              </div>

              <div className="hole hole5">
                  <div className="avatar lg">
                  <img src={avatar} alt=""/>
                  </div>
              </div>

              <div className="hole hole6">
                  <div className="avatar lg">
                  <img src={avatar} alt=""/>
                  </div>
              </div>
        </div>

      </div>
          <Footer count = {count} score = {score}/>
    </div>
  );
}

export default App;
