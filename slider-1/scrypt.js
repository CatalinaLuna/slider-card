document.addEventListener("DOMContentLoaded", () => {
        const slider = document.querySelector(".slider")
        const prevButton = document.querySelector(".prev")
        const nextButton = document.querySelector(".next")
        const slides = Array.from(slider.children)
        const slideWidth = slides[0].getBoundingClientRect().width
        let currentIndex = 0

        // Posicionar los slides uno al lado del otro
        slides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + "px"
        })

        function moveToSlide(targetIndex) {
            if (targetIndex < 0) {
            targetIndex = slides.length - 1
            } else if (targetIndex >= slides.length) {
            targetIndex = 0
            }

            slider.style.transform = `translateX(-${slideWidth * targetIndex}px)`
            currentIndex = targetIndex
        }

        prevButton.addEventListener("click", () => {
            moveToSlide(currentIndex - 1)
        })

        nextButton.addEventListener("click", () => {
            moveToSlide(currentIndex + 1)
        })

        // Auto-play
        function autoPlay() {
            moveToSlide(currentIndex + 1)
        }

        let intervalId = setInterval(autoPlay, 5000)

        // Pausar auto-play cuando el mouse está sobre el slider
        slider.addEventListener("mouseenter", () => {
            clearInterval(intervalId)
        })

        // Reanudar auto-play cuando el mouse sale del slider
        slider.addEventListener("mouseleave", () => {
            intervalId = setInterval(autoPlay, 5000)
        })

        // Manejar eventos táctiles para dispositivos móviles
        let touchStartX = 0
        let touchEndX = 0

        slider.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX
        })

        slider.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX
            handleSwipe()
        })

        function handleSwipe() {
            if (touchStartX - touchEndX > 50) {
            moveToSlide(currentIndex + 1)
            } else if (touchEndX - touchStartX > 50) {
            moveToSlide(currentIndex - 1)
            }
        }
    })
