const core = require('@actions/core')
const github = require('@actions/github')
const { graphql } = require("@octokit/graphql");
const fs = require('fs')

async function run() {
	try {
		const { full_name } = github.context.payload.repository
		const number = 7

		const repoToken = core.getInput('repo-token')

		const repo = full_name.replace(/.+\//, '')
		const owner = full_name.replace(/\/.+/, '')

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
				            position
				            path
				            outdated
				          }
				        }
				      }
				    }
				}
			}
		  }`, 
		  {
		    owner,
		    repo,
		    number,
		    headers: {
    			authorization: `token ${repoToken}`,
		        accept: 'application/vnd.github.comfort-fade-preview+json'
  		    }
		  })
		
		const comments = res.repository.pullRequest.reviewThreads.nodes
			.flatMap(thread => thread.comments.nodes)
			.filter(comment => !comment.outdated)
			.map(({ body, author: { login }, line, path}) => ({ body, user: login, line, path }))

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
