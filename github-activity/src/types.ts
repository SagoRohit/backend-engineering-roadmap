export interface Repo {
    name: string;
}

export interface PushPayload {
    before: string;
    head: string;
}

export interface GitHubEvent {
    type: string;
    repo: Repo;
    payload: unknown;
}