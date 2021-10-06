'use strict';
import { preloadImages, vhMobile } from './utility';
import { getData } from './content';
import CustomLogging from './CustomLogging';

const custom = new CustomLogging();
const isMobile = window.matchMedia('(max-width: 500px)');

Promise.all([preloadImages(), vhMobile()]).then(() => {
    custom.log(
        `Hi there👋,I'm Bruno!
                Go check out my folio here: www.brunobosco.xyz`
    );
    getData();
});

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};
isMobile.addEventListener('change', () => {
    location.reload();
});
