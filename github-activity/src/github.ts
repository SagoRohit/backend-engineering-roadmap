// import { GITHUB_HEADERS } from "./constants";
import { GitHubEvent, PushPayload } from "./types";
import { getGitHubHeaders } from "./utility";

export async function getUserActivity(username: string): Promise<void> {
    // console.log(process.env.GITHUB_TOKEN)
    // console.log(GITHUB_HEADERS);
    const url = `https://api.github.com/users/${username}/events`;
    const response = await fetch(url, {
        headers: getGitHubHeaders()
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch user activity. ${response.status}`);
    }
    const events: GitHubEvent[] = await response.json();
    for (const event of events) {
        if (event.type === "PushEvent") {
            const payload = event.payload as PushPayload;
            const gitcommitcount = await GitCommitCount(
                event.repo.name,
                payload.before,
                payload.head
            )
            console.log(`Pushed ${gitcommitcount} commit${gitcommitcount !== 1 ? "s" : ""} to ${event.repo.name}`);
        }
    }
}
export async function GitCommitCount(repoName: string, before: string, head: string): Promise<number> {
    const url = `https://api.github.com/repos/${repoName}/compare/${before}...${head}`;
    const response = await fetch(url, {
        headers: getGitHubHeaders(),
    });

    if (!response.ok) {
        throw new Error(
            `Failed to compare commits. Status: ${response.status}`
        );
    }
    const data = await response.json();
    return data.ahead_by;
}
