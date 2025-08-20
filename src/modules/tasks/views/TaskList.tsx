import { DataTable } from '@/shared/components/ui/DataTable/DataTable';
import type { ColumnDef } from '@tanstack/react-table';
import { tasks, type Task } from '../models/Task';

export const TaskList = () => {
  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
  ];
  return (
    <section>
      <DataTable columns={columns} data={tasks}></DataTable>
    </section>
  );
};
