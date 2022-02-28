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

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView( { behavior: 'smooth' } );
}