import TabsWidget from "./components/Tabs";
import GalleryWidget from "./components/Gallery";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111827] text-white">
      <div className="flex flex-col gap-8 md:flex-row md:justify-end md:w-4/5 w-full px-6">
        <div className="hidden md:block md:w-1/2" />

        <div className="flex flex-col gap-6 md:w-1/2 w-full items-center md:items-end">
          <div className="w-full max-w-[500px]">
            <TabsWidget />
          </div>

          <div className="w-full max-w-[500px]">
            <GalleryWidget />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;