/*
    RANDOM TEXT GENERATOR
*/

let vocal = 'aeiou';
let consonant = 'bcdfghjklmnpqrstvwxyz';

function random(num1, num2) {
    return num1 + Math.round(Math.random() * (num2 - num1));
}

function word() { // 1 word: min num1 letters and max num2 letters
    // 1 word consists of at least 1 vocal
    let result = '';
    let max = random(3, 8); // setting the maximum number of letters in one word
    let bin; // setting a binary number to decide vocal or consonant
    let status = []; // to know whether a letter is a vocal or a consonant
    for (let i = 0; i < max; i++) {
        bin = random(1, 2);
        if (i >= 2 && status[i - 1] === 'vocal' && status[i - 2] === 'vocal') {
            result += consonant[random(0, consonant.length - 1)];
        } else if (i >= 2 && status[i - 1] === 'consonant' && status[i - 2] === 'consonant') {
            result += vocal[random(0, vocal.length - 1)];
        } else if (bin === 1) {
            result += vocal[random(0, vocal.length - 1)];
        } else if (bin === 2) {
            result += consonant[random(0, consonant.length - 1)];
        }
        if (result[i] === vocal[0] || result[i] === vocal[1] || result[i] === vocal[2] || result[i] === vocal[3] || result[i] === vocal[4]) {
            status[i] = 'vocal';
        } else {
            status[i] = 'consonant';
        }
    }
    return result;
}

function sentences(num) {
    let result = '';
    for (let i = 0; i < num; i++) {
        if (i !== num - 1) {
            result += word() + ' ';
        } else {
            result += word();
        }
    }
    return result;
}

/*
    get user's name and number of words
*/

function processInputs() {
    let nama = document.getElementById('name').value;
    let words = document.getElementById('words').value;
    let randomText = sentences(words);
    let typingArea = document.getElementById('typing-area');
    let typingInput = document.getElementById('typing-input');

    document.getElementById('nameTarget').innerText = `Hi ${nama}, how fast can you type?`;
    typingArea.innerText = randomText;
    typingInput.value = '';
    typingInput.style.color = 'black';
    typingInput.focus();
}

/*
    checking every character pressed, whether it's correct or incorrect
*/

function check() {
    let typingInput = document.getElementById('typing-input');
    let typingArea = document.getElementById('typing-area');
    let typingSpeed = document.getElementById('speed');
    let i = typingInput.value.length - 1;
    if (i === 0) {
        start();
    }
    if (typingInput.value[i] === typingArea.innerText[i]) {
        typingInput.style.color = 'green';
        typingInput.style.borderColor = 'green';
        if (typingInput.value.length === typingArea.innerText.length && typingInput.value === typingArea.innerText) {
            let time = end();
            let temp = '';
            let arr = [];
            for (let i = 0; i < typingArea.innerText.length; i++) {
                if (typingArea.innerText[i] !== ' ') {
                    temp += typingArea.innerText[i];
                } else {
                    arr.push(temp);
                    temp = '';
                }
            }
            arr.push(temp); console.log('arr.length : ', arr.length, typeof arr.length);
            let speed = Math.round(arr.length / time * 60);
            typingSpeed.innerText = `Your Speed: ${speed} WPM`;
            processInputs();
        }
    } else {
        typingInput.style.color = 'red';
        typingInput.style.borderColor = 'red';
    }
}

/*
    Timer
*/

var startTime, endTime, seconds;

function start() {
  startTime = new Date();
};

function end() {
  endTime = new Date();
  var timeDiff = endTime - startTime;
  timeDiff /= 1000;
  var seconds = Math.round(timeDiff);
  console.log(seconds, typeof seconds);
  return seconds;
}