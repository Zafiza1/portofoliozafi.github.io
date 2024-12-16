const typed = new Typed('.text', {
    strings: ['Software Developer', 'Web Developer', 'Designer'],
    typeSpeed: 120,
    backSpeed: 60,
    loop: true
});
window.addEventListener('DOMContentLoaded', (event) => {
    // Mendapatkan semua progress bar
    const progressBars = document.querySelectorAll('.progress-line span');

    // Fungsi untuk mengupdate persentase pada progress bar
    progressBars.forEach(bar => {
        // Ambil lebar yang sudah di-set (contoh: 40%)
        const progress = bar.style.width;

        // Update persentase di teks progress
        bar.setAttribute('data-progress', progress);

        // Update animasi progress bar
        const progressWidth = parseInt(progress);  // Mengambil angka dari lebar (misal 40)

        // Membuat animasi dengan setInterval untuk meningkatkan progress
        let currentWidth = 0;
        const interval = setInterval(() => {
            if (currentWidth < progressWidth) {
                currentWidth++;  // Menambah lebar progres secara bertahap
                bar.style.transform = `scaleX(${currentWidth / 100})`;  // Update progress bar
                bar.setAttribute('data-progress', currentWidth); // Update persentase
            } else {
                clearInterval(interval);  // Hentikan animasi saat sudah mencapai target
            }
        }, 20);  // Interval dalam milidetik untuk animasi
    });
});

window.addEventListener('DOMContentLoaded', () => {
    // Mendapatkan semua link navigasi
    const navLinks = document.querySelectorAll('nav a');

    // Menambahkan event listener untuk setiap link
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Mencegah perilaku default (yaitu, berpindah ke anchor)
            event.preventDefault();

            // Mendapatkan id target berdasarkan href (misal #home, #services, dll)
            const targetId = link.getAttribute('href').substring(1); // Menghapus '#' di awal

            // Mencari elemen dengan id yang sesuai
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Mengambil posisi target di halaman
                const targetPosition = targetElement.offsetTop;

                // Mengatur scroll secara perlahan dengan fungsi animasi
                smoothScrollTo(targetPosition);
            }
        });
    });

    // Fungsi untuk scroll secara perlahan
    function smoothScrollTo(targetPosition) {
        const startPosition = window.pageYOffset; // Posisi scroll saat ini
        const distance = targetPosition - startPosition; // Jarak yang harus ditempuh
        const duration = 1000; // Durasi animasi dalam milidetik (misalnya 1000ms = 1 detik)
        let startTime = null;

        // Fungsi untuk animasi scroll secara bertahap
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime; // Waktu yang telah berlalu
            const scrollAmount = easeInOutQuad(timeElapsed, startPosition, distance, duration);

            // Melakukan scroll pada posisi yang dihitung
            window.scrollTo(0, scrollAmount);

            // Jika waktu belum habis, teruskan animasi
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        // Fungsi easing untuk membuat scroll terasa lebih halus
        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        }

        // Mulai animasi
        requestAnimationFrame(animation);
    }
});
