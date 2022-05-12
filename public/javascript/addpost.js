async function addPost(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const post_content = document.querySelector('textarea[name="post-content"]').value.trim();

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_content
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
<<<<<<< Updated upstream
        alert('WOO! Your post has been added!');
        document.location.replace('/dashboard');
=======
        document.location.replace('/create_a_post');
>>>>>>> Stashed changes
    } else {
        alert(response.statusText);
    }
}

<<<<<<< Updated upstream
document.querySelector('#postBtn').addEventListener('click', addPost);
=======
document.querySelector('#create-post-form').addEventListener('submit', addPost);
>>>>>>> Stashed changes
