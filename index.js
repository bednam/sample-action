const core = require('@actions/core');
const github = require('@actions/github'); 

async function run() {
	try {
// 	const {context: {
// 		payload: {
// 			pull_request
// 		}
// 	}} = github

// 	const commentsUrl = pull_request._links.review_comments.href
// 	const commentsEndpoint = commentsUrl.replace('https://api.github.com', '')

	const myToken = core.getInput('myToken');
	const octokit = new github.GitHub(myToken, {
		previews: ["comfort-fade-preview", "everest-preview"]
	});

	//const comments = await octokit.request(commentsUrl)
	octokit.repos.createOrUpdateFile({
	  owner: 'MichalBednarz',
	  repo: 'simplefeed',
	  path: 'MichalBednarz/simplefeed/test/',
	  message: 'some_message',
	  content: 'test_content'
	})

	} catch (error) {
	  core.setFailed(error.message);
	}
}

run();
