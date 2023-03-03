import { FC } from 'react';
import styles from './title.module.scss';
import { playBgm } from '@/Core/controller/stage/playBgm';
import { startGame } from '@/Core/controller/gamePlay/startGame';
import { RUNTIME_SCENE_DATA } from '@/Core/runtime/sceneData';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setMenuPanelTag, setVisibility } from '@/store/GUIReducer';
import { MenuPanelTag } from '@/store/guiInterface';
import { nextSentence } from '@/Core/controller/gamePlay/nextSentence';
import { hasFastSaveRecord, loadFastSaveGame } from '@/hooks/useHotkey';
import { restorePerform } from '@/Core/controller/storage/jumpFromBacklog';

/**
 * 标题页
 * @constructor
 */
const Title: FC = () => {
  const GUIState = useSelector((state: RootState) => state.GUI);
  const dispatch = useDispatch();
  const background = GUIState.titleBg;
  const showBackground = background === '' ? 'rgba(0,0,0,1)' : `url("${background}")`;
  return (
    <>
      {GUIState.showTitle && <div className={styles.Title_backup_background} />}
      <div
        id="enter_game_target"
        onClick={() => {
          playBgm(GUIState.titleBgm);
        }}
      />
      {GUIState.showTitle && (
        <div
          className={styles.Title_main}
          style={{
            backgroundImage: showBackground,
            backgroundSize: 'cover',
          }}
        >
          <div className={styles.Title_buttonList}>
            <div className={styles.Title_button} onClick={startGame}>
              <div className={styles.Title_button_text + ' ' + styles.Title_button_text_up}>开始游戏</div>
              <div className={styles.Title_button_text}>START</div>
            </div>
            <div
              className={styles.Title_button}
              onClick={async () => {
                dispatch(setVisibility({ component: 'showTitle', visibility: false }));
                // 当且仅当游戏未开始时使用快速存档
                // 当游戏开始后 使用原来的逻辑
                if ((await hasFastSaveRecord()) && RUNTIME_SCENE_DATA.currentSentenceId === 0) {
                  // 恢复记录
                  await loadFastSaveGame();
                  return;
                }
                if (
                  RUNTIME_SCENE_DATA.currentSentenceId === 0 &&
                  RUNTIME_SCENE_DATA.currentScene.sceneName === 'start.txt'
                ) {
                  // 如果游戏没有开始，开始游戏
                  nextSentence();
                } else {
                  restorePerform();
                }
              }}
            >
              <div className={styles.Title_button_text + ' ' + styles.Title_button_text_up}>继续游戏</div>
              <div className={styles.Title_button_text}>CONTINUE</div>
            </div>
            <div
              className={styles.Title_button}
              onClick={() => {
                dispatch(setVisibility({ component: 'showMenuPanel', visibility: true }));
                dispatch(setMenuPanelTag(MenuPanelTag.Option));
              }}
            >
              <div className={styles.Title_button_text + ' ' + styles.Title_button_text_up}>游戏选项</div>
              <div className={styles.Title_button_text}>OPTIONS</div>
            </div>
            <div
              className={styles.Title_button}
              onClick={() => {
                dispatch(setVisibility({ component: 'showMenuPanel', visibility: true }));
                dispatch(setMenuPanelTag(MenuPanelTag.Load));
              }}
            >
              <div className={styles.Title_button_text + ' ' + styles.Title_button_text_up}>读取存档</div>
              <div className={styles.Title_button_text}>LOAD</div>
            </div>
            {/* <div */}
            {/*   className={styles.Title_button} */}
            {/*   onClick={() => { */}
            {/*     window.opener = null; */}
            {/*     window.open('', '_self'); */}
            {/*     window.close(); */}
            {/*   }} */}
            {/* > */}
            {/*   <div className={styles.Title_button_text + ' ' + styles.Title_button_text_up}>退出游戏</div> */}
            {/*   <div className={styles.Title_button_text}>EXIT</div> */}
            {/* </div> */}
            <div
              className={styles.Title_button}
              onClick={() => {
                dispatch(setVisibility({ component: 'showExtra', visibility: true }));
              }}
            >
              <div className={styles.Title_button_text + ' ' + styles.Title_button_text_up}>鉴赏模式</div>
              <div className={styles.Title_button_text}>EXTRA</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Title;
