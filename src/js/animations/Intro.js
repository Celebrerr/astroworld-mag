import { gsap } from 'gsap';
import { split } from '../utils/text';

const isMobile = window.matchMedia('(max-width: 769px)');

function animHome() {
    const easePower = 'Power2.easeInOut';
    const animExtra = document.querySelectorAll("[data-anim='extra']");
    const animDesc = document.querySelectorAll("[data-anim='description']");

    animDesc.forEach((el) => {
        const animDescParagraphs = document;

        const titleSpans = split({
            element: el,
        });
        titleSpans;
    });

    const test = document.querySelectorAll("[data-anim='description'] > span");

    gsap.timeline()
        .addLabel('delay', 0)
        .from(
            '.anim-img',
            {
                duration: 2.5,
                scale: 2,
                ease: easePower,
            },
            'delay+=0.8'
        )
        .from(
            '.anim-title',
            {
                duration: 2,
                opacity: 0,
                y: '100%',
                ease: easePower,
                stagger: 0.15,
            },
            'delay+=0.8'
        )
        .from(
            animDesc,
            {
                duration: 1.5,
                opacity: 0,
                y: '100%',
                ease: easePower,
                stagger: 0.05,
            },
            'delay+=0.8'
        )
        .from(
            animExtra,
            {
                duration: 1.5,
                y: '100%',
                autoAlpha: 0,
                ease: easePower,
            },
            'delay+=2'
        );
}

function infoReveal() {
    if (isMobile.matches) {
        gsap.utils.toArray('.panel').forEach((panel) => {
            const el = panel.querySelector('.menu_desc');
            const buttons = panel.querySelector('.button-open');

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
