
const posts = document.querySelector('.posts');

//create elements and render posts
function renderPost(doc){

    const post = document.createElement('div');
    const postLeft = document.createElement('div');
    const postRight = document.createElement('div');
    const title = document.createElement('div');
    const createdAt = document.createElement('div');
    const author = document.createElement('div');
    const content = document.createElement('div');
    const readMore = document.createElement('button');

    post.setAttribute('data-id', doc.id); 
    post.classList.add('post');
    postLeft.classList.add('post-left');
    postRight.classList.add('post-right');
    title.classList.add('title');
    title.classList.add('title');
    createdAt.classList.add('created-at');
    author.classList.add('author');
    readMore.classList.add('read-more-btn');

    title.textContent = doc.data().title;
    author.textContent = `Author: ${doc.data().author}`
    content.textContent = doc.data().content;
    createdAt.textContent = doc.data().created_at;
    readMore.textContent = 'Read More';
    
    post.appendChild(postLeft);
    post.appendChild(postRight);

    postLeft.appendChild(title);
    postLeft.appendChild(createdAt);
    postLeft.appendChild(author);

    postRight.appendChild(content);
    postRight.appendChild(readMore);

    posts.appendChild(post);

}

//GET DATA FROM DB

function realTimeGetData(){
    db.collection('blog').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
    
        changes.forEach(change => {
            if(change.type == 'added'){
                renderPost(change.doc);
            }else if(change.type == 'removed'){
                const posts = document.querySelector('.posts');
                const changedpost = posts.querySelector('[data-id='+ change.doc.id.toString() +']');
                posts.removeChild(changedpost);
            }
        })
    
    });
}
realTimeGetData();