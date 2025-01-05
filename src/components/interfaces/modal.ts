export interface IModalRes {
  isOpen: boolean;
  isSuccess: boolean;
  message: string;
}

export interface IModalForm {
  isOpen: boolean;
  type: "add" | "edit";
}
