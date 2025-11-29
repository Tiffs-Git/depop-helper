document.addEventListener('DOMContentLoaded', () => {
    const openDashboard = document.getElementById('openDashboard');

    openDashboard.addEventListener('click', () => {
        chrome.tabs.create({ url: 'https://www.depop.com/sellinghub/selling/active/' });
    });
});
