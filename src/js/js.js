window.addEventListener('load', () => {

    ////// TABS
    function initTab(elem){
        document.addEventListener('click', function (e) {
            if (!e.target.matches(elem+' .t-btn')) {
                return;
            }
            else{
                if(!e.target.classList.contains('active')){
                    findActiveElementAndRemoveIt(elem+' .t-btn');
                    findActiveElementAndRemoveIt(elem+' .t-panel');
                    e.target.classList.add('active');  
                    setTimeout(function(){                 
                        const panel = document.querySelectorAll('.'+e.target.dataset.name);
                        Array.prototype.forEach.call(panel, function (el) {
                            el.classList.add('active');
                        });
                    }, 200);
                }
            }
        });
    }
    
    function findActiveElementAndRemoveIt(elem){
        const elementList = document.querySelectorAll(elem);
        Array.prototype.forEach.call(elementList, function (e) {
            e.classList.remove('active');
        });
    }
    
    initTab('.tabs');
    
    

    //////// SLIDER

    const arrows = document.querySelectorAll('.slider__arrow')
    const modal = document.querySelector('.modal_img')
    const modalImg = document.querySelector('.modal__img')
    let centerSlide = document.querySelector('.slick-center .slider__img img')

    function openCenterSlide () {
        centerSlide?.addEventListener('click', () => {
            modal.classList.add('modal__active')
            modalImg.src = centerSlide.src
        })
    }
    openCenterSlide()
    
    arrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            centerSlide = document.querySelector('.slick-center img')
            openCenterSlide()
        })
    })

    onCloseModal(modal, "modal_img")

    //// OPENMODAL

    const order = document.querySelectorAll('.order');
    const modalOrder = document.querySelector('.modal')
    const closeModal = document.querySelectorAll('.close')

    order.forEach(btn => {
        btn.addEventListener('click', () => {
            modalOrder.classList.add('modal__active')
        })
    })

    closeModal.forEach(el => {
        el.addEventListener('click', () => {
            modalOrder.classList.remove('modal__active')
        })
    })

    onCloseModal(modalOrder, "modal")

    function onCloseModal (element, className) {
        element?.addEventListener('click', (e) => {
            const target = e.target
            if(target.classList.contains(className)) {
                element.classList.remove('modal__active')
            }
        })
    }


    //////BURGER

    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.header__menu');
    const closeMenu = document.querySelector('.header__close')

    burger.addEventListener('click', () => {
        menu.style.transform = 'translateY(0%)'
    })
    closeMenu.addEventListener('click', () => {
        menu.style.transform = 'translateY(-100%)'
    })

     ///////SCROLL

    const header = document.querySelector('.header');
    const width = window.innerWidth > 485;

    if (pathname !== 'index' && !width) {
        header.style.backgroundColor = '#1F1C73'
    } else {
        window.addEventListener('scroll', () => {
            if(window.pageYOffset >= 1 && !width) header.style.backgroundColor = '#1F1C73';
            else header.style.backgroundColor = '';
        })
    }

    ///////SEND FORM

    const inputName = document.querySelector('.modal__name');
    const inputPhone = document.querySelector('.modal__phoneNumber');
    const inputText = document.querySelector('.modal__text');
    const sendBtn = document.querySelector('.send')
    const formData = new FormData()
    formData.append('name', inputName.value)
    formData.append('phone', inputPhone.value)
    formData.append('text', inputText.value)

    const onSend = async (e) => {
        e.preventDefault()

        fetch('server.php', {
            method: 'POST',
            body: formData
        })
        .then(res => {
            if(res.status === 200) {
                sendBtn.textContent = 'Заявка отправлена'
                setTimeout(() => {
                    modalOrder.classList.remove('modal__active')
                } ,2000)
            }
        })
        .catch(error => console.error(error))
    }

    sendBtn.addEventListener('click', onSend)
})

$(document).ready(() => {
    $('.slick-slider').slick({
        centerMode: true,
        slidesToShow: 3,
        arrows: true,
        infinite: true,
        variableWidth: true,
        adaptiveHeight: true,
        prevArrow: '<span class="slick-prev slider__arrow slider__arrow-left"><img style="cursor:pointer" src="./icon/left.png"/></span>',
        nextArrow: '<span class="slick-prev slider__arrow slider__arrow-right"><img style="cursor:pointer" src="./icon/right.png"/></span>',
    });
})