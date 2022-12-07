document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('a').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault()

            const href = this.getAttribute('href').substring(1)
            const scrollTarget = document.getElementById(href)

            const elementPosition = scrollTarget.
            getBoundingClientRect().top
            const offsetPosition = elementPosition

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            })
        })
    })

    const projectsTabs    = document.querySelector('.projects__tabs')
    const tabsBtns        = document.querySelectorAll('[data-tabs-btn]')
    const projectsContent = document.querySelectorAll('[data-tabs-item]')
    
    projectsTabs.addEventListener('click', (e) => {
        const currentBtn = e.target.getAttribute('data-tabs-btn')
    
        tabsBtns.forEach(item => {
            item.classList.remove('btn--active')
        })

        document.querySelector(`[data-tabs-btn='${currentBtn}']`).classList.add('btn--active')

        projectsContent.forEach(item => {
            item.classList.remove('projects__content-item--open')
        })

        document.querySelector(`[data-tabs-item='${currentBtn}']`).classList.add('projects__content-item--open')
    })

    new Swiper('.reviews__swiper', {
        slidesPerView: 3,
        spaceBetween: 25,
        loop: true,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
            pageUpDown: true,
        },
        navigation: {
            nextEl: '.reviews__navigation-next',
            prevEl: '.reviews__navigation-prev',
        },
    })

    const btns         = document.querySelectorAll('[data-modal-btn]')
    const modalWrapper = document.querySelector('.modal__wrapper')
    const modalItem    = document.querySelectorAll('[data-modal-item]')
    
    btns.forEach(item => {
        item.addEventListener('click', (e) => {
            let btn = e.currentTarget.getAttribute('data-modal-btn')

            modalItem.forEach(item => {
                item.classList.remove('modal__item--open')
            })

            document.querySelector(`[data-modal-item='${btn}']`).classList.add('modal__item--open')
            modalWrapper.classList.add('modal__wrapper--open')
            
            disableScroll()
        })
    })
    
    modalWrapper.addEventListener('click', (e) => {
        if (e.target == modalWrapper) {
            modalWrapper.classList.remove('modal__wrapper--open')

            modalItem.forEach(item => {
                item.classList.remove('modal__item--open')
            })

            enableScroll()
        }
    })

    let disableScroll = function () {
        let pagePosition = window.scrollY
        document.body.classList.add('disable-scroll')
        document.body.dataset.position = pagePosition
        document.body.style.top = -pagePosition + 'px'
        document.body.style.paddingRight = '18px'
    }
    
    let enableScroll = function () {
        let pagePosition = parseInt(document.body.dataset.position, 10)
        document.body.style.top = 'auto'
        document.body.style.scrollBehavior = 'auto'
        document.body.style.paddingRight = '0'
        document.body.classList.remove('disable-scroll')
        window.scroll({top: pagePosition, left: 0})
        document.body.removeAttribute('data-position')
    }

    const canvas  = document.querySelector('#canvas')
    const context = canvas.getContext('2d')

    canvas.width  = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const ball = {
        x: 150,
        y: 150,
        dx: .75,
        dy: .75,
        radius: 200,
    }

    function draw() {
        ballMovie()
        render()
        requestAnimationFrame(draw)
    }
    requestAnimationFrame(draw)

    function ballMovie() {
        ball.x += ball.dx
        ball.y -= ball.dy

        if (ball.x >= canvas.width || ball.x <= 0) {
            ball.dx = -ball.dx
        } else if (ball.y <= 0 || ball.y >= canvas.height) {
            ball.dy = -ball.dy 
        }
    }

    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.beginPath()
        context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI)
        context.fillStyle = 'rgba(227, 76, 38, 1)'
        context.fill()
        context.closePath()
    }

})