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
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
});

// navbar toggle 버튼
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', ()=> {
    navbarMenu.classList.toggle('open');
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

// project 버튼 클릭시 필터링
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__project');
const project = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click' , (e)=> {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (filter == null) {
        return;
    }

    // 버튼 클릭시 active
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = 
        e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');

    projectContainer.classList.add('anim-out');
    setTimeout(()=> {
        projectContainer.classList.remove('anim-out');
    },300);

    
    project.forEach( (project) => {
        if( filter === '*' || filter === project.dataset.type ) {
            project.classList.remove('invisible');
        }else {
            project.classList.add('invisible');
        }
    });
});

// top버튼 클릭시 move
arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
});


// observer
const sectionIds = ['#home','#about','#skills','#work','#contact'];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex = 0; 
let selectedNavItem = navItems[0];
function selectNavItem(selected){
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView( { behavior: 'smooth' } );
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
    root:null,
    rootMargin: '0px',
    threshold: 0.3,
}

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0) {
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            // 스크롤링이 아래로 되어서 페이지가 올라옴
            if(entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1;
            }else {
                selectedNavIndex = index - 1;
            };
        };
    });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
        selectedNavIndex = 0;
    } else if (
        Math.round(window.scrollY + window.innerHeight) >=
        document.body.clientHeight
    ) {
        selectedNavIndex = navItems.length - 1; 
    }
    selectNavItem(navItems[selectedNavIndex]);
});


$(function(){
    // 타이핑효과 
    let text = document.getElementById("typeStyle");
    let typewriter = new Typewriter(text, {
        loop: true
    });

    typewriter.typeString('Welcome to My Portfolio')
        .pauseFor(2000)
        .deleteAll()
        .typeString('New frontend developer')
        .pauseFor(2000)
        // .deleteChars(2)
        // .deleteAll()
        // .typeString('Impossible에 땀 한방울이면 I\'m possible이 된다')
        // .pauseFor(2500)
        .start();
        
    });
    
    // 텍스트 색 변경효과
    let array=["skyblue","yellow","lime","blue","orange","pink"];
    let cnt=0;
    window.onload=function(){
        color();
    }

    function color(){
        if(cnt==6) cnt=0;
        rainbow.style.color=array[cnt++];
        setTimeout("color()",500);
    }
