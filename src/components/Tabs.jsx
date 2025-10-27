import { useState, useRef, useEffect } from "react";

const Tabs = () => {
  const tabs = ["About Me", "Experiences", "Recommended"];
  const [active, setActive] = useState("About Me");
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const btnRefs = useRef([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [contentVisible, setContentVisible] = useState(false);

  const content = {
    "About Me":
      "Hello! I'm Dave, your sales rep here from Salesforce. I’ve been working here for 3 years now. I was born and raised in Albany, NY and have been living in Santa Carla for the past 10 years with my wife Tiffany and twin daughters.",
    "Experiences":
      "Over the last 3 years, I’ve led sales projects, improved CRM workflows, and achieved 120% of my yearly goals.",
    "Recommended":
      "Dave is highly recommended for his client engagement, attention to detail, and problem-solving mindset.",
  };
  useEffect(() => {
    // update activeIndex when active label changes
    const idx = tabs.indexOf(active);
    setActiveIndex(idx >= 0 ? idx : 0);
  }, [active]);

  useEffect(() => {
    const update = () => {
      const container = containerRef.current;
      const btn = btnRefs.current[activeIndex];
      if (!container || !btn) return;
      const cRect = container.getBoundingClientRect();
      const bRect = btn.getBoundingClientRect();
      const left = bRect.left - cRect.left + container.scrollLeft;
      setIndicator({ left, width: bRect.width });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeIndex]);

  // trigger content animation on active change
  useEffect(() => {
    setContentVisible(false);
    const t = setTimeout(() => setContentVisible(true), 10);
    return () => clearTimeout(t);
  }, [active]);

  return (
  <div className="bg-gray-800 rounded-2xl p-6 shadow-lg w-full max-w-[720px]">
      <div ref={containerRef} className="relative bg-gray-900 rounded-xl p-3 mb-4 shadow-md">
        {/* sliding indicator centered vertically behind each tab */}
        <div
          aria-hidden
          className="absolute left-0 top-1/2 h-10 bg-black rounded-lg shadow-lg transition-all duration-400 ease-in-out"
          style={{ transform: `translateX(${indicator.left}px) translateY(-50%)`, width: indicator.width }}
        />

        <div className="relative flex gap-2 z-10">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              ref={(el) => (btnRefs.current[i] = el)}
              onClick={() => setActive(tab)}
              className={`flex-1 py-3 rounded-xl text-md font-semibold transition-all duration-300 ease-in-out relative text-left px-4 ${
                  activeIndex === i
                    ? "text-white shadow-2xl -translate-y-0.5"
                    : "text-gray-400 hover:text-white"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
        {/* Keep the content container stable size so switching tabs doesn't resize the component */}
        <div className={`text-gray-300 text-base leading-relaxed min-h-[140px] transition-all duration-500 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          {/* Show full content for About Me (allow wrapping) */}
          <div className="break-words">{content[active]}</div>
        </div>
    </div>
  );
}

export default Tabs;