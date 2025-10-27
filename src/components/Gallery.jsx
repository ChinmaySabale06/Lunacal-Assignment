import { useState, useRef } from "react";

const Gallery = () => {
  const placeholder = "https://picsum.photos/400/300?random=42";
  const [images, setImages] = useState([
    { src: placeholder },
    { src: placeholder },
    { src: placeholder },
  ]);
  
  const scrollerRef = useRef(null);

  const addImage = () => {
    setImages((prev) => [...prev, { src: placeholder, rot: Math.random() > 0.5 ? 'group-hover:rotate-1' : 'group-hover:-rotate-1' }]);
  };

  const scrollByAmount = (amount) => {
    const s = scrollerRef.current;
    if (!s) return;
    s.scrollBy({ left: amount, behavior: "smooth" });
  };

  const next = () => {
    const s = scrollerRef.current;
    if (!s) return;
    const img = s.querySelector("img");
    const gap = 16;
    const amount = img ? img.offsetWidth + gap : Math.floor(s.clientWidth * 0.6);
    scrollByAmount(amount);
  };

  const prev = () => {
    const s = scrollerRef.current;
    if (!s) return;
    const img = s.querySelector("img");
    const gap = 16;
    const amount = img ? img.offsetWidth + gap : Math.floor(s.clientWidth * 0.6);
    scrollByAmount(-amount);
  };

  return (
  <div className="bg-gray-800 rounded-2xl p-6 shadow-lg w-full max-w-[720px] relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="bg-black text-white px-5 py-2 rounded-xl font-semibold text-lg">Gallery</h2>

        <div className="flex items-center gap-3">
          <button
            onClick={addImage}
            className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm uppercase"
          >
            + Add Image
          </button>

          <div className="flex items-center gap-2">
            <button onClick={prev} aria-label="Previous" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button onClick={next} aria-label="Next" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden">
        <div ref={scrollerRef} className="flex gap-4 overflow-x-auto pb-2 md:w-[512px] w-full hide-scrollbar">
          {images.map((imgObj, i) => (
            <div key={i} className="group rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={imgObj.src}
                alt={`Gallery ${i}`}
                className={`w-40 h-40 object-cover rounded-xl transition-all duration-300 transform filter grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:shadow-2xl cursor-pointer`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;