const Clarifai = require("clarifai");
const argv = require("minimist")(process.argv.slice(2));
const apiKey = "";

const imageURL =
	"https://thekindlife.com/wp-content/uploads/2020/08/bill-stephan-og0C_9Mz6RA-unsplash.jpg";

// Stop if there is no api key.
if (!apiKey) {
	const noKeyProvided = "Error! Please add your api key.";
	console.log(noKeyProvided);
	process.exit(0);
}

// Stop if there is no image.
if (!imageURL) {
	const noImageProvided = "Error! This needs to be called with an image.";
	console.log(noImageProvided);
	process.exit(0);
}

// Instantiate a new Clarifai app by passing in your API key:
const app = new Clarifai.App({ apiKey: apiKey });

// Predict the contents of an image by passing in a URL:
app.models
	.predict(Clarifai.FOOD_MODEL, imageURL)
	.then((response) => {
		var result = false;
		var responses = response["outputs"][0]["data"]["concepts"];
		// This cycles through the results looking to see if any are 'hot dog' or 'hotdog':
		responses.forEach((element) => {
			if (element["name"] === "hot dog" || element["name"] === "hotdog") {
				result = true;
			}
		});

		// This checks to see if a hotdog was found and logs the appropriate response:
		if (result) {
			console.log("Hotdog");
		} else {
			console.log("Not hotdog");
		}
	})
	.catch((err) => {
		console.log(err);
	});
