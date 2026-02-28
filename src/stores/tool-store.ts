import {observable, action} from 'mobx';

type toolState = {
    activeTool: string
}

export const toolStore: toolState = observable({
    activeTool: ''
});

export const setActiveTool = action((activeTool: string) => {
    toolStore.activeTool = activeTool;
});
