let currentFormUrl = ""; // متغير لتخزين الرابط المختار مؤقتاً

// دالة تعمل عند الضغط على أزرار المقاييس العلوية
function prepareView(url) {
    const placeholder = document.getElementById('placeholder-text');
    const startContainer = document.getElementById('start-btn-container');
    const iframe = document.getElementById('contentFrame');

    // 1. تخزين الرابط
    currentFormUrl = url;

    // 2. إخفاء أي شيء مفتوح حالياً
    placeholder.style.display = 'none';
    iframe.style.display = 'none';

    // 3. إظهار زر "اضغط هنا"
    startContainer.style.display = 'block';
}

// دالة تعمل عند الضغط على زر "اضغط هنا لبدء المقياس"
document.getElementById('real-start-btn').addEventListener('click', function() {
    const startContainer = document.getElementById('start-btn-container');
    const iframe = document.getElementById('contentFrame');

    if (currentFormUrl) {
        // إخفاء الزر
        startContainer.style.display = 'none';
        
        // تحميل الرابط في الإطار وإظهاره
        iframe.src = currentFormUrl;
        iframe.style.display = 'block';
    } else {
        alert("حدث خطأ، الرجاء اختيار المقياس مرة أخرى.");
    }
});

// تفعيل التنقل بين التبويبات العلوية (شكلياً)
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
});