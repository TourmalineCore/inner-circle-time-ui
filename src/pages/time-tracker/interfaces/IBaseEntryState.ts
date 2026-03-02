export interface IBaseEntryState {  
  get error(): string,
  setError: ({
    error,
  }: {
    error: string,
  }) => unknown,
  resetError: () => unknown,
}