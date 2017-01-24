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

function replaceMatch(match)
{
    if (match === match.toUpperCase()) {
        return 'ALTERNATIVE';
    }
    else if (match[0] === match[0].toUpperCase()) {
        return 'Alternative';
    }
    else {
        return 'alternative';
    }
}

function makeNodeRight(node) {
    if (node.textContent !== undefined) {
        var textContent = node.textContent;

        for (var i = 0; i < OFFENSIVE_WORDS.length; i++)
        {
            var searchReg = new RegExp(OFFENSIVE_WORDS[i], 'gi');
            textContent = textContent.replace(searchReg, replaceMatch);
        }

        node.textContent = textContent;
    }
}

makeAllNodesRight(document);
