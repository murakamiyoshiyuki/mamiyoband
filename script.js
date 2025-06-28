document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Fade-in Animation ---
    const sections = document.querySelectorAll('.content-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Hero Image Swapping Animation ---
    const heroGrid = document.querySelector('.hero-image-grid');
    if (heroGrid) {
        const memberImageSources = {
            "村上": "素材/写真素材/ヒーロー/村上.jpg",
            "マミヨ": "素材/写真素材/ヒーロー/マミヨ.png",
            "つくも": "素材/写真素材/ヒーロー/つくも.jpg",
            "RamBaar": "素材/写真素材/ヒーロー/RamBaar.jpg",
            "やすよ": "素材/写真素材/ヒーロー/やすよ.jpg"
        };
        const chairImageSource = "素材/写真素材/ヒーロー/椅子_ロゴ無し.png";
        const memberNames = Object.keys(memberImageSources);

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function swapImages() {
            const slots = Array.from(heroGrid.querySelectorAll('.hero-image-slot'));
            const shuffledMembers = shuffle([...memberNames]);

            // 1, 3, 5, 7, 9番目のスロット（奇数番目）
            const oddSlots = slots.filter((_, i) => (i + 1) % 2 !== 0);
            // 2, 4, 6, 8, 10番目のスロット（偶数番目）
            const evenSlots = slots.filter((_, i) => (i + 1) % 2 === 0);

            // 現在の奇数スロットのメンバー構成を取得
            const currentMemberAssignment = oddSlots.map(slot => {
                const img = slot.querySelector('img');
                // alt属性から現在のメンバー名を取得
                return img.alt;
            });

            // メンバーの表示位置をランダムに変更
            const newMemberAssignment = shuffle([...currentMemberAssignment]);

            // アニメーションのために一度非表示に
            slots.forEach(slot => slot.style.opacity = 0);

            setTimeout(() => {
                 // 奇数スロットに新しいメンバーを割り当て
                oddSlots.forEach((slot, i) => {
                    const memberName = newMemberAssignment[i];
                    const img = slot.querySelector('img');
                    img.src = memberImageSources[memberName];
                    img.alt = memberName;
                });

                // 偶数スロットには椅子を割り当て
                evenSlots.forEach(slot => {
                    const img = slot.querySelector('img');
                    img.src = chairImageSource;
                    img.alt = '椅子';
                });

                // 再表示
                slots.forEach(slot => slot.style.opacity = 1);
            }, 500); // CSSのtransition durationと合わせる
        }

        setInterval(swapImages, 3000); // 3秒ごとに入れ替え
    }

    // --- Lightbox Gallery ---
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const galleryItems = document.querySelectorAll('.gallery-item');
        const galleryImages = Array.from(galleryItems).map(item => item.querySelector('img').src);
        let currentIndex = 0;

        const showImage = (index) => {
            lightboxImg.src = galleryImages[index];
            currentIndex = index;
            lightbox.style.display = 'block';
        };

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => showImage(index));
        });

        document.querySelector('.lightbox-close').addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        document.querySelector('.lightbox-prev').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            showImage(currentIndex);
        });

        document.querySelector('.lightbox-next').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            showImage(currentIndex);
        });

        // Close lightbox on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
});
