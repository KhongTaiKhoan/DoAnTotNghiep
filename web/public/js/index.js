
$('.toan-tu').on('click',(e)=>{
    let insert_ = $(e.currentTarget).html();
    $('#noi-dung').focus();
    $('#noi-dung').append(insert_);
})



$('#nop').on('click', e => {
    $.ajax({
        method: "POST",
        url: '/nop-bai',
        data: {
            noidung: $('#noi-dung').html()
        }
    }).done(rs => {
        if (rs.complete == true) {
            // console.log(rs.loiGiai[0].luat);
            $('.bai-giai').removeClass('d-none');
            let loiGiai = rs.loiGiai;
            // console.log(loiGiai);
            inKetQua(0,loiGiai.length,$('#toc-do').val() * 1000,loiGiai);
        }

    })
})

function inKetQua(i,length,time,loiGiai){
    if(i >= length) return;
    else {
        // console.log(loiGiai[i]);
        $('.bai-giai').append(
            `<div class="loi-giai-row font-itim"> 
                <div>- <b>Bước ${i+1}</b>: Ap dung <b>${loiGiai[i].luat}</b> cho <b>${loiGiai[i].btApDung}</b>, ta duoc: <b>${loiGiai[i].btKetQua}</b></div>  
                <div>  Biểu thức là: <b>${loiGiai[i].btGoc}</b></div>  
             </div>
             <div class="bottom-trang-tri">.....</div>`
         
         );
        let t = $('#toc-do').val() * 1000 ;

        setTimeout( 
            inKetQua
            ,time,
            i+1,length,t,loiGiai
        )
    }
}

