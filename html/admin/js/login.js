import { PackageStorage } from "../../../js/fbase.js";

if (window.navigator.onLine) {
	let object = new PackageStorage();
	let userObj = await object.loadUser();

	let username = userObj.email;
	let password = userObj.password;

	let form = document.querySelector("form#admin-login");
	form.addEventListener("submit", (e) => {
		e.preventDefault();

		let userName = document.querySelector("input#AdminName").value.trim();
		let passWord = document.querySelector("input#password").value.trim();

		//warnings divs:
		let passWarning = document.querySelector(".password-div p.pass-warning");
		let nameWarning = document.querySelector(".username-div p.name-warning");

		let inputs = document
			.querySelectorAll("#admin-login input")
			.forEach((input) =>
				input.addEventListener("click", () => {
					passWarning.textContent = "";
					nameWarning.textContent = "";
				})
			);

		if (userName === username && passWord === password) {
			localStorage.setItem("login", true);

			alert("Login Successful!");
			window.location.href = "main.html";

			return true;
		} else if (userName !== username && passWord !== password) {
			alert("Both username & password are incorrect!");
		} else if (userName === username && passWord !== password) {
			passWarning.textContent = "Incorrect password";
		} else if (passWord === passWord && userName !== username) {
			nameWarning.textContent = "Incorrect Username";
		}

		return false;
	});
} else {
	alert("No Internet Connection!");
}
