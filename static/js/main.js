/**
 * V1Vpn-Free - Копирование ссылок и уведомления
 */
function copyUrl(btn) {
    const text = btn.closest('.sub-item')?.querySelector('.sub-url')?.innerText.trim();
    if (!text) return;

    const onSuccess = () => {
        const orig = btn.innerText;
        btn.innerText = '✓ Скопировано';
        btn.classList.add('copied');
        showToast('Ссылка скопирована в буфер!');
        setTimeout(() => {
            btn.innerText = orig;
            btn.classList.remove('copied');
        }, 2000);
    };

    if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(onSuccess).catch(() => fallback(text, onSuccess));
    } else {
        fallback(text, onSuccess);
    }
}

function fallback(text, cb) {
    const el = document.createElement('textarea');
    el.value = text;
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    try { document.execCommand('copy'); cb(); } catch (e) { showToast('Выделите ссылку вручную'); }
    el.remove();
}

function showToast(msg = 'Ссылка скопирована!') {
    const t = document.getElementById('toast');
    if (!t) return;
    t.innerText = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
}
