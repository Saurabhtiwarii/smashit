import './App.css';
import Footer from './Footer';
import { useState } from 'react';
import avatar1 from './images/avatar1.png';
import avatar2 from './images/avatar2.png';
import avatar3 from './images/avatar3.png';
import music from './images/music.mp3';
import sound from './images/sound.wav';


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
      return pickupRandomHole();
  }
  lastHole = hole;
  return hole;
}
//* popout the avatar from hole
function popoutAvatar(){
const time = Math.random() * (800 - 400) + 400;
const hole = pickupRandomHole();
hole.classList.add('up');
setTimeout(function(){
    if (!timeUp) popoutAvatar();
    hole.classList.remove('up');
},time)
}


 // play the game
  function playgame(){
    const countdownBoard = document.querySelector('.countdown-board');
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
        const gameoverScreen = document.querySelector('.gameover-screen');
        gameoverScreen.style.display = 'flex';
        
    }

    if(countdown == 30){
      countdownBoard.style.color = '#f38e4b'
    }

    if(countdown == 15){
      countdownBoard.style.color = '#f34b4b'
    }
}, 1000);
}


  function startGame(){
      setScore(0);
     const countdownBoard = document.querySelector('.countdown-board');
      countdownBoard.classList.remove('countdown-board-active');
      countdownBoard.style.transition = 'none';
    const background_music = document.querySelector('.background_music');
    background_music.pause();
    const selection_screen = document.querySelector('.players');
    selection_screen.style.display = 'none';
    const readyWindow = document.querySelector('.ready-window');
    readyWindow.style.display = 'flex';
    let count = 0;
    
      const readyCountdown =  setInterval(()=>{
          const readyWindowText = document.querySelector('.ready-window span');
          count = count+1;
          if(count === 1){
            readyWindowText.innerText = '3';
          }
          else if(count === 2){
            readyWindowText.innerText = '2';
          }
          else if(count === 3){
            readyWindowText.innerText = '1';
          } 
          else if(count === 4){
            readyWindow.style.display = 'none';
            clearInterval(readyCountdown);
            playgame();
            countdownBoard.style.transition = 'transform 0.7s';
            countdownBoard.classList.add('countdown-board-active');

          }
         
    },1000);
  }
  function hit(){
    const hit_sound = document.querySelector('.hit_sound');
    hit_sound.currentTime = 0;
    hit_sound.play();
    score = score+1;
    setScore(score)
  }

  avatars.forEach(avatar=>{
    avatar.addEventListener('click',hit);
  });
  

function selectionScreen(){
  const gameoverScreen = document.querySelector('.gameover-screen');
  gameoverScreen.style.display = 'none';
  const background_music = document.querySelector('.background_music');
  const introWindow = document.querySelector('.intro-window');
  const selection_screen = document.querySelector('.players');
  introWindow.style.transform = 'translateY(100%)';
  introWindow.style.display = 'none';
  selection_screen.style.display = 'flex';
  background_music.currentTime = 0;
  background_music.play();

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
<audio loop className="background_music">
  <source src={ music } type="audio/ogg"/>
Your browser does not support the audio element.
</audio>

<video className="hit_sound">
  <source src={ sound } type="video/wav"/>
  <source src={ sound } type="video/ogg"/>
  Your browser does not support the video tag.
</video>
           

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

            <div className="intro-window">
              <h1>Smash It</h1>
              <button className="start-btn" onClick={selectionScreen}>START</button>
            </div>
  
      <div className="game">  
           
    
            <div className="ready-window">
              <span>Ready ?</span>
            </div>
            <div className="countdown-board">countdown: <span className="countdown">{count}</span></div>
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
            <div className="gameover-screen">
                <div className="gameover-screen__message">Game Over</div>
                <div className="gameover-screen__score">Score: {score}</div>
                <button className="back-btn" onClick={selectionScreen}>Play Again</button>
          </div>
      </div>
          <Footer  score = {score}/>
         
    </div>
  );
}

export default App;
