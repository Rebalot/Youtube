function inicio(){
    // FUNCIONAMIENTO NAV BAR RECOMENDACIONES
    const recomendaciones = document.querySelector('.recomendaciones'),
        tabs = recomendaciones.querySelectorAll('.recomendacion'),
        flechas = document.querySelectorAll('.flecha_contenedor'),
        flechaderecha = document.querySelector('.flecha.derecha .arrow.right'),
        flechaizquierda = document.querySelector('.flecha.izquierda .arrow.left'),
        { clientWidth, scrollWidth } = recomendaciones;

    tabs.forEach(tab =>{
        tab.addEventListener('click',() =>{
            recomendaciones.querySelector('.active').classList.remove('active');
            tab.classList.add('active');

            tab.scrollIntoView({
                inline: 'center'
            })
        })
    });
    
    flechaderecha.addEventListener('click',() =>{
        recomendaciones.scrollLeft +=  300;
    })
    flechaizquierda.addEventListener('click',() =>{
        recomendaciones.scrollLeft +=  -300;
    })

    recomendaciones.addEventListener('scroll', (e) => {
        updateIcons(e.target.scrollLeft);
    })
    function updateIcons(scrolled_width){
        flechas[0].parentElement.classList.toggle('hide', scrolled_width <= 1);
        flechas[1].parentElement.classList.toggle('hide', scrollWidth - (clientWidth + scrolled_width) <= 1);
    }

    // FUNCIONAMIENTO NAV BAR LATERAL
    const menu_boton_navsup = document.getElementById('menu_list_1')
    const menu_boton_navdesp = document.getElementById('menu_list_2')
    let menu_check = false
    let reabrirext = false
    let reabrirdesp = false
    menu_boton_navsup.addEventListener('change', navlat)
    menu_boton_navdesp.addEventListener('change', navlat)

    function navlat(){
        let windowWidth = window.innerWidth;
        
        
        if (windowWidth >= 1313) {
            if(!menu_check){
                //  se muestra nav extendida
                menu_check = true
                nav('ext')
                console.log('Step 1.1')
            }else{
                //  se muestra nav reducida
                menu_check = false
                nav('redu')
                console.log('Step 1.2')
            }
            console.log('Click en menu, menu_check',menu_check)
            
        } else if(windowWidth >= 792 && windowWidth < 1313){
            if(!menu_check  || reabrirext){
                //  se muestra nav desplegada
                menu_check = true
                nav('desp')
                menu_boton_navdesp.checked = true
                menu_boton_navsup.checked = false
                reabrirext = false
                console.log('Step 2.1')
            }else if(menu_check){
                //  se muestra nav reducida
                menu_check = false
                nav('redu')
                menu_boton_navdesp.checked = false
                menu_boton_navsup.checked = false
                console.log('Step 2.2')
            }
            console.log('Click en menu, menu_check',menu_check)
            console.log('Click en menu, reabrirext',reabrirext)
        } else if(windowWidth < 792){
            if(!menu_check || reabrirdesp){
                //  se muestra nav desplegada
                menu_check = true
                nav('desp')
                reabrirdesp = false
                menu_boton_navdesp.checked = true
                menu_boton_navsup.checked = false
                console.log('Step /3.1')
            }else if(menu_check){
                //  Al cerrar nav desplegada, no debe haber nav lateral, solo boton de menu superior
                menu_check = false
                nav('cerrarDesple_umbral2')
                menu_boton_navdesp.checked = false
                menu_boton_navsup.checked = false
                console.log('Step /3.2')
            }
            console.log('Click en menu, menu_check',menu_check)
            console.log('Click en menu, reabrirdesp',reabrirdesp)
        }
    }
    

    let umbralpass1
    let umbralpass2
    umbralpass()
    function umbralpass(){
        let windowWidth = window.innerWidth;
        
        if(windowWidth >= 1313){
            umbralpass1 = true
        }else if(windowWidth < 1313){
            umbralpass1 = false
        }
        
        if(windowWidth >= 792){
            umbralpass2 = true
        }else if(windowWidth < 792){
            umbralpass2 = false
        }
    }

    window.addEventListener('resize', resize)
    
    function resize(){

        umbralpass()
        if(!umbralpass1){
            if(menu_check == true){
                if(menu_boton_navsup.checked && !menu_boton_navdesp.checked){
                    nav('redu')
                    menu_boton_navsup.checked = false
                    reabrirext = true
                    console.log('Step 3.1')
                    console.log('Menor a umbral 1, reabrirext',reabrirext)
        
                }
                // else if(!menu_boton_navsup.checked && menu_boton_navdesp.checked){

                //     console.log('Step 3.2')
                // }else{

                //     console.log('Step 3.3')
                // }
                
            }else if(menu_check == false){
                // if(menu_boton_navsup.checked && !menu_boton_navdesp.checked){
                    
                //     console.log('Step 4.1')
                    
                // }
                // else if(!menu_boton_navsup.checked && menu_boton_navdesp.checked){

                //     console.log('Step 4.2')
                // }else{

                //     console.log('Step 4.3')
                // }
            }
        }else if (umbralpass1) {
            if(menu_check == true){
                if(!menu_boton_navsup.checked){
                    nav('ext')
                    menu_boton_navsup.checked = true
                    menu_boton_navdesp.checked = false
                    console.log('Step 5.1')
                    
                }
                // else if(menu_boton_navsup.checked){

                //     console.log('Step 5.2')
                // }
            }else if(menu_check == false){
                if(menu_boton_navsup.checked){
                    nav('ext')
                    menu_boton_navsup.checked = true
                    console.log('Step 6.1')
                    
                }
                // else if(!menu_boton_navsup.checked){
                    
                //     console.log('Step 6.2')
                // }
            }
        }
        ///////////////////////////
        if(!umbralpass2){
            if(menu_check == true){
                if(!menu_boton_navsup.checked && menu_boton_navdesp.checked){
                    nav('remove_reducido')
                    console.log('Step 7.1')
                }else if(menu_boton_navsup.checked && !menu_boton_navdesp.checked){

                    console.log('Step 7.2')
                }else{
                    nav('remove_reducido')
                    reabrirdesp = true
                    console.log('Step 7.3')
                }
                
            }else if(menu_check == false){
                if(menu_boton_navsup.checked && !menu_boton_navdesp.checked){
                    
                    console.log('Step 8.1')
                    
                }else if(!menu_boton_navsup.checked && menu_boton_navdesp.checked){

                    console.log('Step 8.2')
                }else{
                    nav('remove_reducido')
                    console.log('Step 8.3')
                }
            }
        }else if(umbralpass2){
            if(menu_check == true){
                if(menu_boton_navsup.checked && !menu_boton_navdesp.checked){
                    
                    console.log('Step 9.1')
                    
                }else if(!menu_boton_navsup.checked && menu_boton_navdesp.checked){
                    nav('add_reducido')
                    console.log('Step 9.2')
                }else{
                    nav('add_reducido')
                    console.log('Step 9.3')
                }
                
            }else if(menu_check == false){
                if(menu_boton_navsup.checked && !menu_boton_navdesp.checked){
                    
                    console.log('Step 10.1')
                    
                }else if(!menu_boton_navsup.checked && menu_boton_navdesp.checked){

                    console.log('Step 10.2')
                }else{
                    nav('add_reducido')
                    console.log('Step 10.3')
                }
            }
        } 
    }
    
    function nav(tipo){
        const navreducida = document.querySelector('.nav_redu')
        const navextendida = document.querySelector('.nav_exte')
        const navdesplegada = document.querySelector('.nav_desple')
        const navlateral = document.querySelector('.lateral')
        const contenidogeneral = document.querySelector('.contenidogeneral')
        const navrecomendacion = document.querySelector('.nav_recomendacion')

        if(tipo == 'redu'){
            navreducida.classList.remove('hide')
            navextendida.classList.add('hide')
            navdesplegada.classList.add('hide')
            navlateral.classList.add('redu')
            contenidogeneral.classList.add('redu')
            navrecomendacion.classList.add('redu')
        }else if(tipo == 'desp'){
            navdesplegada.classList.remove('hide')
            navreducida.classList.add('hide')
        }else if(tipo == 'ext'){
            navextendida.classList.remove('hide')
            navreducida.classList.add('hide')
            navdesplegada.classList.add('hide')
            navlateral.classList.remove('redu')
            contenidogeneral.classList.remove('redu')
            navrecomendacion.classList.remove('redu')
        }else if(tipo == 'remove_reducido'){
            navreducida.classList.add('hide')
            navlateral.classList.remove('redu')
            contenidogeneral.classList.remove('redu')
            navrecomendacion.classList.remove('redu')
        }else if(tipo == 'add_reducido'){
            navreducida.classList.remove('hide')
            navlateral.classList.add('redu')
            contenidogeneral.classList.add('redu')
            navrecomendacion.classList.add('redu')
        }else if(tipo == 'cerrarDesple_umbral2'){
            navreducida.classList.add('hide')
            navextendida.classList.add('hide')
            navdesplegada.classList.add('hide')
            navlateral.classList.remove('redu')
            contenidogeneral.classList.remove('redu')
            navrecomendacion.classList.remove('redu')
        }   
    }
}   
window.addEventListener('load', inicio)
