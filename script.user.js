// ==UserScript==
// @name         juliaTimeMachine
// @namespace    http://tampermonkey.net/
// @version      2024-12-14
// @description  try to take over the world!
// @author       You
// @match        https://rivalregions.com/*
// @match        https://m.rivalregions.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rivalregions.com
// @grant        none
// ==/UserScript==

(function() {
    const currentUrl = window.location.href;
    const wars = /https:\/\/(m.)?rivalregions\.com\/#war\/top\/\d+/;
    const laws = /https:\/\/(m.)?rivalregions\.com\/#log.+/
    if (wars.test(currentUrl)) {
        setTimeout(function() {
            const tds = document.querySelectorAll('td[rat][action].list_avatar.pointer.small');
            tds.forEach(function(td) {
                const ratValue = td.getAttribute('rat');
                const date = new Date(ratValue * 1000);
                const formattedDate = date.toLocaleString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                });

                td.textContent = formattedDate;
            });
        }, 2000);
    }
    if (laws.test(currentUrl)) {
        setTimeout(function() {
        const rows = document.querySelectorAll('tr.list_link');
        rows.forEach(function(row) {
            const actionTd = row.querySelector('td[action]');
            if (actionTd) {
                const actionValue = actionTd.getAttribute('action');
                const parts = actionValue.split('/');
                if (parts.length > 0) {
                    const timestamp = parts[parts.length - 1];
                    const date = new Date(timestamp * 1000);
                    const formattedDate = date.toLocaleString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                    });
                    const dateDiv = row.querySelector('.log_dates');
                    if (dateDiv) {
                        dateDiv.innerHTML = `Начало: ${formattedDate}<br>Конец: ${formattedDate}`;
                    }
                }
            }
        });
    }, 2000);
    }
})();
