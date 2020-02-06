const core = require('@actions/core')
const github = require('@actions/github')
const { graphql } = require("@octokit/graphql");
const fs = require('fs')

async function run() {
	try {
		console.log('log')
		const { full_name } = github.context.payload.repository
		const number = 7

		const repoToken = core.getInput('repo-token')

		const graphqlWithAuth = graphql.defaults({
		  headers: {
		    authorization: `token ${repoToken}`
		  },
		  previews: ["comfort-fade-preview"]
		})

		const name = full_name.replace(/.+\//, '')
		const owner = full_name.replace(/\/.+/, '')
		console.log(name)
		console.log(owner)

		const res = await graphql(`query Query($owner: String!, $repo: String!, $number: Int!) {
			repository(owner: $owner, name: $repo) {
				pullRequest(number: $number) { 
				  	reviewThreads(first:10){
				      nodes {
				        comments(first:50) {
				          nodes {
				            body
				            author {
				              login
				            }
				            originalPosition
				            path
				            outdated
				          }
				        }
				      }
				    }
				}
		  }`, 
		  {
		    owner,
		    repo,
		    number
		  })
		console.log(res)
		console.log(res.data)
		console.log(res.data.repository)
		console.log(res.data.repository.pullRequest)
		const comments = data.repository.pullRequest.reviewThreads.nodes
			.flatMap(pr => pr.reviewThreads.nodes)
			.flatMap(thread => thread.comments.nodes)
			.filter(comment => !comment.outdated)

		const filePath = 'ReviewComments.json'
		fs.writeFile(filePath, JSON.stringify(comments), (err) => {
		  if(err) throw err
		  console.log('The file has been saved!');
		})
	} catch (error) {
	  core.setFailed(error.message);
	}
}

run()
