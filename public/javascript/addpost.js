async function addPost(event) {
    event.preventDefault();

    const title = document.querySelector('#postTitle').value.trim();
    const post_content = document.querySelector('textarea[name="comment-body"]').value.trim();

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_content
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        console.log('WOO! Your post has been added!');
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#postSubmit').addEventListener('submit', addPost);