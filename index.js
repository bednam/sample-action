const core = require('@actions/core');
const github = require('@actions/github'); // deps from toolkit or marketplace

async function run() {
	try {
	  const commentsUrl = github.context.payload.pull_request._links.review_comments.href
	  const commentsEndpoint = commentsUrl.replace('https://api.github.com', '')
	  // console.log(commentsEndpoint) ok

	// auth like this?
	  console.log("refresh?")
	const myToken = core.getInput('myToken');
	const octokit = new github.GitHub(myToken, {
		previews: ["comfort-fade-preview"]
	});

	  const comments = await octokit.request(commentsUrl)
	  console.log(comments)

	} catch (error) {
	  core.setFailed(error.message);
	}
}

run();
