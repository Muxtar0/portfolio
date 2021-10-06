/*----------------------- navigation menu -----------------------*/
(() => {
    const hamburgerBtn = document.querySelector('.hamburger-btn'),
    navMenu = document.querySelector('.nav-menu'),
    closeNavBtn = document.querySelector('.close-nav-menu');

    hamburgerBtn.addEventListener('click' ,showNavMenu);
    closeNavBtn.addEventListener('click' ,showNavMenu);
    function showNavMenu(){
        navMenu.classList.toggle('open');
        bodyStopScrolling();
    }

    // // attach an event hamdler to document
    // document.addEventListener('click' , (e) => {
    //     if(e.target.classList.contains('link-item')){
    //         if(e.target.hash !== ""){
    //             e.preventDefault();
    //             const hash = e.target.hash;
    //             document.querySelector('.section.active').classList.add('hide')
    //             document.querySelector('.section.active').classList.remove('active')

    //             document.querySelector(hash).classList.add('active')
    //             document.querySelector(hash).classList.remove('hide')
    //         }
    //     }
    // })
})();









/*----------------------- about tabs section -----------------------*/

(() => {
    const aboutSection  = document.querySelector('.about-section');
    const tabsContainer = document.querySelector('.about-tabs');

    tabsContainer.addEventListener('click' , (e) => {
        /* id event.target contains 'tab=item' class and not contains 'active' class */
        if(e.target.classList.contains('tab-item') && !e.target.classList.contains('active')){
            const target = e.target.getAttribute('data-target');
            // deactive existing active 'tab-item'
            tabsContainer.querySelector('.active').classList.remove('outer-shadow' , 'active');
            // activate new 'tab-item'
            e.target.classList.add('active' , 'outer-shadow');
            // deactive existing active 'tab-content'
            aboutSection.querySelector('.tab-content.active').classList.remove('active');
            // activate new 'tab-content'
            aboutSection.querySelector(target).classList.add('active')
        }
    })
})();




function bodyStopScrolling(){
    document.body.classList.toggle('stop-scrolling');
}



/*----------------------- portfolio filter and popup -----------------------*/
(() => {
    const filterContainer = document.querySelector('.portfolio-filter');
    const portfolioItemsContainer = document.querySelector('.portfolio-items');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const popup = document.querySelector('.portfolio-popup')
    const prevBtn = document.querySelector('.pp-prev');
    const nextBtn = document.querySelector('.pp-next');
    const closeBtn = document.querySelector('.pp-close');
    const projectDetailsContainer = document.querySelector('.pp-details');
    const projectDetailsBtn = document.querySelector('.pp-project-details-btn');
    let itemIndex, slideIndex, screenShots;

    // filter portfolio items

    filterContainer.addEventListener('click' , (e) => {
        if(e.target.classList.contains('filter-item') && !e.target.classList.contains('active')){
            // deactive existing item 'filter-item'
            filterContainer.querySelector('.active').classList.remove('active' , 'outer-shadow')
            // activate new 'filter-item'
            e.target.classList.add('active' , 'outer-shadow')
            const target = e.target.getAttribute('data-target');
            portfolioItems.forEach(item => {
                if(target === item.getAttribute('data-category') || target == "all"){
                    item.classList.remove('hide')
                    item.classList.add('show')
                }
                else{
                    item.classList.remove('show')
                    item.classList.add('hide')
                }
            });
        }
    })

    portfolioItemsContainer.addEventListener('click' , (e) => {
        if(e.target.closest('.portfolio-item-inner')){
            let portfolioItem = e.target.closest('.portfolio-item-inner').parentElement

            // get the portfolio item index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenShots = portfolioItems[itemIndex].querySelector('.portfolio-item-img img').getAttribute('data-screenshots')
            screenShots = screenShots.split(',')
            slideIndex = 0;
            if(screenShots.length == 1){
                prevBtn.style.display = "none"
                nextBtn.style.display = "none"
            }
            else{
                prevBtn.style.display = "block"
                nextBtn.style.display = "block"
            }
            popupToggle();
            popupSlideShow();
            popupDetails();
        }
    })
    closeBtn.addEventListener('click' , () => {
        popupToggle();
        if(projectDetailsContainer.classList.contains('active')){
            popupDetailsToggle();
        }
    })
    function popupToggle(){
        popup.classList.toggle('open')
        bodyStopScrolling();
    }
    function popupSlideShow(){
        const imgSrc = screenShots[slideIndex];
        const popupImg = document.querySelector('.pp-img');
        // activate loader untill the popup img loaded
        popup.querySelector('.pp-loader').classList.add('active')
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            // deactive loder after the popupImg loaded
            popup.querySelector('.pp-loader').classList.remove('active')

        }
        popup.querySelector('.pp-counter').innerHTML = (slideIndex+1) + " of " + screenShots.length;
    }
    // next slide
    nextBtn.addEventListener('click' , () => {
        if(slideIndex === screenShots.length-1){
            slideIndex = 0;
        }
        else{
            slideIndex++;
        }
        popupSlideShow();
    })

    // prev slide
    prevBtn.addEventListener('click' , () => {
        if(slideIndex === 0){
            slideIndex = screenShots.length-1;
        }
        else{
            slideIndex--;
        }
        popupSlideShow();
    })    

    function popupDetails(){
        // if portfolio-item-details not exsists
        if(!portfolioItems[itemIndex].querySelector('.portfolio-item-details')){
            projectDetailsBtn.style.display = 'none';
            return; // end function execution
        }

        projectDetailsBtn.style.display = 'block';
        // get the project details
        const details =  portfolioItems[itemIndex].querySelector('.portfolio-item-details').innerHTML;
        popup.querySelector('.pp-project-details').innerHTML = details;
        const title =  portfolioItems[itemIndex].querySelector('.portfolio-item-title').innerHTML;
        popup.querySelector('.pp-title h2').innerHTML = title;
        const category = portfolioItems[itemIndex].getAttribute('data-category');
        popup.querySelector('.pp-project-category').innerHTML = category.split('-').join(" ");



    }    

    projectDetailsBtn.addEventListener('click' , () => {
        popupDetailsToggle();
    })
    function popupDetailsToggle(){
        if(projectDetailsContainer.classList.contains('active')){
            projectDetailsBtn.querySelector('i').classList.remove('fa-minus')
            projectDetailsBtn.querySelector('i').classList.add('fa-plus')
            projectDetailsContainer.classList.remove('active');
            projectDetailsContainer.style.maxHeight = 0 + 'px'
        }
        else{
            projectDetailsBtn.querySelector('i').classList.remove('fa-plus')
            projectDetailsBtn.querySelector('i').classList.add('fa-minus')
            projectDetailsContainer.classList.add('active');
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + 'px'; 
            popup.scrollTo(0,projectDetailsContainer.offsetTop)
        }
    }    
})();

/*----------------------- testimonial slider -----------------------*/

(() => {
    const sliderContainer = document.querySelector('.testi-slider-container'),
    slides = document.querySelectorAll('.testi-item'),
    sliderWidth = sliderContainer.offsetWidth,
    prevBtn = document.querySelector('.testi-slider-nav .prev'),
    nextBtn = document.querySelector('.testi-slider-nav .next'),
    activeSlide = sliderContainer.querySelector('.testi-item.active')
    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);
    // set width of all slides
    slides.forEach((slide) => {
        slide.style.width = sliderWidth + 'px';
    })

    // set width of slider container
    sliderContainer.style.width = sliderWidth * slides.length + 'px';

    nextBtn.addEventListener('click' , (e) => {
        if(slideIndex === slides.length - 1){
            slideIndex =0;
        }
        else{
            slideIndex++;
        }
        slider();
    })
    prevBtn.addEventListener('click' , (e) => {
        if(slideIndex === 0){
            slideIndex = slides.length - 1;
        }
        else{
            slideIndex--;
        }
        slider();
    })
    function slider(){
        // deactive existing active slider 
        sliderContainer.querySelector('.testi-item.active').classList.remove('active');
        // active new slide
        slides[slideIndex].classList.add('active');
        sliderContainer.style.marginLeft =  - (sliderWidth * slideIndex) + 'px'; 
    }
})();

/*----------------------- hide all sections except active -----------------------*/
// (() => {
//     const sections = document.querySelectorAll('.section')
//     sections.forEach((section) => {
//         if(!section.classList.contains('active')){
//             section.classList.add("hide");
//         }
//     })
// })();


window.addEventListener('load' , (e) => {
    document.querySelector('.preloader').classList.add('fade-out')
    setTimeout(() => {
        document.querySelector('.preloader').style.display = 'none'
    },600)
})


// Languages

const changeLanguagesBtn= document.querySelector('.language-div');
const changeLanguagesBtnTextContent= document.querySelector('.language-div p');
const homeSection_home_text_p = document.querySelector('.home-section .home-text p')
const homeSection_home_text_h2 = document.querySelector('.home-section .home-text h2')
const homeSection_home_text_h1 = document.querySelector('.home-section .home-text h1')
const more_about_me_btn = document.querySelector('.home-section .more_about_me_btn')
const about_section_title = document.querySelector('.about-section .section-title h2')
const service_section_title = document.querySelector('.service-section .section-title h2')
const portfolio_section_title = document.querySelector('.portfolio-section .section-title h2')
const contact_section_title = document.querySelector('.contact-section .section-title h2')
const about_section_info_first_p = document.querySelector('.about-section .about-info .first_p')
const about_section_info_second_p = document.querySelector('.about-section .about-info .second_p')
const about_section_info_download_cv_btn = document.querySelector('.about-section .about-info .download_cv_btn')
const about_section_info_hire_me_btn = document.querySelector('.about-section .about-info .hire_me_btn')
const about_section_about_tabs_skills_span = document.querySelector('.about-section .about-tabs .skills_span')
const about_section_about_tabs_education_span = document.querySelector('.about-section .about-tabs .education_span')
const about_section_about_tabs_experience_span = document.querySelector('.about-section .about-tabs .experience_span')
const about_section_first_experience__item_span = document.querySelector('.about-section .experience .first_experience__item_span')
const about_section_education_first_education_timeline_p = document.querySelector('.education .first_education_timeline_p')
const about_section_education_first_education_timeline_h3 = document.querySelector('.education .first_education_timeline_h3')
const about_section_education_first_education_timeline_span = document.querySelector('.education .first_education_timeline_span')
const about_section_second_experience__item_span = document.querySelector('.about-section .experience .second_experience__item_span')
const contact_item_phone = document.querySelector('.contact-section .contact_item_phone span')
const contact_send_message = document.querySelector('.contact-section .contact-form .submit-btn button')
const contact_name_input = document.querySelector('.contact-section .contact-form .name_input')



let language = 'az';
changeLanguagesBtn.addEventListener('click' , (e) => {
    if(language == 'az'){
        changeLanguagesBtnTextContent.innerHTML = 'EN';
        language = 'en';
        homeSection_home_text_p.innerHTML = 'Salam';
        homeSection_home_text_h2.innerHTML = "Mən Muxtar";
        homeSection_home_text_h1.innerHTML = "Web Designer & Developer";
        more_about_me_btn.innerHTML = "Haqqımda Daha Çox";
        about_section_title.innerHTML = "Mənim Haqqımda";
        about_section_info_first_p.innerHTML = '<span>Salam! Mənim adım Muxtardır. Mən Web Developerəm.</span>Yeni və yüksək texnologiyaları araşdırmağı və örgənməyi sevirəm.Bu işi də sevirəm)).Mən hələdə bu işi örgənirəm, yeniliklərə açığam,dayanmadan özümü inkişaf etdirməyə çalışıram.Lakin az yaşıma baxmayaraq bir çox sahəyə hakiməm.'
        about_section_info_second_p.innerHTML = "Məsələn:Html,Css,JavaScript dillərini bilirəm.Digər dillərədə biraz hakiməm:BootStrap,Swiper,OverCarusel,ScrollMagic,Materialİcons və sairə...Bu kimi kitabxanalara da hakiməm və həmişə örgənməyə davam edəcəyəm.Düzəltdiyim proyeklərə isə aşağıdakı proyektlər bölməsindən baxa bilərsiniz."
        about_section_info_download_cv_btn.innerHTML = "CV-mi Yüklə"
        about_section_info_hire_me_btn.innerHTML = "Əlaqə Qurun"
        contact_item_phone.innerHTML = "Telefon"
        contact_send_message.innerHTML = "Əlaqə Qur"
        about_section_about_tabs_skills_span.innerHTML = "Yetənəklər" 
        about_section_about_tabs_experience_span.innerHTML = "Təcrübələr" 
        about_section_about_tabs_education_span.innerHTML = "Təhsil" 
        about_section_first_experience__item_span.innerHTML = "Burada işlədiyim müddətcə çox təcrübə qazandım və artıq iş dünyasına hakim olmağa başlamışam."
        about_section_second_experience__item_span.innerHTML = "Yaşım az olduğu üçün çox yerdə işləməmişəm.Lakin 2019-cu ildən etibarən hər an yeni bir şey örgənmək üçün çabalayıram."
        about_section_education_first_education_timeline_p.innerHTML = "Hələki orta məktəbdə təhsil alıram.Lakin hədəfim ilk öncə Türkiyədə oxumaq sonra isə Amerikaya getməkdir." 
        about_section_education_first_education_timeline_h3.innerHTML = "Orta Məktəb"
        about_section_education_first_education_timeline_span.innerHTML = "2010 - Hələ də Orta Məktəbdə Təhsil Alıram"
        service_section_title.innerHTML = "Nələr Edə Bilirəm"
        portfolio_section_title.innerHTML = "Son İşlərim"
        contact_section_title.innerHTML = "Mənimlə Əlaqə"
    }
    else if(language == 'en'){
        changeLanguagesBtnTextContent.innerHTML = 'AZ';
        language = 'az';
        homeSection_home_text_p.innerHTML = 'Hello';
        homeSection_home_text_h2.innerHTML = "I'm Muxtar";
        homeSection_home_text_h1.innerHTML = "Web Designer & Developer";
        more_about_me_btn.innerHTML = "More About Me";
        about_section_title.innerHTML = "About Me";
        about_section_info_first_p.innerHTML = "<span>Hi! My name is The Muxtar. I am a Web Developer.</span> I live in Baku, Azerbaijan.I'am 16.I love to explore and learn new and high technologies. I love this job too)). I am still learning this business, I am open to innovations, I am constantly trying to improve myself."
        about_section_info_second_p.innerHTML = "For example: I know Html, Css, JavaScript. I am a bit of a master of other languages.I also know libraries like this: BootStrap, Swiper, OverCarusel, ScrollMagic, MaterialIcons and so... , I will always continue to learn.You can see the projects I created in the projects section below."
        about_section_info_download_cv_btn.innerHTML = "Hire Me"
        contact_item_phone.innerHTML = "Phone"
        contact_send_message.innerHTML = "Send Message"
        about_section_about_tabs_skills_span.innerHTML = "skills" 
        about_section_about_tabs_experience_span.innerHTML = "experience" 
        about_section_about_tabs_education_span.innerHTML = "education" 
        about_section_first_experience__item_span.innerHTML = "While working here, I gained a lot of experience and have already begun to dominate the business world."
        about_section_second_experience__item_span.innerHTML = "I haven't worked in many places because I'm young. But since 2019, I'm always trying to learn something new."
        about_section_education_first_education_timeline_p.innerHTML = "I am still studying in high school. But my goal is to study in Turkey first and then go to America."
        about_section_education_first_education_timeline_h3.innerHTML = "High school"
        about_section_education_first_education_timeline_span.innerHTML = "2010 - I'm still study in High school"
        service_section_title.innerHTML = "What I Do"
        portfolio_section_title.innerHTML = "Latest Works"
        contact_section_title.innerHTML = "Get In Touch"
    }
})