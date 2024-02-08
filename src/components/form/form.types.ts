interface RuleProps {
  required: boolean;
  message: string;
}

interface InputProps {
  label: string;
  name: string;
  rules: RuleProps[];
  valueType: 'text' | 'number' | 'password';
}

type InitialValuesType = Partial<{ [key: string]: string | number }>;

export interface FormProps {
  inputs: InputProps[];
  initialValues?: InitialValuesType;
  onFinish: (values: any) => void;
  onFinishFailed: (errorInfo: any) => void;
}
