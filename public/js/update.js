const updatePost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const post = document.querySelector('#post').value.trim();
    const blog_id = window.location.pathname.split('/')[2];

    const update = await fetch(`/api/blogs/${blog_id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, post }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (update.ok) {
    // If successful, reload the page
    document.location.replace('/profile');
    } else {
    alert(update.statusText);
    }
}

const deletePost = async (event) => {
    event.preventDefault();

    const blog_id = window.location.pathname.split('/')[2];

    const deleteData = await fetch(`/api/blogs/${blog_id}`, {
        method: 'DELETE',
    });

    if (deleteData.ok) {
    // If successful, reload the page
    document.location.replace('/profile');
    } else {
    alert(deleteData.statusText);
    }
}

document
    .querySelector('#update')
    .addEventListener('click', updatePost);

document
    .querySelector('#delete')
    .addEventListener('click', deletePost);