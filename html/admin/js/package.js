// buttons:
let add = document.querySelector("div.package div.down button#add");
let close = document.querySelector("div.package div.down button#close");

// functions:
// adding packages
add.addEventListener("click", () => {
	// getting the inputs and data
	// inputs:
	let name1 = document.querySelector("div.package input#name");
	let id1 = document.querySelector("div.package input#id");
	let email1 = document.querySelector("div.package input#email");
	let from1 = document.querySelector("div.package input#start");
	let current1 = document.querySelector("div.package input#current");
	let to1 = document.querySelector("div.package input#to");
	let time1 = document.querySelector("div.package input#time");
	let date1 = document.querySelector("div.package input#date");

	let inputss = [
		name1,
		id1,
		from1,
		current1,
		email1,
		to1,
		date1,
		time1,
	].forEach((input) => {
		input.value = "";
	});
});
