const questions = [
    {
      question: "Как вы оцениваете свой рацион?",
      type: "radio",
      options: [
        { text: "Сбалансированный", vitamins: {} },
        { text: "Вегетарианский / Веганский", vitamins: { B12: 5, iron: 3, omega3: 3 } },
        { text: "Преимущественно переработанная пища", vitamins: { vitaminC: 3, magnesium: 3 } }
      ]
    },
    {
      question: "Есть ли у вас хронические заболевания?",
      type: "checkbox",
      options: [
        { text: "Диабет", vitamins: { magnesium: 5, vitaminD: 5 } },
        { text: "Сердечно-сосудистые заболевания", vitamins: { omega3: 5, vitaminK: 4 } },
        { text: "Нет заболеваний", vitamins: {} }
      ]
    },
    {
      question: "Как часто вы занимаетесь спортом?",
      type: "radio",
      options: [
        { text: "Регулярно", vitamins: { vitaminC: 2, vitaminD: 2 } },
        { text: "Иногда", vitamins: { vitaminC: 3 } },
        { text: "Никогда", vitamins: { vitaminD: 3 } }
      ]
    },
    {
      question: "Как часто вы бываете на солнце?",
      type: "radio",
      options: [
        { text: "Часто", vitamins: {} },
        { text: "Иногда", vitamins: { vitaminD: 3 } },
        { text: "Редко", vitamins: { vitaminD: 5 } }
      ]
    },
    {
      question: "Как вы оцениваете уровень стресса?",
      type: "radio",
      options: [
        { text: "Низкий", vitamins: {} },
        { text: "Средний", vitamins: { magnesium: 3 } },
        { text: "Высокий", vitamins: { magnesium: 5, B12: 2 } }
      ]
    }
  ];
  
  let currentQuestionIndex = 0;
  let answers = [];
  let vitaminScores = {};
  
  function initQuiz() {
    showQuestion();
    updateProgress();
    setupNavigationButtons();
  }
  
  function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('questionText').textContent = question.question;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
      const optionElement = createOptionElement(option, index, question.type);
      optionsContainer.appendChild(optionElement);
    });
  }
  
  function createOptionElement(option, index, type) {
    const div = document.createElement('div');
    div.className = 'option-item';
    
    const input = document.createElement('input');
    input.type = type;
    input.id = `option${index}`;
    input.name = 'quizOption';
    input.value = index;
    
    const label = document.createElement('label');
    label.htmlFor = `option${index}`;
    label.textContent = option.text;
    
    div.appendChild(input);
    div.appendChild(label);
    
    // Добавляем выбор элемента при клике
    div.addEventListener('click', () => {
      if (type === 'radio') {
        document.querySelectorAll('.option-item').forEach(el => el.classList.remove('selected'));
        input.checked = true;
        div.classList.add('selected');
      } else {
        input.checked = !input.checked;
        div.classList.toggle('selected');
      }
    });
    
    return div;
  }
  
  function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
  }
  
  function setupNavigationButtons() {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    
    prevButton.style.display = currentQuestionIndex === 0 ? 'none' : 'block';
    nextButton.textContent = currentQuestionIndex === questions.length - 1 ? 'Завершить' : 'Далее';
    
    prevButton.onclick = previousQuestion;
    nextButton.onclick = nextQuestion;
  }
  
  function previousQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion();
      updateProgress();
      setupNavigationButtons();
    }
  }
  
  function nextQuestion() {
    const selectedOptions = getSelectedOptions();
    if (!selectedOptions.length) {
      alert('Пожалуйста, выберите ответ');
      return;
    }
    
    saveAnswer(selectedOptions);
    
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      showQuestion();
      updateProgress();
      setupNavigationButtons();
    } else {
      finishQuiz();
    }
  }
  
  function getSelectedOptions() {
    const options = document.querySelectorAll('input[name="quizOption"]:checked');
    return Array.from(options).map(option => parseInt(option.value));
  }
  
  function saveAnswer(selectedOptions) {
    answers[currentQuestionIndex] = selectedOptions;
    updateVitaminScores(selectedOptions);
  }
  
  function updateVitaminScores(selectedOptions) {
    const question = questions[currentQuestionIndex];
    selectedOptions.forEach(optionIndex => {
      const option = question.options[optionIndex];
      Object.entries(option.vitamins).forEach(([vitamin, score]) => {
        vitaminScores[vitamin] = (vitaminScores[vitamin] || 0) + score;
      });
    });
  }
  
  function finishQuiz() {
    const results = {
      answers: answers,
      vitaminScores: vitaminScores,
      date: new Date()
    };
    
    localStorage.setItem('quizResults', JSON.stringify(results));
    window.location.href = 'results.html';
  }
  
  initQuiz();
  