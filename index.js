const core = require('@actions/core');
const github = require('@actions/github'); // deps from toolkit or marketplace

(async () => {
	try {
	  const commentsUrl = github.context.payload.pull_request.links.review_comments.href
	  const commentsEndpoint = commentsUrl.replace('https://api.github.com', '')
	  console.log(commentsEndpoint)

	// auth like this?
	  const octokit = new github.GitHub(github.token, {
	  	previews: ['comfort-fade-preview']
	  });

	  const comments = await octokit.request(commentsEndpoint)
	  console.log(comments)

	} catch (error) {
	  core.setFailed(error.message);
	}
})()
