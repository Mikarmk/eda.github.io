document.addEventListener('DOMContentLoaded', () => {
    displaySavedResults();
  
    document.getElementById('clearResultsButton').addEventListener('click', () => {
      if (confirm('Вы уверены, что хотите очистить все сохраненные результаты?')) {
        localStorage.removeItem('savedResults');
        displaySavedResults();
      }
    });
  });
  
  function displaySavedResults() {
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';
  
    const savedResults = JSON.parse(localStorage.getItem('savedResults')) || [];
    if (savedResults.length === 0) {
      resultsList.innerHTML = '<p>Нет сохраненных результатов.</p>';
      return;
    }
    
    savedResults.forEach((result, index) => {
      const div = document.createElement('div');
      div.className = 'result-item';
      
      const date = new Date(result.date);
      // Формируем строку с баллами по витаминам
      const vitaminScores = Object.entries(result.vitaminScores)
        .map(([vitamin, score]) => `${getVitaminName(vitamin)}: ${score}`)
        .join(', ');
      
      div.innerHTML = `
        <h3>Результат теста ${index + 1}</h3>
        <p><strong>Дата:</strong> ${date.toLocaleString()}</p>
        <p><strong>Балл витаминов:</strong> ${vitaminScores}</p>
      `;
      
      resultsList.appendChild(div);
    });
  }
  
  function getVitaminName(vitamin) {
    const names = {
      vitaminD: 'Витамин D',
      B12: 'Витамин B12',
      iron: 'Железо',
      omega3: 'Омега-3',
      magnesium: 'Магний',
      vitaminC: 'Витамин C',
      vitaminK: 'Витамин K'
    };
    return names[vitamin] || vitamin;
  }
  