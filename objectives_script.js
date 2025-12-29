document.addEventListener('DOMContentLoaded', () => {
    // التعامل مع روابط القائمة العلوية
    const navLinks = document.querySelectorAll('.navbar a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // إذا كان الرابط هو "#" فقط، نمنع الانتقال ونغير الكلاس النشط
            // أما إذا كان رابطاً لصفحة أخرى (مثل index.html) نتركه يعمل
            if(this.getAttribute('href') === '#') {
                e.preventDefault();
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
});