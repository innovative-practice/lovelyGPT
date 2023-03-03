import { ISceneData } from '@/Core/controller/scene/sceneInterface';
import cloneDeep from 'lodash/cloneDeep';

/**
 * 初始化场景数据
 */
export const initSceneData = {
  currentSentenceId: 0, // 当前语句ID
  sceneStack: [],
  // 初始场景，没有数据
  currentScene: {
    sceneName: '', // 场景名称
    sceneUrl: '', // 场景url
    sentenceList: [], // 语句列表
    assetsList: [], // 资源列表
    subSceneList: [], // 子场景列表
  },
};
// 场景数据
export const RUNTIME_SCENE_DATA: ISceneData = cloneDeep(initSceneData);
