import { PackageStorage } from "./fbase.js";

// left:
let select = document.querySelector("select#payment-method");
let description = document.querySelector(
	"div.payment-div .message p.message-text"
);
let selectBtn = document.querySelector("div.payment-div button#select");

//right:
let payDetails = document.querySelector("div.payment-div #account-details");
let payAmount = document.querySelector("div.payment-div #payment-amount");
let label = document.querySelector("p#label");

//OTHERS:
let doneBtn = document.querySelector("button#payment-btn");
let overlay = document.querySelector(".payment-div .right .overlay");

let Add_input = document.querySelector(".upload-pics input#proof-input");
let UPLOAD = document.querySelector(".upload-pics button#upload ");

let obj = new PackageStorage();

//
///
////
/////
// FOR THE COUNTER AFTER UPLOAD:

async function counter(id, countdown = 120) {
	overlay.innerHTML = `<div class="upper">
			<div class="counter">
			<p id="minute">0</p>
			:
			<p id="seconds">00</p>
			</div>
			</div>
			<div class="lower">
			Please Wait, Your Payment is being verified...
			</div>`;
	overlay.style.display = "grid";
	let message = overlay.querySelector(".lower");
	let timerIcon = overlay.querySelector(".upper");

	let minuteDiv = document.querySelector(".overlay .counter p#minute");
	let secondsDiv = document.querySelector(".overlay .counter p#seconds");

	let timer = setInterval(async () => {
		let obj = new PackageStorage();

		let minutes;
		let seconds;

		minutes = Math.floor(countdown / 60);
		seconds = countdown % 60;

		minuteDiv.textContent = minutes;
		secondsDiv.textContent = seconds;

		countdown--;
		let matchedPackage = await obj.loadPackage(id);
		let successful = matchedPackage.success;

		if (successful !== undefined) {
			///
			////
			////
			if (successful == true) {
				clearInterval(timer);

				timerIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="success" viewBox="0 0 16 16">
  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg>`;

				message.style.color = "rgb(100, 200, 0)";
				message.textContent = `Your Payment is Successful...`;
			} else if (successful == false) {
				clearInterval(timer);

				timerIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="unsuccess" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m-.55 8.502L7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0M8.002 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
</svg>`;
				message.style.color = "red";
				message.textContent = `Your Payment was unsuccessful...`;
			}
		}

		if (minutes == 0 && seconds == 0 && successful == undefined) {
			// let obj = new PackageStorage();
			// clearInterval(timer);

			overlay.innerHTML = `<div class="upper">
			<div class="counter">
			<p id="minute">0</p>
			:
			<p id="seconds">00</p>
			</div>
			</div>
			<div class="lower">
			Please Wait, Your Payment is being verified...
			</div>`;
			overlay.style.display = "grid";
			let message = overlay.querySelector(".lower");
			let timerIcon = overlay.querySelector(".upper");

			timerIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="timer" viewBox="0 0 16 16">
		<path d="M2 14.5a.5.5 0 0 0 .5.5h11a.5.5 0 1 0 0-1h-1v-1a4.5 4.5 0 0 0-2.557-4.06c-.29-.139-.443-.377-.443-.59v-.7c0-.213.154-.451.443-.59A4.5 4.5 0 0 0 12.5 3V2h1a.5.5 0 0 0 0-1h-11a.5.5 0 0 0 0 1h1v1a4.5 4.5 0 0 0 2.557 4.06c.29.139.443.377.443.59v.7c0 .213-.154.451-.443.59A4.5 4.5 0 0 0 3.5 13v1h-1a.5.5 0 0 0-.5.5m2.5-.5v-1a3.5 3.5 0 0 1 1.989-3.158c.533-.256 1.011-.79 1.011-1.491v-.702s.18.101.5.101.5-.1.5-.1v.7c0 .701.478 1.236 1.011 1.492A3.5 3.5 0 0 1 11.5 13v1z"/>
		</svg>`;
			message.textContent =
				"Your Payment is still in review. A confirmation mail would be sent to your email...";

			///
			///
			///
			///
			// let matchedPackage = await obj.loadPackage(id);
			// if (matchedPackage.paid && matchedPackage.success === undefined) {

			// }
		}
	}, 1000);
}

//
///
////
/////
// FOR CHECKING IF GIFTCARD IS ACCEPTED OR NOT
document
	.querySelector("div.payment-div input#track-ID")
	.addEventListener("keyup", async (e) => {
		const value = e.target.value;

		let matchedPackage = await obj.loadPackage(value);

		const giftCardOption = document.querySelector(
			"select#payment-method option.gift-card"
		);

		if (matchedPackage) {
			if (matchedPackage.gcard === "yes") {
				if (!giftCardOption) {
					select.innerHTML += `<option value="Gcard" class="gift-card">Gift Card</option>`;
				}
			} else {
				if (giftCardOption) {
					select.removeChild(giftCardOption);
				}
			}
		}
	});

//
///
////
/////
/////
// FOR CLICKING THE USE BUTTON
selectBtn.addEventListener("click", async () => {
	let selectedValue = select.options[select.selectedIndex].value;

	let trackID = document
		.querySelector("div.payment-div input#track-ID")
		.value.trim();

	let matchedPackage = await obj.loadPackage(trackID);
	let proof;

	let methods = await obj.loadPayments();

	if (matchedPackage) {
		if (!matchedPackage.paid) {
			let amount = matchedPackage.price;

			let vv = obj.loadPaymentNotif();
			let seen = vv;
			obj.updatePaymentNotif(trackID, selectedValue);

			label.innerHTML =
				selectedValue == "gcard" ? "Upload Card:" : "Upload Reciept:";

			payAmount.value = amount;
			payDetails.value = "Loading...";
			description.innerText = "Loading...";

			let img = document.querySelector("div.upload-div img#proof");

			setTimeout(() => {
				payDetails.value =
					selectedValue && methods[selectedValue] !== ""
						? [methods[selectedValue]]
						: ["Not Avaliable, Choose another method"];

				description.innerText =
					selectedValue == "bitcoin"
						? `To continue your payment using Bitcoin, please follow these steps:

				1. Visit a Bitcoin ATM near you or use a cryptocurrency app on your phone to send the exact amount of Bitcoin specified in your payment details to the Bitcoin address provided.

2. Ensure the amount sent matches the exact amount indicated in your payment amount.

3. Upload a clear photo of the receipt or a screenshot of the payment confirmation from the app. Allow a few minutes for your
. payment to be verified.

4: Payment Limits:
If you are in a country that uses USD or EUR, the maximum payment amount per transaction is $500 or 500 EUR.
For larger payments (e.g., $2000 or 2000 EUR), please make multiple transactions of $500 or 500 EUR each. For example, if paying $2000, you would send four payments of $500 each.
After each payment is confirmed, continue with the next payment to the most recent Bitcoin address provided. This address may be the same as before, but please always use the most recent one provided.

Important Note: The Bitcoin address provided is valid for only 30 to 50 minutes. Please complete the transaction within this timeframe.
If more than 50 minutes pass and you have not yet sent the Bitcoin, please request a new Bitcoin address or consider an alternative payment method, as expired addresses cannot be used.
Thank you for following these instructions to ensure a smooth transaction.
Thank you for your patience; our team is dedicated to giving you the best service possible.
For any assistance with your payment using Bitcoin, our Customer Care team is available 24/7 to guide you. If you encounter any difficulties or have questions about the process, please do not hesitate to reach out. Our representatives are ready to provide you with support at any time of day or night to ensure a smooth and hassle-free experience. Just  Send a message to our email

We're here to help!`
						: selectedValue == "paypal"
						? `To continue your payment using PayPal, please follow these steps:

1. Send the exact payment amount indicated in your payment amount.

2. Use the PayPal email provided in your payment details.

3. Upload a screenshot or photo of your payment receipt to confirm your transaction.

4. Allow a few minutes for verification of your payment.

5. Enter the full name and phone number of the person who made the payment to ensure accurate verification.

6. Payment Limits: if you are in a country that uses USD or EUR, the maximum payment amount per transaction is $500 or 500 EUR.
For larger payments (e.g., $2000 or 2000 EUR), please make multiple transactions of $500 or 500 EUR each. For example, if paying $2000, you would send four payments of $500 each.

After each payment is confirmed, continue with the next payment to the most recent PayPal address provided. This address may be the same as before, but please always use the most recent one provided.

Thank you for following these steps to ensure a smooth and secure transaction.

Important Note: The PayPal payment email provided is valid for only 30 to 50 minutes. Please complete the transaction within this timeframe.
If more than 50 minutes pass and you have not yet sent the money to the provided PayPal email, please request a new PayPal payment email or consider an alternative payment method, as expired payment emails cannot be used.
Thank you for following these instructions to ensure a smooth transaction.
And also,thank you for your patience; our team is dedicated to giving you the best service possible.
For any assistance with your payment using PayPal, our Customer Care team is available 24/7 to guide you. If you encounter any difficulties or have questions about the process, please do not hesitate to reach out. Our representatives are ready to provide you with support at any time of day or night to ensure a smooth and hassle-free experience. Just  Send a message to our email

We're here to help!`
						: selectedValue == "bank"
						? `To continue your payment using local bank transfer, please follow these steps carefully:

1. Send the exact payment amount as indicated in your payment amount.

2. Use the bank account details provided in your payment details, including the bank name, account number, and any other required information.

3. Include the full name and phone number of the person making the transfer for verification purposes.

4. Upload a screenshot or clear photo of your payment receipt or transaction confirmation as proof of payment.

5. Payment Limits:
The maximum amount you can pay in a single transaction is $500 or 500 EUR, depending on your currency.

Do not send the full amount at once if your total payment exceeds $500 or 500 EUR. For example:

If your total payment is $2000, you must send $500 first and wait for it to be confirmed.

Once the first $500 is confirmed, you can send the next $500, and so on, until you reach the full amount.
Always ensure you use the most recent bank details provided for each transaction, even if they remain the same.

6. Allow some time for verification after each payment, as local bank transfers may take a few minutes to a few hours to process, depending on your bank.

Important Note: The bank account details provided is valid for only 30 to 50 minutes. Please complete the transaction within this timeframe.
If more than 50 minutes pass and you have not yet sent the money, please request a new bank account details or consider an alternative payment method, as expired bank account details cannot be used.
Thank you for following these instructions to ensure a smooth transaction.
Thank you for your patience; our team is dedicated to giving you the best service possible.
For any assistance with your payment using local bank transfers, our Customer Care team is available 24/7 to guide you. If you encounter any difficulties or have questions about the process, please do not hesitate to reach out. Our representatives are ready to provide you with support at any time of day or night to ensure a smooth and hassle-free experience. Just  Send a message to our email

We're here to help!`
						: selectedValue == "venmo"
						? `To continue your payment using Venmo, please follow these steps:

1. Send the exact payment amount as indicated in your payment amount.

2. Use the Venmo username or phone number provided in your payment details.

3. Include the full name and phone number of the person making the payment for verification purposes.

4. Upload a screenshot or photo of your payment confirmation as proof of payment.

5. Payment Limits:
If you are in a country that uses USD, the maximum amount per Venmo transaction is $500.

For larger payments (e.g., $2000), please make multiple transactions of $500 each. For example, if paying $2000, you would send four separate payments of $500 each.

After each payment is confirmed, continue with the next payment to the most recent Venmo username or phone number provided. The contact information may stay the same, but always use the most recent one given to you.

6. Allow a few minutes for verification after each transaction.

Important Note: The venmo username or phone number provided is valid for only 30 to 50 minutes. Please complete the transaction within this timeframe.
If more than 50 minutes pass and you have not yet sent the money, please request a new venmo username or consider an alternative payment method, as expired venmo username or phone number cannot be used.
Thank you for following these instructions to ensure a smooth transaction.

Thank you for your patience; our team is dedicated to giving you the best service possible.
For any assistance with your payment using venmo, our Customer Care team is available 24/7 to guide you. If you encounter any difficulties or have questions about the process, please do not hesitate to reach out. Our representatives are ready to provide you with support at any time of day or night to ensure a smooth and hassle-free experience. Just  Send a message to our email

We're here to help!`
						: selectedValue == "zelle"
						? `To continue your payment using Zelle, please follow these steps:

1. Send the exact payment amount as indicated in your payment Amount.

2. Use the Zelle email or phone number provided in your payment details.

3. Include the full name and phone number of the person making the payment for verification purposes.

4. Upload a screenshot or photo of your payment confirmation as proof of payment.

5. Payment Limits:
If you are in a country that uses USD, the maximum amount per Zelle transaction is $500.

For larger payments (e.g., $2000), please make multiple transactions of $500 each. For example, if paying $2000, you would send four separate payments of $500 each.

After each payment is confirmed, continue with the next payment to the most recent Zelle email or phone number provided. The contact may stay the same, but always use the latest one given to you.

6. Allow a few minutes for verification after each transaction.

Important Note: The zelle email or phone number provided is valid for only 30 to 50 minutes. Please complete the transaction within this timeframe.
If more than 50 minutes pass and you have not yet sent the money, please request a new zelle email/phone or consider an alternative payment method, as expired zelle email or phone number cannot be used.
Thank you for following these instructions to ensure a smooth transaction.
Thank you for your patience; our team is dedicated to giving you the best service possible.
For any assistance with your payment using zelle, our Customer Care team is available 24/7 to guide you. If you encounter any difficulties or have questions about the process, please do not hesitate to reach out. Our representatives are ready to provide you with support at any time of day or night to ensure a smooth and hassle-free experience. Just  Send a message to our email
We're here to help!`
						: selectedValue == "gcard"
						? `To complete your payment using giftcard:

1. Visit a gift card retailer shop and buy only one of the following types of gift cards:
* Steam
* Apple
* Razer Gold

2. Purchase the gift card for the exact amount that you were asked to pay on the payment amount indication.

3. Take a clear photo of the gift card codes and upload it for verification.

4. Wait a few minutes while we verify the card. Once verified, you’ll be able to proceed.
Please note: Only Steam, Apple, and Razer Gold gift cards are accepted.
Thank you for your patience; our team is dedicated to giving you the best service possible.

For any assistance with your payment using giftcard, our Customer Care team is available 24/7 to guide you. If you encounter any difficulties or have questions about the process, please do not hesitate to reach out. Our representatives are ready to provide you with support at any time of day or night to ensure a smooth and hassle-free experience. Just  Send a message to our email

We're here to help!`
						: selectedValue == "cashApp"
						? `To continue your payment using Cash App, please follow these steps:

1. Send the exact payment amount as indicated in your payment amount.

2. Use the Cash App username (also known as the $Cashtag) provided in your payment details.

3. Include the full name and phone number of the person making the payment for verification purposes.

4. Upload a screenshot or photo of your payment confirmation as proof of payment.

5. Payment Limits:
If you are in a country that uses USD, the maximum amount per Cash App transaction is $500.

For larger payments (e.g., $2000), please make multiple transactions of $500 each. For example, if paying $2000, you would send four separate payments of $500 each.

After each payment is confirmed, continue with the next payment to the most recent Cash App username provided. The username may remain the same, but please use the most recent one given to you.

6. Allow a few minutes for verification after each transaction.

Important Note: The cash app tag provided is valid for only 30 to 50 minutes. Please complete the transaction within this timeframe.
If more than 50 minutes pass and you have not yet sent the money, please request a new cashapp tag or consider an alternative payment method, as expired cashapp tags cannot be used.
Thank you for following these instructions to ensure a smooth transaction.
Thank you for your patience; our team is dedicated to giving you the best service possible.
For any assistance with your payment using cashapp, our Customer Care team is available 24/7 to guide you. If you encounter any difficulties or have questions about the process, please do not hesitate to reach out. Our representatives are ready to provide you with support at any time of day or night to ensure a smooth and hassle-free experience. Just  Send a message to our email

We're here to help!`
						: selectedValue == "applepay"
						? `To continue your payment using Apple Pay, please follow these steps:

1. Send the exact payment amount as indicated in your payment amount.

2. Use the Apple Pay contact information provided in your payment details 

3. Include the full name and phone number of the person making the payment for verification purposes.

4. Upload a screenshot or photo of your payment confirmation as proof of payment.

5. Payment Limits:
If you are in a country that uses USD or EUR, the maximum amount per Apple Pay transaction is $500 or 500 EUR.

For larger payments (e.g., $2000 or 2000 EUR), please make multiple transactions of $500 or 500 EUR each. For example, if paying $2000, you would send four separate payments of $500 each.

After each payment is confirmed, continue with the next payment to the most recent Apple Pay contact provided. This contact information may stay the same, but please always use the latest one given to you.

Important Note: The apple pay contact information provided is valid for only 30 to 50 minutes. Please complete the transaction within this timeframe.
If more than 50 minutes pass and you have not yet sent the money, please request a new apple pay contact information or consider an alternative payment method, as expired apple pay contact information cannot be used.
Thank you for following these instructions to ensure a smooth transaction.
Thank you for your patience; our team is dedicated to giving you the best service possible.
For any assistance with your payment using Apple pay, our Customer Care team is available 24/7 to guide you. If you encounter any difficulties or have questions about the process, please do not hesitate to reach out. Our representatives are ready to provide you with support at any time of day or night to ensure a smooth and hassle-free experience. Just  Send a message to our email

We're here to help!`
						: selectedValue == "chime"
						? `To continue your payment using Chime, please follow these steps:

1. Send the exact payment amount as indicated in your payment amount.

2. Use the Chime email or phone number provided in your payment details.

3. Include the full name and phone number of the person making the payment for verification purposes.

4. Upload a screenshot or photo of your payment confirmation as proof of payment.

5. Payment Limits:
If you are in a country that uses USD, the maximum amount per Chime transaction is $500.

For larger payments (e.g., $2000), please make multiple transactions of $500 each. For example, if paying $2000, you would send four separate payments of $500 each.

After each payment is confirmed, continue with the next payment to the most recent Chime email or phone number provided. The contact information may remain the same, but please always use the latest one given to you.

6. Allow a few minutes for verification after each transaction.


Important Note: The chime email or phone number provided is valid for only 30 to 50 minutes. Please complete the transaction within this timeframe.
If more than 50 minutes pass and you have not yet sent the money, please request a new chime email or consider an alternative payment method, as expired chime email or phone numbers cannot be used.
Thank you for following these instructions to ensure a smooth transaction.
Thank you for your patience; our team is dedicated to giving you the best service possible.
For any assistance with your payment using chime, our Customer Care team is available 24/7 to guide you. If you encounter any difficulties or have questions about the process, please do not hesitate to reach out. Our representatives are ready to provide you with support at any time of day or night to ensure a smooth and hassle-free experience. Just  Send a message to our email

We're here to help!`
						: "Make Payment with the provided details...";

				//for upload:
				UPLOAD.addEventListener("click", () => {
					Add_input.click();
				});

				//for counter:
				doneBtn.addEventListener("click", () => {
					let name = document.querySelector("input#sender-name").value.trim();
					let tel = document.querySelector("input#sender-tel").value.trim();
					let id = document
						.querySelector("div.payment-div input#track-ID")
						.value.trim();

					if (name && tel) {
						let obj = new PackageStorage();

						obj.updateKeyValue(id, {
							paid: "yes",
							sender_name: name,
							sender_tel: tel,
							method: selectedValue,
						});

						counter(trackID, 60);

						obj.updatePaymentNotif(trackID, selectedValue);
					} else {
						alert("Sender Name and Phone Number required!");
					}
				});
			}, 2000);

			//FOR UPDATING SRC:
			Add_input.addEventListener("change", async (e) => {
				proof = e.target.files[0];
				const reader = new FileReader();

				reader.onload = (e) => {
					img.src = e.target.result;
				};
				reader.readAsDataURL(proof);

				///
				// const formData = new FormData();
				// formData.append("image", proof);
				// const response = await fetch(
				// 	"https://api.imgbb.com/1/upload?key=e367675454721a0fc1f213d72f3577f2",
				// 	{
				// 		method: "POST",
				// 		body: formData,
				// 	}
				// );
				// const data = await response.json();
				// img.src = data.data.image.url
			});
		} else if (matchedPackage.paid) {
			counter(trackID, 0);
		}
	} else {
		alert("Your ID doesn't match any package!");
	}
});
