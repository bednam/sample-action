const core = require('@actions/core')
const github = require('@actions/github')
const fs = require('fs')

async function run() {
	try {
		// read from snapshot
		const mockSnapshot = { snapshot: "snapshot"}
		// initialize octokit
		// how to handle storage repo token?
		const repoToken = core.getInput('repo-token')
		const octokit = new github.GitHub(repoToken)
		// save snapshot to https://github.com/MichalBednarz/cb-storage
		octokit.repos.createDispatchEvent({
 	 		owner: "MichalBednarz",
  			repo: "cb-storage",
			client_payload: JSON.stringify(mockSnapshot)
		})
	} catch (error) {
	  core.setFailed(error.message);
	}
}

run()
