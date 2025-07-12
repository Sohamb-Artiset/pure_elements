
import React from "react";

export const FounderSection = () => {
  return (
    <section className="py-16 bg-white relative overflow-x-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-0 items-center relative">
          {/* Left: Overlapping Card */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-end relative z-20">
            <div
              className="bg-[#C48A6B] text-white shadow-2xl px-12 py-10 max-w-xl w-[480px] text-center rounded-md"
              style={{
                marginRight: '-80px', // Overlap the image
                boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              }}
            >
              <p className="text-xl leading-relaxed font-medium">
                Each product is meticulously crafted by <b>Dr. Anand Mandhane, M.D. (Ayu Med)</b>, drawing from over two decades of expertise.<br /><br />
                His profound understanding of ancient Ayurvedic herbs, paired with modern scientific insights, ensures that every formulation is Potent, Pure and Safe.
              </p>
            </div>
          </div>

          {/* Right: Founder Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-start relative z-10">
            <div
              className="w-[1067px] h-[491px] overflow-hidden shadow-lg flex items-center justify-center relative"
            >
              <img
                src="https://jvirnmqoonkauanvslun.storage.supabase.co/v1/object/public/landing-page/Founder/imgi_228_Dr.-Anand-Mandhane-768x405.jpg"
                alt="Dr. Anand Mandhane in store"
                className="object-contain w-[1067px] h-[491px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
