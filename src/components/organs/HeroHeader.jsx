import React from "react";
// import headerHero from "../assets/img/full-shot1.jpg";
const headerHero = '/static/general/hero/2.jpeg'

const HeroHeader = () => {
  return (
    <React.Fragment>
      <section className="relative pt-32 lg:pt-16">
        <div className="mx-auto max-w-7xl w-full px-5 sm:px-8 md:px-14 lg:px-5 flex flex-col lg:flex-row gap-10 lg:gap-12">
          <div className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0 ">
            <span className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl bg-green-400 blur-xl opacity-60 lg:opacity-95 lg:block hidden"></span>
            <span className="absolute right-4 bottom-12 w-24 h-24 rounded-3xl bg-primary blur-xl opacity-80"></span>
          </div>
          <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-primary to-green-400 absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
          <div
            className="text-gray-600 relative flex flex-col items-center text-center lg:text-left lg:py-7 xl:py-8 
                    lg:items-start lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2"
          >
            <h1
              className="text-white text-3xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight
                        font-bold text-heading-1"
            >
              Fitness mejorado: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-brightRed from-20% via-primary via-30% to-green-600">
                Remodela tu <br />
              </span>{" "}
              refinado contorno corporal.
            </h1>
            <p className="md:text-lg text-heading-3 mt-8 leading-relaxed">Taza de cobre, horquilla de prueba, reliquia freegan, planta de aire neutra, tacos prensados en frío, bolso de mano con barba. Heirloom echo park mlkshk bolso de mano orillo pollo caliente auténtica trufa de cúrcuma hexágono cambray resistente.</p>
            
            <div className="mt-10  w-full flex max-w-md mx-auto lg:mx-0">
              <div className="flex sm:flex-row flex-col gap-5 w-full">
                <form
                  action="#"
                  className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow
                                border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary"
                >
                  <span className="min-w-max pr-2 border-r border-box-border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
                      />
                    </svg>
                  </span>
                  <input
                    type="email"
                    name=""
                    id=""
                    placeholder="johndoe@gmail.com"
                    className="w-full py-3 outline-none bg-transparent"
                  />
                  <button
                    className="px-5 py-2 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
                    after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-brightRedLight
                    bg-brightRed border-transparent hover:border-brightRedLight hover:after:opacity-100 hover:after:scale-[2.5] min-w-max text-white"
                  >
                    <span className="hidden sm:flex relative z-[5]">
                      Comenzar
                    </span>
                    <span className="flex sm:hidden relative z-[5]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                      </svg>
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="flex flex-1 lg:w-1/2 lg:h-auto relative lg:max-w-none lg:mx-0 mx-auto max-w-3xl">
            <img
              src={headerHero}
              alt="Hero image"
              width="2350"
              height="2359"
              className="lg:absolute lg:w-full lg:h-full rounded-3xl object-cover lg:max-h-none max-h-96"
            />
          </div>
        </div>

        {/* <ByNumber/> */}
        <section className="relative mt-12 md:mt-16 text-white">
          <div className="mx-auto max-w-7xl w-full px-5 sm:px-8 md:px-14 lg:px-5">
            <div className="mx-auto lg:mx-0 p-5 sm:p-6 py-6 sm:py-8  rounded-3xl bg-box-bg border border-box-border shadow-lg  shadow-box-shadow md:divide-x divide-box-border grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 md:gap-6 lg:gap-12">
              <div className="text-center">
                <h2 className="font-semibold text-xl sm:text-2xl md:text-4xl text-heading-1">
                  + 140
                </h2>
                <p className="mt-2 text-heading-3">ENTRENADOR EXPERTO</p>
              </div>

              <div className="text-center">
                <h2 className="font-semibold text-xl sm:text-2xl md:text-4xl text-heading-1">
                  + 984
                </h2>
                <p className="mt-2 text-heading-3">MIEMBROS REGISTRADOS</p>
              </div>

              <div className="text-center">
                <h2 className="font-semibold text-xl sm:text-2xl md:text-4xl text-heading-1">
                  + 48
                </h2>
                <p className="mt-2 text-heading-3">PROGRAMA DE FITNESS</p>
              </div>

              <div className="text-center">
                <h2 className="font-semibold text-xl sm:text-2xl md:text-4xl text-heading-1">
                  5+
                </h2>
                <p className="mt-2 text-heading-3">AÑOS</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </React.Fragment>
  );
};

export default HeroHeader;
