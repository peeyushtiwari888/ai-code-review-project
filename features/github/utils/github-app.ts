import {App} from "octokit";

let githubApp:App | null = null;


export function getGithubApp(){
    if(!githubApp){
        const privateKey = process.env.GITHUB_APP_PRIVATE_KEY ?? process.env.GITHUB_PRIVATE_KEY;
        const webhookSecret =
            process.env.GITHUB_WEBHOOK_SECRET ?? process.env.GITHUB_APP_WEBHOOK_SECRET;

        if (!process.env.GITHUB_APP_ID || !privateKey || !webhookSecret) {
            throw new Error("GitHub App environment variables are not configured");
        }

        githubApp = new App({
            appId: process.env.GITHUB_APP_ID,
            privateKey: privateKey.replace(/\\n/g, "\n"),
            webhooks:{
                secret: webhookSecret
            }
        })
    }

    return githubApp;
}

export function getGithubInstallUrl(userId: string) {
    const url = new URL(`https://github.com/apps/chaicode-pr-review-project/installations/new`);
    // `state` round-trips through GitHub so we can link the installation to this user.
    url.searchParams.set("state", userId);
    return url.toString();
  }
