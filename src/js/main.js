import { gsap } from 'gsap';

import getData from './partials/Panel';
import { animHome, infoReveal } from './animations/Intro';
import scrollAnim from './animations/Scroll';

const preloadImages = () => {
    const loadbar = () => {
        const body = document.querySelector('body');
        gsap.set(body, { overflow: 'hidden' });

        const preloaderOverlay = document.getElementById('preloader'),
            preloaderStat = document.querySelector("[data-preloader='stat']"),
            img = document.querySelectorAll('img');

        let percentInit = 0,
            imgLength = img.length;

        function imgLoaded() {
            percentInit += 1;
            const calcPerc = (((100 / imgLength) * percentInit) << 0) + '%';
            preloaderStat.innerText = calcPerc;
            if (percentInit === imgLength) return animate();
        }
        function animate() {
            gsap.timeline()
                .addLabel('delay')
                .to(
                    preloaderStat,
                    {
                        duration: 1.8,
                        opacity: 0,
                        x: -200,
                        ease: 'Power2.easeInOut',
                    },
                    'delay+=0.5'
                )
                .to(
                    preloaderOverlay,
                    {
                        duration: 1.8,
                        height: 0,
                        ease: 'Power2.easeInOut',
                        onComplete: () => {
                            gsap.set(body, { overflow: 'auto' });
                            preloaderOverlay.remove();
                        },
                    },
                    'delay+=1'
                );
        }
        for (let i = 0; i < imgLength; i++) {
            let tImg = new Image();
            tImg.onload = imgLoaded;
            tImg.onerror = imgLoaded;
            tImg.src = img[i].src;
        }
    };
    document.addEventListener('DOMContentLoaded', loadbar);
    document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
            animHome();
            infoReveal();
            scrollAnim();
        }
    };
};

getData();
preloadImages();

document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};
window.matchMedia('(max-width: 500px)').addEventListener('change', () => {
    location.reload();
});

window.addEventListener('resize', () => {
    console.log('fsada');
});
