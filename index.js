const core = require('@actions/core')
const github = require('@actions/github')
const fs = require('fs')

async function run() {
	try {
		const comments = [{"path":"b6.txt","user":"MichalBednarz","body":"asdfa","line":3},{"path":"b6.txt","user":"MichalBednarz","body":"asdfads","line":5}]
		fs.writeFile('my_file.txt', 'asynchronous write!', (err) => {
		  if(err) core.setFailed(`Action failed with error ${err}`);
		  console.log('The file has been saved!');
		})
	} catch (error) {
	  core.setFailed(error.message);
	}
}

run()
