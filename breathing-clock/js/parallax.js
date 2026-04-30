/* parallax.js — Aura Desk v1.0.0 — 三层视差场景 */

(function(){
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;

    document.addEventListener('mousemove', function(e){
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animateParallax(){
        mouseX += (targetMouseX - mouseX) * 0.08;
        mouseY += (targetMouseY - mouseY) * 0.08;

        document.querySelectorAll('.parallax-layer').forEach(function(layer){
            var speed = parseFloat(layer.dataset.speed) || 0;
            var tx = -mouseX * speed * 60;
            var ty = -mouseY * speed * 30;
            layer.style.transform = 'translate(' + tx + 'px, ' + ty + 'px)';
        });

        requestAnimationFrame(animateParallax);
    }

    window.initParallax = function(){
        animateParallax();
    };

    window.showScene = function(themeId){
        document.querySelectorAll('.parallax-layer').forEach(function(layer){
            layer.style.display = layer.dataset.theme === themeId ? 'block' : 'none';
        });
    };
})();
