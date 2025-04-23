declare module 'download-git-repo' {
  type DownloadGitRepoCallback = (err: Error | null) => void;
  type optionType = { clone: boolean, cwd?: string }; //TODO add more propert
  /**
   * @param repo git-repo url 
   * @param dest local directory path
   * @param options options object, e.g. { clone: true }
   * @param callback exec callback function
   */
  function download(repo: string, dest: string, options: optionType, callback?: DownloadGitRepoCallback): void;
  function download(repo: string, dest: string, callback: DownloadGitRepoCallback): void;
  export = download;
}