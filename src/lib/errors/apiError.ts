export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class NetworkError extends Error {
  constructor(message = 'Network error occurred') {
    super(message);
    this.name = 'NetworkError';
  }
}

export class UnexpectedError extends Error {
  constructor(public originalError: unknown) {
    super('Unexpected error occurred');
    this.name = 'UnexpectedError';
  }
}
