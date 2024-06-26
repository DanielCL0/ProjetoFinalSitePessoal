document.addEventListener('DOMContentLoaded', function () {
    const username = 'DanielCL0'; // Seu nome de usuário do GitHub
    const apiUrl = `https://api.github.com/users/${username}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Atualiza a imagem de perfil
            const avatarElement = document.querySelector('.imagem-perfil');
            avatarElement.src = data.avatar_url;
            avatarElement.alt = 'Foto de Perfil';

            // Atualiza outras informações do perfil
            const perfilElement = document.getElementById('perfil2');
            perfilElement.innerHTML += `
                <p class="fw-bold d-inline-flex">Seguidores:</p>
                <p class="d-inline-flex">${data.followers}</p>
                <p class="fw-bold d-inline-flex">Repositórios:</p>
                <p class="d-inline-flex">${data.public_repos}</p>
                <p class="fw-bold d-inline-flex">Conta criada em:</p>
                <p class="d-inline-flex">${new Date(data.created_at).toLocaleDateString()}</p>
            `;
        })
        .catch(error => console.error('Error:', error));

    // Fetching repositories data
    const reposUrl = `https://api.github.com/users/${username}/repos?sort=updated&direction=desc`;

    fetch(reposUrl)
        .then(response => response.json())
        .then(repos => {
            if (repos.length > 0) {
                const lastUpdatedRepo = repos[0];
                const lastUpdatedRepoElement = document.createElement('div');
                lastUpdatedRepoElement.innerHTML = `
                    <p class="fw-bold d-inline-flex">Último repositório atualizado:</p>
                    <p class="d-inline-flex"><a href="${lastUpdatedRepo.html_url}" target="_blank">${lastUpdatedRepo.name}</a></p>
                `;
                perfilElement.appendChild(lastUpdatedRepoElement);
            }
        })
        .catch(error => console.error('Error:', error));
});
