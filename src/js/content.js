import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import data from '../../data';
const isMobile = window.matchMedia('(max-width: 500px)');

const getData = () => {
    const { panel } = data;
    const container = document.getElementById('app');
    container.innerHTML = '';

    const panelLast = document.createElement('section');
    panelLast.classList.add('panel');
    const panelLastText = document.createElement('div');
    panelLastText.classList.add('panel__text');

    // looping trough data
    panel.forEach((el) => {
        const html = `
            <section class="panel ofh">
                <div class="panel-grid">
                    <div class="panel__info">
                        <div class="panel__info-text">
                            <h2>${el.label}</h2>
                            <a href='${el.extra}' target="_blank" class='info-viewmore'> high resolution image &rarr;</a>                      
                        </div>
                        <div class="panel__info-more">
                            <span>Acquisition date:${el.date}</span>
                            <span>Spacecraft altitude: ${el.altitude} km</span>
                        </div>
                    </div>
                    <div class="panel__title">
                        <h1>${el.title}</h1>
                    </div>
                    <div class="panel__image">
                    <picture>
                        <source srcset="${el.webimg}" media="(min-width: 769px)" type="image/webp">
                        <source srcset="${el.mobimg}" media="(max-width: 768px)" type="image/jpeg">
                        <img src="${el.img}" alt="${el.title}" class='main-img'>
                    </picture>    
                            
                    </div>
                    <div class="open-panel--desc">
                        <p>Tap anywhere to read more</p>
                    </div>
                    <div class="panel__desc">
                        <p>${el.description}</p>
                        <p>${el.description2}</p>
                    </div>
                </div>
                <div class="menu_desc">
                    <div class="menu_desc-inner">
                        <div class="panel__desc-info">
                            <div class="desc-info">
                                <span>Acquisition date:${el.date}</span>
                                <span>Spacecraft altitude: ${el.altitude} km</span>
                                <span>Mars local time: ${el.time}</span>
                            </div>               
                            <div class="desc-close">
                                <svg class="close-panel--desc action--close" viewBox="0 0 24 24">
                                <path
                                    d="M24 1.485L22.515 0 12 10.515 1.485 0 0 1.485 10.515 12 0 22.515 1.485 24 12 13.484 22.515 24 24 22.515 13.484 12z" />
                                </svg>
                            </div>
                        </div>
                        <div class="panel__desc-text">
                            <p>${el.description}</p>
                            <p>${el.description2}</p>
                        </div>
                    </div>
                </div>
            </section> `;
        container.insertAdjacentHTML('beforeend', html);
    });
    const lastPage = `
        <div class="panel">
            <div class="panel-last">
                <div class="panel_left">
                        <h1>A huge thanks to uaHirise team for providing us awesome pics, infos and more about Mars :)</h1>
                    </div>
                    <div class="panel_right">
                        <div class="panel_right-1"></div>
                        <div class="panel_right-2">
                        <p class='mb-2'>For those who don't know 	
                        &#8628;</p>
                            <p class='hidden'>HiRISE (High Resolution Imaging Science Experiment) is the most powerful camera ever sent to another planet,
                                    one of six instruments onboard the Mars Reconnaissance Orbiter. Their camera’s high resolution capability remains unprecedented for any existing orbiter in the study of the Red Planet, as well as being an
                                    indispensable instrument for helping to select landing sites for robotic and future human exploration. </p>

                            <p class='mt-2'>Read more about them: <a href="https://www.uahirise.org/epo/about" target="_blank" style="color: #efefef; border-bottom: 1px solid var(--color-w)";>
                            here
                        </a></p>         
                        </div>
                    </div>
                </div>
        </div>`;
    container.insertAdjacentHTML('beforeend', lastPage);
};

const scrollAnim = () => {
    if (!isMobile.matches) {
        gsap.registerPlugin(ScrollTrigger);
        let duration = 10,
            sections = gsap.utils.toArray('.panel'),
            sectionIncrement = duration / (sections.length - 1),
            tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#container',
                    pin: true,
                    scrub: 1,
                    snap: 1 / (sections.length - 1),
                    start: 'top top',
                    end: '+=5000',
                },
            });
        //  Index calc length
        // gsap.set('.panel', {
        //     zIndex: (i, target, targets) => targets.length + i,
        // });
        tl.to(sections, {
            yPercent: -100 * (sections.length - 1),
            duration: duration,
            ease: 'none',
        });
        sections.forEach((section, index) => {
            let tween = gsap.from(section, {
                opacity: 0,
                scale: 0.9,
                duration: 1.8,
                force3D: true,
                paused: true,
            });
            addSectionCallbacks(tl, {
                start: sectionIncrement * (index - 0.99),
                end: sectionIncrement * (index + 0.99),
                onEnter: () => tween.play(),
                onLeave: () => tween.reverse(),
                onEnterBack: () => tween.play(),
                onLeaveBack: () => tween.reverse(),
            });
            index || tween.progress(10); // the first tween should be at its end (already faded/scaled in)
        });

        function addSectionCallbacks(
            timeline,
            { start, end, param, onEnter, onLeave, onEnterBack, onLeaveBack }
        ) {
            let trackDirection = (animation) => {
                    let onUpdate = animation.eventCallback('onUpdate'),
                        prevTime = animation.time();
                    animation.direction = animation.reversed() ? -1 : 1;
                    animation.eventCallback('onUpdate', () => {
                        let time = animation.time();
                        if (prevTime !== time) {
                            animation.direction = time < prevTime ? -1 : 1;
                            prevTime = time;
                        }
                        onUpdate && onUpdate.call(animation);
                    });
                },
                empty = (v) => v;
            timeline.direction || trackDirection(timeline);
            start >= 0 &&
                timeline.add(
                    () =>
                        (
                            (timeline.direction < 0 ? onLeaveBack : onEnter) ||
                            empty
                        )(param),
                    start
                );
            end <= timeline.duration() &&
                timeline.add(
                    () =>
                        (
                            (timeline.direction < 0 ? onEnterBack : onLeave) ||
                            empty
                        )(param),
                    end
                );
        }
    } else {
        return;
    }
};

const animHome = () => {
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
};

const infoReveal = () => {
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
};

export { getData, scrollAnim, animHome, infoReveal };
