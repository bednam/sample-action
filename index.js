const core = require('@actions/core')
const github = require('@actions/github')

async function run() {
	try {
	  core.setOutput("comments", [{"path":"b6.txt","user":"MichalBednarz","body":"asdfa","line":3},{"path":"b6.txt","user":"MichalBednarz","body":"asdfads","line":5}])
	} catch (error) {
	  core.setFailed(error.message);
	}
}

run()
