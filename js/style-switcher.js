const styleSwitcherToggler = document.querySelector('.style-switcher-toggler');

styleSwitcherToggler.addEventListener('click' , (e) => {
    document.querySelector('.style-switcher').classList.toggle('open')
})

window.addEventListener('scroll' , () => {
    if(document.querySelector('.style-switcher').classList.contains('open')){
        document.querySelector('.style-switcher').classList.remove('open')
    }
})


const alternateStyle = document.querySelectorAll('.alternate-style')
function setActiveStyle(color){
    localStorage.setItem('color' , color);
    changeColor();

}
function changeColor(){
    alternateStyle.forEach((style) => {
        if(localStorage.getItem('color') === style.getAttribute('title')){
            style.removeAttribute('disabled');
        }
        else{
            style.setAttribute('disabled' , 'true');
        }
    })
}
if(localStorage.getItem('color') !== null){
    changeColor();
}
/*----------------------------- light and dark mode ------------------------------------------------ */
const dayNight = document.querySelector('.day-night');

dayNight.addEventListener('click' , () => {
    document.body.classList.toggle('dark');
    if(document.body.classList.contains('dark')){
        localStorage.setItem('theme' , 'dark');
    }
    else{
        localStorage.setItem('theme' , 'light');
    }
    updateIcon();
})
function themeMode(){
    if(localStorage.getItem('theme') !== null){
        if(localStorage.getItem('theme') == 'dark'){
            document.body.classList.add('dark');
        }
        else{
            document.body.classList.remove('dark');
        }
    }


updateIcon();
}
themeMode();
function updateIcon(){
    if(document.body.classList.contains('dark')){
        dayNight.querySelector('i').classList.remove('fa-moon');
        dayNight.querySelector('i').classList.add('fa-sun');
    }
    else{
        dayNight.querySelector('i').classList.remove('fa-sun');
        dayNight.querySelector('i').classList.add('fa-moon');    
    }
}

