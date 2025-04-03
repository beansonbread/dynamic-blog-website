document.addEventListener('DOMContentLoaded', function() {
    const blogList = document.getElementById('post-lists');
    if (blogList) {
    loadBlogPosts();  
    }
        
    const form = document.getElementById('create-post');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            saveBlogPost();
        });
    }
});

function saveBlogPost() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const imageInput = document.getElementById('upload-image');

    let imageBase64 = '';

    if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onloadend = function () {
            imageBase64 = reader.result;
            savePostData(title, content, imageBase64);
            window.location.href = "index.html";
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        savePostData(title, content, '');
        window.location.href = "index.html";
    }
}


function savePostData(title, content, image) {
        const storedBlogPosts = localStorage.getItem('blogPosts');
        let blogPosts = storedBlogPosts ? JSON.parse(storedBlogPosts) : [];
        
        const newPost = { title, content, image };

        blogPosts.push(newPost);

        localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
}

function loadBlogPosts() {
    const storedBlogPosts = localStorage.getItem('blogPosts');
    const blogList = document.getElementById('post-lists');
    
    if (storedBlogPosts) {
        const blogPosts = JSON.parse(storedBlogPosts);
        blogPosts.forEach(element => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <h3>${element.title}</h3>
                <p>${element.content}</p>
                ${element.image ? `<img src="${element.image}" alt="post image" />` : ''}`;
            blogList.appendChild(listItem); 
        });
    }
}