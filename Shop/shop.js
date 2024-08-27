function toggleSideMenu() {
    const sideMenu = document.getElementById('sideMenu');
    if (sideMenu.style.width === '250px') {
        sideMenu.style.width = '0';
    } else {
        sideMenu.style.width = '250px';
    }
}
