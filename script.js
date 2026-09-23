document.addEventListener("DOMContentLoaded", function () {

    const fechaInicio = new Date("2026-02-15T00:00:00");

    const startButton = document.getElementById("startButton");
    const intro = document.getElementById("intro");
    const transition = document.getElementById("transition");
    const experience = document.getElementById("experience");
    const particlesContainer = document.getElementById("particles");

    const particleHeart = document.getElementById("particle-heart");

    const envelope = document.querySelector(".envelope");
    const openLetter = document.getElementById("openLetter");

    const topButton = document.getElementById("topButton");

    if (!startButton) {
        console.error("No se encontró el botón startButton");
        return;
    }

    // Partículas del universo

    if (particlesContainer) {

        for (let i = 0; i < 120; i++) {

            const particle = document.createElement("div");

            particle.classList.add("particle");

            particle.style.left = Math.random() * 100 + "%";
            particle.style.top = Math.random() * 100 + "%";

            const size = 1 + Math.random() * 3;

            particle.style.width = size + "px";
            particle.style.height = size + "px";

            particle.style.animationDuration =
                5 + Math.random() * 12 + "s";

            particle.style.animationDelay =
                Math.random() * 10 + "s";

            particlesContainer.appendChild(particle);
        }
    }

    // Corazón de partículas

    if (particleHeart) {

        for (let i = 0; i < 180; i++) {

            const t = Math.random() * Math.PI * 2;

            const x =
                16 * Math.pow(Math.sin(t), 3);

            const y =
                -(
                    13 * Math.cos(t) -
                    5 * Math.cos(2 * t) -
                    2 * Math.cos(3 * t) -
                    Math.cos(4 * t)
                );

            const particle = document.createElement("div");

            particle.classList.add("heart-particle");

            particle.style.left =
                130 + x * 8 + "px";

            particle.style.top =
                105 + y * 8 + "px";

            particle.style.animationDelay =
                Math.random() * 2 + "s";

            particle.style.animationDuration =
                1.5 + Math.random() * 2 + "s";

            particleHeart.appendChild(particle);
        }
    }

    // Botón comenzar

    startButton.addEventListener("click", function () {

        if (transition) {
            transition.classList.add("active");
        }

        crearExplosion(
            window.innerWidth / 2,
            window.innerHeight / 2,
            80
        );

        setTimeout(function () {

            if (intro) {
                intro.style.display = "none";
            }

            if (experience) {
                experience.style.opacity = "1";
            }

            if (transition) {
                transition.classList.remove("active");
            }

            revelarSecciones();

        }, 1500);
    });

    // Explosión de partículas

    function crearExplosion(x, y, cantidad) {

        for (let i = 0; i < cantidad; i++) {

            const particle = document.createElement("div");

            particle.style.position = "fixed";
            particle.style.left = x + "px";
            particle.style.top = y + "px";

            particle.style.width = "4px";
            particle.style.height = "4px";

            particle.style.borderRadius = "50%";

            particle.style.background =
                Math.random() > 0.5
                    ? "#d4af37"
                    : "#8b0000";

            particle.style.boxShadow =
                "0 0 12px currentColor";

            particle.style.pointerEvents = "none";
            particle.style.zIndex = "2000";

            document.body.appendChild(particle);

            const angle =
                Math.random() * Math.PI * 2;

            const distance =
                100 + Math.random() * 500;

            const finalX =
                Math.cos(angle) * distance;

            const finalY =
                Math.sin(angle) * distance;

            const animation = particle.animate(
                [
                    {
                        transform:
                            "translate(-50%, -50%) scale(1)",
                        opacity: 1
                    },
                    {
                        transform:
                            "translate(calc(-50% + " +
                            finalX +
                            "px), calc(-50% + " +
                            finalY +
                            "px)) scale(0)",
                        opacity: 0
                    }
                ],
                {
                    duration:
                        900 + Math.random() * 800,
                    easing:
                        "cubic-bezier(.2,.8,.3,1)"
                }
            );

            animation.onfinish = function () {
                particle.remove();
            };
        }
    }

    // Animaciones al aparecer las secciones

    const sections =
        document.querySelectorAll(".experience-section");

    function revelarSecciones() {

        sections.forEach(function (section, index) {

            setTimeout(function () {

                section.classList.add("section-visible");

            }, index * 150);
        });
    }

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "section-visible"
                            );
                        }
                    });

                },
                {
                    threshold: 0.15
                }
            );

        sections.forEach(function (section) {
            observer.observe(section);
        });

    } else {

        sections.forEach(function (section) {
            section.classList.add("section-visible");
        });
    }

    // Partículas siguiendo el mouse

    let ultimaParticula = 0;

    document.addEventListener(
        "mousemove",
        function (event) {

            const ahora = Date.now();

            if (ahora - ultimaParticula < 40) {
                return;
            }

            ultimaParticula = ahora;

            crearParticulaMouse(
                event.clientX,
                event.clientY
            );
        }
    );

    function crearParticulaMouse(x, y) {

        const particle = document.createElement("div");

        particle.style.position = "fixed";
        particle.style.left = x + "px";
        particle.style.top = y + "px";

        particle.style.width = "3px";
        particle.style.height = "3px";

        particle.style.borderRadius = "50%";

        particle.style.background =
            Math.random() > 0.5
                ? "#d4af37"
                : "#8b0000";

        particle.style.boxShadow =
            "0 0 10px currentColor";

        particle.style.pointerEvents = "none";
        particle.style.zIndex = "999";

        document.body.appendChild(particle);

        const moveX =
            (Math.random() - 0.5) * 50;

        const moveY =
            (Math.random() - 0.5) * 50;

        const animation = particle.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(1)",
                    opacity: 0.9
                },
                {
                    transform:
                        "translate(calc(-50% + " +
                        moveX +
                        "px), calc(-50% + " +
                        moveY +
                        "px)) scale(0)",
                    opacity: 0
                }
            ],
            {
                duration: 700,
                easing: "ease-out"
            }
        );

        animation.onfinish = function () {
            particle.remove();
        };
    }

    // Contador

    function actualizarContador() {

        const ahora = new Date();

        const diferencia =
            ahora - fechaInicio;

        if (diferencia < 0) {
            return;
        }

        const segundosTotales =
            Math.floor(diferencia / 1000);

        const dias =
            Math.floor(
                segundosTotales / 86400
            );

        const horas =
            Math.floor(
                (segundosTotales % 86400) / 3600
            );

        const minutos =
            Math.floor(
                (segundosTotales % 3600) / 60
            );

        const segundos =
            segundosTotales % 60;

        const days =
            document.getElementById("days");

        const hours =
            document.getElementById("hours");

        const minutes =
            document.getElementById("minutes");

        const seconds =
            document.getElementById("seconds");

        if (days) {
            days.textContent =
                String(dias).padStart(3, "0");
        }

        if (hours) {
            hours.textContent =
                String(horas).padStart(2, "0");
        }

        if (minutes) {
            minutes.textContent =
                String(minutos).padStart(2, "0");
        }

        if (seconds) {
            seconds.textContent =
                String(segundos).padStart(2, "0");
        }
    }

    actualizarContador();

    setInterval(
        actualizarContador,
        1000
    );

    // Carta

    if (envelope && openLetter) {

        openLetter.addEventListener(
            "click",
            function () {

                envelope.classList.toggle("open");

                const text =
                    openLetter.querySelector("span");

                if (
                    envelope.classList.contains("open")
                ) {

                    if (text) {
                        text.textContent =
                            "CERRAR CARTA";
                    }

                    crearExplosion(
                        window.innerWidth / 2,
                        window.innerHeight / 2,
                        25
                    );

                } else {

                    if (text) {
                        text.textContent =
                            "ABRIR CARTA";
                    }
                }
            }
        );
    }

    // Botón regresar arriba

    if (topButton) {

        window.addEventListener(
            "scroll",
            function () {

                if (window.scrollY > 700) {

                    topButton.classList.add(
                        "visible"
                    );

                } else {

                    topButton.classList.remove(
                        "visible"
                    );
                }
            }
        );

        topButton.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        );
    }

    // Lluvia de corazones

    let finalCelebration = false;

    const finalSection =
        document.querySelector(".final-section");

    if (
        finalSection &&
        "IntersectionObserver" in window
    ) {

        const finalObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (
                            entry.isIntersecting &&
                            !finalCelebration
                        ) {

                            finalCelebration = true;

                            lluviaDeCorazones();
                        }
                    });

                },
                {
                    threshold: 0.4
                }
            );

        finalObserver.observe(finalSection);
    }

    function lluviaDeCorazones() {

        for (let i = 0; i < 70; i++) {

            setTimeout(function () {

                const heart =
                    document.createElement("div");

                heart.innerHTML = "♥";

                heart.style.position = "fixed";

                heart.style.left =
                    Math.random() * 100 + "vw";

                heart.style.top = "-30px";

                heart.style.color =
                    Math.random() > 0.7
                        ? "#d4af37"
                        : "#8b0000";

                heart.style.fontSize =
                    10 + Math.random() * 25 + "px";

                heart.style.textShadow =
                    "0 0 12px currentColor";

                heart.style.pointerEvents = "none";
                heart.style.zIndex = "999";

                document.body.appendChild(heart);

                const horizontal =
                    Math.random() * 200 - 100;

                const rotation =
                    Math.random() * 720 - 360;

                const animation = heart.animate(
                    [
                        {
                            transform:
                                "translateY(0) rotate(0deg)",
                            opacity: 0
                        },
                        {
                            transform:
                                "translate(" +
                                horizontal +
                                "px, 50vh) rotate(" +
                                rotation / 2 +
                                "deg)",
                            opacity: 1
                        },
                        {
                            transform:
                                "translate(" +
                                horizontal * 1.5 +
                                "px, 110vh) rotate(" +
                                rotation +
                                "deg)",
                            opacity: 0
                        }
                    ],
                    {
                        duration:
                            4000 +
                            Math.random() * 3000,
                        easing: "ease-in"
                    }
                );

                animation.onfinish =
                    function () {
                        heart.remove();
                    };

            }, i * 40);
        }
    }

    // Efecto al pasar sobre elementos

    const interactiveElements =
        document.querySelectorAll(
            ".magic-button, .time-box, .envelope"
        );

    interactiveElements.forEach(
        function (element) {

            element.addEventListener(
                "mouseenter",
                function () {

                    const rect =
                        element.getBoundingClientRect();

                    crearExplosion(
                        rect.left +
                        rect.width / 2,

                        rect.top +
                        rect.height / 2,

                        8
                    );
                }
            );
        }
    );

    // Tecla Enter

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" &&
                intro &&
                intro.style.display !== "none"
            ) {

                startButton.click();
            }
        }
    );

    console.log(
        "❤️ Página iniciada correctamente."
    );

});