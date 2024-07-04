document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navList = document.getElementById('navbar__list');

    function createNavItems() {
        sections.forEach(section => {
            const navItem = document.createElement('li');
            const navLink = document.createElement('a');
            navLink.href = `#${section.id}`;
            navLink.textContent = section.getAttribute('data-nav');
            navLink.classList.add('menu__link');

            navLink.addEventListener('click', (event) => {
                event.preventDefault();
                section.scrollIntoView({ behavior: 'smooth' });
                setActiveSection(section);
            });

            navItem.appendChild(navLink);
            navList.appendChild(navItem);
        });
    }

    function setActiveSection(activeSection) {
        sections.forEach(section => {
            if (section === activeSection) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        const navLinks = document.querySelectorAll('.menu__link');
        navLinks.forEach(link => {
            if (link.getAttribute('href').substring(1) === activeSection.id) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', () => {
        const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                setActiveSection(section);
            }
        });
    });

    createNavItems();

    const commentForm = document.querySelector('.comment-form');
    const commentsContainer = document.querySelector('.comments-container');

    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const commentText = document.getElementById('comment').value;

        const comment = document.createElement('div');
        comment.classList.add('comment');

        const commentHeader = document.createElement('p');
        commentHeader.innerHTML = `<strong>${name}</strong> (${email})`;

        const commentBody = document.createElement('p');
        commentBody.textContent = commentText;

        comment.appendChild(commentHeader);
        comment.appendChild(commentBody);

        commentsContainer.insertBefore(comment, commentForm);

        commentForm.reset();
    });
});
