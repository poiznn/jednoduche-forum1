function getPosts() {
    return JSON.parse(localStorage.getItem('posts') || '[]');
}

function savePost(post) {
    const posts = getPosts();
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
}

function displayPosts() {
    const posts = getPosts();
    const postList = document.getElementById('postList');
    postList.innerHTML = '';

    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.innerHTML = `
            <h3><a href="view-post.html?id=${index}">${post.title}</a></h3>
            <p>Autor: ${post.author}</p>
        `;
        postList.appendChild(postDiv);
    });
}

document.getElementById('postForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    savePost({ author, title, content, comments: [] });
    window.location.href = 'index.html';
});

function displayPostDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const post = getPosts()[postId];

    document.getElementById('postDetail').innerHTML = `
        <h2>${post.title}</h2>
        <p><strong>Autor:</strong> ${post.author}</p>
        <p>${post.content}</p>
    `;

    const commentsDiv = document.getElementById('comments');
    commentsDiv.innerHTML = '';
    post.comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.textContent = comment;
        commentsDiv.appendChild(commentDiv);
    });
}

document.getElementById('commentForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const comment = document.getElementById('comment').value;
    const posts = getPosts();

    posts[postId].comments.push(comment);
    localStorage.setItem('posts', JSON.stringify(posts));
    displayPostDetail();
});

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('postList')) displayPosts();
    if (document.getElementById('postDetail')) displayPostDetail();
});
