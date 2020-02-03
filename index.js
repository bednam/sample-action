const core = require('@actions/core')
const github = require('@actions/github')
const fs = require('fs')

async function run() {
	try {
		// read from snapshot
		const mockSnapshot = { snapshot: "snapshot"}
		const repoToken = core.getInput('repo-token')
		const octokit = new github.GitHub(repoToken, {
			previews: ["comfort-fade-preview", "everest-preview"]
		})
		// save snapshot to https://github.com/MichalBednarz/cb-storage
		try {
			await octokit.repos.createDispatchEvent({
				owner: "MichalBednarz",
				repo: "cb-storage",
				event_type: "save-snapshot",
				client_payload: JSON.stringify(mockSnapshot)
			})
		} catch(e) {
			console.log(e)
		}
	} catch (error) {
	  core.setFailed(error.message);
	}
}

run()
