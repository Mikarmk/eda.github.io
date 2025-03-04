document.addEventListener('DOMContentLoaded', () => {
    const results = JSON.parse(localStorage.getItem('quizResults'));
    if (!results) {
      window.location.href = 'quiz.html';
      return;
    }
    
    displayResults(results);
  });
  
  function displayResults(results) {
    const vitaminResults = document.getElementById('vitaminResults');
    const recommendationsList = document.getElementById('recommendationsList');
    
    // Сортируем витамины по убыванию баллов
    const sortedVitamins = Object.entries(results.vitaminScores)
      .sort(([,a], [,b]) => b - a);
    
    sortedVitamins.forEach(([vitamin, score]) => {
      const vitaminElement = createVitaminElement(vitamin, score);
      vitaminResults.appendChild(vitaminElement);
      
      const recommendation = createRecommendation(vitamin, score);
      recommendationsList.appendChild(recommendation);
    });
  }
  
  function createVitaminElement(vitamin, score) {
    const div = document.createElement('div');
    div.className = 'vitamin-item';
    
    // Максимальный балл выбран равным 25 для визуализации (можно скорректировать)
    const maxScore = 25;
    const percentage = Math.min((score / maxScore) * 100, 100);
    
    div.innerHTML = `
      <h3>${getVitaminName(vitamin)}</h3>
      <div class="vitamin-score">
        <span>0</span>
        <div class="score-bar">
          <div class="score-fill" style="width: ${percentage}%"></div>
        </div>
        <span>${score}</span>
      </div>
    `;
    
    return div;
  }
  
  function createRecommendation(vitamin, score) {
    const div = document.createElement('div');
    div.className = 'recommendation-item';
    
    div.innerHTML = `
      <h3>${getVitaminName(vitamin)}</h3>
      <p>${getRecommendation(vitamin, score)}</p>
    `;
    
    return div;
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
  
  function getRecommendation(vitamin, score) {
    // Пример рекомендаций с пороговыми значениями
    if (score < 5) {
      return 'Уровень в норме. Дополнительный прием не требуется.';
    } else if (score < 10) {
      const recs = {
        vitaminD: 'Добавьте в рацион жирную рыбу, яйца и больше времени проводите на солнце.',
        B12: 'Употребляйте мясо, рыбу, молочные продукты или обогащенные продукты.',
        iron: 'Включите в рацион красное мясо, бобовые и зелень.',
        omega3: 'Регулярно употребляйте рыбу, орехи и семена.',
        magnesium: 'Включите в рацион орехи, зелень и цельнозерновые продукты.',
        vitaminC: 'Больше цитрусовых, ягод и свежих овощей.',
        vitaminK: 'Употребляйте листовую зелень и брокколи.'
      };
      return recs[vitamin] || 'Рекомендуется улучшить питание.';
    } else {
      return 'Существенный дефицит. Обратитесь к специалисту для подробной диагностики и консультации.';
    }
  }
  
  function saveToProfile() {
    const results = JSON.parse(localStorage.getItem('quizResults'));
    let savedResults = JSON.parse(localStorage.getItem('savedResults')) || [];
    savedResults.push(results);
    localStorage.setItem('savedResults', JSON.stringify(savedResults));
    
    alert('Результаты сохранены в профиле!');
    window.location.href = 'profile.html';
  }
  