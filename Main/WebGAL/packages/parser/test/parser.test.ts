import SceneParser from "../src/index";
import { ADD_NEXT_ARG_LIST, SCRIPT_CONFIG } from "../src/config/scriptConfig";
import { expect, test } from "vitest";
import { commandType, ISentence } from "../src/interface/sceneInterface";
import * as fsp from 'fs/promises'

test("label", async () => {

  const sceneRaw = await fsp.readFile('test/test-resources/start.txt');
  const sceneText = sceneRaw.toString();

  const parser = new SceneParser((assetList) => {
  }, (fileName, assetType) => {
    return fileName;
  }, ADD_NEXT_ARG_LIST, SCRIPT_CONFIG);

  const result = parser.parse(sceneText, "start", "/start.txt");
  const expectSentenceItem: ISentence = {
    command: commandType.label,
    commandRaw: "label",
    content: "end",
    args: [
      { key: "next", value: true }
    ],
    sentenceAssets: [],
    subScene: []
  };
  expect(result.sentenceList).toContainEqual(expectSentenceItem);
});
