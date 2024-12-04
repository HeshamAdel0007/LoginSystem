import Link from 'next/link'

const Home = () => {
  return (
    <div className='flex gap-2 mt-2 w-full h-screen justify-center items-center'>
      <div>
        <Link href="/login">Login</Link>
      </div>
      <div>
        <Link href="/register">Register</Link>
      </div>
    </div>
  );
}
export default Home;
