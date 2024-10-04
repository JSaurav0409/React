function customRender(element, container) {
/* ver 1.0
    const domElement = document.createElement(element.type)
    domElement.innerHTML = element.children;
    domElement.setAttribute('href', element.props.href)
    domElement.setAttribute('target', element.props.target)

    container.appendChild(domElement)
*/
    
    // ver 2.0 Modular
    const domElement = document.createElement(element.type)
    domElement.innerHTML = element.children
    for (const prop in element.props) {
        if (prop === 'children') continue;
        domElement.setAttribute(prop, element.props[prop]);

        container.appendChild(domElement);
    }
}


// How this custom react will take element

const reactElement = {
    type: 'a',
    props: {
        href: 'https://www.google.com',
        target: '_blank',
    },
    children: 'Click Me'
};

const mainContainer = document.querySelector('#root');

customRender(reactElement, mainContainer);