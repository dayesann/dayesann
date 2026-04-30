/* drawer.js — Aura Desk v1.0.0 — 抽屉式皮肤菜单 */

(function(){
    var wardrobeTrigger = document.getElementById('wardrobe-trigger');
    var drawerOverlay = document.getElementById('drawer-overlay');
    var skinDrawer = document.getElementById('skin-drawer');
    var drawerClose = document.getElementById('drawer-close');

    window.openDrawer = function(){
        drawerOverlay.classList.add('open');
        skinDrawer.classList.add('open');
        wardrobeTrigger.classList.add('open');
        var cards = skinDrawer.querySelectorAll('.skin-card');
        cards.forEach(function(card, i){
            card.classList.remove('stagger-in');
            setTimeout(function(){ card.classList.add('stagger-in'); }, 100 + i * 70);
        });
        var customSection = skinDrawer.querySelector('.custom-bg-section');
        if(customSection){
            customSection.classList.remove('stagger-in');
            setTimeout(function(){ customSection.classList.add('stagger-in'); }, 100 + cards.length * 70);
        }
    };

    window.closeDrawer = function(){
        drawerOverlay.classList.remove('open');
        skinDrawer.classList.remove('open');
        wardrobeTrigger.classList.remove('open');
        skinDrawer.querySelectorAll('.skin-card, .custom-bg-section').forEach(function(el){
            el.classList.remove('stagger-in');
        });
    };

    window.initDrawer = function(onThemeSelect){
        wardrobeTrigger.addEventListener('click', function(e){
            e.stopPropagation();
            if(skinDrawer.classList.contains('open')) window.closeDrawer();
            else window.openDrawer();
        });

        drawerClose.addEventListener('click', window.closeDrawer);
        drawerOverlay.addEventListener('click', window.closeDrawer);

        document.addEventListener('keydown', function(e){
            if(e.key === 'Escape' && skinDrawer.classList.contains('open')) window.closeDrawer();
        });

        document.querySelectorAll('.skin-card').forEach(function(card){
            card.addEventListener('click', function(){
                onThemeSelect(card.dataset.theme);
            });
        });
    };
})();
