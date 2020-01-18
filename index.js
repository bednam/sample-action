const core = require('@actions/core');
const github = require('@actions/github'); 

async function run() {
	try {
		const {
			context: {
				payload: {
					pull_request,
					repository
				}
			}
		} = github

		const commentsUrl = pull_request._links.review_comments.href
		const commentsEndpoint = commentsUrl.replace('https://api.github.com', '')

		const myToken = core.getInput('myToken');
		const octokit = new github.GitHub(myToken, {
			previews: ["comfort-fade-preview", "everest-preview"]
		});

		const commentsRes = await octokit.request(commentsUrl)
		const comments = commentsRes.data.map(comment => ({
			path: comment.path,
			user: comment.user.login,
			body: comment.body,
			line: comment.line
		}))
		const content = Buffer.from(JSON.stringify(comments)).toString('base64')

		octokit.repos.createOrUpdateFile({
		  owner: repository.owner.login,
		  repo: repository.name,
		  path: '.storage',
		  message: 'Add context for PR ' + pull_request.number,
		  content
		})

	} catch (error) {
	  core.setFailed(error.message);
	}
}

run();
