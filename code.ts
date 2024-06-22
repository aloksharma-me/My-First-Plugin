figma.showUI(__html__);
figma.ui.resize(300, 500);

figma.ui.onmessage = pluginMessage =>{
    
    // findOne searches for a node across the entire document (figma.root) with the node.type and node.name

    figma.loadAllPagesAsync();

    // find the component set first, and then the default variable of that set
    const postComponentSet = figma.root.findOne(node => node.type === "COMPONENT_SET" && node.name=="post") as ComponentSetNode;
    const defaultVariant = postComponentSet.defaultVariant as ComponentNode;
    
    // find a specific component
    // where (figma.root), what (findOne, node), how (node.type && node.name)
    const darkVariant = figma.root.findOne(node => node.type == "COMPONENT" && node.name=="Image=none, Dark mode=true") as ComponentNode;

    let selectedVariant;

    if(pluginMessage.theme === 'dark'){
        switch(pluginMessage.Image){
            case "single-image":
                darkVariant.createInstance();
                break;
            case "carousel":

                break;
            default:

                break;
        };
    } else {
        switch(pluginMessage.Image){
            case "single-image":
                darkVariant.createInstance();
                break;
            case "carousel":

                break;
            default:

                break;
        
            };
        
    }

    // figma.closePlugin();
}

