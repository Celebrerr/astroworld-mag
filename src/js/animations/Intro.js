import { gsap } from 'gsap';

const isMobile = window.matchMedia('(max-width: 500px)');

function animHome() {
    const ease = 'Power3.easeOut';
    gsap.timeline()
        .addLabel('delay', 0)
        .from(
            '.anim-img',
            {
                duration: 2.5,
                y: -500,
                scale: 4,
                ease: ease,
            },
            'delay+=1.15'
        )
        .from(
            '.anim-title',
            {
                duration: 2,
                opacity: 0,
                y: -500,
                skewY: -15,
                ease: ease,
                stagger: 0.15,
            },
            'delay+=1.5'
        )
        .from(
            '.anim-desc',
            {
                duration: 2,
                opacity: 0,
                y: -200,
                skewY: 15,
                ease: ease,
                stagger: 0.1,
            },
            'delay+=1.5'
        )

        .from(
            '.anim-circle',
            {
                duration: 2,
                scale: 0,
                ease: ease,
            },
            'delay+=1.5'
        )
        .from(
            '.anim-extra',
            {
                duration: 1.5,
                y: 200,
                ease: ease,
            },
            'delay+=1.5'
        );
}

function infoReveal() {
    if (isMobile.matches) {
        gsap.utils.toArray('.panel').forEach((panel) => {
            const el = panel.querySelector('.menu_desc');

            const tl = gsap.timeline({
                paused: true,
                reversed: true,
            });

            tl.to(el, {
                duration: 0.8,
                opacity: 1,
                ease: 'power4',
                pointerEvents: 'auto',
            });

            panel.addEventListener('click', () => {
                tl.reversed() ? tl.play() : tl.reverse();
            });
        });
    }
}

export { animHome, infoReveal };
