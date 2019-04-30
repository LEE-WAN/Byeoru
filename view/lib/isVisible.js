export default function isVisible(elem) {
    if (!(elem instanceof Element)) throw Error('DomUtil: elem is not an element.');
    const style = getComputedStyle(elem);
    if (style.display === 'none') return false;
    if (style.visibility !== 'visible') return false;
    if (style.opacity < 0.1) return false;
    if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height +
        elem.getBoundingClientRect().width === 0) {
        return false;
    }
    /* const elemCenter   = {
        x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
        y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
    }; */
    const elemEdge = {
        leftX: elem.getBoundingClientRect().left,
        rightX: elem.getBoundingClientRect().left + elem.offsetWidth,
        topY: elem.getBoundingClientRect().top,
        bottomY: elem.getBoundingClientRect().top + elem.offsetHeight,
    }
//    console.log(elemEdge);
    if (elemEdge.rightX < 0) return false;
//    console.log(2);
    if (elemEdge.leftX > (document.documentElement.clientWidth || window.innerWidth)) return false;
//    console.log(3);
    if (elemEdge.bottomY < 0) return false;
//    console.log(4);
    if (elemEdge.topY > (document.documentElement.clientHeight || window.innerHeight)) return false;
 //   console.log(5);
    return true;

    let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
    do {
        if (pointContainer === elem) return true;
    } while (pointContainer = pointContainer.parentNode);
    return false;
}