const recomendaciones = document.querySelector('.recomendaciones'),
    tabs = recomendaciones.querySelectorAll('.recomendacion'),
    flecha = document.querySelectorAll('.flecha');

tabs.forEach(tab =>{
    tab.addEventListener('click',() =>{
        recomendaciones.querySelector('.active').classList.remove('active');
        tab.classList.add('active');
    })
});

