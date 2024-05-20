
function removeEmptyParagraphs(elementId) {
    // Get the element by its ID
    const element = document.getElementById(elementId);
    
    if (!element) {
        console.error(`Element with ID "${elementId}" not found.`);
        return;
    }

    recursivelyRemoveEmptyParagraphs(element);
}

function recursivelyRemoveEmptyParagraphs(node) {
    // Convert child nodes to array to avoid live collection issues
    const children = Array.from(node.childNodes);

    children.forEach(child => {
        // If the child is a <p> element and it's empty, remove it
        if (child.nodeName === 'P' && isEmptyParagraph(child)) {
            node.removeChild(child);
        } else if (child.childNodes.length > 0) {
            // Recursively call this function on child nodes
            recursivelyRemoveEmptyParagraphs(child);
        }
    });
}

function isEmptyParagraph(p) {
  let res = (p.textContent.trim() === '' && p.childNodes.length == 0);
  console.log("length = " + p.childNodes.length + " >> p.innerHTML = " + p.innerHTML + " >> isempty = " + res);
    return p.textContent.trim() === '' && p.childNodes.length == 0;
}