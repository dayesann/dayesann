/* storage.js — Aura Desk v1.0.0 — 状态持久化 */

const STORAGE_KEY = 'aura_desk_settings';

function loadSettings(){
    try{
        const raw = localStorage.getItem(STORAGE_KEY);
        if(raw) return JSON.parse(raw);
    }catch(e){}
    return {theme:'leaf', customBg:null, blur:0};
}

function saveSettings(settings){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

var appSettings = loadSettings();
