let strText = prompt("Введите текст, который вы хотите закодировать");
let move = parseInt(prompt("Введите сдвиг"));

let newStrT = ""; // Создаем новую строку (будет закодированной)
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
    let newIndex = (charIndex + move) % 26; // Корректировка номера буквы в алфавите
    let newChar = String.fromCharCode(newIndex + 65); // Кодируем
    newStrT += newChar;
  } else if (char >= 'a' && char <= 'z') {
    // Обработка строчных букв
    let charIndex = lowercaseAlphabet[char];
    let newIndex = (charIndex + move) % 26; // Корректировка номера буквы в алфавите
    let newChar = String.fromCharCode(newIndex + 97); // Кодируем
    newStrT += newChar;
  } else {
    // Если символ не буква, добавляем его без изменений
    newStrT += char;
  }
}

console.log(newStrT); // Выводим результат