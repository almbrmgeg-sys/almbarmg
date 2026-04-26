export type Priority = 'منخفضة' | 'متوسطة' | 'عالية' | 'حرجة';

export interface DashboardData {
  summary: {
    openTasks: number;
    openTickets: number;
    activeDevices: number;
    plannedMaintenance: number;
  };
  charts: {
    ticketsByStatus: Array<{label: string; value: number}>;
    tasksByPriority: Array<{label: string; value: number}>;
  };
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: Priority;
  start_date: string;
  due_date: string;
  assignee_name: string;
}

export interface Ticket {
  id: number;
  ticket_number: string;
  issue_type: string;
  description: string;
  status: string;
  priority: string;
  requester_name: string;
  opened_at: string;
  closed_at: string | null;
}

export interface Device {
  id: number;
  name: string;
  type: string;
  model: string;
  serial_number: string;
  assigned_user_name: string;
  status: string;
  received_date: string;
  notes: string;
}

export interface Maintenance {
  id: number;
  device_name: string;
  maintenance_type: string;
  maintenance_date: string;
  technician_name: string;
  status: string;
  notes: string;
}
