/* calendar.js — Aura Desk v1.0.0 — 日历 */

window.renderCalendar = function(){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var date = now.getDate();
    document.getElementById('cal-month').innerText = (month + 1) + '月';
    try {
        var lunarStr = new Intl.DateTimeFormat('zh-CN-u-ca-chinese', {month:'short', day:'numeric'}).format(now);
        document.getElementById('cal-lunar').innerText = '农历' + lunarStr;
    } catch(e){ document.getElementById('cal-lunar').innerText = '今日'; }
    var firstDayIndex = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var emptyDays = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    var gridContainer = document.getElementById('cal-grid-container');
    for(var i = 0; i < emptyDays; i++){
        var emptyCell = document.createElement('div');
        emptyCell.className = 'cal-day empty';
        gridContainer.appendChild(emptyCell);
    }
    for(var i = 1; i <= daysInMonth; i++){
        var dayCell = document.createElement('div');
        dayCell.className = 'cal-day';
        dayCell.innerText = i;
        if(i === date) dayCell.classList.add('today');
        gridContainer.appendChild(dayCell);
    }
};
