import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
	getFirestore,
	Timestamp,
	FieldValue,
	addDoc,
	getDocs,
	getDoc,
	collection,
	doc,
	setDoc,
	updateDoc,
	deleteDoc,
	onSnapshot,
	where,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
	apiKey: "AIzaSyAhxVZ0oEB2ShcT1cqE-V0aP77JRFqTorg",
	authDomain: "trackingweb-123.firebaseapp.com",
	projectId: "trackingweb-123",
	storageBucket: "trackingweb-123.appspot.com",
	messagingSenderId: "490686676137",
	appId: "1:490686676137:web:2a12ee7aee2888343abdb8",
	measurementId: "G-7ZYSSBKLQ5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export class PackageStorage {
	cltn = collection(db, "packages");
	payment = collection(db, "payment");
	user = collection(db, "user");
	packages = [];
	details = [];
	userInfo = [];
	visitors = [];

	async loadPackages() {
		const querySnapshot = await getDocs(this.cltn);
		this.packages = querySnapshot.docs.map((doc) => doc.data());

		onSnapshot(this.cltn, (querySnapshot) => {
			this.packages = querySnapshot.docs.map((doc) => doc.data());
		});

		return this.packages;
	}

	async loadPackage(tracking_id) {
		const docRef = doc(db, "packages", tracking_id);
		const docSnap = await getDoc(docRef);

		if (docSnap) {
			const data = docSnap.data();
			return data;
		} else {
			console.error("Document not found!");
			return {};
		}
	}

	async loadPayments() {
		const docRef = doc(db, "payment", "method");
		const docSnap = await getDoc(docRef);

		if (docSnap) {
			const data = docSnap.data();
			return data;
		} else {
			console.error("Document not found!");
			return {};
		}
	}

	async loadUser() {
		const docRef = doc(this.user, "details");
		const docSnap = await getDoc(docRef);

		if (docSnap) {
			const data = docSnap.data();
			return data;
		} else {
			console.error("Document not found!");
			return {};
		}
	}

	async loadVisitors() {
		const docRef = doc(this.user, "visitor");
		const docSnap = await getDoc(docRef);

		if (docSnap) {
			const data = docSnap.data();
			return data;
		} else {
			console.error("Visitor not found!");
			return {};
		}
	}

	async loadPaymentNotif() {
		const docRef = doc(this.payment, "notify");
		const docSnap = await getDoc(docRef);

		if (docSnap) {
			const data = docSnap.data();
			return data;
		} else {
			console.error("Payment not found!");
			return {};
		}
	}

	async updatePayment(method, detail) {
		const payments = this.payment;
		const docRef = doc(payments, "method");

		await updateDoc(docRef, {
			[method]: detail,
		});
	}

	Package(id, name, email, from, current, time, date) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.from = from;
		this.current = current;
		this.to = to;
		this.time = time;
		this.date = date;
	}

	async addPackage(id, newPackage) {
		try {
			const docRef = doc(db, "packages", id);
			await setDoc(docRef, newPackage);
			alert("Package added successfully!");
		} catch (error) {
			console.error("Error adding package:", error);
		}
	}

	async removePackage(id) {
		const docRef = doc(db, "packages", id);
		try {
			await deleteDoc(docRef);
			alert("Package Removed!");
		} catch (err) {
			console.error("The error is: ", err);
		}
	}

	async updatePackage(id, key, value) {
		const packages = this.cltn;
		const docRef = doc(packages, id);

		await updateDoc(docRef, {
			[key]: value,
		});
	}

	async updateKeyValue(id, updates) {
		const packages = this.cltn;
		const docRef = doc(packages, id);

		await updateDoc(docRef, updates);
	}

	async updateVisitor(id) {
		try {
			const user = this.user;
			const docRef = doc(user, "visitor");
			const visitorSnap = await getDoc(docRef);

			if (visitorSnap) {
				const visitorData = visitorSnap.data();
				const visitorCount = Object.keys(visitorData).length;

				await updateDoc(docRef, {
					[`Visitor ${visitorCount + 1}`]: id,
				});
			} else {
				console.error("Visitor document not found.");
			}
		} catch (error) {
			console.error("Error updating visitor: ", error);
		}
	}

	async updatePaymentNotif(id, method) {
		try {
			const payment = this.payment;
			const docRef = doc(payment, "notify");
			const paymentSnap = await getDoc(docRef);

			if (paymentSnap) {
				const paymentData = paymentSnap.data();

				for (const paymentdd in paymentSnap) {
					const visitorCount = Object.keys(paymentData).length;

					paymentdd[0] == id
						? ""
						: await updateDoc(docRef, {
								[`Notif ${visitorCount + 1}`]: [id, method],
						  });
				}
			} else {
				console.error("Visitor document not found.");
			}
		} catch (error) {
			console.error("Error updating visitor: ", error);
		}
	}
}
