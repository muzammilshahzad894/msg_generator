// Funciton to Download Image 1
function downloadImg1() {
    var type = document.getElementById("downloadImage1").value;

    if(type == 'jpg'){
        html2canvas(document.getElementById("phone")).then(function(canvas) {
            var anchorTag = document.createElement("a");
            document.body.appendChild(anchorTag);
            anchorTag.download = "message1.jpg";
            anchorTag.href = canvas.toDataURL();
            anchorTag.target = '_blank';
            anchorTag.click();
        });
    }else if(type == 'png'){
        html2canvas(document.getElementById("phone")).then(function(canvas) {
            var anchorTag = document.createElement("a");
            document.body.appendChild(anchorTag);
            anchorTag.download = "message1.png";
            anchorTag.href = canvas.toDataURL();
            anchorTag.target = '_blank';
            anchorTag.click();
        });
    }else if(type == 'pdf'){
        const image_data = this.document.getElementById("phone");
        var opt = {
            margin: 0.7,
            filename: 'message1.pdf',
            image: {
                type: 'jpeg',
                quality: 0.98
            },
            html2canvas: {
                scale: 2
            },
            jsPDF: {
                unit: 'in',
                format: 'tabloid',
                orientation: 'portrait'
            }
        };
        html2pdf().from(image_data).set(opt).save();
    }else {
        let pptx = new PptxGenJS();
        pptx.tableToSlides('phone', {
            x: 1.0,
            y: 1.0,
            w: 10
        });
        pptx.writeFile({
            fileName: 'table2slides.pptx'
        });
    }

}


// Funciton to Download Image 2
function downloadImg2() {
    var type = document.getElementById("btn-Convert-Html2Image1").value;
    console.log(type);

    if(type == 'jpg'){
        html2canvas(document.getElementById("phone1")).then(function(canvas) {
            var anchorTag = document.createElement("a");
            document.body.appendChild(anchorTag);
            anchorTag.download = "message1.jpg";
            anchorTag.href = canvas.toDataURL();
            anchorTag.target = '_blank';
            anchorTag.click();
        });
    }else if(type == 'png'){
        html2canvas(document.getElementById("phone1")).then(function(canvas) {
            var anchorTag = document.createElement("a");
            document.body.appendChild(anchorTag);
            anchorTag.download = "message1.png";
            anchorTag.href = canvas.toDataURL();
            anchorTag.target = '_blank';
            anchorTag.click();
        });
    }else if(type == 'pdf'){
        const image_data = this.document.getElementById("phone1");
        var opt = {
            margin: 0.7,
            filename: 'message1.pdf',
            image: {
                type: 'jpeg',
                quality: 0.98
            },
            html2canvas: {
                scale: 2
            },
            jsPDF: {
                unit: 'in',
                format: 'tabloid',
                orientation: 'portrait'
            }
        };
        html2pdf().from(image_data).set(opt).save();
    }else {
        let pptx = new PptxGenJS();
        pptx.tableToSlides('phone1', {
            x: 1.0,
            y: 1.0,
            w: 10
        });
        pptx.writeFile({
            fileName: 'table2slides.pptx'
        });
    }

}