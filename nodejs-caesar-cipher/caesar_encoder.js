var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var abc = "abcdefghijklmnopqrstuvwxyz";

rl.question("Enter a number between (1 and 20): x = ? ", function(x) {
	
	x = Math.min(Math.max(x, 1), 20);
	console.log("x =", x);
	
	rl.question("Enter a message to encode: ", function(message) {
		
		message = message.toLowerCase();
		
		var encodedMessage = message.split("").map(function (ch) {
			var pattern = /[\d\s\!\@\#\$\%\^\&\*\(\)_\-\+\=\{\[\}\]\|\\\:\;\"\'\<\,\>\.\?/]/;
			if(pattern.test(ch)) {
				return ch;
			}
			
			var i = abc.indexOf(ch) + x;
			if( i > abc.length - 1 ) {
				i -= abc.length;
			}
			
			return abc[i];
		});
		
		console.log("Your encoded message is:", encodedMessage.join("") );

		rl.close();
	  
	});
	
});