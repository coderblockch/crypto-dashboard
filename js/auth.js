import { registerUser, loginUser, onAuthChange } from "./firebase.js";

const tabs = document.querySelectorAll(".auth-tab");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const loginError = document.getElementById("login-error");
const registerError = document.getElementById("register-error");

onAuthChange((user) => {
  if (user) window.location.href = "index.html";
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    const isLogin = tab.dataset.tab === "login";
    loginForm.classList.toggle("hidden", !isLogin);
    registerForm.classList.toggle("hidden", isLogin);
    loginError.classList.add("hidden");
    registerError.classList.add("hidden");
  });
});

function setLoading(form, loading) {
  const btn = form.querySelector(".auth-btn");
  const text = btn.querySelector(".btn-text");
  const spinner = btn.querySelector(".btn-spinner");
  btn.disabled = loading;
  text.classList.toggle("hidden", loading);
  spinner.classList.toggle("hidden", !loading);
}

function parseFirebaseError(code) {
  const errors = {
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/email-already-in-use": "This email is already registered.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/invalid-credential": "Invalid email or password.",
  };
  return errors[code] ?? "Something went wrong. Please try again.";
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loginError.classList.add("hidden");
  setLoading(loginForm, true);
  try {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    await loginUser(email, password);
  } catch (err) {
    loginError.textContent = parseFirebaseError(err.code);
    loginError.classList.remove("hidden");
    setLoading(loginForm, false);
  }
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  registerError.classList.add("hidden");
  setLoading(registerForm, true);
  try {
    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value;
    await registerUser(name, email, password);
  } catch (err) {
    registerError.textContent = parseFirebaseError(err.code);
    registerError.classList.remove("hidden");
    setLoading(registerForm, false);
  }
});
