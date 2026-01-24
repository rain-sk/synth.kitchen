export type LoginResponse = { jwt: string } | { register: true };

type FormErrors = {
  email: string[];
  username: string[];
  password: string[];
  confirmPassword: string[];
  form: string[];
};

export type RegisterResponse = { jwt: string } | { errors: FormErrors };
