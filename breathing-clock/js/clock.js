/* clock.js — Aura Desk v1.0.0 — 翻页时钟 */

(function(){
    var state = {hours:'00', minutes:'00', seconds:'00'};
    var pad = function(num){ return num.toString().padStart(2,'0'); };

    function updateFlipCard(unit, newValue, isAccent){
        if(state[unit] === newValue) return;
        var unitEl = document.querySelector('.flip-unit[data-unit="' + unit + '"] .flip-container');
        if(!unitEl) return;
        var currentTop = unitEl.querySelector('.flip-top span');
        var currentBottom = unitEl.querySelector('.flip-bottom span');
        var oldValue = state[unit];
        state[unit] = newValue;

        var topAnim = document.createElement('div');
        topAnim.className = 'flip-top-anim';
        if(isAccent) topAnim.classList.add('accent-bg');
        topAnim.innerHTML = '<span class="digit-text ' + (isAccent ? 'accent-text' : '') + '">' + oldValue + '</span>';

        var bottomAnim = document.createElement('div');
        bottomAnim.className = 'flip-bottom-anim';
        if(isAccent) bottomAnim.classList.add('accent-bg');
        bottomAnim.innerHTML = '<span class="digit-text ' + (isAccent ? 'accent-text' : '') + '">' + newValue + '</span>';

        unitEl.appendChild(topAnim);
        unitEl.appendChild(bottomAnim);
        unitEl.classList.add('flipping');
        currentTop.innerText = newValue;
        currentBottom.innerText = newValue;

        setTimeout(function(){
            unitEl.classList.remove('flipping');
            if(topAnim.parentNode) topAnim.remove();
            if(bottomAnim.parentNode) bottomAnim.remove();
        }, 500);
    }

    function updateClock(){
        var now = new Date();
        updateFlipCard('hours', pad(now.getHours()));
        updateFlipCard('minutes', pad(now.getMinutes()));
        updateFlipCard('seconds', pad(now.getSeconds()), true);
    }

    window.initClock = function(){
        setInterval(updateClock, 1000);
        updateClock();
    };
})();
