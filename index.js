const core = require('@actions/core')
const github = require('@actions/github')
const fs = require('fs')

async function run() {
	try {
		// read from snapshot
		const snapshot = fs.readdir('snapshot', (err, files) => err ? console.log(err) : files)
		console.log(JSON.stringify(snapshot))
		const storageToken = core.getInput('storage-token')
		const octokit = new github.GitHub(storageToken, {
			previews: ["comfort-fade-preview", "everest-preview"]
		})
		// save snapshot to https://github.com/MichalBednarz/cb-storage
		

	} catch (error) {
	  core.setFailed(error.message);
	}
}

run()
