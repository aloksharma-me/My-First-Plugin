figma.showUI(__html__);
figma.ui.resize(300, 500);

figma.ui.onmessage = pluginMessage =>{
    
    // findOne searches for a node across the entire document (figma.root) with the node.type and node.name

    figma.loadAllPagesAsync();

    // find the component set first, and then the default variable of that set
    const postComponentSet = figma.root.findOne(node => node.type === "COMPONENT_SET" && node.name=="post") as ComponentSetNode;

    let selectedVariant;

    if(pluginMessage.theme === 'dark'){
        switch(pluginMessage.Image){
            case "single-image":
                selectedVariant = figma.root.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=true") as ComponentNode;
                break;
            case "carousel":
                selectedVariant = figma.root.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=true") as ComponentNode;
                break;
            default:
                selectedVariant = figma.root.findOne(node => node.type == "COMPONENT" && node.name == "Image=none, Dark mode=true") as ComponentNode;
                break;
        };
    } else {
        switch(pluginMessage.Image){
            case "single-image":
                selectedVariant = figma.root.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=false") as ComponentNode;
                break;
            case "carousel":
                selectedVariant = figma.root.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=false") as ComponentNode;
                break;
            default:
                selectedVariant = postComponentSet.defaultVariant as ComponentNode;
                break;
        
            };
        
    }

    selectedVariant.createInstance();

    // figma.closePlugin();
}

