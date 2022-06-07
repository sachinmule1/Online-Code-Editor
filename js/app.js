window.onload = function () {
    for (var i = 0; i < document.getElementsByClassName("code").length; i++)
        document.getElementsByClassName("code")[i].style.height = document.querySelector(".code-editor").clientHeight - 40 + "px";

    let htmlEditor = ace.edit("html");
    htmlEditor.session.setMode("ace/mode/html");
    htmlEditor.setTheme("ace/theme/chrome");
    if (localStorage.getItem("html-file") == null)
        htmlEditor.session.setValue(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1 class="greet">Hello</h1>
</body>
</html>`);
    else htmlEditor.session.setValue(localStorage.getItem("html-file"))
    htmlEditor.session.setUseWrapMode(true);
    htmlEditor.setShowPrintMargin(false);
    htmlEditor.setHighlightActiveLine(false);
    htmlEditor.session.on('change', function (delta) {
        update();
    });


    let cssEditor = ace.edit("css");
    cssEditor.session.setMode("ace/mode/css");
    cssEditor.setTheme("ace/theme/crimson_editor");

    if (localStorage.getItem("css-file") == null)
        cssEditor.session.setValue(`.greet {
    color:#ffffff;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    background:tomato;
    border:1px solid;
    padding:40px;
}`);
    else cssEditor.session.setValue(localStorage.getItem("css-file"))
    cssEditor.session.setUseWrapMode(true);
    cssEditor.setShowPrintMargin(false);
    cssEditor.setHighlightActiveLine(false);
    cssEditor.session.on('change', function (delta) {
        update();
    });

    let jsEditor = ace.edit("javascript");
    jsEditor.session.setMode("ace/mode/javascript");
    jsEditor.setTheme("ace/theme/crimson_editor");
    if (localStorage.getItem("js-file") == null)
        jsEditor.session.setValue(`document.querySelector(".greet").innerHTML+=" World..!";`);
    else
        jsEditor.session.setValue(localStorage.getItem("js-file"))
    jsEditor.session.setUseWrapMode(true);
    jsEditor.setShowPrintMargin(false);
    jsEditor.setHighlightActiveLine(false);
    jsEditor.session.on('change', function (delta) {
        update();
    });
    update();

    function update() {
        let output = document.querySelector(".output .virtual-iframe").contentWindow.document;
        console.log(output)
        output.open();
        output.write("<style>" + cssEditor.getValue() + "</style>" + htmlEditor.getValue() + "<script>" + jsEditor.getValue() + "</script>");
        output.close();
        localStorage.setItem("html-file", htmlEditor.getValue())
        localStorage.setItem("css-file", cssEditor.getValue())
        localStorage.setItem("js-file", jsEditor.getValue())
    }

    window.addEventListener("resize", e => {
        for (var i = 0; i < document.getElementsByClassName("code").length; i++)
            document.getElementsByClassName("code")[i].style.height = document.querySelector(".code-editor").clientHeight - 40 + "px";
        htmlEditor.resize();
        cssEditor.resize();
        jsEditor.resize();
    })

    let layout = 1;

    document.querySelector(".change-layout").addEventListener("click", function () {
        layout++;
        if (layout > 1) layout = 0;
        changeLayout();
    })

    function changeLayout() {
        switch (layout) {
            case 0:
                document.querySelector(".coder").classList.add("view1")
                document.querySelector(".coder").classList.remove("view2")
                document.querySelector(".container").classList.add("view1")
                document.querySelector(".container").classList.remove("view2")

                for (var i = 0; i < document.getElementsByClassName("code").length; i++) {
                    document.getElementsByClassName("code")[i].style.maxHeight = "unset";
                    document.getElementsByClassName("code")[i].style.height = document.querySelector(".code-editor").clientHeight - 40 + "px";
                }
                htmlEditor.resize();
                cssEditor.resize();
                jsEditor.resize();
                break;
            case 1:
                document.querySelector(".coder").classList.add("view2")
                document.querySelector(".coder").classList.remove("view1")
                document.querySelector(".container").classList.add("view2")
                document.querySelector(".container").classList.remove("view1")

                for (var i = 0; i < document.getElementsByClassName("code").length; i++) {
                   
                    document.getElementsByClassName("code")[i].style.height = document.querySelector(".code-editor").clientHeight - 40 + "px";
                    document.getElementsByClassName("code")[i].style.maxHeight = "150px";/*194*/ 
                }
                htmlEditor.resize();
                cssEditor.resize();
                jsEditor.resize();
                break;
        }
    }
}