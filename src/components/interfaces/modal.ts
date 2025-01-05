export interface IModalRes {
  isOpen: boolean;
  isSuccess: boolean;
  message: string;
}

export interface IModalForm<T = any> {
  isOpen: boolean;
  type: "add" | "edit";
  selectedData?: T;
}
