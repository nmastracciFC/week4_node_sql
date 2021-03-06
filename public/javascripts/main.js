(() => {
	let getButtons = document.querySelectorAll('.getButton');
	let deleteButton = document.querySelector('.deleteButton');
	let postButton = document.querySelector('.postButton');
	// console.log(deleteButton);

	function fetchData($model) {
		let url = "/api/" + this.id;

		fetch(url)
			.then((resp) => {resp.json()})
			.then((data) => {
				console.log(data);
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	function deleteRecord(){
		let url = "/api/" + this.id;

		fetch(url, {method: 'delete'})
			.then((resp) => resp.json())
			.then((data) => {
				console.log(data);
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	function insertRecord() {
		let url = "/api/" + this.id;
		var toPost = { "model": "N28",
			 	"modelName": "Some Other Coop",
			 	"pricing": "22, 190",
			 	"modelDetails": "Theres something new and exciting about this one. The fact that it doesn't exist may be the exciting thing.",
			 	"imgPath": "F56.jpg"};

			 // 	{//stringifying turns into a JSON object just like in php. take a dataset and putting quote around it which turns it into JSON object
			 // 	model: "N28",
			 // 	modelName: "Some Other Coop",
			 // 	pricing: "22, 190",
			 // 	modelDetails: "Theres something new and exciting about this one. The fact that it doesn't exist may be the exciting thing.",
			 // 	imagePath: "F56.jpg"
			 // }



		console.log(url, toPost);

		fetch(url, {
			method: 'POST',
			headers: {//security stuff when passing json back and forth and telling what you're reading
				'Accept': 'application/json, text-plain, */*',
				'Content-type':'application/json'
				// "Content-Type": "text/plain"
			 },
			 body: JSON.stringify(toPost)})
			.then((resp) => {resp.json()})
			// .then((resp) => {return resp.text();})

			// .then((resp) => {console.log(resp)})
			.then((data) => {
				console.log(data);
			})
			.catch(function(error) {
				console.log(error);
			});
	}


	getButtons.forEach(button =>  button.addEventListener("click", fetchData, false));

	deleteButton.addEventListener("click", deleteRecord, false);

	postButton.addEventListener("click", insertRecord, false);


})();