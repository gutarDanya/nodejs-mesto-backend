class SignupError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 409;
  }
}

export default SignupError;
