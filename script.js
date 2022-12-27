let minValue = -999;
let maxValue = 999;

let answerNumber = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');
const minValueField = document.getElementById('minValue');
const maxValueField = document.getElementById('maxValue');
const collapseStartField = document.getElementById('start');
const collapseStepField = document.getElementById('step');
const collapseGametField = document.getElementById('game');

orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${answerNumber}?`;

document.getElementById('start-but').addEventListener('click', () => start());
document.getElementById('step-but').addEventListener('click', () => step());

document.getElementById('btnRetry').addEventListener('click', function () {
    restart();
})

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun) {
        if (minValue >= maxValue) {
            answerField.innerText = randomText();
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = `Вы загадали число ${numToText(answerNumber)}?`;
        }
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun) {
        if (minValue >= maxValue) {
            answerField.innerText = randomText();
            gameRun = false;
        } else {
            maxValue = answerNumber - 1;
            answerNumber = Math.ceil((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = `Вы загадали число ${numToText(answerNumber)}?`;
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun) {
        answerField.innerText = randomTextFinish();
        gameRun = false;
    }
})

function start() {
    let begin = document.getElementById('inputBegin').value;
    let end = document.getElementById('inputEnd').value;
    minValue = begin != '' ? !isNaN(begin) ? Number(begin) : -999 : -999;
    maxValue = end != '' ? !isNaN(end) ? Number(end) : 999 : 999;
    minValue = minValue < -999 ? -999 : minValue;
    maxValue = minValue > 999 ? 999 : maxValue;

    if (minValue > maxValue) {
        [maxValue, minValue] = [minValue, maxValue];
    }

    minValueField.innerText = minValue;
    maxValueField.innerText = maxValue;

    answerNumber = Math.floor((minValue + maxValue) / 2);
    answerField.innerText = `Вы загадали число ${numToText(answerNumber)}?`;

    collapseStartField.classList.add("collapse");
    collapseStepField.classList.remove("collapse");
    collapseGametField.classList.add("collapse");
}

function step() {
    collapseStepField.classList.add("collapse");
    collapseGametField.classList.remove("collapse");
}

function restart() {
    collapseStartField.classList.remove("collapse");
    collapseStepField.classList.add("collapse");
    collapseGametField.classList.add("collapse");
    minValue = -999;
    maxValue = 999;
    gameRun = true;
}

function randomText() {
    let phraseRandom = Math.floor(Math.random() * (3 - 0 + 1) + 0);
    switch (phraseRandom) {
        case 0:
            return `Ваше число за пределами диапазона!\n\u{1F914}`;
            break;

        case 1:
            return `Что-то не так с вашем числом\n\u{1F92A}`;
            break;

        case 2:
            return `Вы точно загадали число?\n\u{1F9D0}`;
            break;

        case 3:
            return `Какая-то ошибка\n\u{1F620}`;
            break;
    }
}
function randomTextFinish() {
    let phraseRandom = Math.floor(Math.random() * (3 - 0 + 1) + 0);
    switch (phraseRandom) {
        case 0:
            return `Я всегда угадываю\n\u{1F60E}`;
            break;

        case 1:
            return `Победа за мной\n\u{1F60E}`;
            break;

        case 2:
            return `Я выиграл. Сыграем еще?\n\u{1F60E}`;
            break;

        case 3:
            return `Моя победа\n\u{1F60E}`;
            break;
    }
}

function numToText(num) {
    let units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    let teens = ['', '', 'десять', 'одинадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    let dozens = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    let hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];
    let text = '';
    let digits = [];
    let number = Math.abs(num);
    while (number) {
        digits.push(number % 10);
        number = Math.floor(number / 10);
    }
    console.log(digits);
    if (Math.abs(num) > 99) {
        text = hundreds[digits[2]];
    }
    if (Math.abs(num) % 100 > 19) {
        text = text + ' ' + dozens[digits[1]];
    }
    else if (Math.abs(num) % 100 <= 19 && Math.abs(num) % 100 > 9) {
        text = text + ' ' + teens[digits[1]];
    }
    if (Math.abs(num) % 10 < 10) {
        text = text + ' ' + units[digits[0]];
    }
    if (num < 0) text = 'минус ' + text;
    if (num == 0) text = 'ноль';
    if (text.length < 20) return text;
    else return num;
}