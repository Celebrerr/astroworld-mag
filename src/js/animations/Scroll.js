import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const isMobile = window.matchMedia('(max-width: 500px)');

export default function scrollAnim() {
    if (isMobile.matches) {
        return;
    }

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
        index || tween.progress(10);
        // the first tween should be at its end (already faded/scaled in)
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
                () => ((timeline.direction < 0 ? onLeaveBack : onEnter) || empty)(param),
                start
            );
        end <= timeline.duration() &&
            timeline.add(
                () => ((timeline.direction < 0 ? onEnterBack : onLeave) || empty)(param),
                end
            );
    }
}
