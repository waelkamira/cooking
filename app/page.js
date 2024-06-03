import SideBar from '../components/SideBar';
import HomePage from '../components/HomePage';
import HomePageSidesPhotos from '../components/HomePageSidesPhotos';
export default function Home() {
  return (
    <div className="relative w-full flex justify-center">
      <main className="flex items-start justify-center bg-four rounded-3xl overflow-hidden z-50 h-full w-full border border-one">
        <SideBar className="hidden xl:block h-full" />
        <HomePage className="w-full" />
      </main>
      <HomePageSidesPhotos />
    </div>
  );
}
