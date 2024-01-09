const commentFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the comment form
    const text = document.querySelector('#comment').value.trim();
    const blog_id = window.location.pathname.split('/')[2];
    console.log(blog_id);

    if (text && blog_id) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ text, blog_id }),
        headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
        // If successful, reload the page
        document.location.reload();
        } else {
        alert(response.statusText);
        }
    }
};

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);