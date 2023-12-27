import { ModeToggle } from "./ModeToggle";
import Column from "./column";
import NewTodoDialog from "./new-todo-dialog";

export default function Columns() {
  return (
    <div>
      <div className='flex items-center gap-4 lg:gap-10'>
        <NewTodoDialog />
        <ModeToggle />
      </div>

      <section className='mt-10 flex gap-4 lg:gap-10'>
        <Column title='Todo' status='TODO' />
        <Column title='In Progress' status='IN_PROGRESS' />
        <Column title='Done' status='DONE' />
      </section>
    </div>
  );
}
