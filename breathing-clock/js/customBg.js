/* customBg.js — Aura Desk v1.0.0 — 自定义背景 */

(function(){
    var customBgLayer = document.getElementById('custom-bg-layer');
    var uploadBtn = document.getElementById('upload-btn');
    var bgFileInput = document.getElementById('bg-file-input');
    var blurSlider = document.getElementById('blur-slider');
    var blurValue = document.getElementById('blur-value');
    var removeBgBtn = document.getElementById('remove-bg-btn');

    window.applyCustomBg = function(dataUrl, blur){
        if(!dataUrl) return;
        customBgLayer.style.backgroundImage = 'url(' + dataUrl + ')';
        document.body.setAttribute('data-custom', 'true');
        document.documentElement.style.setProperty('--custom-blur', blur + 'px');
        blurSlider.value = blur;
        blurValue.textContent = blur + 'px';
        removeBgBtn.classList.add('show');
        appSettings.customBg = dataUrl;
        appSettings.blur = blur;
        saveSettings(appSettings);
    };

    window.removeCustomBg = function(){
        customBgLayer.style.backgroundImage = '';
        document.body.setAttribute('data-custom', 'false');
        document.documentElement.style.setProperty('--custom-blur', '0px');
        blurSlider.value = 0;
        blurValue.textContent = '0px';
        removeBgBtn.classList.remove('show');
        appSettings.customBg = null;
        appSettings.blur = 0;
        saveSettings(appSettings);
        bgFileInput.value = '';
    };

    window.initCustomBg = function(){
        uploadBtn.addEventListener('click', function(){
            bgFileInput.value = '';
            bgFileInput.click();
        });

        bgFileInput.addEventListener('change', function(e){
            var file = e.target.files[0];
            if(!file) return;

            if(file.size > 5 * 1024 * 1024){
                if(!confirm('图片超过 5MB，加载可能会变慢，是否继续？')) return;
            }

            var reader = new FileReader();
            reader.onload = function(ev){
                window.applyCustomBg(ev.target.result, appSettings.blur || 0);
            };
            reader.readAsDataURL(file);
        });

        blurSlider.addEventListener('input', function(e){
            var val = parseInt(e.target.value);
            document.documentElement.style.setProperty('--custom-blur', val + 'px');
            blurValue.textContent = val + 'px';
            appSettings.blur = val;
            saveSettings(appSettings);
        });

        removeBgBtn.addEventListener('click', window.removeCustomBg);
    };
})();
