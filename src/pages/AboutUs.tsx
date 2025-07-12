import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="w-full max-w-full mx-auto space-y-12">
          {/* Section 1: Image left, text right */}
          <div className="relative flex flex-col md:flex-row items-start gap-20">
            <div className="w-full md:w-[340px] lg:w-[400px] xl:w-[470px] flex-shrink-0 self-start">
              <img
                src="https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/about-us//WhatsApp-Image-2024-04-23-at-5.54.35-PM-1024x671.jpeg"
                width={560}
                height={366}
                className="rounded-lg shadow-lg object-cover sticky top-20 max-w-full h-auto"
              />
            </div>
            <div className="flex-1">
              <h2 className="font-montserrat font-medium text-[24px] leading-[24px] text-[rgb(63,63,63)] mb-4">
                Our Story
              </h2>
              <p className="text-[rgb(63,63,63)] mb-6 font-montserrat font-normal text-[16px] leading-[24px]">
                Welcome to Pure Elements, where all the goodness of nature is
                discovered from pure ingredients, pure thinking and pure passion.
                PURE ELEMENTS is an ayurveda based beauty and wellness care system
                specially crafted for a beautiful YOU! This journey started two
                decades ago by Dr. Anand Mandhane (MD. Ayu Med) & Dr. Suteja
                Mandhane (Ayu Med) from their own Spa at Mahabaleshwar, the very
                heart of nature.
                <br />
                <br />
                While catering to their spa clients, they realised the need of
                result-oriented natural beauty products. Their vast experience of
                spa industry and deep knowledge of ayurveda came handy and they
                began experimenting with ayurvedic decoctions and herbal extracts
                in their kitchen. This ultimately evolved into a full-fledged R&D
                lab and scientific formulations. Huge response from their
                thousands of happy customers led to a well-known brand, PURE
                ELEMENTS in a very short time.
                <br />
                <br />
                The effectiveness of this product line is reflected through the
                innumerable radiant faces and their trust & love.
                <br />
                <br /> As a proud Indian brand, we draw our inspiration from our
                ancient culture and vedic wisdom. We strongly believe that by
                combining modern science with traditional wisdom, we can deliver
                the quality which is at par with the best in the world !<br />
                <br />
                Our founder Dr. Anand Mandhane's in-depth knowledge of ayurvedic
                herbs and expertise in understanding their use on the human body
                has been appreciated by thousands of happy customers in the last
                two decades.
              </p>
            </div>
          </div>

          {/* Section 2: Text left, image right */}
          <div className="relative flex flex-col md:flex-row items-start gap-20 md:flex-row-reverse">
            <div className="w-full md:w-[340px] lg:w-[400px] xl:w-[464px] flex-shrink-0 self-start">
              <img
                src="https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/about-us//Ancient-Wisdom.jpg"
                alt="Mahabaleshwar Store"
                width={464}
                height={372}
                className="rounded-lg shadow-lg object-cover sticky top-20 max-w-full h-auto"
              />
            </div>
            <div className="flex-1">
              <h2 className="font-montserrat font-medium text-[24px] leading-[24px] text-[rgb(63,63,63)] mb-4">
                The Formulation
              </h2>
              <p className="text-[rgb(63,63,63)] mb-6 font-montserrat font-normal text-[16px] leading-[24px]">
                Every formulation at PURE ELEMENTS is developed personally by Dr.
                Anand Mandhane, who is a postgraduate in Ayurvedic Medicine and
                Dr. Suteja Mandhane.
                <br />
                <br />
                Their combined experience of four decades in the field of Ayurveda
                and Spa / Beauty industry is the backoone or unese tormulations.
                <br />
                <br />
                Every ingredient is thoroughly studied for its efficacy and safety
                before it makes the way in a formulation.
                <br />
                <br />
                Dr. Anand & Suteja spend considerable time in their own R&D lab
                for developing various products. By combining time-tested holistic
                practices with the latest in technology, every formulation is
                developed carefully to deliver desired results
                <br />
                <br />
                Every formulation goes through multiple trials to get the perfect
                texture, fragrance, colour or viscosity
                <br />
                <br />
                Once the desired product is developed in a lab, it goes for
                "Stability Testing".
                <br />
                <br />
                A stringent testing method based on various parameters is followed
                to ensure that the formulation will remain stable and effective
                throughout its shelf life.
                <br />
                <br />
                Our formulations are 100% clean, vegan, and cruelty free and
                contain no parabens, phthalates, mineral oil, and the other
                harmful chemicals.
                <br />
                <br />
                At PURE ELEMENTS, we aim towards simplification of skincare and
                create effective products through the ingredients offered by
                Mother Nature! Every product comes with a promise of ayurveda –
                Safety & Performance!
              </p>
            </div>
          </div>

          {/* Section 3: Image left, text right */}
          <div className="flex flex-col md:flex-row items-start gap-20">
            <div className="w-full md:w-[340px] lg:w-[400px] xl:w-[470px] flex-shrink-0 self-start">
              <img
                src="https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/about-us//Ingredients.jpg"
                alt="Store 2"
                width={470}
                height={80}
                className="rounded-lg shadow-lg object-cover max-w-full h-auto"
              />
            </div>
            <div className="flex-1">
              <h2 className="font-montserrat font-medium text-[24px] leading-[24px] text-[rgb(63,63,63)] mb-4">
                Ingredients
              </h2>
              <p className="text-[rgb(63,63,63)] mb-6 font-montserrat font-normal text-[16px] leading-[24px]">
                The Real Heroes, are selected from ayurvedic texts and picked up
                from mother nature.
                <br />
                <br />
                Roots / Fruits / Leaves / Flowers / Barks. almost every part of
                the plant is used in various formulations.
                <br />
                <br />
                Ingredients come in all possible forms … powders / juices /
                aqueous extracts / oil extracts / essential oils / raw herbs etc.
                <br />
                <br />
                Their essence is derived sometimes by grinding, sometimes
                squeezing / cold pressing / roasting / steam distilling / boiling
                or crushing.
                <br />
                <br />
                These natural treasures are then blended with modern goodies like
                vitamins / proteins / peptides etc. to enhance the efficacy of a
                formulation.
                <br />
                <br />
                We carefully select all our ingredients so that they're safe for
                you, your skin and the environment.
                <br />
                <br />
                All ingredients are sourced in an ethical way and no animal is
                harmed in the process.
                <br />
                <br />
                They are Potent, Pure & Safe!
              </p>
            </div>
          </div>

          {/* Section 4: Text left, image right */}
          <div className="flex flex-col md:flex-row items-start gap-20">
            <div className="flex-1 md:w-[770px]">
              <h2 className="font-montserrat font-medium text-[24px] leading-[24px] text-[rgb(63,63,63)] mb-4">
                Safety
              </h2>
              <p className="text-[rgb(63,63,63)] mb-6 font-montserrat font-normal text-[16px] leading-[24px] w-150">
                Safety is the single most important criterion at PURE ELEMENTS
                while selecting the ingredients and raw materials
                <br />
                <br />
                All our products are free from Paraben Preservatives.
                <br />
                <br />
                We do not use harmful chemicals, petroleum products, paraffin oil,
                SLS, formaldehydes, phthalates etc.
                <br />
                <br />
                Every ingredient used in our formulations undergoes extensive
                scrutiny, not only for its friendliness with skin& hair but with
                the environment also.
              </p>
            </div>
            <div className="w-full md:w-[340px] lg:w-[400px] xl:w-[307px] flex-shrink-0 self-start">
              <img
                src="https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/about-us//Toxin-Free-e1710503110276.jpg"
                alt="Store 3"
                width={307}
                height={316}
                className="rounded-lg shadow-lg object-cover max-w-full h-auto"
              />
            </div>
          </div>

          {/* Section 5: Image left, text right */}
          <div className="flex flex-col md:flex-row items-start gap-20">
            <div className="w-full md:w-[340px] lg:w-[400px] xl:w-[336px] flex-shrink-0 self-start">
              <img
                src="https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/about-us//Cult-Formulas.jpg"
                alt="Sunscreen Banner"
                width={336}
                height={445}
                className="rounded-lg shadow-lg object-cover max-w-full h-auto"
              />
            </div>
            <div className="flex-1 md:w-[770px]">
              <h2 className="font-montserrat font-medium text-[24px] leading-[24px] text-[rgb(63,63,63)] mb-4">
                Efficacy
              </h2>
              <p className="text-[rgb(63,63,63)] mb-6 font-montserrat font-normal text-[16px] leading-[24px]">
                Every ingredient is selected, and every formulation is developed
                in such a way that it should do what it is supposed to do.
                <br />
                <br />
                Potency and Efficacy is one of the most important factors which
                has made PURE ELEMENTS so popular among its users.
                <br />
                <br />
                Pure Thinking
                <br />
                Pure Ingredients
                <br />
                PURE ELEMENTS
                <br />
                <br />
                The Promise of Ayurveda !
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
