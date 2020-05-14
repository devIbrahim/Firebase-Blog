
const form = document.querySelector('.form');

db.collection('blog').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        // console.log(doc.data());
    });
});

//UPLOAD DATA TO DB

form.addEventListener('submit', e => {
    e.preventDefault();
    if(form.title.value.trim() && form.content.value.trim() && form.author.value.trim() && form.date.value.trim()){
        db.collection('blog').add({
            title: form.title.value.trim(),
            created_at: form.date.value.trim(), 
            content: form.content.value.trim(),
            author: form.author.value.trim()
        }).then(() => {
            window.location.reload();
            alert('The post was published.');
        });
        form.title.value = "";
        form.date.value = "";
        form.author.value = "";
        form.content.value = "";
    }else{
        const inputs = [form.title, form.content, form.author, form.date];
        inputs.forEach(input => {
            if(!input.value.trim()){
                input.classList.add('error');
                input.addEventListener('click', () => {
                    input.classList.remove('error');
                })
            }
        });
    }
})

document.querySelector('.btn-add').addEventListener('click', addBtnClicked);
document.querySelector('.btn-delete').addEventListener('click', deleteBtnClicked);


function addBtnClicked(){
    form.classList.remove('hide');
    document.querySelector('.button-group').classList.add('hide');
}

function deleteBtnClicked(){
    document.querySelector('.posts-cont').classList.remove('hide');
    document.querySelector('.button-group').classList.add('hide');
}

document.querySelector('.img-back').addEventListener('click', () => {
    form.classList.add('hide');
    document.querySelector('.button-group').classList.remove('hide');
});

document.querySelector('.img-back-2').addEventListener('click', () => {
    document.querySelector('.posts-cont').classList.add('hide');
    document.querySelector('.button-group').classList.remove('hide');
});

document.querySelector('.reset-img').addEventListener('click', () => {
    form.reset();
})



db.collection('blog').onSnapshot(snapshot => {   

        const rmBtnDOM = document.querySelectorAll('.read-more-btn')
        const rmBtnArray = Array.from(rmBtnDOM);
        const deleteHTML = `<button class="btn-delete-post">Delete Post</button>`;
        rmBtnArray.forEach(btn => {
            if(btn.parentElement.childElementCount < 3){
                btn.parentElement.innerHTML+=deleteHTML;
            }
        });

        const deleteBtns = Array.from(document.querySelectorAll('.btn-delete-post'));
        deleteBtns.forEach(btn => btn.addEventListener('click', e => deletePost(e)));

        function deletePost(e){
            const id = e.target.parentElement.parentElement.getAttribute('data-id');
            db.collection('blog').doc(id).delete();
        }

});

