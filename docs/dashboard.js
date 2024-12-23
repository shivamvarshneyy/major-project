function loadSection(section) {
    const fitnessSection = document.getElementById('fitness');
    const mentalHealthSection = document.getElementById('mental-health');

    if (section === 'fitness') {
        fitnessSection.style.display = 'block';
        mentalHealthSection.style.display = 'none';
    } else {
        fitnessSection.style.display = 'none';
        mentalHealthSection.style.display = 'block';
    }

    // Remove active class from all menu items
    document.querySelectorAll('.sidebar ul li a').forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to the selected menu item
    const activeLink = document.querySelector(`.sidebar ul li a[onclick="loadSection('${section}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}
