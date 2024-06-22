figma.showUI(__html__);
figma.ui.resize(300, 500);

figma.ui.onmessage = async(pluginMessage) =>{

    await figma.loadFontAsync ({family:"Inter", style:"Regular"});

    
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

    const newPost = selectedVariant.createInstance();

    const templateName = newPost.findOne(node => node.type == "TEXT" && node.name == "displayName") as TextNode;
    const templateUsername = newPost.findOne(node => node.type == "TEXT" && node.name == "@username") as TextNode;
    const templateDescription = newPost.findOne(node => node.type == "TEXT" && node.name == "description") as TextNode;

    templateName.characters = pluginMessage.name;
    templateUsername.characters = pluginMessage.username;
    templateDescription.characters = pluginMessage.body;

    // figma.closePlugin();
}

