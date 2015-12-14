var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var abc = "abcdefghijklmnopqrstuvwxyz";

rl.question("Enter the decode number (1 and 20): x = ? ", function(x) {

	x = Math.min(Math.max(x, 1), 20);
	console.log("x =", x);
	
	rl.question("Enter the message to decode: ", function(message) {
		
		message = message.toLowerCase();
		
		var decodedMessage = message.split("").map(function (ch) {
			var pattern = /[\d\s\!\@\#\$\%\^\&\*\(\)_\-\+\=\{\[\}\]\|\\\:\;\"\'\<\,\>\.\?/]/;
			if(pattern.test(ch)) {
				return ch;
			}
			
			var i = abc.indexOf(ch) - x;
			if( i < 0 ) {
				i = i + abc.length;
			}
			
			return abc[i];
		});
		
		console.log("Your message is:", decodedMessage.join("") );

		rl.close();
	  
	});
	
});