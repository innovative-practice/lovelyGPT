import { scriptExecutor } from './scriptExecutor';
import { RUNTIME_GAMEPLAY } from '../../runtime/gamePlay';
import { IRunPerform } from '@/Core/controller/perform/performInterface';
import { logger } from '../../util/etc/logger';
import { webgalStore } from '@/store/store';
import { resetStageState } from '@/store/stageReducer';
import cloneDeep from 'lodash/cloneDeep';
import { webgalEventBus } from '@/Core/runtime/eventBus';

/**
 * 进行下一句
 */
export const nextSentence = () => {
  /**
   * 发送 “发生点击下一句” 事件。
   */
  webgalEventBus.emit('__NEXT');

  // 如果当前显示标题，那么不进行下一句
  const GUIState = webgalStore.getState().GUI;
  if (GUIState.showTitle) {
    return;
  }

  // 第一步，检查是否存在 blockNext 的演出
  let isBlockingNext = false;
  RUNTIME_GAMEPLAY.performList.forEach((e) => {
    if (e.blockingNext() && !e.isOver)
      // 阻塞且没有结束的演出
      isBlockingNext = true;
  });
  if (isBlockingNext) {
    // 有阻塞，提前结束
    logger.warn('next 被阻塞！');
    return;
  }

  // 检查是否处于演出完成状态，不是则结束所有普通演出（保持演出不算做普通演出）
  let allSettled = true;
  RUNTIME_GAMEPLAY.performList.forEach((e) => {
    if (!e.isHoldOn) allSettled = false;
  });
  if (allSettled) {
    // 所有普通演出已经结束
    // 清除状态表的演出序列（因为这时候已经准备进行下一句了）
    const stageState = webgalStore.getState().stage;
    const newStageState = cloneDeep(stageState);
    for (let i = 0; i < newStageState.PerformList.length; i++) {
      const e: IRunPerform = newStageState.PerformList[i];
      if (!e.isHoldOn) {
        newStageState.PerformList.splice(i, 1);
        i--;
      }
    }
    webgalStore.dispatch(resetStageState(newStageState));
    scriptExecutor();
    return;
  }

  // 不处于 allSettled 状态，清除所有普通演出，强制进入settled。
  logger.warn('提前结束被触发，现在清除普通演出');
  let isGoNext = false;
  for (let i = 0; i < RUNTIME_GAMEPLAY.performList.length; i++) {
    const e = RUNTIME_GAMEPLAY.performList[i];
    if (!e.isHoldOn) {
      if (e.goNextWhenOver) {
        isGoNext = true;
      }
      e.stopFunction();
      clearTimeout(e.stopTimeout);
      RUNTIME_GAMEPLAY.performList.splice(i, 1);
      i--;
    }
  }
  if (isGoNext) {
    nextSentence();
  }
};
