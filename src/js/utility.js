import gsap from 'gsap/gsap-core';
import { scrollAnim, animHome, infoReveal } from './content';

const preloadImages = () => {
    const loadbar = () => {
        const body = document.querySelector('body');
        gsap.set(body, { overflow: 'hidden' });

        const overlay = document.getElementById('preloader'),
            stat = document.querySelector('.percent > h1'),
            img = document.querySelectorAll('img');

        let percentInit = 0,
            imgLength = img.length;

        function imgLoaded() {
            percentInit += 1;
            const calcPerc = (((100 / imgLength) * percentInit) << 0) + '%';
            stat.innerText = calcPerc;
            if (percentInit === imgLength) return init();
        }
        function init() {
            const tl = gsap.timeline().addLabel('delay').to(
                stat,
                {
                    duration: 1.8,
                    opacity: 0,
                    x: -200,
                    ease: 'Power2.easeInOut',
                },
                'delay+=0.5'
            );
            tl.to(
                overlay,
                {
                    duration: 1.8,
                    height: 0,
                    ease: 'Power2.easeInOut',
                    onComplete: () => {
                        gsap.set(overlay, { display: 'none' });
                    },
                },
                'delay+=1'
            ).set(
                body,
                {
                    overflow: 'auto',
                },
                'delay+=0'
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
            scrollAnim();
            animHome();
            infoReveal();
        }
    };
};

const vhMobile = () => {
    console.log('vh');
    document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
    );
};

export { preloadImages, vhMobile };
