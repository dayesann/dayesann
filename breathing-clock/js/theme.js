/* theme.js — Aura Desk v1.0.0 — 主题切换与粒子系统 */

var particleConfig = {
    leaf:    {class:'leaf',    count:8,  minSize:9, maxSize:22, fall:[22,36], sway:[6,10]},
    sakura:  {class:'sakura',  count:14, minSize:6, maxSize:14, fall:[18,34], sway:[5,9]},
    firefly: {class:'firefly', count:22, minSize:2, maxSize:5,  fall:[18,34]}
};

function switchTheme(themeId){
    document.body.setAttribute('data-theme', themeId);
    document.querySelectorAll('.skin-card').forEach(function(card){
        card.classList.toggle('active', card.dataset.theme === themeId);
    });

    window.showScene(themeId);

    var container = document.getElementById('particles-container');
    container.innerHTML = '';
    var config = particleConfig[themeId];
    for(var i = 0; i < config.count; i++){
        var p = document.createElement('div');
        p.className = 'particle ' + config.class;
        var size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = (Math.random() * 100) + '%';
        if(themeId === 'firefly'){
            var dur = Math.random() * (config.fall[1] - config.fall[0]) + config.fall[0];
            p.style.animation = 'firefly-drift ' + dur + 's linear infinite';
            p.style.animationDelay = (Math.random() * -30) + 's';
        } else {
            var fallDur = Math.random() * (config.fall[1] - config.fall[0]) + config.fall[0];
            var swayDur = Math.random() * (config.sway[1] - config.sway[0]) + config.sway[0];
            p.style.animation = 'fall-down ' + fallDur + 's linear infinite, sway ' + swayDur + 's ease-in-out infinite alternate';
            var delay = Math.random() * -30;
            p.style.animationDelay = delay + 's, ' + delay + 's';
        }
        container.appendChild(p);
    }

    appSettings.theme = themeId;
    saveSettings(appSettings);
}
