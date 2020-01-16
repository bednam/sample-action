const core = require('@actions/core');
const github = require('@actions/github'); // deps from toolkit or marketplace

try {
  // `who-to-greet` input defined in action metadata file
  // const nameToGreet = core.getInput('who-to-greet');
  // console.log(`Hello ${nameToGreet}!`);
  // const time = (new Date()).toTimeString();
  // core.setOutput("time", time);
  // // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);


  // fetch review thread comments
  // github.token

  // const octokit = new github.GitHub(github.token);

  //   const { data: pullRequest } = await octokit.pulls.get({
  //       owner: 'MichalBednarz',
  //       repo: 'simplefeed',
  //       pull_number: 123,
  //       mediaType: {
  //         format: 'diff'
  //       }
  //   });

  //   console.log(pullRequest);
} catch (error) {
  core.setFailed(error.message);
}