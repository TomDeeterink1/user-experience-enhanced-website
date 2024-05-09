    gsap.registerPlugin(ScrollToPlugin)

    const scrollers = document.querySelectorAll(".scrollup");
    
    scrollers.forEach(scroller => {
        scroller.addEventListener('click', () => {
            gsap.to(window, { duration: 1.2, scrollTo: 0, delay: 0.2, ease: "back.out(1.7)" });
        });
    });
  

    // gsap.to(window, { duration: 1.2, scrollTo: 0   , ease: "back.out(1.7)"});
  
    