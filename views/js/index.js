$(function () {
    $('#btn-upload').on('click', () => {
        //获取file
        let file = $('#file')[0]['files'][0];
        console.log(file);
        if (file != undefined) {
            let onlyName = file.name.split(".")[0]
            let formData = new FormData();
            formData.append('file', file);
            formData.append('onlyName', onlyName);
            $.ajax({
                type: 'POST',
                url: '/upload',
                data: formData,
                contentType: false,
                processData: false,
                success: download.bind(true, "model/gltf+json", `${onlyName}.gltf`),
                error(err) {
                    console.log(err);
                }
            })
        } else {
            console.log("还没有选择文件");
        }
    })

})