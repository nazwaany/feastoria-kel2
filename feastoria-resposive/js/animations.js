document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.count-number');
    const speed = 200; // The lower the slower

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        // Lower inc to slow and higher to slow
        const inc = Math.max(Math.floor(target / speed), 1);

        // Check if target is reached
        if (count < target) {
            // Add inc to count and output in counter
            counter.innerText = count + inc;
            // Call function every ms
            setTimeout(() => animateCounter(counter), 10);
        } else {
            counter.innerText = target.toLocaleString('id-ID'); // Format number with dots
        }
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is visible
            if (entry.isIntersecting) {
                // Start the animation for each counter
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                // Stop observing the element after the animation has started
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    const dashboard = document.querySelector('.dashboard-container');
    if (dashboard) {
        observer.observe(dashboard);
    }
});