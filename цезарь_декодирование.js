// Создание объекта с канонической статистической частотой букв алфавита
const canonicalFrequency = {
  'a': 8.167, 'b': 1.492, 'c': 2.782, 'd': 4.253, 'e': 12.702,
  'f': 2.228, 'g': 2.015, 'h': 6.094, 'i': 6.966, 'j': 0.153,
  'k': 0.772, 'l': 4.025, 'm': 2.406, 'n': 6.749, 'o': 7.507,
  'p': 1.929, 'q': 0.095, 'r': 5.987, 's': 6.327, 't': 9.056,
  'u': 2.758, 'v': 0.978, 'w': 2.360, 'x': 0.150, 'y': 1.974, 'z': 0.074
};

// Текст для подсчета частоты букв (берем такой, где частота примерно схожа с канонической)
let strText = prompt("Введите закодированный текст.");

// Функция для подсчета частоты встречания букв в тексте и сортировки по алфавиту
function calculateAndSortLetterFrequency(text) {
  let frequencyCount = {};

  // Приведение текста к нижнему регистру и удаление символов, не являющихся буквами
  let cleanedText = text.toLowerCase().replace(/[^a-z]/g, '');

  // Подсчет частоты букв
  for (let char of cleanedText) {
    frequencyCount[char] = (frequencyCount[char] || 0) + 1;
  }
  for (let letter in frequencyCount) {
    frequencyCount[letter] = (frequencyCount[letter] / cleanedText.length) * 100;
    }
  // Сортировка объекта частоты по ключам (буквам алфавита)
  const sortedFrequencyCount = {};
  Object.keys(frequencyCount).sort().forEach(key => {
    sortedFrequencyCount[key] = frequencyCount[key];
  });

  return sortedFrequencyCount;
}

// Подсчет частоты букв в примере и сортировка по алфавиту
let textFrequency = calculateAndSortLetterFrequency(strText);

/* Вывод результатов
console.log("Каноническая статистическая частота букв в алфавите:", canonicalFrequency);
console.log("Фактическая частота букв в тексте (отсортирована по алфавиту):", textFrequency);*/
//подсчет сдвига
let findMove = new Object();//создаём новый объект 
for(let m = 0; m < 26; m++){// поочередно проверяем сумму для каждого возможного значения сдвига
  summFind = 0;
  for (let i = 0; i < 26; i++) {//для каждой буквы алфавита высчитываем разницу частоты 
    let a = String.fromCharCode(97 + i); 
    let b = String.fromCharCode(97 + (i + m) % 26);
    summFind += (canonicalFrequency[a] - textFrequency[b]) ** 2;//высчитываем сумму по формуле 
  }
  findMove[summFind] = m;//получаем ключ - суммарня разница частоты, значение - сдвиг 
}
//console.log(findMove)

let minSumm = Math.min(...Object.keys(findMove));// находим минимальное значение суммы в объекте findMove
let move = findMove[minSumm];// получаем сдвиг с минимальным значением суммы
//console.log("Сдвиг:", move);// выводим сдвиг в консоль
let newStrT = ""; // Создаем новую строку (будет декодированной)
let lowercaseAlphabet = {}; // Создаем объект для строчных букв
for (let i = 0; i < 26; i++) {
  let letter = String.fromCharCode(97 + i); // Берем букву при помощи ASCII
  lowercaseAlphabet[letter] = i; // Получаем ключ - строчная буква, значение - номер в алфавите с 0
}

let uppercaseAlphabet = {}; // То же самое для заглавных букв
for (let i = 0; i < 26; i++) {
  let letter = String.fromCharCode(65 + i);
  uppercaseAlphabet[letter] = i;
}
for (let i = 0; i < strText.length; i++) { // Запускаем цикл, идущий по тексту
  let char = strText[i];
  if (char >= 'A' && char <= 'Z') {
    // Обработка заглавных букв
    let charIndex = uppercaseAlphabet[char];
    let newIndex = charIndex - move; // Корректировка номера буквы в алфавите
    if (newIndex < 0) newIndex = 26 + newIndex;
    let newChar = String.fromCharCode(newIndex + 65); // Кодируем
    newStrT += newChar;
  } else if (char >= 'a' && char <= 'z') {
    // Обработка строчных букв
    let charIndex = lowercaseAlphabet[char];
    let newIndex = charIndex - move; // Корректировка номера буквы в алфавите
    if (newIndex < 0) newIndex = 26 + newIndex;
    let newChar = String.fromCharCode(newIndex + 97); // Кодируем
    newStrT += newChar;
  } else {
    // Если символ не буква, добавляем его без изменений
    newStrT += char;
  }
}

console.log(newStrT); // Выводим результат