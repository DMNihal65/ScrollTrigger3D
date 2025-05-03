// import gsap from "gsap"
// import CustomEase from "gsap/CustomEase"

gsap.registerPlugin(CustomEase, ScrollTrigger);

CustomEase.create("hop", "0.9,0,0.1,1");
CustomEase.create("smooth", "0.25, 0.1, 0, 1");

const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const hoverLinks = document.querySelectorAll('.hover-link');
hoverLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link, {
            y: -3,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    link.addEventListener('mouseleave', () => {
        gsap.to(link, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

const featuredItems = document.querySelectorAll('.featured-item');
featuredItems.forEach(item => {
    const speed = item.getAttribute('data-speed');

    ScrollTrigger.create({
        trigger: item,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
            const moveY = (self.progress - 0.5) * 100 * speed;
            gsap.set(item, { y: moveY });
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const t1 = gsap.timeline({
        delay: 0.3,
        defaults: {
            ease: "hop",
        },
    });

    const counts = document.querySelectorAll(".count")

    counts.forEach((count, index) => {
        const digits = count.querySelectorAll(".digit h1");

        t1.to(
            digits, {
                y: "0%",
                duration: 1,
                stagger: 0.075,

            },
            index * 1
        );

        if (index < counts.length) {
            t1.to(
                digits, {
                    y: "-120%",
                    duration: 1,
                    stagger: 0.075
                },
                index * 1 + 1
            )
        }
    })

    t1.to(".spinner", {
        opacity: 0,
        duration: 0.3,
    });

    t1.to(
        ".word h1", {
            y: "0%",
            duration: 1,
        },
        "<"
    );


    t1.to(".divider", {
        scaleY: "100%",
        duration: 1,
        onComplete: () => {
            gsap.to(".divider", { opacity: 0, duration: 0.4, delay: 0.3 })
        }
    })

    t1.to("#word-1 h1", {
        y: "120%",
        duration: 1,
        delay: 0.3,
    })

    t1.to("#word-2 h1", {
        y: "-120%",
        duration: 1,


    }, "<")

    t1.to(".block", {
        clipPath: "polygon(0% 0%,100% 0%,100% 0%,0% 0%)",
        duration: 1,
        stagger: 0.1,
        delay: 0.75,
        onStart: () => gsap.to(".hero-img", {
            scale: 1,
            duration: 2.5,
            ease: "smooth"
        })
    })

    t1.to([".nav", ".line h1", ".line p"], {
        y: "0%",
        duration: 1.5,
        stagger: 0.15,
    }, "<");

    t1.to([".cta"], {
        scale: 1,
        duration: 1.5,
        delay: 0.5
    }, "<");

    t1.to(".cta-icon", {
        scale: 1,
        duration: 1,
    }, "<0.3");

    t1.to(".cta-label p", {
        y: "0%",
        duration: 1,
    }, "<0.2");

    t1.to(".featured-item", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        delay: 0.5
    }, "<0.5");

    t1.to(".scroll-indicator", {
        opacity: 1,
        duration: 1,
        delay: 1
    }, "<0.5");

    const cta = document.querySelector('.cta');
    cta.addEventListener('mouseenter', () => {
        gsap.to(".cta-icon i", {
            rotation: 45,
            duration: 0.4,
            ease: "power2.out"
        });
    });

    cta.addEventListener('mouseleave', () => {
        gsap.to(".cta-icon i", {
            rotation: 0,
            duration: 0.4,
            ease: "power2.out"
        });
    });
})