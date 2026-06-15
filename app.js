document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Initial Setup and Lucide Icons
    // ----------------------------------------------------------------------
    lucide.createIcons();
    


    // Force Light Theme (Zen default)
    document.documentElement.setAttribute('data-theme', 'light');

    // ----------------------------------------------------------------------
    // 2. Tab Navigation
    // ----------------------------------------------------------------------
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    function switchTab(tabId) {
        tabButtons.forEach(btn => {
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            }
        });

        tabPanels.forEach(panel => {
            if (panel.id === `panel-${tabId}`) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
        
        // Trigger resize on window to update canvas dimension if layout shifted
        window.dispatchEvent(new Event('resize'));
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.getAttribute('data-tab'));
        });
    });

    // ----------------------------------------------------------------------
    // 3. Dynamic Load Schedule (schedule.md)
    // ----------------------------------------------------------------------
    const scheduleClassEl = document.getElementById('schedule-class');
    const scheduleExerciseEl = document.getElementById('schedule-exercise');

    fetch('schedule.md')
        .then(res => {
            if (!res.ok) throw new Error('Could not fetch schedule.md');
            return res.text();
        })
        .then(text => {
            const classMatch = text.match(/上课时间与地点[*]*[：:]\s*(.+)$/m);
            if (classMatch && scheduleClassEl) scheduleClassEl.textContent = classMatch[1].trim();
            
            const exMatch = text.match(/习题课时间与地点[*]*[：:]\s*(.+)$/m);
            if (exMatch && scheduleExerciseEl) scheduleExerciseEl.textContent = exMatch[1].trim();
        })
        .catch(err => {
            console.error("Error loading schedule.md:", err.message);
            if (scheduleClassEl) scheduleClassEl.textContent = "暂无时间信息";
            if (scheduleExerciseEl) scheduleExerciseEl.textContent = "暂无时间信息";
        });

    // ----------------------------------------------------------------------
    // 4. Dynamic Load Homework (hw/hw.md)
    // ----------------------------------------------------------------------
    const activeHwTitle = document.getElementById('active-hw-title');
    const hwMarkdownContent = document.getElementById('hw-markdown-content');

    fetch('hw/hw.md')
        .then(res => {
            if (!res.ok) throw new Error('Could not fetch hw/hw.md');
            return res.text();
        })
        .then(text => {
            let title = "本周作业";
            const titleMatch = text.match(/^#\s+(.+)$/m);
            if (titleMatch) {
                title = titleMatch[1].trim();
            }
            if (activeHwTitle) activeHwTitle.textContent = title;
            if (hwMarkdownContent) {
                if (typeof marked !== 'undefined') {
                    hwMarkdownContent.innerHTML = marked.parse(text);
                } else {
                    hwMarkdownContent.textContent = text;
                }
            }
            lucide.createIcons();
        })
        .catch(err => {
            console.error("Error loading hw/hw.md:", err.message);
            if (activeHwTitle) activeHwTitle.textContent = "暂无作业";
            if (hwMarkdownContent) hwMarkdownContent.innerHTML = "<p>暂无本周发布作业。</p>";
        });

    // Print Homework Handler
    const printHwBtn = document.getElementById('print-hw-btn');
    if (printHwBtn) {
        printHwBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // ----------------------------------------------------------------------
    // 5. Dynamic Load Course Resources (resources/resources.md)
    // ----------------------------------------------------------------------
    const resourcesMarkdownContent = document.getElementById('resources-markdown-content');

    fetch('resources/resources.md')
        .then(res => {
            if (!res.ok) throw new Error('Could not fetch resources/resources.md');
            return res.text();
        })
        .then(text => {
            if (resourcesMarkdownContent) {
                if (typeof marked !== 'undefined') {
                    resourcesMarkdownContent.innerHTML = marked.parse(text);
                } else {
                    resourcesMarkdownContent.textContent = text;
                }
            }
            lucide.createIcons();
        })
        .catch(err => {
            console.error("Error loading resources.md:", err.message);
            if (resourcesMarkdownContent) {
                resourcesMarkdownContent.innerHTML = "<p>暂无课程资源列表。</p>";
            }
        });

    // ----------------------------------------------------------------------
    // 6. Zen Dry Landscape (枯山水) Concentric Ripple Canvas Animation
    // ----------------------------------------------------------------------
    const canvas = document.getElementById('vector-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;
        
        let centerX = width / 2;
        let centerY = height / 2;
        
        let currentM = { a: 1, b: 0, c: 0, d: 1 };
        let targetM = { a: 1, b: 0, c: 0, d: 1 };
        
        let mouseX = 0;
        let mouseY = 0;
        let mouseIn = false;
        
        let rippleSpacing = 50;
        let ripplePhase = 0;
        let maxRadius = Math.max(width, height) * 0.8;
        
        window.addEventListener('resize', () => {
            if (canvas.offsetWidth === 0) return;
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
            centerX = width / 2;
            centerY = height / 2;
            maxRadius = Math.max(width, height) * 0.8;
        });
        
        const heroSection = document.querySelector('.hero-section');
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
            mouseIn = true;
        });
        
        heroSection.addEventListener('mouseleave', () => {
            mouseIn = false;
        });
        
        function animate() {
            if (mouseIn) {
                targetM.a = 1 + mouseX * 0.1;
                targetM.b = mouseY * 0.25;
                targetM.c = mouseX * 0.25;
                targetM.d = 1 - mouseY * 0.1;
            } else {
                const time = Date.now() * 0.0006;
                targetM.a = 1 + Math.sin(time) * 0.03;
                targetM.b = Math.cos(time * 1.2) * 0.08;
                targetM.c = Math.sin(time * 1.5) * 0.08;
                targetM.d = 1 + Math.cos(time) * 0.03;
            }
            
            const ease = 0.05;
            currentM.a += (targetM.a - currentM.a) * ease;
            currentM.b += (targetM.b - currentM.b) * ease;
            currentM.c += (targetM.c - currentM.c) * ease;
            currentM.d += (targetM.d - currentM.d) * ease;
            
            ctx.clearRect(0, 0, width, height);
            
            const axisColor = 'rgba(43, 42, 38, 0.04)';
            const rippleColor = 'rgba(139, 126, 102, 0.08)';
            const vectorColorI = 'rgba(92, 99, 88, 0.55)';
            const vectorColorJ = 'rgba(92, 99, 88, 0.55)';
            const vectorColorV = 'rgba(139, 126, 102, 0.65)';
            
            function transform(x, y) {
                return {
                    x: centerX + (currentM.a * x + currentM.b * y),
                    y: centerY - (currentM.c * x + currentM.d * y)
                };
            }
            
            ripplePhase = (ripplePhase + 0.15) % rippleSpacing;
            ctx.lineWidth = 1.2;
            
            let rippleCenterX = centerX;
            let rippleCenterY = centerY;
            if (mouseIn) {
                rippleCenterX = centerX + mouseX * 30;
                rippleCenterY = centerY - mouseY * 30;
            } else {
                const time = Date.now() * 0.001;
                rippleCenterX = centerX + Math.sin(time * 0.8) * 12;
                rippleCenterY = centerY + Math.cos(time * 0.6) * 12;
            }
            
            const limit = Math.ceil(maxRadius / rippleSpacing) + 2;
            for (let i = 1; i <= limit; i++) {
                let r = i * rippleSpacing - ripplePhase;
                if (r <= 0) continue;
                
                let opacityFactor = Math.sin((r / maxRadius) * Math.PI);
                if (r > maxRadius) opacityFactor = 0;
                if (opacityFactor < 0) opacityFactor = 0;
                
                ctx.strokeStyle = `rgba(139, 126, 102, ${opacityFactor * 0.08})`;
                
                ctx.beginPath();
                const steps = 90;
                for (let s = 0; s <= steps; s++) {
                    const theta = (s / steps) * Math.PI * 2;
                    const lx = r * Math.cos(theta);
                    const ly = r * Math.sin(theta);
                    
                    const pt = {
                        x: rippleCenterX + (currentM.a * lx + currentM.b * ly),
                        y: rippleCenterY - (currentM.c * lx + currentM.d * ly)
                    };
                    
                    if (s === 0) ctx.moveTo(pt.x, pt.y);
                    else ctx.lineTo(pt.x, pt.y);
                }
                ctx.stroke();
            }
            
            ctx.lineWidth = 1;
            ctx.strokeStyle = axisColor;
            
            ctx.beginPath();
            let ptStart = transform(-width, 0);
            let ptEnd = transform(width, 0);
            ctx.moveTo(ptStart.x, ptStart.y);
            ctx.lineTo(ptEnd.x, ptEnd.y);
            ctx.stroke();
            
            ctx.beginPath();
            ptStart = transform(0, -height);
            ptEnd = transform(0, height);
            ctx.moveTo(ptStart.x, ptStart.y);
            ctx.lineTo(ptEnd.x, ptEnd.y);
            ctx.stroke();
            
            function drawZenVector(x, y, color, label) {
                const pt = transform(x * 55, y * 55);
                ctx.lineWidth = 2;
                ctx.strokeStyle = color;
                ctx.fillStyle = color;
                
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(pt.x, pt.y);
                ctx.stroke();
                
                const angle = Math.atan2(centerY - pt.y, pt.x - centerX);
                ctx.beginPath();
                ctx.moveTo(pt.x, pt.y);
                ctx.lineTo(
                    pt.x - 8 * Math.cos(angle - Math.PI / 6),
                    pt.y + 8 * Math.sin(angle - Math.PI / 6)
                );
                ctx.lineTo(
                    pt.x - 8 * Math.cos(angle + Math.PI / 6),
                    pt.y + 8 * Math.sin(angle + Math.PI / 6)
                );
                ctx.fill();
                
                ctx.font = '300 12px Noto Serif SC';
                ctx.fillText(label, pt.x + 8, pt.y - 4);
            }
            
            drawZenVector(1.4, 0, vectorColorI, "e₁");
            drawZenVector(0, 1.4, vectorColorJ, "e₂");
            drawZenVector(1.4, 1.4, vectorColorV, "v = 1.4e₁ + 1.4e₂");
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
    
    lucide.createIcons();
});
