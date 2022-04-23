function tutorial (theme, data, selection = 0) {

    renderBody (theme);
    renderMenu (theme, data, selection);

    renderContainer ();
    switch (theme.alignment) {
        case "right":
            renderPreview (data, selection);
            renderSteps (theme, data, selection);
            break;
        default:
            renderSteps (theme, data, selection);
            renderPreview (data, selection);
    };
    
};

function renderBody (theme) {

    document.body.innerHTML = "";
    document.body.style.display = "flex";
    document.body.style.flexDirection = "column";
    document.body.style.margin = 0;
    document.body.style.fontFamily = theme.fontfamily;
    document.body.style.backgroundColor = theme.background;
    document.body.style.overflow = "scroll";
    document.body.style.color = theme.text;

};

function renderMenu (theme, data, selection) {

    var menu = document.createElement("div");
    menu.style.position = "sticky";
    menu.style.position = "-webkit-sticky";
    menu.style.display = "flex";
    menu.style.justifyContent = "space-between";
    menu.style.alignItems = "center";
    menu.style.top = "0";
    menu.style.padding = "10px 20px";
    menu.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
    menu.style['-webkit-backdrop-filter'] = "blur(30px)";
    menu.style.backdropFilter = "blur(20px)";
    menu.style.borderBottom = "1px solid rgba(255, 255, 255, 0.2)";
    menu.style.zIndex = 1000;
    menu.style.height = "35px";

    var title = document.createElement("div");
    title.innerHTML = theme.title;
    menu.append(title);

    var stepper = document.createElement("div");
    stepper.style.display = "flex";
    stepper.style.alignItems = "center";
    stepper.style.gap = "20px";
    stepper.style.padding = "7.5px 20px";
    stepper.style.fontSize = "9pt";
    stepper.style.borderRadius = "50px";
    stepper.style.border = "1px solid rgba(255, 255, 255, 0.15)";
    menu.append(stepper);

    var current = document.createElement("div");
    current.innerHTML = data[selection].title;
    current.style.color = theme.accent;
    current.style.fontWeight = "bold";
    stepper.append(current);

    var select = document.createElement("select");
    select.style['-webkit-appearance'] = "none";
    select.style['-ms-appearance'] = "none";
    select.style['-moz-appearance'] = "none";
    select.style['appearance'] = "none";
    select.style.border = "none";
    select.style.background = "none";
    select.style.color = theme.text;
    select.style.fontSize = "9pt";
    select.onchange = function () { tutorial(theme, data, this.selectedIndex) };
    stepper.append(select);

    data.forEach (function (object, index) {

        var option = document.createElement("option");
        option.selected = index === selection;
        option.value = index;
        option.innerHTML = object.text.slice(0, window.innerWidth / 1000 * 30) + "...";
        window.addEventListener('resize', function(event) {
            option.innerHTML = object.text.slice(0, window.innerWidth / 1000 * 30) + "...";
        }, true);
        select.append(option);

    });

    var chevron = document.createElement("div");
    chevron.innerHTML = "▼";
    chevron.style.fontSize = "6pt";
    chevron.style.opacity = 0.5;
    stepper.append(chevron);

    document.body.append(menu);

};

function renderContainer () {

    var container = document.createElement("div");
    container.id = "container";
    container.style.display = "flex";
    container.style.margin = "20px";
    container.style.gap = "20px";
    document.body.append(container);

};

function renderPreview (data, selection) {

    var preview = document.createElement("img");
    preview.src = data[selection].image;
    preview.style.position = "sticky";
    preview.style.position = "-webkit-sticky";
    preview.style.alignSelf = "flex-start";
    preview.style.top = "75px";
    preview.style.width = "calc((100vw - 60px) / 3 * 2)";
    preview.style.height = "calc((100vh - 60px - 35px))";
    preview.style.objectFit = "contain";
    document.getElementById("container").append(preview);

};

function renderSteps (theme, data, selection) {

    var steps = document.createElement("div");
    steps.id = "steps";
    steps.style.display = "flex";
    steps.style.flexDirection = "column";
    steps.style.gap = "20px";
    steps.style.width = "calc((100vw - 60px) / 3)";

    data.forEach (function (object, index) {
        
        var step = document.createElement("div");
        step.id = "step" + index;
        step.onclick = function () { tutorial(theme, data, index) };
        step.style.display = "flex";
        step.style.flexDirection = "column";
        step.style.gap = "20px";
        step.style.padding = "20px";
        step.style.borderRadius = "5px";
        step.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
        step.style.opacity = index === selection ? 1 : 0.5;
        switch (theme.alignment) {
            case "right":
                step.style.borderRight = index === selection ? "5px solid " + theme.accent : "5px solid rgba(255, 255, 255, 0)";
                step.style.borderLeft = "5px solid rgba(255, 255, 255, 0)";
                break;
            default:
                step.style.borderLeft = index === selection ? "5px solid " + theme.accent : "5px solid rgba(255, 255, 255, 0)";
                step.style.borderRight = "5px solid rgba(255, 255, 255, 0)";
        };
        step.style.borderTop = "1px solid rgba(255, 255, 255, 0.2)";
        step.style.cursor = "pointer";

        var header = document.createElement("div");
        header.style.display = "flex";
        header.style.justifyContent = "space-between";

        var title = document.createElement("div");
        title.innerHTML = object.title;
        title.style.color = index === selection ? theme.accent : theme.text;
        title.style.fontWeight = "bold";
        header.append(title);

        var count = document.createElement("b");
        count.innerHTML = index + 1;
        count.style.color = index === selection ? theme.accent : theme.text;
        header.append(count);
        step.append(header);

        var divider = document.createElement("div");
        divider.style.height = "2px";
        divider.style.borderRadius = "2px";
        divider.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
        step.append(divider);

        var text = document.createElement("div");
        text.innerHTML = object.text;
        step.append(text);

        steps.append(step);

    });

    document.getElementById("container").append(steps);

};