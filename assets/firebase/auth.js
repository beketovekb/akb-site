// Получение ссылок на элементы формы
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login");
const logoutButton = document.getElementById("logout");

if (window.location.href.indexOf("login.html") === -1) {
  // Обработчик нажатия на кнопку "Logout"
  logoutButton.addEventListener("click", e => {
    e.preventDefault();
    firebase.auth().signOut().then(() => {
      // Выход из системы успешно выполнен
      console.log("User is logged out");
      window.location.href = "login.html"; // перенаправление на страницу авторизации
    }).catch(error => {
      // Произошла ошибка при выходе из системы
      //console.log(error.message);
      alert(error.message);
      //swal("Внимание", error.message);
    });
  });
}

if (window.location.href.indexOf("index.html") === -1) {
  // ваш код с методом addEventListener
  loginButton.addEventListener("click", e => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    const auth = firebase.auth();

    // Авторизация пользователя
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => alert(e.message));
    
    // window.location.replace("../../index.html");
  });
}



// Обработчик изменения состояния авторизации
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // Пользователь авторизован

    if (window.location.href.indexOf("index.html") === -1) {
      console.log("User is logged in");
      window.location.href = "../../index.html";
    } // перенаправление на страницу после авторизации
  } else {
    // Пользователь не авторизован

    if (window.location.href.indexOf("login.html") === -1) {
      console.log("User is logged out");
      window.location.href = "login.html";
    }
  }
});