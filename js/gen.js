import { PackageStorage } from "./fbase.js";
window.addEventListener("DOMContentLoaded", () => {
	let form = document.querySelector("form.banner-down");
	let Locatebtn = document.querySelector(".banner-down button#track-btn");
	let trackingDiv = document.querySelector("div#tracking-Div");
	let inputField = document.querySelector(".banner-down input#track");

	function generateTrackingInfo(packageData) {
		return `
    <div class="main fadeIn">
					<div class="upper">
					<span
						><h6>NAME:</h6>
						${packageData.name}</span
					>
						<span>
							<h6>PACKAGE:</h6>
							${packageData.pack}
						</span>

						<span
							><h6>ARRIVAL:</h6>
							${packageData.arriveIn}</span
						>
					</div>

					<div class="lower">
						<!--for from-->
						<div class="from trail">
							<div class="svg">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0054CA" class="from" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484q-.121.12-.242.234c-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z"/>
</svg>
							</div>
							<div class="text">
								<div class="text-upper">FROM</div>
								<p class="text-lower">${packageData.from}</p>
							</div>
						</div>


							<!--for current-->
						<div class="current trail">
							<div class="svg">
							<svg version="1.1" id="current" xmlns="http://www.w3.org/2000/svg"
	 width="400px" height="400px" viewBox="0 0 32 32" xml:space="preserve">
<style type="text/css">
	.linesandangles_een{fill:#0054ca;}
</style>
<path class="linesandangles_een" d="M16,8c-2.757,0-5,2.243-5,5s2.243,5,5,5s5-2.243,5-5S18.757,8,16,8z M16,16
	c-1.654,0-3-1.346-3-3s1.346-3,3-3s3,1.346,3,3S17.654,16,16,16z M16,6c3.86,0,7,3.14,7,7c0,5.271-4.719,10.256-7.009,12.365
	C13.299,22.889,9,17.901,9,13C9,9.14,12.14,6,16,6 M16,4c-4.971,0-9,4.029-9,9c0,8,9,15,9,15s9-6.984,9-15C25,8.029,20.971,4,16,4
	L16,4z"/>
</svg>
							</div>
							<div class="text">
								<div class="text-upper">CURRENTLY IN</div>
								<p class="text-lower">${packageData.current}</p>
							</div>
						</div>


						<!--for destination-->
						<div class="destination trail">
							<div class="svg">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="10"
									height="10"
									fill="currentColor"
									class="bi bi-patch-check"
									viewBox="0 0 16 16">
									<path
										fill-rule="evenodd"
										d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
									<path
										d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" />
								</svg>
							</div>
							<div class="text">
								<div class="text-upper">DESTINATION</div>
								<p class="text-lower">${packageData.to}</p>
							</div>
						</div>
					</div>
				</div>`;
	}

	function generateMoving(packageData) {
		return `
				<div class="main fadeIn">
					<div class="upper">
						<span
							><h6>NAME:</h6>
							${packageData.name}</span
						>
						<span>
							<h6>PACKAGE:</h6>
${packageData.pack}						</span>

						<span
							><h6>PAID:</h6>
							${packageData.paid == "yes" ? "Yes" : "No"}</span
						>
					</div>

					<div class="lower">
						<!--for from-->
						<div class="country trail">
							<div class="svg">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-building"
									viewBox="0 0 16 16">
									<path
										d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
									<path
										d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z" />
								</svg>
							</div>
							<div class="text">
								<div class="text-upper">COMPANY</div>
								${packageData.company ? `<p class="text-lower">${packageData.company}</p>` : ""}
							</div>
						</div>

						<!--for timing-->
						<div class="duration trail">
							<div class="svg">
								<?xml version="1.0" encoding="utf-8"?>
								<svg
									fill="#000000"
									width="800px"
									height="800px"
									class="driver"
									viewBox="0 0 32 32"
									sc
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M 0 6 L 0 8 L 19 8 L 19 23 L 12.84375 23 C 12.398438 21.28125 10.851563 20 9 20 C 7.148438 20 5.601563 21.28125 5.15625 23 L 4 23 L 4 18 L 2 18 L 2 25 L 5.15625 25 C 5.601563 26.71875 7.148438 28 9 28 C 10.851563 28 12.398438 26.71875 12.84375 25 L 21.15625 25 C 21.601563 26.71875 23.148438 28 25 28 C 26.851563 28 28.398438 26.71875 28.84375 25 L 32 25 L 32 16.84375 L 31.9375 16.6875 L 29.9375 10.6875 L 29.71875 10 L 21 10 L 21 6 Z M 1 10 L 1 12 L 10 12 L 10 10 Z M 21 12 L 28.28125 12 L 30 17.125 L 30 23 L 28.84375 23 C 28.398438 21.28125 26.851563 20 25 20 C 23.148438 20 21.601563 21.28125 21.15625 23 L 21 23 Z M 2 14 L 2 16 L 8 16 L 8 14 Z M 9 22 C 10.117188 22 11 22.882813 11 24 C 11 25.117188 10.117188 26 9 26 C 7.882813 26 7 25.117188 7 24 C 7 22.882813 7.882813 22 9 22 Z M 25 22 C 26.117188 22 27 22.882813 27 24 C 27 25.117188 26.117188 26 25 26 C 23.882813 26 23 25.117188 23 24 C 23 22.882813 23.882813 22 25 22 Z" />
								</svg>
							</div>
							<div class="text">
								<div class="text-upper">ARRIVES IN</div>
								<p class="text-lower">${
									packageData.durationTimer
										? packageData.durationTimer
										: "Not Started!"
								}</p>
							</div>
						</div>

						<!--for destination-->
						<div class="address trail">
							<div class="svg">
								<svg
									version="1.1"
									id="location"
									xmlns="http://www.w3.org/2000/svg"
									width="400px"
									height="400px"
									viewBox="0 0 32 32"
									xml:space="preserve">
									<style type="text/css">
										.linesandangles_een {
											fill: #0054ca;
										}
									</style>
									<path
										class="linesandangles_een"
										d="M16,8c-2.757,0-5,2.243-5,5s2.243,5,5,5s5-2.243,5-5S18.757,8,16,8z M16,16
	c-1.654,0-3-1.346-3-3s1.346-3,3-3s3,1.346,3,3S17.654,16,16,16z M16,6c3.86,0,7,3.14,7,7c0,5.271-4.719,10.256-7.009,12.365
	C13.299,22.889,9,17.901,9,13C9,9.14,12.14,6,16,6 M16,4c-4.971,0-9,4.029-9,9c0,8,9,15,9,15s9-6.984,9-15C25,8.029,20.971,4,16,4
	L16,4z" />
								</svg>
							</div>
							<div class="text">
								<div class="text-upper">HOME ADDRESS</div>
								<p class="text-lower">${packageData.address}</p>
							</div>
						</div>
					</div>
				</div>`;
	}

	function arrival(packageData) {
		return `<div class="main fadeIn">
					<div class="upper">
						<span
							><h6>NAME:</h6>
							${packageData.name}</span
						>
						<span>
							<h6>PACKAGE:</h6>
${packageData.pack}						</span>

					</div>

					<div class="lower arrive">
						<div class="svg">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="globe"
								viewBox="0 0 16 16">
								<path
									d="m10.495 6.92 1.278-.619a.483.483 0 0 0 .126-.782c-.252-.244-.682-.139-.932.107-.23.226-.513.373-.816.53l-.102.054c-.338.178-.264.626.1.736a.48.48 0 0 0 .346-.027ZM7.741 9.808V9.78a.413.413 0 1 1 .783.183l-.22.443a.6.6 0 0 1-.12.167l-.193.185a.36.36 0 1 1-.5-.516l.112-.108a.45.45 0 0 0 .138-.326M5.672 12.5l.482.233A.386.386 0 1 0 6.32 12h-.416a.7.7 0 0 1-.419-.139l-.277-.206a.302.302 0 1 0-.298.52z" />
								<path
									d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M1.612 10.867l.756-1.288a1 1 0 0 1 1.545-.225l1.074 1.005a.986.986 0 0 0 1.36-.011l.038-.037a.88.88 0 0 0 .26-.755c-.075-.548.37-1.033.92-1.099.728-.086 1.587-.324 1.728-.957.086-.386-.114-.83-.361-1.2-.207-.312 0-.8.374-.8.123 0 .24-.055.318-.15l.393-.474c.196-.237.491-.368.797-.403.554-.064 1.407-.277 1.583-.973.098-.391-.192-.634-.484-.88-.254-.212-.51-.426-.515-.741a7 7 0 0 1 3.425 7.692 1 1 0 0 0-.087-.063l-.316-.204a1 1 0 0 0-.977-.06l-.169.082a1 1 0 0 1-.741.051l-1.021-.329A1 1 0 0 0 11.205 9h-.165a1 1 0 0 0-.945.674l-.172.499a1 1 0 0 1-.404.514l-.802.518a1 1 0 0 0-.458.84v.455a1 1 0 0 0 1 1h.257a1 1 0 0 1 .542.16l.762.49a1 1 0 0 0 .283.126 7 7 0 0 1-9.49-3.409Z" />
							</svg>
						</div>
						<div class="message fadeIn">
							Your Package has arrived to your Country !
						</div>

						<a
							href="../html/payment.html"
							target="_parent"
							class="payment-button">
							<div class="svg">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="#0054ca"
									class="wallet"
									viewBox="0 0 16 16">
									<path
										d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1" />
								</svg>
							</div>
							<p>PROCEED TO PAYMENT</p>
						</a>
					</div>
				</div>`;
	}

	///
	///
	///
	//
	// click function for locate
	Locatebtn.addEventListener("click", (e) => {
		e.preventDefault();
		if (window.navigator.onLine) {
			let input = inputField.value.trim();

			trackingDiv.style.display = "inline";

			if (input) {
				trackingDiv.innerHTML = "<p>Searching...</p>";

				let obj = new PackageStorage();

				setTimeout(async () => {
					try {
						let foundPackage = await obj.loadPackage(input);

						//checking the package
						if (
							foundPackage &&
							(foundPackage.arrive == "no" || !foundPackage.arrive)
						) {
							trackingDiv.innerHTML = generateTrackingInfo(foundPackage);

							obj.updateVisitor(input);
						} else if (
							foundPackage &&
							foundPackage.arrive == "yes" &&
							(foundPackage.success == "no" || !foundPackage.success)
						) {
							trackingDiv.innerHTML = arrival(foundPackage);
							obj.updateVisitor(input);
						} else if (
							foundPackage &&
							foundPackage.arrive == "yes" &&
							foundPackage.success
						) {
							trackingDiv.innerHTML = generateMoving(foundPackage);

							obj.updateVisitor(input);
						} else if (!foundPackage) {
							trackingDiv.innerHTML =
								"<p>Invalid Tracking ID, Package Not Found</p>";
						}
					} catch (error) {
						console.error("Error fetching packages:", error);
					}
				}, 2000);
			} else {
				trackingDiv.innerHTML = "<p>Please enter a Tracking ID</p>";
			}
		} else {
			alert("No Internet!");
		}
	});
});
