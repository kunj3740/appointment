import { Doctors } from '@/components/doctors';
import { Hero } from '@/components/hero';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Doctors />
    </main>
  );
}