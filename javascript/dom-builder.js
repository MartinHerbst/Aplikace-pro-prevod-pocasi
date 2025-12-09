
export class DOMBuilder {
    /*
    Trida pro vytvoreni DOM stromu
    */
    constructor() {
        this.root = document.createElement("div");
        this.root.classList.add("root");

        this.currentParent = this.root;
    }

    setParent(parent) {
        this.currentParent = parent;
    }

    appendHeading(payload, setClass=null) {
        let h = document.createElement("h1");
        if(setClass) {
            h.classList.add(setClass)
        }
        h.textContent = payload;
        this.currentParent.appendChild(h);
        return h;
    }

    appendDiv(setClass=null) {
        let d = document.createElement("div");
        if(setClass) {
            d.classList.add(setClass)
        }
        this.currentParent.appendChild(d);
        return d;
    }
}