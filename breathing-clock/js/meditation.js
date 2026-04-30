/* meditation.js — Aura Desk v1.0.0 — 冥想模块 */

(function(){
    var meditationMinutes = 3;
    var meditationTotal = meditationMinutes * 60;
    var timeLeft = meditationTotal;
    var timerId = null;
    var isRunning = false;

    var uiPomoDisplay = document.getElementById('pomo-display');
    var uiPomoBtn = document.getElementById('pomo-btn');
    var uiPomoCard = document.getElementById('pomo-card');
    var uiBreatheGuide = document.getElementById('breathe-guide');

    function formatTime(seconds){
        var m = String(Math.floor(seconds / 60)).padStart(2,'0');
        var s = String(seconds % 60).padStart(2,'0');
        uiPomoDisplay.textContent = m + ':' + s;
    }

    function setGuide(text, stateKey){
        uiBreatheGuide.innerText = text;
        uiBreatheGuide.dataset.state = stateKey;
    }

    function setDuration(mins){
        if(isRunning) return;
        meditationMinutes = Math.max(1, Math.min(120, Math.round(mins)));
        meditationTotal = meditationMinutes * 60;
        timeLeft = meditationTotal;
        formatTime(timeLeft);
        setGuide(meditationMinutes + ' 分钟', 'idle');
        document.querySelectorAll('.duration-preset').forEach(function(b){
            b.classList.toggle('active', parseInt(b.dataset.min) === meditationMinutes);
        });
    }

    function resetMeditation(){
        clearInterval(timerId); timerId = null; isRunning = false;
        timeLeft = meditationTotal;
        formatTime(timeLeft);
        uiPomoBtn.textContent = '开始冥想';
        uiPomoBtn.classList.remove('is-active-state');
        uiPomoCard.classList.remove('is-focusing');
        setGuide(meditationMinutes + ' 分钟', 'idle');
    }

    function showCompletionToast(){
        var phrases = ['非常不错', '完成啦', '好样的', '宁静致远'];
        var text = phrases[Math.floor(Math.random() * phrases.length)];

        var toast = document.createElement('div');
        toast.className = 'meditation-toast';
        toast.innerHTML = '<div class="meditation-toast-inner">' + text + '</div>';
        uiPomoCard.appendChild(toast);

        setTimeout(function(){
            var inner = toast.querySelector('.meditation-toast-inner');
            if(inner) inner.classList.add('leaving');
            setTimeout(function(){
                if(toast.parentNode) toast.remove();
            }, 350);
        }, 2000);
    }

    function pauseMeditation(){
        clearInterval(timerId); timerId = null; isRunning = false;
        uiPomoBtn.textContent = '继续冥想';
        uiPomoBtn.classList.remove('is-active-state');
        uiPomoCard.classList.remove('is-focusing');
        setGuide('已暂停', 'idle');
    }

    function startMeditation(){
        isRunning = true;
        uiPomoBtn.textContent = '暂停冥想';
        uiPomoBtn.classList.add('is-active-state');
        uiPomoCard.classList.add('is-focusing');
        setGuide('吸气', 'inhale');
        timerId = setInterval(function(){
            if(timeLeft > 0){
                timeLeft--;
                formatTime(timeLeft);
                var elapsed = meditationTotal - timeLeft;
                var phase = elapsed % 8;
                if(phase < 4) setGuide('吸气', 'inhale');
                else          setGuide('呼气', 'exhale');
            } else {
                resetMeditation();
                showCompletionToast();
            }
        }, 1000);
    }

    window.initMeditation = function(){
        uiPomoBtn.addEventListener('click', function(){
            if(isRunning) pauseMeditation();
            else startMeditation();
        });

        var durationTrigger = document.getElementById('duration-trigger');
        var durationMenu = document.getElementById('duration-menu');
        var durationInput = document.getElementById('duration-input');
        var durationApply = document.getElementById('duration-apply');

        durationTrigger.addEventListener('click', function(e){
            e.stopPropagation();
            durationMenu.classList.toggle('open');
        });
        document.querySelectorAll('.duration-preset').forEach(function(btn){
            btn.addEventListener('click', function(){
                if(isRunning){ durationMenu.classList.remove('open'); return; }
                setDuration(parseInt(btn.dataset.min));
                durationMenu.classList.remove('open');
            });
        });
        durationApply.addEventListener('click', function(){
            var val = parseInt(durationInput.value);
            if(!val || val < 1 || val > 120){ durationInput.focus(); return; }
            if(isRunning){ durationMenu.classList.remove('open'); return; }
            setDuration(val);
            durationInput.value = '';
            durationMenu.classList.remove('open');
        });
        durationInput.addEventListener('keydown', function(e){
            if(e.key === 'Enter') durationApply.click();
        });
        document.addEventListener('click', function(e){
            if(!durationMenu.contains(e.target) && e.target !== durationTrigger && !durationTrigger.contains(e.target)){
                durationMenu.classList.remove('open');
            }
        });
    };
})();
