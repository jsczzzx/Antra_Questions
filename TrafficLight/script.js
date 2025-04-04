const redLight = document.getElementById('red');
const yellowLight = document.getElementById('yellow');
const greenLight = document.getElementById('green');

async function startLoop() {
    redLight.classList.add('red');
    await step1();
    await step2();
    await step3();
    startLoop();
}

function step1() {
    return new Promise(resolve => {
        setTimeout(() => {
            redLight.classList.remove('red');
            greenLight.classList.add('green');
            resolve();
        }, 4000);
    });
}

function step2() {
    return new Promise(resolve => {
        setTimeout(() => {
            greenLight.classList.remove('green');
            yellowLight.classList.add('yellow');
            resolve();
        }, 4000);
    });
}

function step3() {
    return new Promise(resolve => {
        setTimeout(() => {
            yellowLight.classList.remove('yellow');
            redLight.classList.add('red');
            resolve();
        }, 2000);
    });
}

startLoop();
