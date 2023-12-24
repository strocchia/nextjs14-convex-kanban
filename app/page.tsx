import Columns from "@/components/columns";

export default function Home() {
  return (
    // {/* <section className='flex h-screen bg-gradient-to-br from-gray-700 to-gray-900 py-12 text-white'> */}
    <section className='flex h-screen bg-blue-500 py-12 text-white dark:bg-gray-800'>
      <div className='mx-auto w-full max-w-7xl px-6'>
        <Columns />
      </div>
    </section>
  );
}
