export const wordsList = [
  { english: 'Hello', spanish: 'Hola' },
  { english: 'Goodbye', spanish: 'Adiós' },
  { english: 'Thank you', spanish: 'Gracias' },
  { english: 'Please', spanish: 'Por favor' },
  { english: 'Friend', spanish: 'Amigo' },
  { english: 'Family', spanish: 'Familia' },
  { english: 'Love', spanish: 'Amor' },
  { english: 'Water', spanish: 'Agua' },
  { english: 'Food', spanish: 'Comida' },
  { english: 'Time', spanish: 'Tiempo' },
  { english: 'Day', spanish: 'Día' },
  { english: 'Night', spanish: 'Noche' },
  { english: 'House', spanish: 'Casa' },
  { english: 'Car', spanish: 'Coche' },
  { english: 'Book', spanish: 'Libro' },
] as const;

export function getRandomWords(count: number) {
  const shuffled = [...wordsList].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function generateOptions(correctWord: string, count: number = 4) {
  const options = new Set([correctWord]);
  const allSpanishWords = wordsList.map(w => w.spanish);
  
  while (options.size < count) {
    const randomWord = allSpanishWords[Math.floor(Math.random() * allSpanishWords.length)];
    options.add(randomWord);
  }
  
  return [...options].sort(() => Math.random() - 0.5);
}