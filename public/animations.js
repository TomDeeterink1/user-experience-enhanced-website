// // popup animation

// const timeliner = gsap.timeline()
//  timeliner.from('.popup', {duration: 0.8 , x: '200vw'});

//  const popupbutton = document.getElementById('popbutton');

//  popupbutton.addEventListener('click', () =>{
//     timeliner.reverse()
//  })




//    carousel animation
   gsap.from('.card', {duration: 1.01, y: '100vw'});

// detail page animation
const timeline = gsap.timeline()
    timeline.from('.detail--text-image' , { duration: 1.06, x: '-110vw'})
    timeline.from('.fav-carousel' , {duration:0.9 , x:'-50vw' ,ease: "sine.out" })

