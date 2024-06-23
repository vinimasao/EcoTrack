document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const userList = document.getElementById('userList');
    const clearFormButton = document.getElementById('clearForm');
    const clearAllButton = document.getElementById('clearAll');
    const searchInput = document.getElementById('search');

    function saveUser(email, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const date = new Date().toLocaleString();
        users.push({ email, password, date });
        localStorage.setItem('users', JSON.stringify(users));
    }

    function renderUsers(filter = '') {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        userList.innerHTML = '';

        users
            .filter(user => 
                user.email.toLowerCase().includes(filter.toLowerCase()) ||
                user.password.toLowerCase().includes(filter.toLowerCase())
            )
            .forEach((user, index) => {
                const li = document.createElement('li');
                li.textContent = `Data: ${user.date}, Email: ${user.email}, Senha: ${user.password}`;
                
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Deletar';
                deleteButton.onclick = () => {
                    deleteUser(index);
                };
                li.appendChild(deleteButton);
                
                userList.appendChild(li);
            });
    }

    function deleteUser(index) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        renderUsers();
    }

    function clearAllUsers() {
        localStorage.removeItem('users');
        renderUsers();
    }

    renderUsers();

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        saveUser(email, password);

        renderUsers();

        registerForm.reset();
    });

    clearFormButton.addEventListener('click', function() {
        registerForm.reset();
    });

    clearAllButton.addEventListener('click', function() {
        if (confirm('Tem certeza que deseja deletar todos?')) {
            clearAllUsers();
        }
    });

    searchInput.addEventListener('input', function() {
        renderUsers(searchInput.value);
    });
});
