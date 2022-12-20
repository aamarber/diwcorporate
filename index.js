(() => {

    const loginForm = document.getElementById('loginForm');

    const onLogin = (event) => {
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;

        fetch('http://localhost:9989/login', {
            headers: { 
                "Content-Type": "application/json; charset=utf-8"
            },
            method: 'POST',
            body: JSON.stringify({
                email: login,
                password: password
            })
        })
            .then(response=>response.json())
            .then((response) => {
                console.log(response);

                sessionStorage.setItem("authtoken", response);

                window.location = '/dashboard';
            })
            .catch((error) => {
                console.error(error);
            });

        event.preventDefault();
    }

    loginForm.addEventListener('submit', onLogin);
})()