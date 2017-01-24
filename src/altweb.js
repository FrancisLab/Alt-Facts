const TEXT_NODE = 3;
const SCRIPT_NODE_NAME = 'script';
const STYLE_NODE_NAME = 'style';

const OFFENSIVE_WORDS = ['false', 'fake', 'untrue', 'bogus', 'distorted', 'erroneous', 'fictitious', 'inaccurate', 'invalid', 'misleading', 'phony', 'untruthful', 'inexact'];


function isTextNode(node) {
    return node.nodeType === TEXT_NODE;
}

function isSafeElementNode(node) {
    if (node.nodeName !== undefined) {
        var nodeName = node.nodeName.toLowerCase();
        return !(nodeName === SCRIPT_NODE_NAME || nodeName === STYLE_NODE_NAME);
    }

    return true;
}

function makeAllNodesRight(sourceNode) {
    if (isTextNode(sourceNode)) {
        makeNodeRight(sourceNode);
    }

    if (isSafeElementNode(sourceNode)) {
        for (var node in sourceNode.childNodes) {
            makeAllNodesRight(sourceNode.childNodes[node]);
        }
    }
}

function makeNodeRight(node) {
    if (node.textContent !== undefined) {
        var textContent = node.textContent;

        // TODO: lower case is not that alt
        textContent = textContent.toLowerCase();

        for (var i = 0; i < OFFENSIVE_WORDS.length; i++)
        {
            var searchReg = new RegExp(OFFENSIVE_WORDS[i], 'g');
            textContent = textContent.replace(searchReg, 'alternative');
        }

        node.textContent = textContent;
    }
}

makeAllNodesRight(document);
