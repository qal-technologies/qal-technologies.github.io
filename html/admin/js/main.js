import { PackageStorage } from "../../../js/fbase.js";

window.addEventListener("load", () => {
	let status = localStorage.getItem("login");

	if (status === "true") {
		// alert("Welcome Admin!");
	} else {
		alert("You are not logged in!");
		window.location.href = "./login.html";
	}
});

//for dropdown
window.addEventListener("DOMContentLoaded", () => {
	let dropClick = document.querySelectorAll("div.drop .top").forEach((drop) => {
		drop.addEventListener("click", (e) => {
			if (drop.parentNode.style.height == "auto") {
				drop.parentNode.style.height = "60px";
			} else {
				drop.parentNode.style.height = "auto";
			}
		});
	});

	//FOR CREATING PACKAGES:
	let add = document
		.querySelector(".package button#add")
		.addEventListener("click", async (e) => {
			e.preventDefault();

			let form = document.querySelector("form.input-div");
			let inputs = form.querySelectorAll("input");
			let id = form.querySelector("input#id").value.trim();

			if (id) {
				let obj = new PackageStorage();
				let found = (await obj.loadPackage(id)) ? true : false;

				let data = {};

				inputs.forEach((input) => {
					data[input.id] = input.value.trim();
				});

				!found ? obj.addPackage(id, data) : alert("Package already exist!");

				inputs.forEach((input) => {
					input.value = "";
				});
			} else {
				alert("Package ID required!");
			}
		});

	//FOR RELOADING CONFIRMING PAYMENT:
	let reload = document
		.querySelector("span#reload")
		.addEventListener("click", async () => {
			let id = document.querySelector(".verify .details input#user-ID");
			let receipt = document.querySelector(".verify img.receipt");
			let name = document.querySelector(".verify .details p.name");
			let tel = document.querySelector(".verify .details p.uTel");
			let amount = document.querySelector(".verify .details p.uPrice");
			let method = document.querySelector(".verify .details p.uMethod");
			let paid = document.querySelector(".verify .details p.uPaid");
			let email = document.querySelector(".verify .details p.uEmail");
			///
			///
			let success = document.querySelector(".verify .details input.success");

			let userID = id.value;

			let obj = new PackageStorage();

			let mainPackage = await obj.loadPackage(userID);

			let matchedPackage = mainPackage;
			console.log(matchedPackage);

			try {
				if (matchedPackage) {
					receipt.src = matchedPackage.payment_URL || "/src/svg/image.svg";
					name.innerHTML = matchedPackage.sender_name || "Customer Name";
					tel.innerHTML = matchedPackage.sender_tel || "No Phone Number";
					email.innerHTML = matchedPackage.email || "Email@gmail.com";
					amount.innerHTML = matchedPackage.price;
					method.innerHTML = matchedPackage.method;
					paid.innerHTML = matchedPackage.paid;
				} else if (!matchedPackage) {
					alert("Package not Found!");
				}

				let confirmBtn = document.querySelector("button#confirm-payment");

				confirmBtn.addEventListener("click", (e) => {
					e.preventDefault();

					setTimeout(() => {
						if (success.value.trim() !== "") {
							confirmBtn.innerHTML = "Loading...";
							success.value.trim().toLowerCase() == "yes"
								? [obj.updatePackage(userID, "success", true)]
								: [obj.updatePackage(userID, "success", false)];

							[name, tel, amount, method, paid].forEach((inp) => {
								inp.innerHTML = "-- --";
							});
							success.value = "";

							//alert for confirmation
							alert("Confirmed!");
							confirmBtn.textContent = "CONFIRM";
						} else if (success.value.trim() == "") {
							alert("Success input can't be empty!");
						}
					}, 2000);
				});
			} catch (error) {
				console.error(error);
			}
		});

	///GETTING THE BUTTON REFRENCE:
	let editBtn = document.querySelector(".view button#edit-package");
	let deleteBtn = document.querySelector(".view button#delete-package");

	//for fetching the data for editing and viewing:
	let fetched = false;
	let fetch = document
		.querySelector(".view span#fetch")
		.addEventListener("click", async (e) => {
			let value = e.target.parentElement.querySelector("input");

			let id = value.value.trim();

			let obj = new PackageStorage();
			let matchedPackage = await obj.loadPackage(id);

			let name = document.querySelector(".view div.name p.name");
			let email = document.querySelector(".view div.email p.email");
			let current = document.querySelector(".view input.current");
			let arrived = document.querySelector(".view input.arrive");
			let arriveIn = document.querySelector(".view input.arriveIn");
			let duration = document.querySelector(".view input.duration");
			let amount = document.querySelector(".view input.price");

			if (matchedPackage) {
				name.innerHTML = matchedPackage.name;
				current.value = matchedPackage.current ? matchedPackage.current : "";
				arriveIn.value = matchedPackage.arriveIn ? matchedPackage.arriveIn : "";
				arrived.value = matchedPackage.arrived ? matchedPackage.arrived : "";
				duration.value = matchedPackage.duration ? matchedPackage.duration : "";
				amount.value = matchedPackage.price ? matchedPackage.price : "";
				email.innerHTML = matchedPackage.email ? matchedPackage.email : "";

				fetched = true;
			} else {
				alert(`The Package with the ID: ${id}, is not found on the database!`);
				window.location.reload();
			}
		});

	editBtn.addEventListener("click", async (e) => {
		let obj = new PackageStorage();
		let parent = e.target.parentElement.parentElement;

		if (fetched) {
			let inputs = parent.querySelectorAll("input");

			let data = {};
			let id = parent.querySelector("input.id").value.trim();
			let name = parent.querySelector("p.name");
			let email = parent.querySelector("p.email");

			inputs.forEach((input) => {
				if (input.value !== "") {
					data[input.className] = input.value.trim();
				}
				input.value = "";
				name.textContent = "-- --";
				email.textContent = "-- --";
			});

			console.log(data.arrive);
			//
			try {
				await obj.updateKeyValue(id, data);
				alert("Edited!");
			} catch (error) {
				console.log(error);
			}
		} else {
			alert(`No Data fetched!`);
		}
	});

	deleteBtn.addEventListener("click", (e) => {
		let parent = e.target.parentElement.parentElement;
		let id = parent.querySelector("input.id").value.trim();

		if (fetched) {
			let obj = new PackageStorage();
			obj.removePackage(id);

			let name = parent.querySelector("p.name");
			let inputs = parent.querySelectorAll("input");
			inputs.forEach((input) => {
				input.value = "";
				name.textContent = "-- --";
			});
		}
	});
});

////
////

////
////

////
////

////
////

(async function displayNotiftication() {
	const searchResults = document.getElementById("visitors-div");
	const paymentNotifDiv = document.getElementById("notification-div");

	let obj = new PackageStorage();
	let data;
	let data2;
	searchResults.innerHTML = "";

	try {
		const permission = await Notification.requestPermission();
		if (permission !== "granted") {
			console.warn("Notifications permission not granted.");
			return;
		}

		data = await obj.loadVisitors();
		data2 = await obj.loadPaymentNotif();
	} catch (error) {
		console.error("Error fetching data:", error);
		return;
	}

	for (const visitorId in data) {
		const searchedId = data[visitorId];

		const searchResultElement = document.createElement("div");
		searchResultElement.classList.add("search-result");

		try {
			const packageData = await obj.loadPackage(searchedId);

			if (packageData) {
				let timestamp = Date.now();
				const packagePack = packageData
					? packageData.pack
					: "Package details not found";

				let notification = new Notification("Visitor Alert", {
					body: `The user, ${packageData.name} [ID: ${searchedId}] searched for their package (${packagePack}).`,
					icon: "/src/svg/favicon.svg",
					tag: `Visitor-${timestamp}`,
					vibrate: [200, 100, 200, 100, 200],
				});

				searchResultElement.innerHTML += `
                <p>The user, ${packageData.name} [ID: ${searchedId}] searched for their package (${packagePack}).</p>
				`;
			}
		} catch (error) {
			console.error(
				`Error fetching package details for ID ${searchedId}:`,
				error
			);
			searchResultElement.innerHTML = `
                <p>Error fetching details for package ID: ${searchedId}</p>
				`;
		}
		searchResults.appendChild(searchResultElement);
	}

	for (const payer in data2) {
		const payerId = data2[payer][0];
		const payerMethod = data2[payer][1];

		const paymentResultElement = document.createElement("div");
		paymentResultElement.classList.add("payer-result");

		try {
			const packageData = await obj.loadPackage(payerId);

			if (packageData) {
				let timestamp = Date.now();
				let notification = packageData.paid
					? [
							new Notification("Payment Alert", {
								body: `The user, ${packageData.name} [ID: ${payerId}] made a payment with (${payerMethod}). Please check!!`,
								icon: "/src/svg/favicon.svg",
								tag: `Payment-${timestamp}`,
								vibrate: [200, 100, 200, 100, 200],
							}),

							(paymentResultElement.innerHTML += `
		        <p>The user, ${packageData.name} [ID: ${payerId}] made a payment with (${payerMethod}). Please check!!</p>
				`),
					  ]
					: [
							new Notification("Payment Alert", {
								body: `The user, ${packageData.name} [ID: ${payerId}] wants to pay with (${payerMethod}).`,
								icon: "/src/svg/favicon.svg",
								tag: `Payment-${timestamp}`,
								vibrate: [200, 100, 200, 100, 200],
							}),

							(paymentResultElement.innerHTML += `
		        <p>The user, ${packageData.name} [ID: ${payerId}]  wants to pay with (${payerMethod}).</p>
				`),
					  ];
			}
		} catch (error) {
			console.error(`Error fetching package details for ID ${payerId}:`, error);
			searchResultElement.innerHTML = `
		        <p>Error fetching details for package ID: ${payerId}</p>
				`;
		}
		paymentNotifDiv.appendChild(paymentResultElement);
	}
})();
// }, 2000);

let updateBtn = document
	.querySelectorAll("div.div button.update")
	.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			let parent = e.target.parentElement;
			let inputData = parent.querySelector("input");
			let trimed = inputData.value.trim();
			let method = inputData.id;

			try {
				let obj = new PackageStorage();
				obj.updatePayment(method, trimed);
				console.log("done");
			} catch (error) {
				console.error("The Error is: ", error);
			}

			inputData.value = "";
		});
	});

let logout = document
	.querySelector("button#logout")
	.addEventListener("click", () => {
		let status = localStorage.getItem("login");
		if (status !== "false") {
			localStorage.setItem("login", false);
			alert("Logged Out!");
			window.location.reload();
		}
	});
