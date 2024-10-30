class ErrorResponse extends Error {
  status: number;
  code?: number;
  value?: string;
  errors?: { [key: string]: { message: string } };

  constructor(status: number, message: string, code?: number, value?: string, errors?: { [key: string]: { message: string } }) {
    super(message);
    this.status = status;
    if (code) this.code = code;
    if (value) this.value = value;
    if (errors) this.errors = errors;
  }
}

export default ErrorResponse;
