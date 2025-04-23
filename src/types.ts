export interface GitHubCredentials {
  username: string;
  email: string;
}

export interface SelectedDates {
  dates: Date[];
}

export interface CommitHistory {
  command: string;
  output: string;
  error?: boolean;
}