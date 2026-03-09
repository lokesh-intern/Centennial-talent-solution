
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  resume: File | null,
}

export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  address?: string;
  phone?: string;
  form?: string;
}