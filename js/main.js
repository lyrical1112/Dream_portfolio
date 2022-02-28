'use strict';
// navbar 스크롤링시 배경색 첨부
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener ('scroll', () =>{
    // console.log(window.scrollY);
    // console.log(navbarHeight);
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark')
    }else{
        navbar.classList.remove('navbar--dark')
    }
});

// navbar 메뉴 클릭시 스크롤링
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event)=> {
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    }

    scrollIntoView(link);
});

// contact me 클릭시 스크롤링
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', ()=> {
    scrollIntoView('#contact');
});


// homeContent가 스크롤시 opacity가 서서히 줄어듬
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
    //   console.log(`homeHeight: ${homeHeight}`);    850

    // 컨셉) opacity 값을 바로 적용. (1-스크롤px / 홈의 높이)
    //   console.log(1 - window.scrollY / homeHeight); -> opacity의 값.
    home.style.opacity = 1 - window.scrollY / homeHeight;
});

// top버튼 나오기
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if(window.scrollY > homeHeight / 2) {
        arrowUp.classList.add('visible');
    } else {
        arrowUp.classList.remove('visible');
    }
});

// top버튼 클릭시 move
arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
});







function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView( { behavior: 'smooth' } );
}