const core = require('@actions/core')
const github = require('@actions/github')
const fs = require('fs')

async function run() {
	try {
		core.setOutput("comments", [{"path":"b6.txt","user":"MichalBednarz","body":"asdfa","line":3},{"path":"b6.txt","user":"MichalBednarz","body":"asdfads","line":5}])
		var stream = fs.createWriteStream("my_file.txt");
		stream.once('open', function(fd) {
		  stream.write("My first row\n");
		  stream.write("My second row\n");
		  stream.end();
		});
	} catch (error) {
	  core.setFailed(error.message);
	}
}

run()
