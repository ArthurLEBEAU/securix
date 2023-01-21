import { getMonthFromNumber } from './helper.js'

$(window).on('load', function() {
    $(".preloaded").fadeOut('slow');
});

$(document).ready(function() {

    const close = document.querySelector('.close')
    const menuTogle = document.querySelector('.menu-togle')
    const menu = document.querySelector('header ul')
    const header = document.querySelector('header')
    const categories = document.querySelectorAll(".services_categories li a")
    const cardsHeaderDay = document.querySelectorAll('.blog_header_date_day')
    const cardsHeaderMonth = document.querySelectorAll('.blog_header_date_month')
    const cards_summary = document.querySelectorAll('.blog_content_text')

    // get the date from he html data-attribut to convert
    cardsHeaderDay.forEach(d => {
        let stringD = d.getAttribute('data-val')
        let ndate = stringD ? new Date(stringD) : new Date()
        d.innerHTML = ndate.getDate()
    })
    cardsHeaderMonth.forEach(d => {
        let stringD = d.getAttribute('data-val')
        let ndate = stringD ? new Date(stringD) : new Date()
        d.innerHTML = getMonthFromNumber(ndate.getMonth())
    })

    // add the carouselle on the card list
    const owl = $(".article_list")
    owl.owlCarousel({
        loop: true,
        autoplay: false,
        margin: 0,
        responsiveClass: true,
        nav: false,
        dots: false,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
                // nav:true
            },
            900: {
                items: 3,
                // nav:true
            },
            1200: {
                items: 4,
                // nav:true
            }
        }
    });
    $(".blog .arrows .left").on('click', function(e) {
        owl.trigger('prev.owl');
    });
    $(".blog .arrows .right").on('click', function(e) {
        owl.trigger('next.owl');
    });

    // add the close click event to close the side bar
    close.addEventListener('click', () => {
        menuTogle.classList.remove('opacity-0')
        menuTogle.classList.add('opacity-1')
        menu.classList.remove('show')
    })

    // add the close click event to open the side bar
    menuTogle.addEventListener('click', () => {
        menu.classList.add('show')
        menuTogle.classList.remove('opacity-1')
        menuTogle.classList.add('opacity-0')
    })

    // add the scroll effect on the header 
    if (window.scrollY > 80 && !header.classList.contains('scroll')) {
        header.classList.add('scroll')
    } else if (window.scrollY < 80 && header.classList.contains('scroll')) {
        header.classList.remove('scroll')
    }
    document.addEventListener('scroll', (e) => {
        if (window.scrollY > 80 && !header.classList.contains('scroll')) {
            header.classList.add('scroll')
        } else if (window.scrollY < 80 && header.classList.contains('scroll')) {
            header.classList.remove('scroll')
        }
    })

    // add class to the service categorie 
    categories.forEach(category => {
        category.addEventListener('click', (e) => {
            // e.preventDefault()
            const active = document.querySelector(".services_categories li a.active")
            if (active) active.classList.remove('active')
            category.classList.toggle('active')
        })
    });


});