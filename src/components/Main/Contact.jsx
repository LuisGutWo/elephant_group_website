import React, { useEffect } from 'react';
import Link from 'next/link';
//= Scripts
import parallaxie from '@/common/parallaxie';

function Contact({ lightMode, innerPageStyle }) {
  useEffect(() => {
    parallaxie(`.sec-bg-img.parallaxie`, 0.4);
  }, []);

  return (
    <section className="contact-img">
      <div className="container">
        <div className="sec-bg-img bg-img parallaxie" data-background="/dark/assets/imgs/background/viña-del-mar.webp"></div>
        <div className="sec-lg-head section-padding">
          <div className="row ontop">
            <div className="col-11 d-flex align-items-center bg-dark">
              <div className="valign">
                <h2 className="fz-50 d-rotate wow">
                  <span className="rotate-text">Tienes un proyecto en mente?</span>
                  <span className="rotate-text">Entonces <span className={innerPageStyle ? '' : 'sub-font'}>trabajemos juntos.</span>.</span>
                </h2>
              </div>
              <div className="ml-auto">
                <Link href={`/${lightMode ? "dark/page-contact" : "light/page-contact"}`} className="butn-circle d-flex align-items-center text-center m-auto">
                  <div className="full-width">
                    <span><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z" fill="currentColor"></path>
                    </svg></span>
                    <span className="full-width">Escríbenos</span>
                  </div>
                  <img src={`/${lightMode ? 'light' : 'dark'}/assets/imgs/svg-assets/circle-star.svg`} alt="" className="circle-star" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact