class Auth {
    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.init();
    }

    init() {
        // Проверяем наличие сохраненной сессии
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.isAuthenticated = true;
        }

        // Настраиваем обработчики для модального окна
        const authButton = document.getElementById('authButton');
        const authModal = document.getElementById('authModal');
        const closeBtn = document.querySelector('.close');
        const authForm = document.getElementById('authForm');
        const registerLink = document.getElementById('registerLink');

        if (authButton) {
            authButton.onclick = () => {
                if (this.isAuthenticated) {
                    this.logout();
                } else {
                    authModal.style.display = 'block';
                }
            }
        }

        if (closeBtn) {
            closeBtn.onclick = () => {
                authModal.style.display = 'none';
            }
        }

        if (authForm) {
            authForm.onsubmit = (e) => {
                e.preventDefault();
                this.login(e.target.elements[0].value, e.target.elements[1].value);
            }
        }

        if (registerLink) {
            registerLink.onclick = (e) => {
                e.preventDefault();
                this.showRegistrationForm();
            }
        }

        // Закрытие модального окна при клике вне его
        window.onclick = (e) => {
            if (e.target === authModal) {
                authModal.style.display = 'none';
            }
        }

        this.updateUI();
    }

    login(email, password) {
        // В реальном приложении здесь была бы проверка на сервере
        this.currentUser = {
            email: email,
            name: email.split('@')[0]
        };
        this.isAuthenticated = true;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        
        const authModal = document.getElementById('authModal');
        if (authModal) {
            authModal.style.display = 'none';
        }
        
        this.updateUI();
    }

    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        localStorage.removeItem('currentUser');
        this.updateUI();
        
        // Перенаправляем на главную страницу
        if (window.location.pathname.includes('profile.html')) {
            window.location.href = 'index.html';
        }
    }

    updateUI() {
        const authButton = document.getElementById('authButton');
        if (authButton) {
            authButton.textContent = this.isAuthenticated ? 'Выйти' : 'Войти';
        }

        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = this.isAuthenticated ? 
                `Здравствуйте, ${this.currentUser.name}!` : '';
        }
    }

    showRegistrationForm() {
        const authForm = document.getElementById('authForm');
        if (!authForm) return;

        authForm.innerHTML = `
            <input type="text" placeholder="Имя" required>
            <input type="email" placeholder="Email" required>
            <input type="password" placeholder="Пароль" required>
            <input type="password" placeholder="Подтвердите пароль" required>
            <button type="submit">Зарегистрироваться</button>
            <p>Уже есть аккаунт? <a href="#" id="loginLink">Войти</a></p>
        `;

        const loginLink = document.getElementById('loginLink');
        if (loginLink) {
            loginLink.onclick = (e) => {
                e.preventDefault();
                this.showLoginForm();
            }
        }

        authForm.onsubmit = (e) => {
            e.preventDefault();
            const password = e.target.elements[2].value;
            const confirmPassword = e.target.elements[3].value;

            if (password !== confirmPassword) {
                alert('Пароли не совпадают');
                return;
            }

            this.register(
                e.target.elements[0].value,
                e.target.elements[1].value,
                password
            );
        }
    }

    showLoginForm() {
        const authForm = document.getElementById('authForm');
        if (!authForm) return;

        authForm.innerHTML = `
            <input type="email" placeholder="Email" required>
            <input type="password" placeholder="Пароль" required>
            <button type="submit">Войти</button>
            <p>Нет аккаунта? <a href="#" id="registerLink">Зарегистрироваться</a></p>
        `;

        const registerLink = document.getElementById('registerLink');
        if (registerLink) {
            registerLink.onclick = (e) => {
                e.preventDefault();
                this.showRegistrationForm();
            }
        }

        authForm.onsubmit = (e) => {
            e.preventDefault();
            this.login(e.target.elements[0].value, e.target.elements[1].value);
        }
    }

    register(name, email, password) {
        // В реальном приложении здесь была бы регистрация на сервере
        this.currentUser = {
            name: name,
            email: email
        };
        this.isAuthenticated = true;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        
        const authModal = document.getElementById('authModal');
        if (authModal) {
            authModal.style.display = 'none';
        }
        
        this.updateUI();
    }
}

// Инициализация аутентификации
const auth = new Auth(); 