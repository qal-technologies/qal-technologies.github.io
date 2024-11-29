import { PackageStorage } from "../../../js/fbase.js";

window.onload = () => {
	function inputs() {
		// inputs:
		let name =
			document.querySelector("div.package .input-div input#name") || "name";
		let id = document.querySelector("div.package input#id") || "id";
		let email = document.querySelector("div.package input#email") || "email";
		let from = document.querySelector("div.package input#from") || "from where";
		
		let to = document.querySelector("div.package input#to") || "destination";
		let time =
			document.querySelector("div.package input#date") || "arrival time";
		let date =
			document.querySelector("div.package input#date") || "arrival date";

		return [id, name, email, from, to, time, date];
	}

// 	function createPackage(packageData) {
// 		const packageDiv = document.createElement("div");
// 		packageDiv.classList.add("package-div");
// 		packageDiv.id = packageData.id;

// 		packageDiv.innerHTML = `<div
// 						class="package-div"
// 						id="${packageData.id}">
// 						<div class="name-view">
// 							<p class="package-name">${packageData.name || "Package Name"}</p>
							
// 						<div class="package-location">
// 								<svg
// 							version="1.1"
// 							xmlns="http://www.w3.org/2000/svg"
// 							width="50px"
// 							height="50px"
//                             class="location"
// 							viewBox="0 0 32 32"
// 							fill="black" stroke="black">
// 							<path
// 								d="M16,8c-2.757,0-5,2.243-5,5s2.243,5,5,5s5-2.243,5-5S18.757,8,16,8z M16,16
// 				c-1.654,0-3-1.346-3-3s1.346-3,3-3s3,1.346,3,3S17.654,16,16,16z M16,6c3.86,0,7,3.14,7,7c0,5.271-4.719,10.256-7.009,12.365
// 				C13.299,22.889,9,17.901,9,13C9,9.14,12.14,6,16,6 M16,4c-4.971,0-9,4.029-9,9c0,8,9,15,9,15s9-6.984,9-15C25,8.029,20.971,4,16,4
// 				L16,4z" />
// 						</svg>
// 								<p class="place">${packageData.to}</p>
// 							</div>
// 						</div>
//                         <div class='right' id="id-bottom">
//                         <button id="delete" title="Delete Package">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
//   <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
//   <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
// </svg></button>
// 						<button id="edit" title="Edit Package">EDIT</button>
//                         </div>
// 					</div>
// `;
// 	}

// 	const form = document.querySelector("div.package form.input-div");
// 	form.addEventListener("submit", async (e) => {
// 		e.preventDefault();
// 		const storage = new PackageStorage();
// 		const textbox = inputs();

// 		// Check for empty ID before creating the object
// 		if (!textbox[0]) {
// 			alert("Please enter a Package ID!");
// 			return; // Prevent further execution if ID is missing
// 		}

// 		const newPackage = new PackageStorage().Package(...textbox);

// 		const button = document.querySelector(".package .input-div #add");

// 		try {
// 			if (button.innerText === "ADD") {
// 				console.log(newPackage);
// 				await new PackageStorage().addPackage(newPackage);
// 			} else {
// 				await new PackageStorage().editPackage(newPackage.id, newPackage);
// 			}
// 			updatePackages(); // Update UI after successful operation
// 		} catch (error) {
// 			alert("Error:", error);
// 		} finally {
// 			textbox.forEach((input) => {
// 				input.value = "";
// 			});
// 			button.innerText = "ADD";
// 		}

// 		// button.addEventListener("click", async () => {
// 		// 	await object.addPackage(newPackage).then(alert("Done!"));
// 		// });
// 	});

// 	function updatePackages() {
// 		let viewDiv = document.querySelector("div.view div.packages");
// 		viewDiv.innerHTML = "";

// 		let packages = new PackageStorage().loadPackages();
// 		// alert('Updated!')

// 		//CREATING PACKAGES
// 		for (const packageData in packages) {
// 			console.log(packages[packageData]);
// 			let packageDiv = createPackage(packageData);

// 			// delete button event listener
// 			packageDiv.querySelector("#delete").addEventListener("click", (e) => {
// 				e.stopPropagation();
// 				storage.removePackage(packageData.id).then(() => {
// 					updatePackages();
// 				});
// 			});

// 			packageDiv.querySelector("#edit").addEventListener("click", (e) => {
// 				let parent = e.parentNode;
// 				let id = parent.parentNode.id;

// 				//getting inputs:
// 				let name = document.querySelector("div.package input#name");
// 				let idd = document.querySelector("div.package input#id");
// 				let email = document.querySelector("div.package input#email");
// 				let from = document.querySelector("div.package input#start");
// 				let current = document.querySelector("div.package input#current");
// 				let to = document.querySelector("div.package input#to");
// 				let time = document.querySelector("div.package input#time");
// 				let date = document.querySelector("div.package input#date");

// 				let pack = packages[id];
// 				console.log(pack);

// 				//dropdown
// 				document.querySelector("section.panel div.package").style.height =
// 					"auto";

// 				let btn = document.querySelector(".package .input-div #add");
// 				btn.innerText = "EDIT";

// 				//editing
// 				if (btn.innerText == "EDIT") {
// 					name.value = pack.name;
// 					idd.value = pack.id;
// 					from.value = pack.from;
// 					email.value = pack.email;
// 					current.value = pack.current;
// 					to.value = pack.to;
// 					time.value = pack.time;
// 					date.value = pack.date;
// 				}
// 				// alert(package.name);

// 				//new package:
// 				let newPackage = new PackageStorage().Package(
// 					idd.value.trim(),
// 					name.value.trim(),
// 					email.value.trim(),
// 					from.value.trim(),
// 					current.value.trim(),
// 					to.value.trim(),
// 					time.value.trim(),
// 					date.value.trim()
// 				);

// 				if (newPackage) {
// 					new PackageStorage().editPackage(id, newPackage).then(() => {
// 						updatePackages();
// 					});
// 				} else {
// 					alert("Nothing Changed!");
// 				}
// 			});

// 			//ADDING THE PACKGES TO THE DIV
// 			viewDiv.innerHTML += packageDiv;
// 			// edit(viewDiv);
// 			console.log(packageDiv);
// 		}

// 		//CHECKING THE NUMBER OF PACKAGES
// 		if (Object.keys(packages).length <= 0) {
// 			viewDiv.innerHTML = `<p class="no-package">No Package yet!</p>`;
// 		}
// 	}

// 	// function edit(div) {}
// 	setInterval(() => {
// 		updatePackages();
// 	}, 3000);

// 	updatePackages();
};
