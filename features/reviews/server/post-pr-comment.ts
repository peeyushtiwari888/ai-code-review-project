import { getGithubApp } from "@/features/github/utils/github-app";

export async function postPrComment(
  installationId: number,
  repoFullName: string,
  prNumber: number,
  review: string,
) {
  const app = getGithubApp();
  const octokit = await app.getInstallationOctokit(installationId);
  const [owner, repo] = repoFullName.split("/");

  if (!owner || !repo) {
    throw new Error(`Invalid repository name: ${repoFullName}`);
  }

  return octokit.request(
    "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
    {
      owner,
      repo,
      issue_number: prNumber,
      body: `${review}\n\n---\n*✨ Reviewed by **[RepoReview AI](https://github.com/apps/chaicode-pr-review-project)***`,
    },
  );
}
