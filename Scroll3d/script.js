document.addEventListener("DOMContentLoaded", () => {
    // Add font
    const fontFace = new FontFace('F37Judge-Bold', 'url(./fonts/F37Judge-Bold.ttf)');
    fontFace.load().then(function(loaded_face) {
        document.fonts.add(loaded_face);
    }).catch(function(error) {
        console.error('Font loading failed:', error);
    });

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const cardPositions = [
        {top:"30%",left:"55%"},
        {top:"20%",left:"25%"},
        {top:"50%",left:"10%"},
        {top:"60%",left:"40%"},
        {top:"30%",left:"30%"},
        {top:"60%",left:"60%"},
        {top:"20%",left:"50%"},
        {top:"60%",left:"10%"},
        {top:"20%",left:"40%"},
        {top:"45%",left:"55%"},
    ];

    const titlesContainer = document.querySelector(".titles");
    const moveDistance = window.innerWidth * 3;
    const imagesContainer = document.querySelector(".images");

    // Create cards
    for (let i = 1; i <= 10; i++) {
        const card = document.createElement("div");
        card.className = `card card-${i}`;
        const img = document.createElement("img");
        img.src = `./assests/img${i}.jpeg`;
        card.appendChild(img);

        const position = cardPositions[i-1];
        card.style.top = position.top;
        card.style.left = position.left;

        imagesContainer.appendChild(card);
    }

    const cards = document.querySelectorAll(".card");
    
    // Initial card setup - slightly different starting point
    cards.forEach((card) => {
        gsap.set(card, {
            z: -4000, // Start slightly closer
            scale: 0,
            rotateY: gsap.utils.random(-45, 45), // Add initial random rotation
            opacity: 0, // Start invisible
        });
    });

    // Simple intro animation for cards on load
    gsap.to(cards, {
        opacity: 1,
        stagger: 0.05,
        duration: 0.5,
        delay: 0.5, // Small delay after load
        ease: "power1.out"
    });

    // Main ScrollTrigger for titles and cards
    ScrollTrigger.create({
        trigger: ".sticky",
        start: "top top",
        end: `+=${window.innerHeight * 5}px`,
        pin: true,
        scrub: 1.2, // Slightly adjusted scrub speed
        onUpdate: (self) => {
            // Title container animation
            const xPosition = -moveDistance * self.progress;
            gsap.to(titlesContainer, { // Use gsap.to for smoother update
                x: xPosition,
                duration: 0.5, // Give it a slight duration
                ease: "power1.out" // Match easing
            });

            // Title parallax effect
            const velocity = self.getVelocity ? self.getVelocity() : 0;
            const normalizedVelocity = velocity / (Math.abs(velocity) || 1);
            const maxOffset = 40; // Increased max offset
            const currentSpeed = Math.min(Math.abs(velocity / 400), maxOffset); // Adjusted sensitivity
            const isAtEdge = self.progress <= 0.01 || self.progress >= 0.99; // Small tolerance

            document.querySelectorAll(".title").forEach((titleGroup) => {
                const title1 = titleGroup.querySelector(".title-1");
                const title2 = titleGroup.querySelector(".title-2");
                const title3 = titleGroup.querySelector(".title-3");

                if (isAtEdge) {
                    gsap.to([title1, title2], {
                        xPercent: -50,
                        x: 0,
                        duration: 0.5,
                        ease: "power2.out",
                        overwrite: true,
                    });
                } else {
                    const baseOffset = normalizedVelocity * currentSpeed;

                    gsap.to(title1, {
                        xPercent: -50,
                        x: `${baseOffset * 5}px`, // Increased parallax multiplier
                        duration: 0.3, // Slightly longer duration
                        ease: "power2.out", // Smoother ease
                        overwrite: "auto"
                    });

                    gsap.to(title2, {
                        xPercent: -50,
                        x: `${baseOffset * 3}px`, // Increased parallax multiplier
                        duration: 0.3,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                }
                // Keep title3 centered
                gsap.set(title3, { xPercent: -50, x: 0 });
            });

            // Card animations
            cards.forEach((card, index) => {
                const staggerOffset = index * 0.06; // Slightly adjusted stagger
                const scaledProgress = (self.progress - staggerOffset) * 3.5; // Adjusted progress scaling
                const individualProgress = Math.max(0, Math.min(1, scaledProgress));
                
                // Eased progress for smoother start/end
                const easedProgress = gsap.parseEase("power1.inOut")(individualProgress);

                const targetZ = index === cards.length - 1 ? 1000 : 1500; // Adjusted target Z
                const newZ = -4000 + (targetZ + 4000) * easedProgress;
                
                // Scale animation linked to progress
                const scale = Math.max(0, Math.min(1, easedProgress * 1.2)); // Scale slightly faster

                // Rotation animation - reduce rotation as it comes closer
                const rotateY = gsap.getProperty(card, "rotateY") * (1 - easedProgress);

                // Use gsap.to for smoother updates
                gsap.to(card, {
                    z: newZ,
                    scale: scale,
                    rotateY: rotateY, // Apply rotation animation
                    duration: 0.5, // Give updates a duration
                    ease: "power1.out", // Smooth easing for updates
                    overwrite: "auto"
                });
            });
        },
    });

    // Card Hover Animations
    cards.forEach(card => {
        const tl = gsap.timeline({ paused: true });
        tl.to(card, {
            scale: 1.05, // Scale up slightly
            y: -10,      // Lift slightly
            boxShadow: "0px 15px 40px -5px rgba(0,0,0,0.4)", // Enhance shadow
            duration: 0.3,
            ease: "power1.out"
        });

        card.addEventListener("mouseenter", () => tl.play());
        card.addEventListener("mouseleave", () => tl.reverse());
    });

});