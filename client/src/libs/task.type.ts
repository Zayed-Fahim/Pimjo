export type TaskProps = {
  _id: string;
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  fetchTasks: () => Promise<void>;
};

export type TaskFormData = {
  title: string;
  description: string;
  dueDate: string;
  status: string;
  priority: string;
};

export type TaskModalProps = {
  onSubmit: (data: TaskFormData) => void;
  onClose: () => void;
  isLoading?: boolean;
  submissionStatus: {
    type: "success" | "error" | "default";
    message: string;
  };
  task?: {
    _id?: string;
    title: string;
    description: string;
    dueDate?: string;
    status: string;
    priority: string;
  };
};
