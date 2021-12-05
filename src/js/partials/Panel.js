import data from '../data';

export default function getData() {
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
                        <button class='button-open'>Tap anywhere to read more</button>
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
}
