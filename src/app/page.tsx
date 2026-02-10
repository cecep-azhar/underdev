import StarBackground from '@/components/StarBackground';
import Countdown from '@/components/Countdown';

export default function Home() {
  return (
    <>
      <StarBackground />
      <main>
        <h1>Under Construction</h1>
        <p>We are crafting something extraordinary. Our website is currently undergoing scheduled maintenance and upgrades.</p>
        <Countdown />
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Under Development. All Rights Reserved.</p>
      </footer>
    </>
  );
}
