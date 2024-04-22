//    carousel animation
   gsap.from('.card', {duration: 1.06, x: '100vw', ease: "sine.out"});

// detail page animation
const timeline = gsap.timeline()
    timeline.from('.detail--text-image' , { duration: 1.06, x: '-110vw'})
    timeline.from('.fav-carousel' , {duration:0.9 , x:'-50vw' ,ease: "sine.out" })