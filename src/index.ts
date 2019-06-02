import * as Rete from "rete";

export default {
    name: "reorder-nodes",
    install,
};

function install(editor: Rete.NodeEditor): void {
    editor.view.on("nodeselected", (node) => {
        const nodeView = editor.view.nodes.get(node);
        if (nodeView == null) {
            throw new Error("Node view not found in node-to-view map");
        }

        const nodeElement = nodeView.el;
        const parentElement = nodeElement.parentElement!;
        parentElement.lastElementChild!.after(nodeElement);

        const index = editor.nodes.indexOf(node);
        if (index === -1) {
            throw new Error("Node not found in editor node list");
        }

        editor.nodes.splice(index, 1);
        editor.nodes.push(node);
    });
}
